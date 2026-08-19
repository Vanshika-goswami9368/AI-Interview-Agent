import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Curriculum } from '../types';
import { BookOpen, Calendar, Wrench, Target, ChevronRight } from 'lucide-react';

interface CurriculumBrowserProps {
  curriculum: Curriculum;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({ curriculum }) => {
  const [selectedModule, setSelectedModule] = useState<number>(1);

  const activeModuleObj = curriculum.modules.find((m) => m.n === selectedModule) || curriculum.modules[0];
  const activeDays = curriculum.days.filter((d) => activeModuleObj.days.includes(d.day));

  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 pb-24 px-4 md:px-12 max-w-[1440px] mx-auto text-[#e2e2e8]">
      <header className="py-8 border-b border-[#424754]/20 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4d8eff]/10 border border-[#4d8eff]/30 text-[#adc6ff] font-mono text-xs uppercase tracking-widest mb-3"
        >
          <BookOpen size={14} />
          <span>{curriculum.cohort}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#e2e2e8]"
        >
          Curriculum Specification
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="text-sm text-[#c2c6d6] mt-2 max-w-2xl"
        >
          The exact 31-day curriculum specification used as the ground truth for evaluating technical proficiency, tool knowledge, and architecture trade-offs.
        </motion.p>
      </header>

      {/* Module Selector Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-8"
      >
        {curriculum.modules.map((mod) => (
          <button
            key={mod.n}
            onClick={() => setSelectedModule(mod.n)}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all whitespace-nowrap cursor-pointer ${
              selectedModule === mod.n
                ? 'bg-[#4d8eff] text-[#001a42] font-semibold shadow-[0_0_15px_rgba(77,142,255,0.3)]'
                : 'bg-[#1e2024] text-[#c2c6d6] border border-[#424754]/30 hover:border-[#adc6ff]/40'
            }`}
          >
            <span>Module {mod.n}: {mod.title}</span>
          </button>
        ))}
      </motion.div>

      {/* Days Grid for Active Module */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeDays.map((day, idx) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(idx * 0.05, 0.3) }}
            className="p-6 rounded-2xl bg-[#1e2024]/60 border border-[#424754]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-bold text-[#4d8eff] bg-[#4d8eff]/10 px-2.5 py-1 rounded-md border border-[#4d8eff]/20">
                  DAY {day.day}
                </span>
                <span className="font-mono text-[10px] text-[#adc6ff] bg-[#4d8eff]/10 px-2.5 py-1 rounded-md border border-[#4d8eff]/20 uppercase">
                  {day.type}
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#e2e2e8] mb-4">{day.title}</h3>

              {/* Tools Used */}
              <div className="mb-4">
                <span className="block text-[10px] font-mono text-[#8c909f] uppercase mb-1.5 flex items-center gap-1">
                  <Wrench size={12} />
                  <span>Tools & Stack</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {day.tools.map((t, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded bg-[#111318] border border-[#424754]/30 text-[#adc6ff] font-mono text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div>
                <span className="block text-[10px] font-mono text-[#8c909f] uppercase mb-1.5 flex items-center gap-1">
                  <Target size={12} />
                  <span>Learning Objectives</span>
                </span>
                <ul className="space-y-1.5 text-xs text-[#c2c6d6]">
                  {day.objectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#4d8eff] mt-1.5 shrink-0"></span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
