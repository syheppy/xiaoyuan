import React from 'react';

interface NavIconProps {
  active?: boolean;
  className?: string;
}

/**
 * 底部导航 · 首页（柔和双色校园小筑）
 */
export const NavHomeIcon: React.FC<NavIconProps> = ({
  active = false,
  className = 'w-[22px] h-[22px]',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 1.9 : 1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path
      d="M4 10.2L12 3.8l8 6.4V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.8z"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.16 : 0}
    />
    <path d="M9.5 21v-5.5a2.5 2.5 0 0 1 5 0V21" />
  </svg>
);

/**
 * 底部导航 · 求购（心愿便签板，选中呈柔和双色填充）
 */
export const NavWantedIcon: React.FC<NavIconProps> = ({
  active = false,
  className = 'w-[22px] h-[22px]',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 1.9 : 1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect
      x="5"
      y="4.5"
      width="14"
      height="16.5"
      rx="3"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.16 : 0}
    />
    <path d="M9.5 4.5v-.5a2.5 2.5 0 0 1 5 0v.5" />
    <path d="M9 11h6" />
    <path d="M9 15h4" />
    <circle
      cx="16.5"
      cy="16.5"
      r="1.2"
      fill={active ? 'currentColor' : 'none'}
    />
  </svg>
);

/**
 * 底部导航 · 消息（圆润双色聊天气泡）
 */
export const NavMessagesIcon: React.FC<NavIconProps> = ({
  active = false,
  className = 'w-[22px] h-[22px]',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 1.9 : 1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path
      d="M4.5 11.8c0-4 3.4-7.3 7.5-7.3s7.5 3.3 7.5 7.3-3.4 7.3-7.5 7.3c-1.1 0-2.2-.2-3.2-.7L4.8 20l1.1-3.3c-.9-1.4-1.4-3-1.4-4.9z"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.16 : 0}
    />
    <circle cx="9.2" cy="11.8" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.8" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="11.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * 底部导航 · 我的（校园用户轮廓）
 */
export const NavProfileIcon: React.FC<NavIconProps> = ({
  active = false,
  className = 'w-[22px] h-[22px]',
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 1.9 : 1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="8"
      r="3.6"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.16 : 0}
    />
    <path
      d="M5.2 19.8c0-3.2 3-5.3 6.8-5.3s6.8 2.1 6.8 5.3a.9.9 0 0 1-.9.9H6.1a.9.9 0 0 1-.9-.9z"
      fill={active ? 'currentColor' : 'none'}
      fillOpacity={active ? 0.16 : 0}
    />
  </svg>
);

/**
 * 首页金刚区 1 · 毕业清仓（打包纸箱 + 毕业学士帽）
 */
export const ZoneGraduationIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    className={className}
    viewBox="0 0 28 28"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* 打包纸箱主框 */}
    <rect
      x="5.5"
      y="12.5"
      width="17"
      height="11"
      rx="2.6"
      fill="#F59E0B"
      fillOpacity="0.18"
      stroke="#D97706"
      strokeWidth="1.75"
    />
    {/* 纸箱封条小细节 */}
    <path d="M11.5 12.5v3.5h5v-3.5" stroke="#D97706" strokeWidth="1.6" />
    {/* 毕业学士帽 */}
    <path
      d="M14 3.5l7.5 3.3-7.5 3.3-7.5-3.3L14 3.5z"
      fill="#F59E0B"
      fillOpacity="0.28"
      stroke="#B45309"
      strokeWidth="1.65"
    />
    <path d="M21.5 6.8v3.6" stroke="#B45309" strokeWidth="1.6" />
  </svg>
);

/**
 * 首页金刚区 2 · 新生专区（温暖宿舍小台灯 + 微光）
 */
export const ZoneFreshmanIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    className={className}
    viewBox="0 0 28 28"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* 灯罩 */}
    <path
      d="M9.5 6.5h9l2 6.8H7.5l2-6.8z"
      fill="#E97865"
      fillOpacity="0.22"
      stroke="#D9533D"
      strokeWidth="1.75"
    />
    {/* 灯杆与底座 */}
    <path d="M14 13.3v7.2" stroke="#D9533D" strokeWidth="1.75" />
    <path
      d="M9.5 22.5a4.5 2 0 0 1 9 0H9.5z"
      fill="#E97865"
      fillOpacity="0.28"
      stroke="#D9533D"
      strokeWidth="1.7"
    />
    {/* 柔和微光线条 */}
    <path d="M11 16.2l-.7 1.3" stroke="#E0634B" strokeWidth="1.5" />
    <path d="M17 16.2l.7 1.3" stroke="#E0634B" strokeWidth="1.5" />
    <circle cx="22.5" cy="6.5" r="1.1" fill="#E97865" />
  </svg>
);

/**
 * 首页金刚区 3 · 教材课件（带重点划线与书签的课本）
 */
export const ZoneTextbookIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    className={className}
    viewBox="0 0 28 28"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* 教材主本 */}
    <rect
      x="6"
      y="4.5"
      width="16"
      height="18.5"
      rx="2.6"
      fill="#3B82F6"
      fillOpacity="0.16"
      stroke="#2563EB"
      strokeWidth="1.75"
    />
    {/* 装订脊线 */}
    <path d="M10 4.5v18.5" stroke="#2563EB" strokeWidth="1.6" />
    {/* 书签 */}
    <path
      d="M15.5 4.5v6.2l1.8-1.3 1.8 1.3V4.5"
      fill="#3B82F6"
      fillOpacity="0.35"
      stroke="#1D4ED8"
      strokeWidth="1.5"
    />
    {/* 重点笔记划线 */}
    <path d="M13 14.5h5.5" stroke="#2563EB" strokeWidth="1.7" />
    <path d="M13 18h4" stroke="#60A5FA" strokeWidth="1.9" />
  </svg>
);

/**
 * 首页金刚区 4 · 免费互助（校内流转小礼盒 + 环保循环弧）
 */
export const ZoneFreebieIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg
    className={className}
    viewBox="0 0 28 28"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* 流转礼盒主体 */}
    <rect
      x="8.2"
      y="11"
      width="11.6"
      height="10.2"
      rx="2.2"
      fill="#10B981"
      fillOpacity="0.18"
      stroke="#059669"
      strokeWidth="1.75"
    />
    <path d="M14 11v10.2" stroke="#059669" strokeWidth="1.6" />
    <path d="M8.2 15h11.6" stroke="#059669" strokeWidth="1.5" />
    {/* 顶部礼结微弧 */}
    <path
      d="M14 11C12.3 8.1 9.7 8.8 10.6 10.5C11.1 11.1 12.6 11 14 11Z"
      fill="#10B981"
      fillOpacity="0.25"
      stroke="#059669"
      strokeWidth="1.5"
    />
    <path
      d="M14 11C15.7 8.1 18.3 8.8 17.4 10.5C16.9 11.1 15.4 11 14 11Z"
      fill="#10B981"
      fillOpacity="0.25"
      stroke="#059669"
      strokeWidth="1.5"
    />
    {/* 外侧循环流转指示弧 */}
    <path d="M5 17.5a10.5 10.5 0 0 1 2.2-10.3" stroke="#10B981" strokeWidth="1.6" />
    <path d="M4.8 7.2h2.4v2.4" stroke="#10B981" strokeWidth="1.6" />
    <path d="M23 10.5a10.5 10.5 0 0 1-2.2 10.3" stroke="#10B981" strokeWidth="1.6" />
    <path d="M23.2 20.8h-2.4v-2.4" stroke="#10B981" strokeWidth="1.6" />
  </svg>
);
