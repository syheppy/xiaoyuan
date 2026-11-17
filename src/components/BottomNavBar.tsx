import React from 'react';
import { ScreenId } from '../data/marketplaceData';
import {
  NavHomeIcon,
  NavMessagesIcon,
  NavProfileIcon,
  NavWantedIcon,
} from './CampusIcons';

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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-50 bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-3 py-2 flex items-center justify-between pointer-events-auto"
    >
      {/* Tab 1: 首页 */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-all flex-1 min-h-[44px] cursor-pointer active:scale-95 ${
          activeScreen === 'home'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div
          className={`w-[22px] h-[22px] flex items-center justify-center transition-transform duration-200 ${
            activeScreen === 'home' ? 'scale-105' : ''
          }`}
        >
          <NavHomeIcon active={activeScreen === 'home'} />
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          首页
        </span>
      </button>

      {/* Tab 2: 求购 */}
      <button
        type="button"
        onClick={() => onNavigate('wanted')}
        className={`flex flex-col items-center justify-center gap-0.5 transition-all flex-1 min-h-[44px] cursor-pointer active:scale-95 ${
          activeScreen === 'wanted'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div
          className={`w-[22px] h-[22px] flex items-center justify-center transition-transform duration-200 ${
            activeScreen === 'wanted' ? 'scale-105' : ''
          }`}
        >
          <NavWantedIcon active={activeScreen === 'wanted'} />
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
          className="flex items-center gap-1 bg-[#ba3824] text-white px-3.5 py-2 rounded-full shadow-[0_4px_12px_rgba(186,56,36,0.25)] hover:opacity-95 transition-all active:scale-95 shrink-0 min-h-[38px] cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M12 4.5v15m7.5-7.5h-15"
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
        className={`flex flex-col items-center justify-center gap-0.5 transition-all relative flex-1 min-h-[44px] cursor-pointer active:scale-95 ${
          activeScreen === 'messages'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div
          className={`relative w-[22px] h-[22px] flex items-center justify-center transition-transform duration-200 ${
            activeScreen === 'messages' ? 'scale-105' : ''
          }`}
        >
          <NavMessagesIcon active={activeScreen === 'messages'} />
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
        className={`flex flex-col items-center justify-center gap-0.5 transition-all flex-1 min-h-[44px] cursor-pointer active:scale-95 ${
          activeScreen === 'profile'
            ? 'text-[#E97865] font-semibold'
            : 'text-[#665c59] hover:text-on-surface'
        }`}
      >
        <div
          className={`w-[22px] h-[22px] flex items-center justify-center transition-transform duration-200 ${
            activeScreen === 'profile' ? 'scale-105' : ''
          }`}
        >
          <NavProfileIcon active={activeScreen === 'profile'} />
        </div>
        <span className="text-[10px] tracking-tight leading-none mt-0.5 whitespace-nowrap">
          我的
        </span>
      </button>
    </nav>
  );
};
