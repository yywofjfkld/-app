
import React from 'react';
import { DayItinerary, Restaurant, DisneyStrategy } from '../types';

interface PrintableViewProps {
  data: DayItinerary[];
  restaurants: Restaurant[];
  disney: DisneyStrategy;
}

const PrintableView: React.FC<PrintableViewProps> = ({ data, restaurants, disney }) => {
  return (
    <div className="p-8 space-y-12">
      <div className="no-print bg-gray-100 p-6 rounded-2xl mb-8">
        <h3 className="font-bold mb-2">🖨️ 列印預覽模式</h3>
        <p className="text-sm text-gray-600 mb-4">此頁面已優化為 A4 黑白列印格式。請點擊下方按鈕或按 Cmd/Ctrl+P。</p>
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold"
        >
          開始列印
        </button>
      </div>

      {data.map((day) => (
        <div key={day.day} className="border-4 border-black p-8 break-after-page min-h-[1000px] flex flex-col">
          <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-6">
            <h1 className="text-4xl font-black uppercase">DAY 0{day.day}</h1>
            <div className="text-right">
              <p className="text-xl font-bold">{day.date}</p>
              <p className="text-lg">{day.locationName}</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {day.items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-4 border-b border-gray-200">
                <div className="w-24 shrink-0 font-bold text-xl">{item.startTime}</div>
                <div>
                  <h4 className="text-xl font-black mb-1">{item.location}</h4>
                  <p className="mb-2">{item.activity}</p>
                  <div className="text-sm space-y-1">
                    <p><strong>說明:</strong> {item.reason}</p>
                    <p><strong>備案:</strong> {item.planB}</p>
                    {item.tags?.map(t => <span key={t} className="inline-block border border-black px-2 mr-2 mb-1 font-bold">#{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black grid grid-cols-2 gap-8">
            <div>
              <h5 className="font-black text-lg mb-2">餐廳資訊</h5>
              <ul className="text-sm space-y-1">
                {restaurants.filter(r => day.items.some(i => i.location.includes(r.name) || i.activity.includes(r.name))).map(r => (
                  <li key={r.id}>- <strong>{r.name}</strong> ({r.priceLevel})：{r.highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-black text-lg mb-2">重要事項</h5>
              <p className="text-sm">入園門票、護照、JR Pass、備用電池、雨傘、行動網卡</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableView;
