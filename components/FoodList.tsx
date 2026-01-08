
import React, { useState } from 'react';
import { Restaurant } from '../types';
import { searchNearbyRestaurants } from '../services/gemini';

interface FoodListProps {
  restaurants: Restaurant[];
}

const FoodList: React.FC<FoodListProps> = ({ restaurants }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ text: string, links: { title: string, uri: string }[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults(null);
    
    try {
      const results = await searchNearbyRestaurants(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } catch (error) {
      console.error(error);
      alert('搜尋失敗，請稍後再試。');
      setIsSearching(false);
    }
  };

  return (
    <div className="p-8 pb-32">
      <header className="mb-14 text-center">
        <h2 className="text-xl font-serif font-black text-[#2A2621] tracking-widest uppercase">Gourmet Guide</h2>
        <div className="flex items-center justify-center gap-4 mt-4">
           <div className="h-[1px] w-6 bg-[#C5A373]/30"></div>
           <p className="text-[#C5A373] text-[9px] uppercase tracking-[0.4em] font-medium">Savor the Excellence</p>
           <div className="h-[1px] w-6 bg-[#C5A373]/30"></div>
        </div>
      </header>

      {/* 搜尋引擎區域 */}
      <section className="mb-16">
        <form onSubmit={handleSearch} className="flex flex-col gap-5">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋地區或料理關鍵字..."
              className="w-full bg-white border border-[#C5A373]/15 rounded-[32px] px-8 py-6 text-sm shadow-sm focus:ring-1 focus:ring-[#C5A373] outline-none transition-all pr-14 luxury-card"
            />
            <div className="absolute right-7 top-1/2 -translate-y-1/2 text-[#C5A373]/40 group-focus-within:text-[#C5A373] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-[#2A2621] text-[#C5A373] px-8 py-6 rounded-[32px] text-[10px] font-black disabled:opacity-50 active:scale-95 transition-all shadow-xl uppercase tracking-[0.4em] border border-[#C5A373]/20"
          >
            {isSearching ? 'Analysing Network...' : 'Gemini AI Search'}
          </button>
        </form>

        {/* 搜尋結果顯示 */}
        {searchResults && (
          <div className="mt-12 luxury-fade-in">
            <div className="bg-white border border-[#C5A373]/10 rounded-[48px] p-9 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#2A2621] p-3 rounded-2xl shadow-lg border border-[#C5A373]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#C5A373"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.76-7.312 2.76-6.49 0-11.49-5.226-11.49-11.716s5-11.716 11.49-11.716c3.48 0 6.06 1.376 7.908 3.152l2.308-2.308c-2.472-2.36-5.704-4.176-10.216-4.176-8.232 0-14.976 6.744-14.976 14.976s6.744 14.976 14.976 14.976c4.448 0 7.744-1.472 10.28-4.136 2.652-2.652 3.48-6.328 3.48-9.112 0-.872-.072-1.68-.216-2.416h-13.544z"/></svg>
                </div>
                <h3 className="font-serif font-black text-lg text-[#2A2621]">AI 解析推薦</h3>
              </div>
              
              <div className="text-[#2A2621]/70 leading-relaxed whitespace-pre-wrap mb-10 text-[13px] font-light">
                {searchResults.text}
              </div>
              
              {searchResults.links.length > 0 && (
                <div className="space-y-4 pt-10 border-t border-[#C5A373]/10">
                  <h4 className="text-[9px] font-bold text-[#C5A373] uppercase tracking-[0.4em]">Explore Destinations</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {searchResults.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-[#F2EDE0]/30 border border-[#C5A373]/5 p-6 rounded-[32px] hover:bg-[#2A2621] hover:text-white transition-all shadow-sm"
                      >
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                          <span className="text-[13px] font-serif font-black truncate">{link.title || '查看詳細內容'}</span>
                          <span className="text-[9px] opacity-40 truncate tracking-tight">{link.uri}</span>
                        </div>
                        <svg className="shrink-0 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#C5A373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 編輯精選 */}
      <div className="space-y-10">
        <h3 className="text-[10px] font-bold text-[#C5A373] uppercase tracking-[0.5em] px-1 text-center">Curated Selection</h3>
        {restaurants.map((r) => (
          <div key={r.id} className="bg-white border border-[#C5A373]/10 rounded-[48px] p-9 shadow-sm luxury-card transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[9px] font-black text-[#C5A373] mb-3 block tracking-[0.3em] uppercase">
                  {r.priceLevel} • {r.reservation ? 'Reservation Required' : 'Walk-in Welcome'}
                </span>
                <h3 className="text-2xl font-serif font-black text-[#2A2621]">{r.name}</h3>
              </div>
              <div className="bg-[#F2EDE0]/50 px-5 py-2.5 rounded-2xl text-[9px] font-black text-[#C5A373] tracking-widest uppercase border border-[#C5A373]/10">
                {r.suggestedTime}
              </div>
            </div>

            <p className="text-sm text-[#2A2621]/60 mb-10 leading-relaxed font-light italic">{r.highlight}</p>

            <div className="space-y-6">
              <div className="bg-[#FFFDF5] p-7 rounded-[36px] border border-[#C5A373]/15">
                <h4 className="text-[9px] font-bold text-[#C5A373] uppercase tracking-[0.3em] mb-4">Recommended Menu</h4>
                <div className="flex flex-wrap gap-2.5">
                  {r.mustOrder.map(item => (
                    <span key={item} className="bg-white text-[#2A2621] text-[11px] font-bold px-5 py-2.5 rounded-2xl shadow-sm border border-[#C5A373]/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[11px] text-[#C5A373]/40 font-bold px-3 uppercase tracking-widest">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                {r.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
