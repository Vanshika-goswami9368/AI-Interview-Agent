import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Candidate, ChatMessage, Curriculum } from '../types';
import {
  Send,
  Code,
  Bold,
  Cpu,
  Lock,
  CheckCircle2,
  ListFilter,
  BarChart3,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Award,
  User,
} from 'lucide-react';

const getCandidateAvatarStyle = (candidateId: string) => {
  const styles = [
    { bg: 'bg-[#4d8eff]/15', text: 'text-[#adc6ff]', border: 'border-[#4d8eff]/30' },
    { bg: 'bg-[#a855f7]/15', text: 'text-[#d8b4fe]', border: 'border-[#a855f7]/30' },
    { bg: 'bg-[#10b981]/15', text: 'text-[#6ee7b7]', border: 'border-[#10b981]/30' },
    { bg: 'bg-[#f59e0b]/15', text: 'text-[#fcd34d]', border: 'border-[#f59e0b]/30' },
    { bg: 'bg-[#06b6d4]/15', text: 'text-[#67e8f9]', border: 'border-[#06b6d4]/30' },
    { bg: 'bg-[#ec4899]/15', text: 'text-[#fbcfe8]', border: 'border-[#ec4899]/30' },
  ];
  let sum = 0;
  for (let i = 0; i < candidateId.length; i++) {
    sum += candidateId.charCodeAt(i);
  }
  return styles[sum % styles.length];
};

interface InterviewScreenProps {
  candidate: Candidate;
  sessionId: string;
  chatHistory: ChatMessage[];
  curriculum: Curriculum;
  daysCovered: number[];
  topicsCovered: string[];
  questionsAsked: number;
  onSendMessage: (text: string) => Promise<void>;
  onEndInterview: () => Promise<void>;
  isGenerating: boolean;
}

