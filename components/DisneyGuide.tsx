
import React from 'react';
import { DisneyStrategy } from '../types';

interface DisneyGuideProps {
  strategy: DisneyStrategy;
}

const DisneyGuide: React.FC<DisneyGuideProps> = ({ strategy }) => {
  return (
    <div className="p-8 pb-32 luxury-fade-in">
      <header className="mb-14 text-center">
        <h2 className="text-xl font-serif font-black text-[#2A2621] tracking-widest uppercase">Tokyo Disneyland</h2>
        <div className="flex items-center justify-center gap-4 mt-4">
           <div className="h-[1px] w-6 bg-[#C5A373]/30"></div>
           <p className="text-[#C5A373] text-[9px] uppercase tracking-[0.4em] font-medium italic">Believe in Magic</p>
           <div className="h-[1px] w-6 bg-[#C5A373]/30"></div>
        </div>
      </header>

      <div className="space-y-8">
        {/* 入園動線 - 城堡粉感或純淨金 */}
        <section className="bg-white border-2 border-[#C5A373]/20 p-9 rounded-[48px] shadow-sm relative overflow-hidden luxury-card">
          <div className="absolute top-0 right-0 p-8 opacity-5 grayscale pointer-events-none">
            <span className="text-8xl">🏰</span>
          </div>
          <h3 className="font-serif font-bold text-lg mb-8 flex items-center gap-3 text-[#2A2621] tracking-widest">
            <span>✨</span> 夢幻入園攻略
          </h3>
          <div className="space-y-6">
            {strategy.earlyEntry.map((step, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="flex flex-col items-center">
                   <div className="w-6 h-6 rounded-full bg-[#C5A373]/10 border border-[#C5A373]/30 flex items-center justify-center text-[10px] font-black text-[#C5A373]">{idx + 1}</div>
                   {idx < strategy.earlyEntry.length - 1 && <div className="w-[1px] h-8 bg-[#C5A373]/10 my-2"></div>}
                </div>
                <p className="text-[13px] font-light leading-relaxed text-[#2A2621]/70">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 優先順序 */}
        <section className="bg-[#2A2621] text-white p-9 rounded-[48px] shadow-2xl border border-[#C5A373]/30">
          <h3 className="text-[10px] font-bold text-[#C5A373] uppercase tracking-[0.4em] mb-8 text-center">設施優先序 / Priority</h3>
          <div className="space-y-4">
            {strategy.priorityOrder.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#C5A373]/40 transition-all">
                <div className="flex items-center gap-5">
                  <span className="text-[11px] font-serif font-black text-[#C5A373]">DPA.{idx + 1}</span>
                  <span className="font-serif font-bold text-white text-sm tracking-wide">{item}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#C5A373]/40 shadow-[0_0_10px_rgba(197,163,115,0.5)]"></div>
              </div>
            ))}
          </div>
        </section>

        {/* 邏輯卡片 */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-[#F2EDE0]/30 border border-[#C5A373]/20 p-8 rounded-[40px] luxury-card">
            <h4 className="text-[9px] font-bold text-[#C5A373] mb-4 uppercase tracking-[0.4em]">營運邏輯與建議</h4>
            <p className="text-[13px] text-[#2A2621]/80 leading-relaxed font-light">{strategy.crowdLogic}</p>
          </div>
          <div className="bg-white border border-[#C5A373]/10 p-8 rounded-[40px] luxury-card">
            <h4 className="text-[9px] font-bold text-[#C5A373] mb-4 uppercase tracking-[0.4em]">動線注意事項</h4>
            <p className="text-[13px] text-[#2A2621]/60 leading-relaxed font-light italic">{strategy.warningArea}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisneyGuide;
