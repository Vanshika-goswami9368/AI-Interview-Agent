import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import homeHeroBg from '../assets/images/home_bg_cyborg_1786166482166.jpg';

interface LandingPageProps {
  onStartInterview: () => void;
  onViewCandidates: () => void;
  onViewCurriculum: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartInterview,
  onViewCandidates,
  onViewCurriculum,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] mt-16 flex flex-col justify-between overflow-hidden bg-[#111318] text-[#e2e2e8]">
      {/* Background Hologram Graphic & Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[#111318]">
        <img
          src={homeHeroBg}
          alt="AI Hologram Interface"
          className="w-full h-full object-cover object-center opacity-75 brightness-[0.75] saturate-[0.7]"
          referrerPolicy="no-referrer"
        />
        {/* Dark subtle vignette overlays to ensure background visibility & high contrast text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111318]/60 via-[#111318]/40 to-[#111318]/90"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-[#111318]/30 to-[#111318]/80"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-8 pb-12 flex flex-col justify-between flex-grow">
        {/* Centered Hero Content */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center pt-8 md:pt-14 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white mb-4 leading-none drop-shadow-lg font-sans"
          >
            PROBE
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-[#adc6ff] mb-4 leading-snug drop-shadow-sm"
          >
            Think deeper. Answer smarter. Grow stronger.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="text-sm md:text-base text-[#c2c6d6] max-w-2xl mb-8 leading-relaxed"
          >
            Experience personalized AI technical interviews that adapt to what you’ve learned throughout the cohort.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <button
              onClick={onStartInterview}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4d8eff] hover:bg-[#3b7df0] text-[#001a42] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(77,142,255,0.35)] hover:shadow-[0_0_35px_rgba(77,142,255,0.55)] active:scale-98 group cursor-pointer"
            >
              <span>Start Interview</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onViewCandidates}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#181a20]/80 hover:bg-[#282a2e] border border-[#424754]/50 text-[#e2e2e8] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
            >
              <span>Browse 20 Candidates</span>
            </button>
          </motion.div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="p-5 rounded-2xl bg-[#181a20]/75 border border-[#424754]/30 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] mb-3">
              <Zap size={18} />
            </div>
            <h3 className="font-semibold text-sm text-[#e2e2e8] mb-1">AI-Powered Interviews</h3>
            <p className="text-xs text-[#c2c6d6] leading-normal">
              Dynamic, multi-turn interviews adapted in real-time based on candidate responses and behavior.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="p-5 rounded-2xl bg-[#181a20]/75 border border-[#424754]/30 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] mb-3">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="font-semibold text-sm text-[#e2e2e8] mb-1">Curriculum-Aligned</h3>
            <p className="text-xs text-[#c2c6d6] leading-normal">
              Questions mapped to real curriculum topics and learning objectives across 31 days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="p-5 rounded-2xl bg-[#181a20]/75 border border-[#424754]/30 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4d8eff]/10 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff] mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-semibold text-sm text-[#e2e2e8] mb-1">Detailed Insights</h3>
            <p className="text-xs text-[#c2c6d6] leading-normal">
              Get comprehensive reports with performance metrics across key technical competencies.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

