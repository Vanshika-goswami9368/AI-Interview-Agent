import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Candidate } from '../types';
import { Search, Briefcase, GraduationCap, Award, CheckCircle2, ChevronRight, UserCheck, User } from 'lucide-react';

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

interface CandidateRosterProps {
  candidates: Candidate[];
  onSelectCandidateToInterview: (candidate: Candidate) => void;
}

export const CandidateRoster: React.FC<CandidateRosterProps> = ({
  candidates,
  onSelectCandidateToInterview,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(candidates[0]?.member?.id || null);

  const filtered = candidates.filter((c) => {
    const name = c?.member?.name || '';
    const jobRole = c?.member?.jobRole || '';
    const education = c?.member?.education || '';
    const query = search.toLowerCase();

    return (
      name.toLowerCase().includes(query) ||
      jobRole.toLowerCase().includes(query) ||
      education.toLowerCase().includes(query)
    );
  });

  const activeCandidate = candidates.find((c) => c?.member?.id === selectedCandidateId) || candidates[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 pb-24 px-4 md:px-12 max-w-[1440px] mx-auto text-[#e2e2e8]">
      <header className="py-8 border-b border-[#424754]/20 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#e2e2e8] mb-2"
        >
          Candidate Roster (20 Profiles)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="text-sm text-[#c2c6d6]"
        >
          Inspect actual candidate profiles, learning signals, completed missions, and skipped topics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-6 max-w-md relative"
        >
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c909f]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name, role..."
            className="w-full bg-[#1e2024] border border-[#424754]/40 rounded-xl pl-10 pr-4 py-2 text-sm text-[#e2e2e8] focus:outline-none focus:border-[#4d8eff]"
          />
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Candidate List Column */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-2">
          {filtered.map((candidate, idx) => {
            const isSelected = candidate.member.id === selectedCandidateId;
            return (
              <motion.div
                key={candidate.member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(idx * 0.03, 0.2) }}
                onClick={() => setSelectedCandidateId(candidate.member.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#4d8eff]/10 border-[#4d8eff] shadow-md'
                    : 'bg-[#1e2024]/60 hover:bg-[#282a2e] border-[#424754]/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const avatarStyle = getCandidateAvatarStyle(candidate.member.id);
                      return (
                        <div
                          aria-hidden="true"
                          className={`w-9 h-9 rounded-full ${avatarStyle.bg} ${avatarStyle.text} border ${avatarStyle.border} flex items-center justify-center shrink-0 pointer-events-none select-none`}
                        >
                          <User size={18} className="stroke-[2]" />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="font-bold text-sm text-[#e2e2e8]">{candidate.member.name}</h3>
                      <p className="text-xs text-[#adc6ff] font-mono mt-0.5">{candidate.member.jobRole}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#8c909f] bg-[#111318] px-2 py-0.5 rounded border border-[#424754]/20">
                    {candidate.member.id}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#8c909f]">
                  <span>{candidate.member.yearsExperience} yrs exp</span>
                  <span>{candidate.signals.missionsCompleted} Missions Passed</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Candidate Detailed View */}
        {activeCandidate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 p-8 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#424754]/20 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  {(() => {
                    const avatarStyle = getCandidateAvatarStyle(activeCandidate.member.id);
                    return (
                      <div
                        aria-hidden="true"
                        className={`w-14 h-14 rounded-full ${avatarStyle.bg} ${avatarStyle.text} border ${avatarStyle.border} flex items-center justify-center shrink-0 pointer-events-none select-none`}
                      >
                        <User size={26} className="stroke-[2]" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold text-[#e2e2e8]">{activeCandidate.member.name}</h2>
                    <p className="text-sm text-[#adc6ff] font-mono">{activeCandidate.member.jobRole}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCandidateToInterview(activeCandidate)}
                  className="px-5 py-2.5 rounded-xl bg-[#4d8eff] hover:bg-[#3b7df0] text-[#001a42] font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(77,142,255,0.3)] cursor-pointer"
                >
                  <UserCheck size={16} />
                  <span>Start Interview</span>
                </button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-6">
                <div className="p-3 rounded-xl bg-[#111318]/60 border border-[#424754]/20">
                  <span className="text-[#8c909f] block mb-1">EXPERIENCE & EDUCATION</span>
                  <p className="text-[#e2e2e8] font-semibold">{activeCandidate.member.yearsExperience} Years Experience</p>
                  <p className="text-[#c2c6d6] text-[11px] mt-0.5">{activeCandidate.member.education}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#111318]/60 border border-[#424754]/20">
                  <span className="text-[#8c909f] block mb-1">LEARNING SIGNALS</span>
                  <p className="text-[#adc6ff] font-semibold">{activeCandidate.signals.commitDays} Commit Days</p>
                  <p className="text-[#adc6ff] text-[11px] mt-0.5">{activeCandidate.signals.missionsFirstTry} Missions Passed 1st Try</p>
                </div>
              </div>

              {/* Complete Missions Breakdown */}
              <div>
                <h3 className="font-mono text-xs uppercase text-[#8c909f] tracking-wider mb-3">
                  Completed Missions & Days ({activeCandidate.missions.length})
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {activeCandidate.missions.map((m) => (
                    <div
                      key={m.day}
                      className={`p-3 rounded-xl flex items-center justify-between text-xs font-mono border ${
                        m.passed
                          ? 'bg-[#111318]/40 border-[#4d8eff]/20 text-[#e2e2e8]'
                          : m.skipped
                          ? 'bg-[#df7412]/10 border-[#df7412]/30 text-[#ffb786]'
                          : 'bg-[#ff5449]/10 border-[#ff5449]/30 text-[#ffb4ab]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#adc6ff] font-bold">Day {m.day}:</span>
                        <span>{m.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {m.passed && <span className="text-[#8c909f]">Attempts: {m.attempts || 1}</span>}
                        {m.passed ? (
                          <span className="px-2 py-0.5 rounded bg-[#4d8eff]/20 text-[#adc6ff] text-[10px]">PASSED</span>
                        ) : m.skipped ? (
                          <span className="px-2 py-0.5 rounded bg-[#df7412]/20 text-[#ffb786] text-[10px]">SKIPPED</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-[#ff5449]/20 text-[#ffb4ab] text-[10px]">FAILED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
