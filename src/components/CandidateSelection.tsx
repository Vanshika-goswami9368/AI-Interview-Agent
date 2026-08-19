import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Candidate } from '../types';
import { Search, CheckCircle2, ArrowRight, UserCheck, Award, Briefcase, GraduationCap, User } from 'lucide-react';

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

interface CandidateSelectionProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  selectedCandidate: Candidate | null;
  onBeginInterview: () => void;
  isLoading?: boolean;
}

export const CandidateSelection: React.FC<CandidateSelectionProps> = ({
  candidates,
  onSelectCandidate,
  selectedCandidate,
  onBeginInterview,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const name = c?.member?.name || '';
    const jobRole = c?.member?.jobRole || '';
    const education = c?.member?.education || '';

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      education.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'ALL' ||
      (roleFilter === 'ENGINEER' && (jobRole.includes('Engineer') || jobRole.includes('Developer'))) ||
      (roleFilter === 'LEAD' && (jobRole.includes('Senior') || jobRole.includes('Principal') || jobRole.includes('Distinguished'))) ||
      (roleFilter === 'NON_TECH' && !jobRole.includes('Engineer') && !jobRole.includes('Developer'));

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 pb-32 px-4 md:px-12 max-w-[1440px] mx-auto text-[#e2e2e8]">
      {/* Header Section */}
      <header className="py-8 border-b border-[#424754]/20 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#e2e2e8] mb-3"
        >
          Select Candidate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="text-sm md:text-base text-[#c2c6d6] max-w-2xl leading-relaxed"
        >
          Review candidate profiles and select a candidate to initiate the personalized technical screening process. Multiple selections are currently disabled.
        </motion.p>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c909f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, education..."
              className="w-full bg-[#1e2024] border border-[#424754]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#e2e2e8] placeholder-[#8c909f] focus:outline-none focus:border-[#4d8eff]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'ENGINEER', 'LEAD', 'NON_TECH'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  roleFilter === role
                    ? 'bg-[#4d8eff] text-[#001a42] font-semibold'
                    : 'bg-[#1e2024] text-[#c2c6d6] border border-[#424754]/30 hover:border-[#adc6ff]/50'
                }`}
              >
                {role === 'ALL' ? 'All Candidates' : role === 'ENGINEER' ? 'Engineers' : role === 'LEAD' ? 'Senior / Leads' : 'Other Roles'}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate, idx) => {
          const isSelected = selectedCandidate?.member.id === candidate.member.id;
          const passedMissions = candidate.missions.filter((m) => m.passed);
          const skippedMissions = candidate.missions.filter((m) => m.skipped);

          return (
            <motion.div
              key={candidate.member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(idx * 0.04, 0.25) }}
              onClick={() => onSelectCandidate(candidate)}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#4d8eff]/10 to-[#1e2024] border-[#4d8eff] shadow-[0_0_30px_rgba(77,142,255,0.15)] ring-1 ring-[#4d8eff]'
                  : 'bg-[#1e2024]/60 hover:bg-[#282a2e]/80 border-[#424754]/30 hover:border-[#adc6ff]/40 shadow-sm'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const avatarStyle = getCandidateAvatarStyle(candidate.member.id);
                      return (
                        <div
                          aria-hidden="true"
                          className={`w-11 h-11 rounded-full ${avatarStyle.bg} ${avatarStyle.text} border ${avatarStyle.border} flex items-center justify-center shrink-0 pointer-events-none select-none`}
                        >
                          <User size={20} className="stroke-[2]" />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="font-bold text-lg text-[#e2e2e8] leading-snug">
                        {candidate.member.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#adc6ff] font-mono mt-0.5">
                        <Briefcase size={12} />
                        <span>{candidate.member.jobRole}</span>
                        <span>•</span>
                        <span>{candidate.member.yearsExperience} yrs exp</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#4d8eff] text-[#001a42]'
                        : 'border border-[#424754] text-transparent'
                    }`}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                </div>

                {/* Education & Status */}
                <div className="flex items-center gap-2 text-xs text-[#c2c6d6] mb-4">
                  <GraduationCap size={13} className="text-[#8c909f]" />
                  <span>{candidate.member.education}</span>
                </div>

                {/* Signals / Stats */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#111318]/60 border border-[#424754]/20 font-mono text-center text-xs mb-4">
                  <div>
                    <span className="block text-[#8c909f] text-[10px]">COMMITS</span>
                    <span className="font-semibold text-[#e2e2e8]">{candidate.signals.commitDays}d</span>
                  </div>
                  <div>
                    <span className="block text-[#8c909f] text-[10px]">PASSED</span>
                    <span className="font-semibold text-[#adc6ff]">{passedMissions.length}</span>
                  </div>
                  <div>
                    <span className="block text-[#8c909f] text-[10px]">1st TRY</span>
                    <span className="font-semibold text-[#adc6ff]">{candidate.signals.missionsFirstTry}</span>
                  </div>
                </div>

                {/* Key Missions Completed */}
                <div className="mb-4">
                  <span className="block text-[10px] font-mono uppercase text-[#8c909f] mb-1.5">
                    Completed Topics
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {passedMissions.slice(0, 4).map((m) => (
                      <span
                        key={m.day}
                        className="px-2 py-0.5 rounded bg-[#4d8eff]/10 border border-[#4d8eff]/20 text-[#adc6ff] font-mono text-[11px]"
                      >
                        D{m.day}: {m.title}
                      </span>
                    ))}
                    {passedMissions.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-[#333539] text-[#8c909f] font-mono text-[11px]">
                        +{passedMissions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Skipped Topics if any */}
                {skippedMissions.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-[#ffb786] mb-1">
                      Skipped Topics ({skippedMissions.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {skippedMissions.map((m) => (
                        <span
                          key={m.day}
                          className="px-2 py-0.5 rounded bg-[#df7412]/10 border border-[#df7412]/20 text-[#ffb786] font-mono text-[10px]"
                        >
                          Day {m.day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selection Footnote */}
              <div className="mt-4 pt-3 border-t border-[#424754]/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8c909f]">ID: {candidate.member.id}</span>
                <span className={isSelected ? 'text-[#adc6ff] font-semibold' : 'text-[#8c909f]'}>
                  {isSelected ? 'Ready for Interview' : 'Click to Select'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 md:px-12 bg-gradient-to-t from-[#111318] via-[#111318]/95 to-transparent">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between bg-[#1e2024]/90 backdrop-blur-xl border border-[#424754]/40 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff]">
              <UserCheck size={20} />
            </div>
            <div>
              <span className="block text-xs font-mono text-[#8c909f]">SELECTED CANDIDATE</span>
              <span className="block font-semibold text-sm text-[#e2e2e8]">
                {selectedCandidate ? `${selectedCandidate.member.name} (${selectedCandidate.member.jobRole})` : 'None Selected'}
              </span>
            </div>
          </div>

          <button
            onClick={onBeginInterview}
            disabled={!selectedCandidate || isLoading}
            className={`px-8 py-3.5 rounded-xl font-mono text-sm tracking-wider uppercase flex items-center gap-2 transition-all ${
              selectedCandidate && !isLoading
                ? 'bg-[#4d8eff] hover:bg-[#3b7df0] text-[#001a42] font-semibold shadow-[0_0_20px_rgba(77,142,255,0.4)] cursor-pointer active:scale-98'
                : 'bg-[#333539] text-[#8c909f] cursor-not-allowed border border-[#424754]/30'
            }`}
          >
            {isLoading ? (
              <span>Initializing...</span>
            ) : (
              <>
                <span>Begin Interview</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
