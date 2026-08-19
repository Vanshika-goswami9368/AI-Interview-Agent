import React from 'react';
import { Cpu, Group, LineChart, BookOpen, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  candidateName?: string;
  questionsAsked?: number;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  candidateName,
  questionsAsked,
  onBack,
  showBack,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#111318]/90 backdrop-blur-md border-b border-[#424754]/20 print:hidden">
      <div className="flex justify-between items-center px-4 md:px-12 h-16 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-[#1e2024] hover:bg-[#282a2e] text-[#adc6ff] transition-colors flex items-center justify-center mr-1"
              title="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div
            onClick={() => onSelectTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] group-hover:border-[#4d8eff] transition-all">
              <Cpu size={20} className="text-[#adc6ff]" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-[#e2e2e8] tracking-wider block leading-none font-sans">
                PROBE
              </span>
              {candidateName && (
                <span className="text-xs text-[#adc6ff] font-mono mt-0.5 block">
                  Active: {candidateName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1e2024]/60 p-1 rounded-full border border-[#424754]/30">
          <button
            onClick={() => onSelectTab('interview')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
              currentTab === 'interview' || currentTab === 'selection'
                ? 'bg-[#4d8eff] text-[#001a42] font-semibold shadow-sm'
                : 'text-[#c2c6d6] hover:text-[#e2e2e8] hover:bg-[#333539]/50'
            }`}
          >
            <Cpu size={14} />
            <span>Interview{questionsAsked && questionsAsked > 0 ? ` (${questionsAsked}/8)` : ''}</span>
          </button>

          <button
            onClick={() => onSelectTab('candidates')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
              currentTab === 'candidates'
                ? 'bg-[#4d8eff] text-[#001a42] font-semibold shadow-sm'
                : 'text-[#c2c6d6] hover:text-[#e2e2e8] hover:bg-[#333539]/50'
            }`}
          >
            <Group size={14} />
            <span>Candidates{candidateName ? ` (${candidateName.split(' ')[0]})` : ''}</span>
          </button>

          <button
            onClick={() => onSelectTab('insights')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
              currentTab === 'insights' || currentTab === 'report'
                ? 'bg-[#4d8eff] text-[#001a42] font-semibold shadow-sm'
                : 'text-[#c2c6d6] hover:text-[#e2e2e8] hover:bg-[#333539]/50'
            }`}
          >
            <LineChart size={14} />
            <span>Reports & Insights</span>
          </button>

          <button
            onClick={() => onSelectTab('curriculum')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
              currentTab === 'curriculum'
                ? 'bg-[#4d8eff] text-[#001a42] font-semibold shadow-sm'
                : 'text-[#c2c6d6] hover:text-[#e2e2e8] hover:bg-[#333539]/50'
            }`}
          >
            <BookOpen size={14} />
            <span>Curriculum</span>
          </button>
        </nav>


      </div>
    </header>
  );
};
