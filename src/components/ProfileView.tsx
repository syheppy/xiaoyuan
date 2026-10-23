import React from 'react';
import {
  HOTLINK_IMAGES,
  ProductItem,
  ScreenId,
} from '../data/marketplaceData';
import { BottomNavBar } from './BottomNavBar';

interface ProfileViewProps {
  products: ProductItem[];
  campus: '清远校区' | '广州校区';
  userName: string;
  unreadTotal: number;
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  products,
  campus,
  userName,
  unreadTotal,
  onNavigate,
}) => {
  const favoriteProducts = products.filter((p) => p.favorited);
  const onSaleCount = Math.max(3, products.length - 1);
  const favoritesCount = Math.max(8, 7 + favoriteProducts.length);

  return (
    <div className="relative w-full min-h-screen bg-surface-container-lowest flex flex-col pb-28">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 pt-8 pb-3 bg-surface-container-lowest/90 backdrop-blur-md">
        <div className="w-10" />
        <h1 className="text-on-surface text-[18px] tracking-tight font-semibold text-center">
          我的
        </h1>
        <div className="flex items-center justify-end w-10">
          <button
            type="button"
            aria-label="打开设置"
            onClick={() => onNavigate('settings')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">
              settings
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-5 space-y-5 pt-2">
        {/* 1. 个人信息卡片 */}
        <section className="bg-gradient-to-b from-surface-container-lowest to-surface-container-low/60 rounded-2xl p-4 border border-outline-variant/20 soft-shadow">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-surface-container-lowest shadow-sm"
                alt={userName}
                src={HOTLINK_IMAGES.profileAvatar}
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-tertiary rounded-full border-2 border-surface-container-lowest flex items-center justify-center text-on-tertiary shadow-sm"
                title="实名已认证"
              >
                <span className="material-symbols-outlined material-fill text-[13px] font-bold">
                  check
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-on-surface truncate text-base font-bold">
                  {userName}
                </h2>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-tertiary-fixed text-on-tertiary-fixed-variant shrink-0">
                  <span className="material-symbols-outlined material-fill text-[12px]">
                    verified
                  </span>
                  已实名
                </span>
              </div>
              <p className="text-secondary text-xs truncate">
                广东建院 · {campus}
              </p>
            </div>
          </div>
        </section>

        {/* 2. 数据看板 */}
        <section className="bg-surface-container-lowest rounded-2xl py-4 px-2 border border-outline-variant/20 soft-shadow">
          <div className="grid grid-cols-4 divide-x divide-outline-variant/20 text-center tabular-nums">
            <button
              type="button"
              onClick={() => onNavigate('selling')}
              className="flex flex-col items-center justify-center py-1.5 px-1 group transition-transform active:scale-95 cursor-pointer"
            >
              <span className="text-2xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors leading-none">
                {onSaleCount}
              </span>
              <span className="mt-1.5 text-xs text-secondary font-medium tracking-wide leading-none group-hover:text-on-surface transition-colors">
                在售发布
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sold')}
              className="flex flex-col items-center justify-center py-1.5 px-1 group transition-transform active:scale-95 cursor-pointer"
            >
              <span className="text-2xl font-bold tracking-tight text-on-surface group-hover:text-tertiary transition-colors leading-none">
                5
              </span>
              <span className="mt-1.5 text-xs text-secondary font-medium tracking-wide leading-none group-hover:text-on-surface transition-colors">
                已出卖出
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('purchased')}
              className="flex flex-col items-center justify-center py-1.5 px-1 group transition-transform active:scale-95 cursor-pointer"
            >
              <span className="text-2xl font-bold tracking-tight text-on-surface group-hover:text-[#4A86C5] transition-colors leading-none">
                2
              </span>
              <span className="mt-1.5 text-xs text-secondary font-medium tracking-wide leading-none group-hover:text-on-surface transition-colors">
                买到好物
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('favorites')}
              className="flex flex-col items-center justify-center py-1.5 px-1 group transition-transform active:scale-95 cursor-pointer"
            >
              <span className="text-2xl font-bold tracking-tight text-on-surface group-hover:text-amber-700 transition-colors leading-none">
                {favoritesCount}
              </span>
              <span className="mt-1.5 text-xs text-secondary font-medium tracking-wide leading-none group-hover:text-on-surface transition-colors">
                我的收藏
              </span>
            </button>
          </div>
        </section>

        {/* 3. 待面交事项卡片 */}
        <section className="bg-gradient-to-r from-primary-fixed/40 via-surface-container-lowest to-surface-container-low rounded-2xl p-4 border border-primary-fixed-dim/50 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined material-fill text-lg">
                  schedule
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-primary tracking-tight">
                    今日面交约定
                  </span>
                </div>
                <p className="text-on-surface font-medium text-xs truncate mt-0.5">
                  18:30 一食堂门口 · 「工程制图仪」
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('meetup')}
              className="shrink-0 flex items-center gap-0.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-xs font-semibold shadow-xs border border-primary-fixed-dim/60 hover:bg-primary-fixed/20 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>查看</span>
              <span className="material-symbols-outlined text-[13px]">
                arrow_forward
              </span>
            </button>
          </div>
        </section>

        {/* 4. 核心功能入口列表 */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 soft-shadow overflow-hidden divide-y divide-surface-container">
          {/* 我的闲置 */}
          <button
            type="button"
            onClick={() => onNavigate('selling')}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  inventory_2
                </span>
              </div>
              <span className="text-on-surface font-medium text-sm">
                我的闲置
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary text-xs">
              <span className="text-primary font-medium">
                {onSaleCount}件在售
              </span>
              <span className="material-symbols-outlined text-base text-outline/60 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </button>

          {/* 面交记录 / 约定 */}
          <button
            type="button"
            onClick={() => onNavigate('meetup')}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  handshake
                </span>
              </div>
              <span className="text-on-surface font-medium text-sm">
                面交记录 / 约定
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary text-xs">
              <span>2 条进行中</span>
              <span className="material-symbols-outlined text-base text-outline/60 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </button>

          {/* 校园认证 -> 跳转注册新账号页 */}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  school
                </span>
              </div>
              <span className="text-on-surface font-medium text-sm">
                校园身份认证
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#2E7D32] font-medium">已认证</span>
              <span className="material-symbols-outlined text-base text-outline/60 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </button>

          {/* 安全面交公约与指南 */}
          <button
            type="button"
            onClick={() => onNavigate('guide')}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  verified_user
                </span>
              </div>
              <span className="text-on-surface font-medium text-sm">
                安全面交公约与指南
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary text-xs">
              <span className="material-symbols-outlined text-base text-outline/60 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </button>

          {/* 联系建院流转小助手 */}
          <button
            type="button"
            onClick={() => onNavigate('support')}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-surface-container-low/60 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  support_agent
                </span>
              </div>
              <span className="text-on-surface font-medium text-sm">
                联系建院流转小助手
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary text-xs">
              <span>09:00 - 22:00</span>
              <span className="material-symbols-outlined text-base text-outline/60 group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          </button>
        </section>

        {/* 绿色低碳校园寄语小卡片 */}
        <div className="pt-3 pb-6 text-center">
          <p className="text-[11px] text-secondary/70 tracking-wide">
            广东建院绿色低碳互助校园 · 让每件物品具备续生命
          </p>
        </div>
      </main>

      <BottomNavBar
        activeScreen="profile"
        unreadTotal={unreadTotal}
        onNavigate={onNavigate}
      />
    </div>
  );
};