export const InterviewScreen: React.FC<InterviewScreenProps> = ({
  candidate,
  sessionId,
  chatHistory,
  curriculum,
  daysCovered,
  topicsCovered,
  questionsAsked,
  onSendMessage,
  onEndInterview,
  isGenerating,
}) => {
  const [inputText, setInputText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat history
  useEffect(() => {
    const timer = setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
    return () => clearTimeout(timer);
  }, [chatHistory, isGenerating]);

  const isSendingRef = useRef(false);

  const handleSend = async () => {
    if (!inputText.trim() || isGenerating || isSendingRef.current) return;
    isSendingRef.current = true;
    const text = inputText;
    setInputText('');
    try {
      await onSendMessage(text);
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertCodeSnippet = () => {
    setInputText((prev) => prev + '\n```python\n# Write snippet here\n```\n');
  };

  const insertBold = () => {
    setInputText((prev) => prev + '**bold text**');
  };

  const canFinishEarly = questionsAsked >= 8;
  const latestAiMsg = [...chatHistory].reverse().find((m) => m.sender === 'ai');
  const currentTopic = latestAiMsg?.topic || (topicsCovered.length > 0 ? topicsCovered[topicsCovered.length - 1] : 'Technical Foundations');
  const currentDay = latestAiMsg?.curriculumDay;

  return (
    <div className="h-[calc(100vh-4rem)] mt-16 flex w-full max-w-[1440px] mx-auto overflow-hidden text-[#e2e2e8] relative">
      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed md:relative top-16 md:top-0 left-0 bottom-0 z-40 w-72 bg-[#1e2024] border-r border-[#424754]/20 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Candidate Summary */}
        <div className="p-3.5 rounded-xl bg-[#111318] border border-[#424754]/30 mb-6 flex items-center gap-3">
          {(() => {
            const avatarStyle = getCandidateAvatarStyle(candidate.member.id);
            return (
              <div
                aria-hidden="true"
                className={`w-10 h-10 rounded-full ${avatarStyle.bg} ${avatarStyle.text} border ${avatarStyle.border} flex items-center justify-center shrink-0 pointer-events-none select-none`}
              >
                <User size={20} className="stroke-[2]" />
              </div>
            );
          })()}
          <div>
            <span className="text-[10px] font-mono text-[#adc6ff] uppercase tracking-wider block mb-0.5">
              Active Candidate
            </span>
            <h2 className="font-bold text-sm text-[#e2e2e8] leading-snug">{candidate.member.name}</h2>
            <span className="text-xs text-[#c2c6d6] block">{candidate.member.jobRole}</span>
            <span className="text-[10px] font-mono text-[#8c909f] block mt-0.5">
              SESSION: {sessionId.slice(0, 10)}
            </span>
          </div>
        </div>

        {/* Progress Tracker Widget */}
        <div className="mb-6 p-3 rounded-xl bg-[#111318]/60 border border-[#424754]/20 font-mono text-xs">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[#8c909f]">QUESTIONS</span>
            <span className="text-[#adc6ff] font-bold">{questionsAsked} / 8</span>
          </div>
          <div className="w-full h-1.5 bg-[#333539] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#3b7df0] to-[#4d8eff] transition-all duration-500"
              style={{ width: `${Math.min(100, (questionsAsked / 8) * 100)}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[#8c909f]">DAYS COVERED</span>
            <span className="text-[#adc6ff] font-bold">{daysCovered.length} / 4+</span>
          </div>
          <div className="w-full h-1.5 bg-[#333539] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#4d8eff] to-[#80b3ff] transition-all duration-500"
              style={{ width: `${Math.min(100, (daysCovered.length / 4) * 100)}%` }}
            ></div>
          </div>

          {/* Current Active Topic & Conversation Context */}
          <div className="pt-2.5 border-t border-[#424754]/20">
            <div className="flex justify-between items-center text-[10px] text-[#8c909f] mb-1">
              <span>ACTIVE TOPIC</span>
              {currentDay && <span className="text-[#adc6ff]">DAY {currentDay}</span>}
            </div>
            <div className="text-[11px] text-[#adc6ff] font-semibold truncate flex items-center gap-1.5 bg-[#1e2024] px-2 py-1 rounded border border-[#424754]/30">
              <Sparkles size={11} className="text-[#4d8eff] shrink-0" />
              <span className="truncate">{currentTopic}</span>
            </div>

            {topicsCovered.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {topicsCovered.slice(-3).map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-[#4d8eff]/10 border border-[#4d8eff]/20 text-[#adc6ff] truncate max-w-[130px]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Curriculum Progress List */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h3 className="text-xs font-mono uppercase text-[#8c909f] tracking-wider mb-3">
            Curriculum Checklist
          </h3>
          <ul className="space-y-2 font-mono text-xs">
            {curriculum.modules.map((module) => {
              const moduleDays = curriculum.days.filter((d) => module.days.includes(d.day));
              const coveredInModule = moduleDays.filter((d) => daysCovered.includes(d.day));

              return (
                <li key={module.n} className="p-2.5 rounded-lg bg-[#111318]/40 border border-[#424754]/20">
                  <div className="flex justify-between items-center text-[#adc6ff] font-semibold mb-1">
                    <span>
                      M{module.n}: {module.title}
                    </span>
                    <span className="text-[10px] text-[#8c909f]">
                      {coveredInModule.length}/{moduleDays.length}
                    </span>
                  </div>
                  <div className="space-y-1 pl-1">
                    {moduleDays.map((d) => {
                      const isCovered = daysCovered.includes(d.day);
                      return (
                        <div
                          key={d.day}
                          className={`flex items-center justify-between text-[11px] py-0.5 ${
                            isCovered ? 'text-[#adc6ff]' : 'text-[#8c909f]'
                          }`}
                        >
                          <span className="truncate">
                            D{d.day}: {d.title}
                          </span>
                          {isCovered ? (
                            <CheckCircle2 size={12} className="text-[#4d8eff] shrink-0" />
                          ) : (
                            <Lock size={10} className="text-[#8c909f] shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* End Interview Quick Button */}
        <div className="pt-4 border-t border-[#424754]/30 mt-auto">
          <button
            onClick={onEndInterview}
            className="w-full py-2.5 px-3 rounded-xl bg-[#4d8eff]/10 hover:bg-[#4d8eff]/20 border border-[#4d8eff]/30 text-[#adc6ff] font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Award size={14} />
            <span>Generate Final Report</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-h-0 relative bg-[#0a0c10] overflow-hidden">
        {/* Top Floating Bar for Mobile & Quick Controls */}
        <div className="shrink-0 px-4 py-3 bg-[#111318]/90 border-b border-[#424754]/20 flex justify-between items-center z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-[#1e2024] text-[#adc6ff]"
          >
            <ListFilter size={18} />
          </button>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-[#8c909f] hidden sm:inline">PROGRESS:</span>
            <span className="text-[#adc6ff] bg-[#1e2024] px-2.5 py-1 rounded-full border border-[#424754]/30">
              Q{questionsAsked} / 8
            </span>
            <span className="text-[#adc6ff] bg-[#1e2024] px-2.5 py-1 rounded-full border border-[#424754]/30">
              {daysCovered.length} Days Covered
            </span>
          </div>

          <button
            onClick={onEndInterview}
            className="px-3 py-1.5 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 text-[#adc6ff] hover:bg-[#4d8eff]/20 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Finish</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-8">
          {/* System Badge */}
          <div className="flex justify-center my-2">
            <span className="text-[11px] font-mono text-[#8c909f] bg-[#1e2024] px-3.5 py-1 rounded-full border border-[#424754]/30 shadow-sm">
              Session Started • System Initialized • Candidate: {candidate.member.name}
            </span>
          </div>

          {/* Chat Messages */}
          {chatHistory.map((msg) => {
            if (msg.sender === 'ai') {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex gap-3 max-w-3xl w-full"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] shrink-0 mt-1">
                    <Cpu size={18} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-[#1e2024]/80 border-l-2 border-l-[#4d8eff] border border-[#424754]/20 text-sm md:text-base leading-relaxed shadow-md text-[#e2e2e8] whitespace-pre-wrap">
                    <div className="text-[11px] font-mono text-[#adc6ff] font-semibold mb-1 flex items-center gap-1.5">
                      <span>AI Interviewer</span>
                    </div>
                    {msg.text}
                    {msg.topic && (
                      <div className="mt-3 pt-2 border-t border-[#424754]/20 flex items-center gap-2 text-[10px] font-mono text-[#adc6ff]">
                        <Sparkles size={11} />
                        <span>Topic: {msg.topic}</span>
                        {msg.curriculumDay && <span>(Day {msg.curriculumDay})</span>}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex justify-end w-full"
                >
                  <div className="max-w-2xl p-4 rounded-2xl rounded-tr-sm bg-[#4d8eff]/15 border border-[#4d8eff]/30 text-sm md:text-base text-[#e2e2e8] shadow-sm whitespace-pre-wrap">
                    <div className="text-[11px] font-mono text-[#adc6ff] font-semibold mb-1 text-right">
                      Candidate ({candidate.member.name})
                    </div>
                    {msg.text}
                  </div>
                </motion.div>
              );
            }
          })}

          {/* AI Thinking Indicator */}
          {isGenerating && (
            <div className="flex gap-3 max-w-3xl w-full animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] shrink-0 mt-1">
                <Cpu size={18} />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-sm bg-[#1e2024]/80 border-l-2 border-l-[#4d8eff] border border-[#424754]/20 text-xs font-mono text-[#adc6ff] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4d8eff] animate-ping"></div>
                <span>AI Interviewer is evaluating response and formulating next question...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Fixed Bottom Input Glass Panel */}
        <div className="shrink-0 p-4 md:p-6 bg-[#0a0c10] border-t border-[#424754]/30 z-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1e2024]/80 backdrop-blur-xl border border-[#424754]/40 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#4d8eff] transition-all shadow-2xl">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your candidate answer here... (Markdown & Code supported)"
                rows={2}
                className="w-full bg-transparent border-none text-[#e2e2e8] p-4 text-sm font-mono resize-none focus:outline-none placeholder-[#8c909f]"
              />

              <div className="flex justify-between items-center px-4 py-2 border-t border-[#424754]/20 bg-[#111318]/40">
                <div className="flex items-center gap-2">
                  <button
                    onClick={insertCodeSnippet}
                    type="button"
                    className="p-1.5 rounded text-[#8c909f] hover:text-[#adc6ff] hover:bg-[#333539] transition-colors"
                    title="Insert Code Snippet"
                  >
                    <Code size={16} />
                  </button>
                  <button
                    onClick={insertBold}
                    type="button"
                    className="p-1.5 rounded text-[#8c909f] hover:text-[#adc6ff] hover:bg-[#333539] transition-colors"
                    title="Bold Text"
                  >
                    <Bold size={16} />
                  </button>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isGenerating}
                  className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-all ${
                    inputText.trim() && !isGenerating
                      ? 'bg-[#4d8eff] text-[#001a42] hover:bg-[#3b7df0] shadow-[0_0_15px_rgba(77,142,255,0.3)] cursor-pointer active:scale-95'
                      : 'bg-[#333539] text-[#8c909f] cursor-not-allowed'
                  }`}
                >
                  <span>Send</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] font-mono text-[#8c909f]">
                Press Enter to send, Shift+Enter for new line
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
