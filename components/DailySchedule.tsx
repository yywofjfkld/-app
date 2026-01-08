
import React from 'react';
import { DayItinerary, ItineraryItem } from '../types';

interface DailyScheduleProps {
  data: DayItinerary[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const DailySchedule: React.FC<DailyScheduleProps> = ({ data, selectedDay, setSelectedDay }) => {
  const currentDay = data.find(d => d.day === selectedDay) || data[0];

  const handleNav = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="p-8 pb-32">
      <header className="mb-14 text-center">
        <h2 className="text-xl font-serif font-black text-[#2A2621] tracking-widest">ITINERARY</h2>
        <div className="flex gap-4 justify-center mt-6">
          {data.map(d => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[10px] transition-all tracking-tighter ${
                selectedDay === d.day ? 'bg-[#C5A373] text-white scale-110 shadow-lg' : 'bg-[#F2EDE0] text-[#C5A373]/60'
              }`}
            >
              D{d.day}
            </button>
          ))}
        </div>
      </header>

      {/* 每日總覽 */}
      <div className="bg-white p-8 rounded-[40px] mb-16 flex justify-between items-center border border-[#C5A373]/10 luxury-card overflow-hidden">
        <div>
          <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-[0.4em] mb-2">{currentDay.date}</p>
          <h3 className="text-2xl font-serif font-black text-[#2A2621]">{currentDay.locationName}</h3>
          <div className="flex gap-2 mt-4">
             <span className="text-[8px] font-bold text-[#C5A373]/70 border border-[#C5A373]/20 px-3 py-1.5 rounded-full uppercase">{currentDay.weather.temp}</span>
             <span className="text-[8px] font-bold text-[#C5A373]/70 border border-[#C5A373]/20 px-3 py-1.5 rounded-full uppercase">{currentDay.weather.condition}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-5xl filter grayscale opacity-10">{currentDay.weather.icon}</span>
        </div>
      </div>

      {/* 時間軸 */}
      <div className="relative border-l border-[#C5A373]/20 ml-3 space-y-20">
        {currentDay.items.map((item) => (
          <div key={item.id} className="relative pl-10">
            {/* 時間指示 */}
            <div className={`absolute -left-[6.5px] top-1 w-[13px] h-[13px] rounded-full border-[3px] border-white shadow-md ${
              item.type === 'transport' ? 'bg-[#C5A373]/40' :
              item.type === 'food' ? 'bg-[#C5A373]' :
              'bg-[#2A2621]'
            }`} />
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#C5A373]/40 uppercase">{item.startTime} — {item.endTime}</p>
              {item.transportInfo && (
                <span className="text-[8px] bg-[#F2EDE0]/50 text-[#C5A373] px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-[#C5A373]/10">
                  {item.transportInfo.method} • {item.transportInfo.duration}m
                </span>
              )}
            </div>

            <div className="bg-white p-9 rounded-[48px] border border-[#C5A373]/5 luxury-card group">
              <div className="flex justify-between items-start mb-8">
                <h4 className="text-xl font-serif font-black leading-snug flex-1 pr-6 text-[#2A2621]">{item.location}</h4>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => handleNav(item.location)}
                    className="bg-[#F2EDE0]/40 text-[#C5A373] p-4 rounded-2xl hover:bg-[#C5A373] hover:text-white transition-all shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                  </button>
                </div>
              </div>
              
              <p className="text-[#2A2621]/60 text-sm mb-10 leading-relaxed font-light tracking-wide">{item.activity}</p>

              {/* 標籤區 */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-bold px-4 py-2 rounded-xl tracking-[0.1em] border border-[#C5A373]/20 text-[#C5A373] bg-[#F2EDE0]/30 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-[#C5A373]/5">
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-[#C5A373]/40 uppercase tracking-widest block">Strategy</span>
                  <p className="text-[10px] text-[#2A2621]/50 font-medium leading-snug">{item.reason}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-[#C5A373]/40 uppercase tracking-widest block">Backup</span>
                  <p className="text-[10px] text-[#2A2621]/40 font-light leading-snug italic">{item.planB}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailySchedule;
