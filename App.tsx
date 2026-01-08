
import React, { useState, useEffect } from 'react';
import { TabType, DayItinerary, Restaurant } from './types';
import { ITINERARY_DATA, RESTAURANTS, DISNEY_STRATEGY, FLIGHT_DATA, HOTEL_DATA, TICKETS } from './data/mockData';
import BottomNav from './components/BottomNav';
import DailySchedule from './components/DailySchedule';
import FoodList from './components/FoodList';
import DisneyGuide from './components/DisneyGuide';
import TicketSection from './components/TicketSection';
import { parseItineraryFromText } from './services/gemini';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showHotelDetail, setShowHotelDetail] = useState(false);
  
  const [itinerary, setItinerary] = useState<DayItinerary[]>(() => {
    const saved = localStorage.getItem('tokyo_itinerary_2026');
    return saved ? JSON.parse(saved) : ITINERARY_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    localStorage.setItem('tokyo_itinerary_2026', JSON.stringify(itinerary));
  }, [itinerary]);

  const currentDayData = itinerary.find(d => d.day === selectedDay) || itinerary[0];

  const getWeekday = (dateStr: string) => {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const handleAIImport = async () => {
    if (!importText.trim()) return;
    setIsParsing(true);
    try {
      const parsedData = await parseItineraryFromText(importText);
      setItinerary(parsedData);
      setIsEditorOpen(false);
      setImportText('');
    } catch (error) {
      alert('解析失敗，請提供更清晰的文字內容。');
    } finally {
      setIsParsing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.HOME:
        return (
          <div className="pb-16 luxury-fade-in">
            {/* 標題區 */}
            <header className="px-8 pt-20 pb-12 text-center relative">
              <button 
                onClick={() => setIsEditorOpen(true)}
                className="absolute right-8 top-20 text-[#C5A373]/40 hover:text-[#C5A373] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
              <h1 className="text-2xl font-serif font-black text-[#2A2621] tracking-[0.2em] mb-3">Tokyo 東京旅行 2026</h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-[#C5A373]/30"></div>
                <p className="text-[#C5A373] text-[9px] uppercase tracking-[0.5em] font-medium">Personal Travel Journal</p>
                <div className="h-[1px] w-8 bg-[#C5A373]/30"></div>
              </div>
            </header>

            {/* 區塊一：行程摘要卡片 */}
            <section className="px-8 space-y-6">
              <div className="flex justify-between items-end px-1 border-b border-[#C5A373]/20 pb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A373]">每日行程摘要</h3>
                <span className="text-[9px] text-[#C5A373]/50 italic font-serif">Daily Highlights</span>
              </div>
              <div className="flex overflow-x-auto gap-5 no-scrollbar snap-x py-2">
                {itinerary.map((day) => (
                  <div 
                    key={day.day}
                    onClick={() => {
                      setSelectedDay(day.day);
                      setActiveTab(TabType.SCHEDULE);
                    }}
                    className={`relative min-w-[260px] h-[220px] rounded-[44px] overflow-hidden snap-center luxury-card ${
                      selectedDay === day.day ? 'ring-2 ring-[#C5A373] ring-offset-2' : 'opacity-95'
                    }`}
                  >
                    <img src={day.coverImage} className="absolute inset-0 w-full h-full object-cover grayscale-[10%]" alt={day.locationName} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2621]/95 via-transparent to-transparent" />
                    
                    {/* 卡片上方即時天氣 */}
                    <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-lg border border-white/30 px-4 py-2 rounded-2xl flex items-center gap-2">
                       <span className="text-sm">{day.weather.icon}</span>
                       <span className="text-[11px] font-serif font-black text-white tracking-tighter">{day.weather.temp}</span>
                    </div>

                    <div className="absolute bottom-6 left-8 right-8">
                      <div className="flex items-center gap-2 mb-2">
                         <p className="text-[10px] text-white font-black tracking-[0.1em]">
                           {day.date.replace(/-/g, '.')} {getWeekday(day.date)}
                         </p>
                         <span className="w-1 h-1 bg-[#C5A373] rounded-full"></span>
                         <p className="text-[10px] text-[#C5A373] font-bold uppercase tracking-widest">Day {day.day}</p>
                      </div>
                      <h4 className="text-xl font-serif font-black text-white mb-1.5">{day.locationName}</h4>
                      <p className="text-[11px] text-white/50 line-clamp-1 font-light tracking-wide">{day.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 區塊二：淺色高對比天氣預報 */}
            <section className="mt-14 px-8">
              <div className="bg-[#F2EDE0]/40 border border-[#C5A373]/20 p-9 rounded-[48px] shadow-sm relative overflow-hidden luxury-card">
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1.5">
                    <p className="text-[#C5A373] text-[9px] uppercase tracking-[0.5em] font-bold">天氣預報</p>
                    <h2 className="text-2xl font-serif font-black text-[#2A2621] tracking-widest">
                      {currentDayData?.locationName.split(' ')[0]} <span className="text-[#C5A373]/30">|</span> {currentDayData?.weather?.condition}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-4xl mb-2">{currentDayData?.weather?.icon}</span>
                    <span className="text-xl font-serif font-black text-[#2A2621]">{currentDayData?.weather?.temp}</span>
                  </div>
                </div>

                <div className="flex overflow-x-auto gap-7 no-scrollbar pt-2">
                  {currentDayData?.weather?.forecast24h?.map((f, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[55px] space-y-4">
                      <span className="text-[10px] text-[#2A2621]/40 font-bold">{f.time}</span>
                      <div className="bg-white/80 border border-[#C5A373]/10 w-11 h-16 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm">
                        <span className="text-lg">{f.icon}</span>
                        <span className="text-[10px] font-serif font-black text-[#C5A373]">{f.temp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 區塊三：淺色頭等艙航班小卡 */}
            <section className="mt-14 px-8 space-y-6">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A373]">航班與交通資訊</h3>
              </div>
              
              <div className="bg-white border border-[#C5A373]/30 p-10 rounded-[48px] shadow-sm luxury-card relative overflow-hidden">
                {/* 裝飾線條 */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A373]/10"></div>
                
                <div className="flex justify-between items-center mb-10 border-b border-[#C5A373]/10 pb-6">
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#C5A373] font-black uppercase tracking-[0.4em]">{FLIGHT_DATA.airline}</p>
                    <h4 className="font-serif font-black text-xl text-[#2A2621]">{FLIGHT_DATA.flightNo}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-widest mb-1">Gate</p>
                    <p className="text-sm font-serif font-black text-[#2A2621]">{FLIGHT_DATA.gate || '--'}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[26px] font-serif font-black text-[#2A2621]">TPE</p>
                    <p className="text-[10px] text-[#2A2621]/40 font-bold uppercase tracking-widest">台北</p>
                  </div>
                  
                  <div className="flex-1 px-8 flex flex-col items-center justify-center">
                    <div className="w-full h-[1px] bg-dashed border-t border-dashed border-[#C5A373]/40 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[#C5A373]">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.645 2.73a.5.5 0 0 1 .597-.17l1.246.541a.5.5 0 0 1 .27.64l-.541 1.246a.5.5 0 0 1-.64.27l-1.246-.541a.5.5 0 0 1-.27-.64l.541-1.246zM15.5 8.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1 0-1h13a.5.5 0 0 1 .5.5z"/></svg>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-right">
                    <p className="text-[26px] font-serif font-black text-[#2A2621]">NRT</p>
                    <p className="text-[10px] text-[#2A2621]/40 font-bold uppercase tracking-widest">東京成田</p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[#C5A373]/10">
                   <div className="space-y-1">
                     <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-widest">起飛時間</p>
                     <p className="text-sm font-serif font-black text-[#2A2621]">{FLIGHT_DATA.departure.split(' ')[1]}</p>
                   </div>
                   <div className="space-y-1 text-center">
                     <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-widest">抵達航廈</p>
                     <p className="text-sm font-serif font-black text-[#2A2621]">{FLIGHT_DATA.terminal.split(' ').pop()}</p>
                   </div>
                   <div className="space-y-1 text-right">
                     <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-widest">預計抵達</p>
                     <p className="text-sm font-serif font-black text-[#2A2621]">{FLIGHT_DATA.arrival.split(' ')[1]}</p>
                   </div>
                </div>
              </div>

              {/* 住宿點擊 */}
              <div 
                onClick={() => setShowHotelDetail(true)}
                className="bg-[#F2EDE0]/20 border border-[#C5A373]/10 p-9 rounded-[44px] luxury-card flex justify-between items-center group cursor-pointer shadow-sm"
              >
                <div className="space-y-1.5">
                  <p className="text-[9px] text-[#C5A373] font-black uppercase tracking-[0.4em]">押上住宿 / Hotel Base</p>
                  <h4 className="font-serif font-black text-lg text-[#2A2621]">{HOTEL_DATA.name.split(' ')[0]}</h4>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[#C5A373] font-serif text-lg italic group-hover:translate-x-1 transition-transform">詳情.</span>
                  <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-1">Details</span>
                </div>
              </div>
            </section>

            {/* AI 導入與飯店詳情視窗內容 */}
            {isEditorOpen && (
              <div className="fixed inset-0 z-[110] bg-[#FFFDF5] p-10 luxury-fade-in flex flex-col">
                <header className="flex justify-between items-center mb-12">
                  <div className="text-left">
                    <p className="text-[9px] text-[#C5A373] font-bold uppercase tracking-[0.5em] mb-2">Smart Import</p>
                    <h3 className="text-2xl font-serif font-black text-[#2A2621]">AI 智能行程導入</h3>
                  </div>
                  <button onClick={() => setIsEditorOpen(false)} className="text-[#2A2621]/30 p-4">Close</button>
                </header>
                <textarea 
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="請在此貼上行程內容..."
                  className="flex-1 w-full bg-white border border-[#C5A373]/10 rounded-[40px] p-10 text-sm font-light leading-relaxed focus:ring-1 focus:ring-[#C5A373] outline-none shadow-sm resize-none mb-10"
                />
                <button 
                  onClick={handleAIImport}
                  disabled={isParsing}
                  className="w-full bg-[#2A2621] text-[#C5A373] py-6 rounded-full font-bold text-[11px] uppercase tracking-[0.4em] shadow-xl disabled:opacity-50"
                >
                  {isParsing ? '解析中...' : '開始 AI 導入'}
                </button>
              </div>
            )}
            
            {showHotelDetail && (
              <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-6 bg-[#2A2621]/80 backdrop-blur-md luxury-fade-in" onClick={() => setShowHotelDetail(false)}>
                <div className="bg-[#FFFDF5] w-full max-w-md rounded-[56px] p-12 shadow-2xl border border-[#C5A373]/20" onClick={e => e.stopPropagation()}>
                  <div className="w-12 h-1.5 bg-[#C5A373]/20 rounded-full mx-auto mb-10" />
                  <div className="space-y-10 text-center">
                    <h3 className="text-2xl font-serif font-black text-[#2A2621]">{HOTEL_DATA.name}</h3>
                    <div className="text-left space-y-8">
                       <div className="space-y-2">
                         <span className="text-[9px] font-bold uppercase text-[#C5A373] tracking-[0.4em]">地址</span>
                         <p className="text-sm text-[#2A2621] leading-relaxed">{HOTEL_DATA.address}</p>
                       </div>
                       <div className="space-y-2">
                         <span className="text-[9px] font-bold uppercase text-[#C5A373] tracking-[0.4em]">住宿指南</span>
                         <p className="text-[13px] text-[#2A2621]/60 leading-relaxed font-light">{HOTEL_DATA.usageGuide}</p>
                       </div>
                    </div>
                    <button onClick={() => setShowHotelDetail(false)} className="w-full bg-[#2A2621] text-[#C5A373] py-5 rounded-full font-bold text-[11px] tracking-widest shadow-xl">關閉</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case TabType.SCHEDULE:
        return <div className="luxury-fade-in"><DailySchedule data={itinerary} selectedDay={selectedDay} setSelectedDay={setSelectedDay} /></div>;
      case TabType.FOOD:
        return <div className="luxury-fade-in"><FoodList restaurants={RESTAURANTS} /></div>;
      case TabType.DISNEY:
        return <div className="luxury-fade-in"><DisneyGuide strategy={DISNEY_STRATEGY} /></div>;
      case TabType.TICKETS:
        return <div className="luxury-fade-in"><TicketSection hotel={HOTEL_DATA} tickets={TICKETS} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-[#FFFDF5] shadow-2xl pb-24 relative overflow-x-hidden border-x border-[#C5A373]/10">
      <main>
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
