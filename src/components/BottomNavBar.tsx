import React from 'react';
import { ScreenId } from '../data/marketplaceData';

interface BottomNavBarProps {
  activeScreen: ScreenId;
  unreadTotal: number;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  unreadTotal,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="底部主导航"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-50 bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-3 py-2 flex items-center justify-between pointer-events-auto"
    >
      {/* Tab 1: 首页 */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-colors flex-1 min-h-[44px] ${
          activeScreen === 'home'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div className="w-[22px] h-[22px] flex items-center justify-center">
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          首页
        </span>
      </button>

      {/* Tab 2: 求购 */}
      <button
        type="button"
        onClick={() => onNavigate('wanted')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-colors flex-1 min-h-[44px] ${
          activeScreen === 'wanted'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div className="w-[22px] h-[22px] flex items-center justify-center">
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1.5" ry="1.5" />
            <path d="m12 11 1.2 2.4 2.8.4-2 2 .5 2.7L12 17.2l-2.5 1.3.5-2.7-2-2 2.8-.4z" />
          </svg>
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          求购
        </span>
      </button>

      {/* Tab 3: + 发布闲置 */}
      <div className="flex items-center justify-center px-1 shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('publish')}
          className="flex items-center gap-1 bg-[#ba3824] text-white px-3.5 py-2 rounded-full shadow-[0_4px_12px_rgba(186,56,36,0.25)] hover:opacity-95 transition-all active:scale-95 shrink-0 min-h-[38px]"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4v16m8-8H4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">
            发布闲置
          </span>
        </button>
      </div>

      {/* Tab 4: 消息 */}
      <button
        type="button"
        onClick={() => onNavigate('messages')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-colors relative flex-1 min-h-[44px] ${
          activeScreen === 'messages'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div className="relative w-[22px] h-[22px] flex items-center justify-center">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {unreadTotal > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#E97865] rounded-full ring-2 ring-white" />
          )}
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          消息
        </span>
      </button>

      {/* Tab 5: 我的 */}
      <button
        type="button"
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-colors flex-1 min-h-[44px] ${
          activeScreen === 'profile'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div className="w-[22px] h-[22px] flex items-center justify-center">
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          我的
        </span>
      </button>
    </nav>
  );
};
