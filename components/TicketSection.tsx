
import React, { useState } from 'react';
import { AccommodationInfo, TicketInfo } from '../types';

interface TicketSectionProps {
  hotel: AccommodationInfo;
  tickets: TicketInfo[];
}

const TicketSection: React.FC<TicketSectionProps> = ({ hotel, tickets }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="p-8 pb-32">
      <header className="mb-14 text-center">
        <h2 className="text-xl font-serif font-black text-[#2A2621] tracking-widest">WALLET</h2>
        <p className="text-[#C5A373] text-[9px] uppercase tracking-[0.4em] font-medium mt-2">Credentials & Logistics</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A373]/40 px-1 text-center">Accommodation</h3>
        <div 
          onClick={() => setSelectedId('hotel')}
          className="bg-white p-9 rounded-[40px] border border-[#C5A373]/10 luxury-card cursor-pointer group"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xl text-[#2A2621]">{hotel.name}</h4>
              <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-widest">Check-in: {hotel.checkIn}</p>
            </div>
            <span className="text-[#C5A373]/30 group-hover:text-[#C5A373] transition-colors font-serif text-2xl italic">Detail</span>
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A373]/40 px-1 text-center">Passes & Bookings</h3>
        {tickets.map(tk => (
          <div 
            key={tk.id}
            onClick={() => setSelectedId(tk.id)}
            className="bg-[#2A2621] text-white p-9 rounded-[44px] shadow-2xl cursor-pointer flex justify-between items-center group relative overflow-hidden border border-[#C5A373]/20"
          >
            <div className="relative z-10 space-y-2">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#C5A373] mb-1">{tk.type}</p>
              <h4 className="font-serif font-bold text-lg tracking-wide text-white">{tk.title}</h4>
            </div>
            <div className="text-right relative z-10">
              <p className="text-[11px] font-mono text-[#C5A373] font-bold tracking-widest">{tk.code}</p>
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-2 inline-block">View Pass</span>
            </div>
          </div>
        ))}
      </section>

      {/* Detail Overlay - 改為奢華浮現感 */}
      {selectedId && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-6 bg-[#2A2621]/80 backdrop-blur-lg luxury-fade-in"
          onClick={() => setSelectedId(null)}
        >
          <div 
            className="bg-[#FFFDF5] w-full max-w-md rounded-[56px] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-[#C5A373]/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#C5A373]/20 rounded-full mx-auto mb-10" />
            
            {selectedId === 'hotel' ? (
              <div className="space-y-10">
                <h3 className="text-3xl font-serif font-black text-[#2A2621] leading-tight">{hotel.name}</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[8px] font-bold uppercase text-[#C5A373] tracking-[0.4em]">Address</span>
                    <p className="text-sm font-medium leading-relaxed text-[#2A2621]">{hotel.address}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[8px] font-bold uppercase text-[#C5A373] tracking-[0.4em]">Usage Guide</span>
                    <p className="text-[13px] text-[#2A2621]/60 leading-relaxed font-light">{hotel.usageGuide}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                {tickets.filter(tk => tk.id === selectedId).map(tk => (
                  <div key={tk.id} className="space-y-10">
                    <div className="text-center">
                      <h3 className="text-3xl font-serif font-black text-[#2A2621] mb-8">{tk.title}</h3>
                      <div className="bg-white p-8 rounded-[40px] border border-[#C5A373]/20 shadow-inner">
                        <span className="text-[9px] uppercase text-[#C5A373] font-bold tracking-[0.3em] block mb-3 opacity-60">Authentication</span>
                        <p className="text-3xl font-mono font-black tracking-[0.3em] text-[#2A2621]">{tk.code}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[8px] font-bold uppercase text-[#C5A373] tracking-[0.4em]">Guidelines</span>
                        <p className="text-[13px] text-[#2A2621]/60 leading-relaxed font-light">{tk.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button 
              onClick={() => setSelectedId(null)}
              className="w-full mt-14 bg-[#2A2621] text-[#C5A373] py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSection;
