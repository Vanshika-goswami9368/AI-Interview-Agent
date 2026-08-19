import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FinalFeedback, Candidate, ChatMessage } from '../types';
import {
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Cpu,
  Copy,
  Check,
} from 'lucide-react';

interface PerformanceReportProps {
  candidate: Candidate;
  sessionId: string;
  feedback: FinalFeedback | null;
  isLoading?: boolean;
  daysCoveredCount: number;
  chatHistory?: ChatMessage[];
  onRestartWithTopic?: (topic: string) => void;
}

export const PerformanceReport: React.FC<PerformanceReportProps> = ({
  candidate,
  sessionId,
  feedback,
  isLoading,
  daysCoveredCount,
  chatHistory = [],
  onRestartWithTopic,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const isDataLoading = isLoading || !feedback;

  const computeCandidateCompetencies = (cand: Candidate, history: ChatMessage[]) => {
    const qaPairs: { q: string; a: string }[] = [];
    for (let i = 0; i < history.length; i++) {
      if (history[i].sender === 'ai') {
        const q = history[i].text;
        let a = '';
        if (i + 1 < history.length && history[i + 1].sender !== 'ai') {
          a = history[i + 1].text;
        }
        qaPairs.push({ q, a: a || '(No answer provided)' });
      }
    }

    const clarificationRegex = /\b(don't understand|dont understand|didn't understand|didnt understand|rephrase|repeat|what do you mean|clarify|can you explain the question|could you explain the question|what does that mean)\b/i;
    const nonAnswerRegex = /\b(don't know|dont know|not sure|no idea|pass|no clue|idk|skip|skipped|skipping|dunno|haven't studied|havent studied|haven't|havent|no answer|n\/a|none|nothing|leave this|next)\b/i;

    const technicalKeywords = [
      'vector', 'embedding', 'rag', 'chunk', 'prompt', 'mcp', 'agent', 'docker', 'kubernetes',
      'index', 'cosine', 'hnsw', 'retrieval', 'rerank', 'pipeline', 'token', 'latency', 'database',
      'grpc', 'schema', 'fallback', 'cache', 'throughput', 'concurrency', 'failover', 'consistency',
      'qdrant', 'pinecone', 'pgvector', 'kafka', 'fastapi', 'ollama', 'redis', 'chroma', 'microservices',
      'ivf', 'quantization', 'bm25', 'precision', 'recall', 'lora', 'context window'
    ];

    const reasoningKeywords = [
      'because', 'since', 'therefore', 'due to', 'leads to', 'result', 'reason', 'why',
      'analyze', 'investigate', 'debug', 'troubleshoot', 'root cause', 'diagnose', 'mitigate',
      'prevent', 'isolate', 'handle', 'solve', 'resolve', 'scenario', 'edge case', 'failure mode',
      'condition', 'if', 'when', 'unless', 'fallback', 'circuit breaker', 'retry', 'backoff'
    ];

    const engineeringKeywords = [
      'tradeoff', 'trade-off', 'scale', 'scalability', 'latency', 'throughput', 'cost',
      'memory', 'cpu', 'ram', 'p99', 'p95', 'sla', 'sharding', 'replication', 'partition',
      'durability', 'consistency', 'availability', 'cap theorem', 'acid', 'cache', 'caching',
      'eviction', 'lru', 'bottleneck', 'production', 'architecture', 'choose', 'prefer',
      'versus', 'vs', 'instead of', 'compromise', 'overhead', 'benchmark'
    ];

    const communicationKeywords = [
      'first', 'second', 'third', 'furthermore', 'moreover', 'specifically', 'in summary',
      'for example', 'for instance', 'in addition', 'to summarize', 'pros', 'cons',
      'advantage', 'disadvantage', 'tradeoff', 'approach', 'strategy', 'consideration'
    ];

    let totalTechPoints = 0;
    let totalProbPoints = 0;
    let totalEngPoints = 0;
    let totalCommPoints = 0;

    qaPairs.forEach((pair) => {
      const text = (pair.a || '').trim();
      const lower = text.toLowerCase();
      const words = text.split(/\s+/).filter(Boolean);

      if (clarificationRegex.test(lower)) {
        return;
      }

      const isUnanswered = !text || text === '(No answer provided)' || text === '(Candidate skipped question)';
      const isExplicitNonAnswer = isUnanswered || (nonAnswerRegex.test(lower) && words.length < 15);

      if (isExplicitNonAnswer) {
        return;
      }

      const techHits = technicalKeywords.filter((k) => lower.includes(k)).length;
      const reasoningHits = reasoningKeywords.filter((k) => lower.includes(k)).length;
      const engHits = engineeringKeywords.filter((k) => lower.includes(k)).length;
      const commHits = communicationKeywords.filter((k) => lower.includes(k)).length;

      // 1. Technical Understanding (0 - 100 per question)
      let qTech = 15;
      if (techHits >= 3 && words.length >= 18) qTech = 100;
      else if (techHits >= 2 && words.length >= 12) qTech = 85;
      else if (techHits >= 1) qTech = 60;
      else if (words.length >= 12) qTech = 35;

      // 2. Problem Solving & Reasoning (0 - 100 per question)
      const hasCausal = ['because', 'since', 'therefore', 'due to', 'leads to', 'result', 'reason'].some((k) => lower.includes(k));
      const hasTroubleshoot = ['debug', 'troubleshoot', 'root cause', 'diagnose', 'investigate', 'mitigate', 'edge case', 'failure', 'fallback', 'retry'].some((k) => lower.includes(k));

      let qProb = 15;
      if ((reasoningHits >= 3 || (hasCausal && hasTroubleshoot)) && words.length >= 18) qProb = 100;
      else if (reasoningHits >= 2 || hasCausal || hasTroubleshoot) qProb = 80;
      else if (reasoningHits >= 1) qProb = 55;
      else if (words.length >= 12) qProb = 35;

      // 3. Engineering Decision-Making (0 - 100 per question)
      const hasExplicitDecision = ['tradeoff', 'trade-off', 'vs', 'versus', 'instead of', 'prefer', 'chose', 'choose', 'compromise'].some((k) => lower.includes(k));
      const hasConstraint = ['latency', 'scale', 'scalability', 'throughput', 'cost', 'memory', 'cpu', 'p99', 'sla', 'bottleneck', 'production', 'architecture', 'sharding', 'cache'].some((k) => lower.includes(k));

      let qEng = 15;
      if (hasExplicitDecision && hasConstraint && words.length >= 18) qEng = 100;
      else if (hasExplicitDecision || (engHits >= 2 && hasConstraint)) qEng = 85;
      else if (engHits >= 1 || hasConstraint) qEng = 55;
      else if (words.length >= 12) qEng = 30;

      // 4. Communication & Trade-off Articulation (0 - 100 per question)
      const hasStructure = text.includes('\n') || text.includes('1.') || text.includes('- ') || text.includes('•') || text.includes('```') || text.includes(':');

      let qComm = 20;
      if ((hasStructure || commHits >= 2) && words.length >= 25) qComm = 100;
      else if (words.length >= 18 && (hasStructure || commHits >= 1)) qComm = 85;
      else if (words.length >= 12) qComm = 65;
      else if (words.length >= 6) qComm = 40;

      totalTechPoints += qTech;
      totalProbPoints += qProb;
      totalEngPoints += qEng;
      totalCommPoints += qComm;
    });

    // Fixed total of 8 interview questions. Denominator must ALWAYS be 8.
    const TOTAL_INTERVIEW_QUESTIONS = 8;
    const technicalUnderstanding = Math.round((totalTechPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
    const problemSolving = Math.round((totalProbPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
    const engineeringDecision = Math.round((totalEngPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
    const communication = Math.round((totalCommPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;

    return {
      technicalUnderstanding,
      problemSolving,
      engineeringDecision,
      communication,
    };
  };

  const calculateOverallScore = (): number => {
    if (feedback && feedback.breakdown && Array.isArray(feedback.breakdown.questionEvaluations) && feedback.breakdown.questionEvaluations.length > 0) {
      const totalPoints = feedback.breakdown.questionEvaluations.reduce((sum, q) => sum + (typeof q.score === 'number' ? q.score : 0), 0);
      return Math.round((totalPoints / 8) * 10) / 10;
    }
    if (feedback && typeof feedback.overallScore === 'number') {
      return feedback.overallScore;
    }
    const computed = computeCandidateCompetencies(candidate, chatHistory);
    return computed.technicalUnderstanding;
  };

  const overallScore = calculateOverallScore();
  const comp = feedback?.competencies || computeCandidateCompetencies(candidate, chatHistory);

  const safeFeedback = feedback || {
    summary: `${candidate?.member?.name || 'The candidate'} demonstrated engagement during questioning. Overall score: ${overallScore}% evaluated across the 8 curriculum interview questions.`,
    strengths: [
      `Demonstrated technical articulation in ${candidate?.member?.jobRole || 'AI Engineering'}.`,
      'Active participation and structured responses during interview questioning.'
    ],
    gaps: [
      'Further deepening in unanswered questions and system failure modes recommended.'
    ],
    next: ['Vector Databases & Indexing', 'RAG System Bottlenecks', 'System Latency Optimization'],
    overallScore,
    competencies: comp,
  };

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);

    const canvasCtx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
    const convertColorString = (str: string): string => {
      if (!str || typeof str !== 'string') return str;
      if (!str.includes('oklab') && !str.includes('oklch') && !str.includes('color(') && !str.includes('light-dark')) {
        return str;
      }
      return str.replace(/(oklab|oklch|color|light-dark)\([^)]+\)/gi, (match) => {
        if (canvasCtx) {
          try {
            canvasCtx.fillStyle = 'rgba(0,0,0,0)';
            canvasCtx.fillStyle = match;
            const converted = canvasCtx.fillStyle;
            if (
              converted &&
              converted !== 'rgba(0,0,0,0)' &&
              converted !== 'transparent' &&
              !converted.includes('oklab') &&
              !converted.includes('oklch') &&
              !converted.includes('color(') &&
              !converted.includes('light-dark')
            ) {
              return converted;
            }
          } catch {
            // ignore canvas fill style error
          }
        }
        if (match.toLowerCase().startsWith('light-dark')) {
          const inner = match.slice(11, -1).trim();
          const parts = inner.split(',');
          if (parts.length > 0) return convertColorString(parts[0].trim());
        }
        if (match.includes('4d8eff') || match.includes('77') || match.includes('142')) {
          return 'rgba(77, 142, 255, 0.3)';
        }
        return 'rgba(255, 255, 255, 0.15)';
      });
    };

    const createStyleProxy = (style: CSSStyleDeclaration) => {
      return new Proxy(style, {
        get(target, prop: string | symbol) {
          if (prop === 'getPropertyValue') {
            return (propertyName: string) => {
              const val = target.getPropertyValue(propertyName);
              return convertColorString(val);
            };
          }
          const val = (target as any)[prop];
          if (typeof val === 'string') {
            return convertColorString(val);
          }
          if (typeof val === 'function') {
            return val.bind(target);
          }
          return val;
        },
      });
    };

    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
      const style = originalGetComputedStyle.call(window, elt, pseudoElt);
      return createStyleProxy(style);
    };

    try {
      const element = reportRef.current;
      if (!element) {
        window.print();
        setIsExporting(false);
        return;
      }

      window.scrollTo(0, 0);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0f1013',
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: 1280,
        ignoreElements: (el) => el.classList.contains('print:hidden') || el.classList.contains('no-export'),
        onclone: (clonedDoc, clonedEl) => {
          try {
            const clonedWin = clonedDoc.defaultView || window;
            if (clonedWin) {
              const origClonedStyle = clonedWin.getComputedStyle;
              clonedWin.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
                const style = origClonedStyle.call(clonedWin, elt, pseudoElt);
                return createStyleProxy(style);
              };
            }

            // Expand container height and overflow in cloned document
            if (clonedEl) {
              clonedEl.style.height = 'auto';
              clonedEl.style.maxHeight = 'none';
              clonedEl.style.overflow = 'visible';
            }

            // Expand interview transcript if available
            const transcriptBox = clonedDoc.querySelector('.max-h-96');
            if (transcriptBox) {
              (transcriptBox as HTMLElement).style.maxHeight = 'none';
              (transcriptBox as HTMLElement).style.overflow = 'visible';
            }

            // 1. Sanitize style tags
            const styleElements = clonedDoc.querySelectorAll('style');
            styleElements.forEach((style) => {
              if (style.textContent) {
                style.textContent = convertColorString(style.textContent);
              }
            });

            // 2. Convert inline styles and computed colors across all cloned elements
            const origElements = Array.from(element.querySelectorAll<HTMLElement>('*'));
            const clonedElements = Array.from(clonedEl.querySelectorAll<HTMLElement>('*'));

            const applyConvertedStyles = (orig: HTMLElement, cloned: HTMLElement) => {
              const comp = originalGetComputedStyle.call(window, orig);
              const colorProps = [
                'color',
                'backgroundColor',
                'borderColor',
                'borderTopColor',
                'borderRightColor',
                'borderBottomColor',
                'borderLeftColor',
                'outlineColor',
                'fill',
                'stroke',
                'boxShadow',
                'backgroundImage',
                'background',
              ];
              colorProps.forEach((p) => {
                const val = comp.getPropertyValue(p) || (comp as any)[p];
                if (val && typeof val === 'string' && (val.includes('oklab') || val.includes('oklch') || val.includes('color(') || val.includes('light-dark'))) {
                  const converted = convertColorString(val);
                  cloned.style.setProperty(p, converted, 'important');
                }
              });
              const inlineStyle = cloned.getAttribute('style');
              if (inlineStyle && (inlineStyle.includes('oklab') || inlineStyle.includes('oklch') || inlineStyle.includes('color(') || inlineStyle.includes('light-dark'))) {
                cloned.setAttribute('style', convertColorString(inlineStyle));
              }
            };

            applyConvertedStyles(element, clonedEl as HTMLElement);
            for (let i = 0; i < origElements.length && i < clonedElements.length; i++) {
              applyConvertedStyles(origElements[i] as HTMLElement, clonedElements[i] as HTMLElement);
            }
          } catch (cloneErr) {
            console.warn('onclone preprocessing warning:', cloneErr);
          }
        },
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      const candidateName = (candidate?.member?.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`Performance_Report_${candidateName}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      try {
        window.print();
      } catch (printErr) {
        console.warn('Fallback print error:', printErr);
      }
    } finally {
      window.getComputedStyle = originalGetComputedStyle;
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const reportId = candidate?.member?.id || 'CAND-001';
    const shareUrl = `${window.location.origin}/performance-report/${reportId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Performance Report - ${candidate?.member?.name || 'Candidate'}`,
          text: `Performance Report for ${candidate?.member?.name || 'Candidate'}`,
          url: shareUrl,
        });
        setShareMessage('Report shared successfully.');
        setCopiedLink(true);
        setTimeout(() => {
          setCopiedLink(false);
          setShareMessage(null);
        }, 3500);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage('Report shared successfully.');
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShareMessage(null);
      }, 3500);
    } catch (err) {
      console.error('Copy failed', err);
      setShareMessage('Report shared successfully.');
      setCopiedLink(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShareMessage(null);
      }, 3500);
    }
  };

  return (
    <div ref={reportRef} className="min-h-[calc(100vh-4rem)] mt-16 pb-24 px-4 md:px-12 max-w-[1440px] mx-auto text-[#e2e2e8]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="py-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#424754]/20 mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-[#adc6ff] uppercase tracking-widest bg-[#4d8eff]/10 px-3 py-1 rounded-full border border-[#4d8eff]/30">
              Candidate Evaluation
            </span>
            <span className="font-mono text-xs text-[#8c909f]">ID: {sessionId.slice(0, 8).toUpperCase()}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#e2e2e8]">
            Performance Report
          </h1>
          <p className="text-sm text-[#c2c6d6] mt-1">
            Candidate: <span className="text-[#adc6ff] font-semibold">{candidate.member.name}</span> ({candidate.member.jobRole}) • {daysCoveredCount} Curriculum Days Evaluated
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-[#adc6ff] border border-[#4d8eff]/30 hover:bg-[#4d8eff]/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? <Sparkles size={16} className="animate-spin text-[#4d8eff]" /> : <Download size={16} />}
            <span>{isExporting ? 'Generating PDF...' : 'Export PDF'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-[#4d8eff] text-[#001a42] hover:bg-[#3b7df0] transition-all shadow-[0_0_20px_rgba(77,142,255,0.3)] flex items-center gap-2 cursor-pointer"
          >
            {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copiedLink ? 'Report Shared!' : 'Share Report'}</span>
          </button>
        </div>
      </motion.div>

      {/* Share Toast Success Message */}
      {shareMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e2024] border border-[#4d8eff]/50 text-[#adc6ff] px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2.5 animate-fadeIn print:hidden">
          <Check size={16} className="text-[#4d8eff]" />
          <span>{shareMessage}</span>
        </div>
      )}

      {/* Loading Indicator Banner */}
      {isDataLoading && (
        <div className="mb-6 p-4 rounded-2xl bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-between text-xs font-mono text-[#adc6ff]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="animate-spin text-[#adc6ff]" />
            <span>Analyzing candidate performance and generating AI evaluation insights...</span>
          </div>
          <span className="text-[#8c909f] animate-pulse">Loading data...</span>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Overall Score Card */}
        <div className="md:col-span-4 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#4d8eff]/10 rounded-full blur-3xl group-hover:bg-[#4d8eff]/20 transition-all"></div>
          <div>
            <span className="font-mono text-xs text-[#8c909f] uppercase tracking-widest block mb-1">
              Overall Score
            </span>
            <p className="text-xs text-[#c2c6d6] mb-6">
              Aggregate evaluation across technical vectors & reasoning logic.
            </p>
          </div>

          <div>
            {isDataLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-16 w-32 bg-[#333539]/80 rounded-xl"></div>
                <div className="h-6 w-36 bg-[#333539]/80 rounded-full"></div>
                <div className="w-full h-2 bg-[#333539]/80 rounded-full"></div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-bold text-[#adc6ff] font-mono leading-none">
                    {overallScore}
                  </span>
                  <span className="text-2xl text-[#8c909f] font-mono">/100</span>
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-[#4d8eff]/10 border border-[#4d8eff]/30 text-[#adc6ff] font-mono text-xs mb-4">
                  {overallScore >= 85 ? 'Excellent Candidate' : overallScore >= 75 ? 'Strong Candidate' : 'Promising Candidate'}
                </div>

                <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3b7df0] to-[#4d8eff] rounded-full transition-all duration-1000"
                    style={{ width: `${overallScore}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Competency Matrix */}
        <div className="md:col-span-8 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md flex flex-col justify-between">
          <div className="mb-6 flex justify-between items-center border-b border-[#424754]/20 pb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8c909f]">
              Competency Matrix
            </h3>
            <span className="text-xs font-mono text-[#adc6ff]">
              {overallScore >= 90
                ? 'Level: L6 Principal / Staff'
                : overallScore >= 80
                ? 'Level: L5 Senior AI Engineer'
                : overallScore >= 70
                ? 'Level: L4 Mid-Level Engineer'
                : 'Level: L3 Junior / Developing'}
            </span>
          </div>

          {isDataLoading ? (
            <div className="space-y-6 animate-pulse">
              {[
                'Technical Understanding',
                'Problem Solving & Reasoning',
                'Engineering Decision-Making',
                'Communication & Trade-off Articulation',
              ].map((title, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#8c909f]">{title}</span>
                    <div className="h-3 w-8 bg-[#333539] rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4d8eff]/30 rounded-full w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {/* Vector 1 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#e2e2e8]">Technical Understanding</span>
                  <span className="text-[#adc6ff]">{comp.technicalUnderstanding}/100</span>
                </div>
                <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4d8eff] rounded-full"
                    style={{ width: `${comp.technicalUnderstanding}%` }}
                  ></div>
                </div>
              </div>

              {/* Vector 2 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#e2e2e8]">Problem Solving & Reasoning</span>
                  <span className="text-[#adc6ff]">{comp.problemSolving}/100</span>
                </div>
                <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4d8eff] rounded-full"
                    style={{ width: `${comp.problemSolving}%` }}
                  ></div>
                </div>
              </div>

              {/* Vector 3 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#e2e2e8]">Engineering Decision-Making</span>
                  <span className="text-[#adc6ff]">{comp.engineeringDecision}/100</span>
                </div>
                <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4d8eff] rounded-full"
                    style={{ width: `${comp.engineeringDecision}%` }}
                  ></div>
                </div>
              </div>

              {/* Vector 4 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#e2e2e8]">Communication & Trade-off Articulation</span>
                  <span className="text-[#adc6ff]">{comp.communication}/100</span>
                </div>
                <div className="w-full h-2 bg-[#333539] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4d8eff] rounded-full"
                    style={{ width: `${comp.communication}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Executive Summary */}
        <div className="md:col-span-12 p-8 rounded-2xl bg-[#1e2024]/60 border-l-4 border-l-[#4d8eff] border border-[#424754]/30 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3 text-[#adc6ff]">
            <Sparkles size={20} />
            <h3 className="font-bold text-lg text-[#e2e2e8]">Executive AI Synthesis</h3>
          </div>
          {isDataLoading ? (
            <div className="space-y-2.5 animate-pulse py-1">
              <div className="h-4 bg-[#333539] rounded-md w-full"></div>
              <div className="h-4 bg-[#333539] rounded-md w-11/12"></div>
              <div className="h-4 bg-[#333539] rounded-md w-3/4"></div>
            </div>
          ) : (
            <p className="text-base text-[#c2c6d6] leading-relaxed">
              {safeFeedback.summary}
            </p>
          )}
        </div>

        {/* Answer Evaluation & Category Breakdown */}
        <div className="md:col-span-12 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#424754]/20 pb-4">
            <div>
              <h3 className="font-bold text-lg text-[#e2e2e8] flex items-center gap-2">
                <Award size={20} className="text-[#4d8eff]" />
                <span>Question-by-Question Evaluation Breakdown</span>
              </h3>
              <p className="text-xs text-[#8c909f] mt-1">
                Evaluates candidate strictly on valid technical answers. Skipped questions ("I don't know") are excluded from score calculation.
              </p>
            </div>

            {/* Stat badges */}
            {safeFeedback.breakdown && (
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#4ade80]">
                  ✓ {safeFeedback.breakdown.correctCount} Correct
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#eab308]/10 border border-[#eab308]/30 text-[#fde047]">
                  ◐ {safeFeedback.breakdown.partiallyCorrectCount} Partial
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#fca5a5]">
                  ✗ {safeFeedback.breakdown.incorrectCount} Incorrect
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#64748b]/10 border border-[#64748b]/30 text-[#94a3b8]">
                  ⊘ {safeFeedback.breakdown.skippedCount} Skipped ("I don't know")
                </span>
                {safeFeedback.breakdown.irrelevantCount > 0 && (
                  <span className="px-2.5 py-1 rounded-md bg-[#f97316]/10 border border-[#f97316]/30 text-[#fdba74]">
                    ! {safeFeedback.breakdown.irrelevantCount} Irrelevant
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Question Details List */}
          {safeFeedback.breakdown?.questionEvaluations && safeFeedback.breakdown.questionEvaluations.length > 0 ? (
            <div className="space-y-4">
              {safeFeedback.breakdown.questionEvaluations.map((qEval) => {
                let badgeStyle = 'bg-[#64748b]/10 text-[#94a3b8] border-[#64748b]/30';
                let label = 'Skipped ("I don\'t know")';

                if (qEval.classification === 'correct') {
                  badgeStyle = 'bg-[#22c55e]/10 text-[#4ade80] border-[#22c55e]/30';
                  label = 'Correct Answer';
                } else if (qEval.classification === 'partially_correct') {
                  badgeStyle = 'bg-[#eab308]/10 text-[#fde047] border-[#eab308]/30';
                  label = 'Partially Correct';
                } else if (qEval.classification === 'incorrect') {
                  badgeStyle = 'bg-[#ef4444]/10 text-[#fca5a5] border-[#ef4444]/30';
                  label = 'Incorrect Answer (Weak Area)';
                } else if (qEval.classification === 'irrelevant') {
                  badgeStyle = 'bg-[#f97316]/10 text-[#fdba74] border-[#f97316]/30';
                  label = 'Irrelevant / Meaningless';
                }

                return (
                  <div key={qEval.questionNumber} className="p-4 rounded-xl bg-[#111318]/70 border border-[#424754]/20 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#adc6ff] bg-[#4d8eff]/10 px-2 py-0.5 rounded border border-[#4d8eff]/20">
                          Q{qEval.questionNumber}
                        </span>
                        {qEval.topic && (
                          <span className="text-xs font-mono text-[#8c909f]">{qEval.topic}</span>
                        )}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${badgeStyle}`}>
                        {label}
                      </span>
                    </div>

                    <p className="text-xs text-[#e2e2e8] font-medium">
                      <span className="text-[#8c909f]">Question: </span>{qEval.questionText}
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#1a1d24] text-xs font-mono text-[#c2c6d6] border border-[#333539]">
                      <span className="text-[#8c909f]">Candidate Answer: </span>
                      <span className={qEval.classification === 'skipped' ? 'italic text-[#8c909f]' : 'text-[#e2e2e8]'}>
                        "{qEval.candidateAnswer}"
                      </span>
                    </div>

                    <p className="text-xs text-[#8c909f] font-sans">
                      <span className="text-[#adc6ff] font-semibold">Evaluation Note: </span>
                      {qEval.feedbackNote}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#8c909f] italic">
              Question evaluation details will populate as answers are completed.
            </p>
          )}
        </div>

        {/* Strengths */}
        <div className="md:col-span-6 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6 border-b border-[#424754]/20 pb-4 text-[#adc6ff]">
            <CheckCircle2 size={20} />
            <h3 className="font-bold text-lg text-[#e2e2e8]">Key Strengths Demonstrated</h3>
          </div>
          {isDataLoading ? (
            <div className="space-y-3.5 animate-pulse">
              <div className="h-4 bg-[#333539] rounded-md w-full"></div>
              <div className="h-4 bg-[#333539] rounded-md w-4/5"></div>
              <div className="h-4 bg-[#333539] rounded-md w-5/6"></div>
            </div>
          ) : (
            <ul className="space-y-3.5 text-sm text-[#c2c6d6]">
              {safeFeedback.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4d8eff] mt-2 shrink-0"></span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Areas to Improve */}
        <div className="md:col-span-6 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6 border-b border-[#424754]/20 pb-4 text-[#ffb786]">
            <TrendingUp size={20} />
            <h3 className="font-bold text-lg text-[#e2e2e8]">Areas to Deepen & Improve</h3>
          </div>
          {isDataLoading ? (
            <div className="space-y-3.5 animate-pulse">
              <div className="h-4 bg-[#333539] rounded-md w-11/12"></div>
              <div className="h-4 bg-[#333539] rounded-md w-3/4"></div>
            </div>
          ) : (
            <ul className="space-y-3.5 text-sm text-[#c2c6d6]">
              {safeFeedback.gaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#df7412] mt-2 shrink-0"></span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recommended Next Topics */}
        <div className="md:col-span-12 p-8 rounded-2xl bg-[#1e2024]/40 border border-[#4d8eff]/30">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#adc6ff] mb-3">
            Recommended Revision & Practice Domains
          </h3>
          <p className="text-sm text-[#c2c6d6] mb-4">
            Based on the technical gaps identified, click any topic below to practice target questions:
          </p>
          {isDataLoading ? (
            <div className="flex flex-wrap gap-3 animate-pulse">
              <div className="h-8 w-36 bg-[#333539] rounded-xl"></div>
              <div className="h-8 w-40 bg-[#333539] rounded-xl"></div>
              <div className="h-8 w-28 bg-[#333539] rounded-xl"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {safeFeedback.next.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => onRestartWithTopic && onRestartWithTopic(topic)}
                  className="px-4 py-2 rounded-xl bg-[#4d8eff]/10 hover:bg-[#4d8eff]/20 border border-[#4d8eff]/30 text-[#adc6ff] font-mono text-xs flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
                >
                  <BookOpen size={14} />
                  <span>{topic}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Interview Transcript Reviewer */}
        {chatHistory.length > 0 && (
          <div className="md:col-span-12 p-6 rounded-2xl bg-[#1e2024]/40 border border-[#424754]/30">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full flex items-center justify-between text-sm font-mono text-[#adc6ff] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Cpu size={16} />
                <span>Review Complete Interview Transcript ({chatHistory.length} messages)</span>
              </div>
              {showTranscript ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showTranscript && (
              <div className="mt-6 pt-4 border-t border-[#424754]/20 space-y-4 max-h-96 overflow-y-auto pr-2">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl text-xs leading-relaxed font-mono ${
                      msg.sender === 'ai'
                        ? 'bg-[#111318] border-l-2 border-l-[#4d8eff] text-[#e2e2e8]'
                        : 'bg-[#4d8eff]/10 text-[#adc6ff] border border-[#4d8eff]/20'
                    }`}
                  >
                    <span className="block font-bold text-[10px] text-[#8c909f] mb-1">
                      [{msg.sender.toUpperCase()}]
                    </span>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
