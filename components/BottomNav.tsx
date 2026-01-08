
import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { type: TabType.HOME, label: '首頁' },
    { type: TabType.SCHEDULE, label: '行程' },
    { type: TabType.FOOD, label: '美食' },
    { type: TabType.DISNEY, label: '樂園' },
    { type: TabType.TICKETS, label: '票券' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 pb-safe-area shadow-2xl no-print z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveTab(item.type)}
            className={`flex flex-col items-center justify-center min-w-[64px] h-full transition-all relative ${
              activeTab === item.type ? 'text-accent' : 'text-gray-400'
            }`}
          >
            <span className={`text-[11px] font-bold transition-all ${
              activeTab === item.type ? 'scale-105' : 'scale-100'
            }`}>
              {item.label}
            </span>
            {activeTab === item.type && (
              <div className="absolute bottom-2 w-4 h-[2px] bg-accent rounded-full transition-all" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
