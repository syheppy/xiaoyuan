import React from 'react';
import { Home, LayoutGrid, Plus, MessageSquare, User } from 'lucide-react';

export type TabKey = 'home' | 'category' | 'publish' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 1,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 max-w-md mx-auto">
      <div className="flex items-center justify-around h-15 px-2 relative">
        {/* 首页 */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'home' ? 'text-[#E45749]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5 font-medium">首页</span>
        </button>

        {/* 分类 */}
        <button
          onClick={() => onTabChange('category')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'category' ? 'text-[#E45749]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'category' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5 font-medium">分类</span>
        </button>

        {/* Center Prominent Publish Button */}
        <div className="flex-1 flex justify-center items-center relative -top-2.5">
          <button
            onClick={() => onTabChange('publish')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E45749] to-[#F27A6D] text-white flex items-center justify-center shadow-lg shadow-rose-500/25 active:scale-95 transition-transform"
            aria-label="发布闲置"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
        </div>

        {/* 消息 */}
        <button
          onClick={() => onTabChange('messages')}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
            activeTab === 'messages' ? 'text-[#E45749]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E45749] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5 font-medium">消息</span>
        </button>

        {/* 我的 */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'profile' ? 'text-[#E45749]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5 font-medium">我的</span>
        </button>
      </div>
    </div>
  );
};
