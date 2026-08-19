import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CandidateSelection } from './components/CandidateSelection';
import { InterviewScreen } from './components/InterviewScreen';
import { PerformanceReport } from './components/PerformanceReport';
import { CandidateRoster } from './components/CandidateRoster';
import { CurriculumBrowser } from './components/CurriculumBrowser';
import { Candidate, Curriculum, ChatMessage, FinalFeedback } from './types';
import { analyzeCandidateAnswersLocal } from './server/aiService';

import defaultCandidatesData from './data/candidates.json';
import defaultCurriculumData from './data/curriculum.json';

export function App() {
  const [candidates, setCandidates] = useState<Candidate[]>(
    defaultCandidatesData.candidates as Candidate[]
  );
  const [curriculum, setCurriculum] = useState<Curriculum>(
    defaultCurriculumData as Curriculum
  );

  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    (defaultCandidatesData.candidates[0] as Candidate) || null
  );

  const [sessionId, setSessionId] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [daysCovered, setDaysCovered] = useState<number[]>([]);
  const [topicsCovered, setTopicsCovered] = useState<string[]>([]);
  const [questionsAsked, setQuestionsAsked] = useState<number>(0);
  const [feedback, setFeedback] = useState<FinalFeedback | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);

  // Generate Report asynchronously in background without blocking UI navigation
  const generateReportAsync = async (candToEval?: Candidate, historyToEval?: ChatMessage[]) => {
    if (isLoadingReport) return;
    const activeCand = candToEval || selectedCandidate || candidates[0];
    if (!activeCand) return;

    const activeHistory = historyToEval || chatHistory;

    setIsLoadingReport(true);
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId || `sess_${activeCand?.member?.id || 'candidate'}`,
          candidate: activeCand,
          chatHistory: activeHistory,
          message: 'Please conclude the interview and generate the final performance report.',
          forceEvaluate: true,
        }),
      });

      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      } else {
        const localFB = analyzeCandidateAnswersLocal(
          activeCand,
          activeHistory
            .filter((h) => h.sender !== 'system')
            .map((h) => ({
              role: h.sender === 'ai' ? 'interviewer' : 'candidate',
              text: h.text,
              topic: h.topic,
            }))
        );
        setFeedback(localFB);
      }
    } catch (err) {
      console.error('Error generating report:', err);
      const localFB = analyzeCandidateAnswersLocal(
        activeCand,
        activeHistory
          .filter((h) => h.sender !== 'system')
          .map((h) => ({
            role: h.sender === 'ai' ? 'interviewer' : 'candidate',
            text: h.text,
            topic: h.topic,
          }))
      );
      setFeedback(localFB);
    } finally {
      setIsLoadingReport(false);
    }
  };

  // Trigger report fetch if on report page and feedback isn't ready
  useEffect(() => {
    if ((currentTab === 'report' || currentTab === 'insights') && !feedback && !isLoadingReport) {
      generateReportAsync();
    }
  }, [currentTab, feedback, isLoadingReport]);

  // Keep browser address bar in sync when viewing performance report
  useEffect(() => {
    if ((currentTab === 'report' || currentTab === 'insights') && selectedCandidate) {
      const reportId = selectedCandidate.member.id;
      const targetPath = `/performance-report/${reportId}`;
      if (window.location.pathname !== targetPath) {
        window.history.replaceState({ tab: 'report', reportId }, '', targetPath);
      }
    }
  }, [currentTab, selectedCandidate]);

  // Handle direct link opening (e.g., /performance-report/:reportId or ?reportId=...)
  useEffect(() => {
    const handleUrlRoute = () => {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      let reportId = '';
      if (pathname.includes('/performance-report/')) {
        reportId = pathname.split('/performance-report/')[1];
      } else if (searchParams.get('reportId')) {
        reportId = searchParams.get('reportId') || '';
      } else if (searchParams.get('candidate')) {
        reportId = searchParams.get('candidate') || '';
      } else if (searchParams.get('session')) {
        reportId = searchParams.get('session') || '';
      } else if (hash.includes('performance-report/')) {
        reportId = hash.split('performance-report/')[1];
      }

      if (reportId) {
        reportId = reportId.split('?')[0].split('#')[0].replace(/\/$/, '');
      }

      if (reportId) {
        const candidateListToSearch = candidates.length > 0 ? candidates : (defaultCandidatesData.candidates as Candidate[]);
        const matchingCand =
          candidateListToSearch.find(
            (c) =>
              c.member.id.toLowerCase() === reportId.toLowerCase() ||
              reportId.toLowerCase().includes(c.member.id.toLowerCase()) ||
              c.member.name.toLowerCase().replace(/\s+/g, '-').includes(reportId.toLowerCase())
          ) || candidateListToSearch[0];

        if (matchingCand) {
          if (selectedCandidate?.member?.id !== matchingCand.member.id) {
            setSelectedCandidate(matchingCand);
            setFeedback(null);
            setChatHistory([]);
          }
        }
        setSessionId(`sess_${reportId}`);
        setCurrentTab('report');
      }
    };

    handleUrlRoute();

    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [candidates]);

  // Load backend data if available
  useEffect(() => {
    fetch('/api/candidates')
      .then((res) => res.json())
      .then((data) => {
        if (data.candidates && data.candidates.length > 0) {
          setCandidates(data.candidates);
          if (!selectedCandidate) {
            setSelectedCandidate(data.candidates[0]);
          }
        }
      })
      .catch((err) => console.log('Using local candidates data fallback'));

    fetch('/api/curriculum')
      .then((res) => res.json())
      .then((data) => {
        if (data.modules && data.days) {
          setCurriculum(data);
        }
      })
      .catch((err) => console.log('Using local curriculum data fallback'));
  }, []);

  // Initialize new Interview session
  const handleBeginInterviewSession = async (candidateToStart?: Candidate) => {
    if (isGenerating) return;
    const candidate = candidateToStart || selectedCandidate;
    if (!candidate) return;

    const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessionId(newSessionId);
    setSelectedCandidate(candidate);
    setIsGenerating(true);
    setCurrentTab('interview');
    setChatHistory([]);
    setDaysCovered([]);
    setTopicsCovered([]);
    setQuestionsAsked(0);
    setFeedback(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId: newSessionId,
          candidate: candidate,
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || `Server status ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        const initialDay = data.curriculumDay || 7;
        setChatHistory([
          {
            id: `msg_ai_1`,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString(),
            topic: data.topic || 'Initial Focus Topic',
            curriculumDay: initialDay,
            isFollowUp: false,
          },
        ]);
        setQuestionsAsked(data.questionNumber || 1);
        setDaysCovered([initialDay]);
        if (data.topic) {
          setTopicsCovered([data.topic]);
        } else {
          setTopicsCovered(['Technical Foundations']);
        }
      }
    } catch (err: any) {
      console.error('Error starting interview:', err);
      const isAbort = err.name === 'AbortError';
      const initialProject = candidate.member.projects?.[0]?.name ? ` I noticed your work on ${candidate.member.projects[0].name}.` : '';
      
      const errorGreeting = isAbort
        ? `Welcome, ${candidate.member.name}! The initial connection took a moment, but let's begin: given your experience as a ${candidate.member.jobRole}${initialProject}, what key engineering considerations guide your technical choices?`
        : `Welcome, ${candidate.member.name}! Given your background as a ${candidate.member.jobRole}${initialProject}, let's begin your technical evaluation. What core architectural principles do you prioritize in production setups?`;

      setChatHistory([
        {
          id: `msg_ai_1`,
          sender: 'ai',
          text: errorGreeting,
          timestamp: new Date().toLocaleTimeString(),
          topic: 'Technical Foundations',
          curriculumDay: 7,
        },
      ]);
      setQuestionsAsked(1);
      setDaysCovered([7]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Send candidate turn message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !selectedCandidate || isGenerating) return;

    const userMsgId = `msg_cand_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'candidate',
      text: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    // 1. Immediately add candidate answer as a NEW user chat bubble and increment question counter
    setChatHistory((prev) => [...prev, userMsg]);
    setQuestionsAsked((prev) => Math.min(prev + 1, 8));
    setIsGenerating(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);

    try {
      // 2. Send answer to AI interviewer
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId: sessionId || `sess_${Date.now()}`,
          candidate: selectedCandidate,
          message: text,
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errObj = new Error(errData.details || errData.error || `Server status ${res.status}`);
        if (res.status === 429) {
          (errObj as any).status = 429;
        }
        throw errObj;
      }

      const data = await res.json();

      if (data.done && data.feedback) {
        setFeedback(data.feedback);
        setCurrentTab('report');
      } else {
        const aiMsg: ChatMessage = {
          id: `msg_ai_${Date.now()}`,
          sender: 'ai',
          text: data.reply || 'Thank you. Could you share your thoughts on how you validate data consistency in this setup?',
          timestamp: new Date().toLocaleTimeString(),
          topic: data.topic,
          curriculumDay: data.curriculumDay,
          isFollowUp: data.isFollowUp,
          isClarification: data.isClarificationRequest,
        };
        // 3. Display AI's next response as a NEW interviewer message below candidate's answer
        setChatHistory((prev) => [...prev, aiMsg]);
        if (data.questionNumber !== undefined) setQuestionsAsked(data.questionNumber);
        if (data.curriculumDay && !daysCovered.includes(data.curriculumDay)) {
          setDaysCovered((prev) => [...prev, data.curriculumDay]);
        }
        if (data.topic && !topicsCovered.includes(data.topic)) {
          setTopicsCovered((prev) => [...prev, data.topic]);
        }
      }
    } catch (err: any) {
      console.error('Error sending message:', err);
      const isAbort = err.name === 'AbortError';

      const fallbackText = isAbort
        ? 'Thank you for your response. Let\'s continue our evaluation: how do you manage system trade-offs and latency considerations in this configuration?'
        : 'Thank you for sharing your perspective. Let\'s examine the next area: how do you evaluate performance, fault tolerance, and scalability trade-offs in this architecture?';

      const continuationAiMsg: ChatMessage = {
        id: `msg_ai_cont_${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString(),
        topic: 'System Design & Architecture',
        curriculumDay: 7,
        isFollowUp: true,
      };
      setChatHistory((prev) => [...prev, continuationAiMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Force End Interview & Generate Report
  const handleEndInterviewEarly = () => {
    // Navigate immediately to report page
    setCurrentTab('report');
    if (!feedback) {
      generateReportAsync();
    }
  };

  return (
    <div className="min-h-screen bg-[#111318] font-sans text-[#e2e2e8] selection:bg-[#4d8eff] selection:text-[#001a42]">
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          const targetTab = tab === 'insights' || tab === 'report' ? 'report' : tab;
          if (targetTab === 'interview' && !sessionId) {
            setCurrentTab('selection');
          } else {
            setCurrentTab(targetTab);
          }
        }}
        candidateName={selectedCandidate?.member?.name}
        questionsAsked={questionsAsked}
        showBack={currentTab !== 'landing'}
        onBack={() => {
          if (currentTab === 'interview' || currentTab === 'report') {
            setCurrentTab('selection');
          } else {
            setCurrentTab('landing');
          }
        }}
      />

      {currentTab === 'landing' && (
        <LandingPage
          onStartInterview={() => setCurrentTab('selection')}
          onViewCandidates={() => setCurrentTab('candidates')}
          onViewCurriculum={() => setCurrentTab('curriculum')}
        />
      )}

      {currentTab === 'selection' && (
        <CandidateSelection
          candidates={candidates}
          selectedCandidate={selectedCandidate}
          onSelectCandidate={(cand) => {
            if (selectedCandidate?.member?.id !== cand.member.id) {
              setSelectedCandidate(cand);
              setFeedback(null);
              setChatHistory([]);
            }
          }}
          onBeginInterview={() => handleBeginInterviewSession()}
          isLoading={isGenerating}
        />
      )}

      {currentTab === 'interview' && selectedCandidate && (
        <InterviewScreen
          candidate={selectedCandidate}
          sessionId={sessionId}
          chatHistory={chatHistory}
          curriculum={curriculum}
          daysCovered={daysCovered}
          topicsCovered={topicsCovered}
          questionsAsked={questionsAsked}
          onSendMessage={handleSendMessage}
          onEndInterview={handleEndInterviewEarly}
          isGenerating={isGenerating}
        />
      )}

      {(currentTab === 'report' || currentTab === 'insights') && (
        <PerformanceReport
          candidate={selectedCandidate || candidates[0]}
          sessionId={sessionId || 'SESS-EVAL'}
          feedback={feedback}
          isLoading={isLoadingReport}
          daysCoveredCount={daysCovered.length || 4}
          chatHistory={chatHistory}
          onRestartWithTopic={(topic) => handleBeginInterviewSession()}
        />
      )}

      {currentTab === 'candidates' && (
        <CandidateRoster
          candidates={candidates}
          onSelectCandidateToInterview={(candidate) => {
            if (selectedCandidate?.member?.id !== candidate.member.id) {
              setSelectedCandidate(candidate);
              setFeedback(null);
              setChatHistory([]);
            }
            handleBeginInterviewSession(candidate);
          }}
        />
      )}

      {currentTab === 'curriculum' && (
        <CurriculumBrowser curriculum={curriculum} />
      )}
    </div>
  );
}

export default App;
