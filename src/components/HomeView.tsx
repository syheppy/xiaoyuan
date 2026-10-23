import React, { useState } from 'react';
import { ProductItem, ScreenId, filterProducts } from '../data/marketplaceData';
import { BottomNavBar } from './BottomNavBar';

interface HomeViewProps {
  products: ProductItem[];
  campus: '清远校区' | '广州校区';
  onToggleCampus: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (screen: ScreenId) => void;
  unreadTotal: number;
}

const CATEGORY_TABS = ['推荐', '本校区自提', '数码数码', '图书课本', '寝室百货'];

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  campus,
  onToggleCampus,
  onSelectProduct,
  onNavigate,
  unreadTotal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('推荐');
  const [activeZone, setActiveZone] = useState<string | undefined>(undefined);

  const filteredProducts = filterProducts(products, {
    searchQuery,
    categoryTab: activeTab,
    campus,
    zone: activeZone,
  });

  const handleZoneClick = (zoneScreen: ScreenId) => {
    onNavigate(zoneScreen);
  };

  return (
    <div className="w-full bg-xy-bg min-h-screen relative flex flex-col antialiased">
      {/* Top Minimal Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md pt-3 pb-2.5 transition-all px-5">
        <div className="flex items-center justify-between gap-3">
          {/* Campus Selector */}
          <button
            type="button"
            onClick={() => onNavigate('campus')}
            className="flex items-center gap-1 cursor-pointer group py-1"
            aria-label={`切换校区，当前为${campus}`}
          >
            <span className="material-symbols-outlined material-fill text-[16px] text-primary shrink-0">
              location_on
            </span>
            <span className="text-[16px] font-semibold text-on-surface tracking-tight whitespace-nowrap">
              &nbsp;{campus}
            </span>
            <span className="material-symbols-outlined text-secondary text-[16px] group-hover:translate-y-0.5 transition-transform">
              expand_more
            </span>
          </button>

          {/* Right Side: Student Verification Badge & Notice */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-tertiary text-[11px] font-medium tracking-wide hover:bg-emerald-100 transition-colors"
            >
              <span className="material-symbols-outlined material-fill text-[13px]">
                verified
              </span>
              <span className="whitespace-nowrap">学生实名</span>
            </button>
            <button
              type="button"
              aria-label="消息通知"
              onClick={() => onNavigate('messages')}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-secondary hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[21px]">
                notifications
              </span>
              {unreadTotal > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Modern Xianyu-style Floating Lightweight Search Bar */}
        <div className="mt-3.5">
          <div className="relative flex items-center h-10 w-full rounded-2xl bg-[#F2F3F5] px-3.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-secondary text-[19px] mr-2">
              search
            </span>
            <input
              aria-label="搜索闲置物品"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-[13.5px] text-on-surface placeholder:text-secondary/70 focus:ring-0 focus:outline-none"
              placeholder="搜索考研教材、自用iPad、考证笔记..."
              type="text"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-medium text-secondary hover:text-on-surface px-1.5 py-0.5 ml-1 shrink-0"
              >
                清除
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {}}
              className="text-xs font-medium text-primary hover:text-primary-container px-1 py-0.5 ml-1 shrink-0 whitespace-nowrap"
            >
              搜索
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stream */}
      <main className="flex-1 pt-4 pb-32 space-y-6 px-5">
        {/* 1. Campus Functional Zones */}
        <section aria-label="校园功能专区">
          <div className="grid grid-cols-4 gap-2 text-center py-2.5">
            {/* Item 1: 毕业清仓 */}
            <button
              type="button"
              onClick={() => handleZoneClick('graduation')}
              className="flex flex-col items-center group cursor-pointer rounded-2xl py-1 transition-colors hover:bg-amber-50/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 duration-200">
                <span className="material-symbols-outlined material-fill text-[24px]">
                  school
                </span>
              </div>
              <span className="mt-2 text-[13px] font-medium text-on-surface whitespace-nowrap">
                毕业清仓
              </span>
              <span className="text-[11px] text-secondary/80 font-normal whitespace-nowrap">
                打包带走
              </span>
            </button>

            {/* Item 2: 新生专区 */}
            <button
              type="button"
              onClick={() => handleZoneClick('freshman')}
              className="flex flex-col items-center group cursor-pointer rounded-2xl py-1 transition-colors hover:bg-rose-50/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 duration-200">
                <span className="material-symbols-outlined material-fill text-[24px]">
                  local_mall
                </span>
              </div>
              <span className="mt-2 text-[13px] font-medium text-on-surface whitespace-nowrap">
                新生专区
              </span>
              <span className="text-[11px] text-secondary/80 font-normal whitespace-nowrap">
                宿舍神器
              </span>
            </button>

            {/* Item 3: 教材课件 */}
            <button
              type="button"
              onClick={() => handleZoneClick('textbook')}
              className="flex flex-col items-center group cursor-pointer rounded-2xl py-1 transition-colors hover:bg-blue-50/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 duration-200">
                <span className="material-symbols-outlined material-fill text-[24px]">
                  menu_book
                </span>
              </div>
              <span className="mt-2 text-[13px] font-medium text-on-surface whitespace-nowrap">
                教材课件
              </span>
              <span className="text-[11px] text-secondary/80 font-normal whitespace-nowrap">
                带划线笔记
              </span>
            </button>

            {/* Item 4: 免费互助 */}
            <button
              type="button"
              onClick={() => handleZoneClick('freebie')}
              className="flex flex-col items-center group cursor-pointer rounded-2xl py-1 transition-colors hover:bg-emerald-50/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 duration-200">
                <span className="material-symbols-outlined material-fill text-[24px]">
                  volunteer_activism
                </span>
              </div>
              <span className="mt-2 text-[13px] font-medium text-on-surface whitespace-nowrap">
                免费互助
              </span>
              <span className="text-[11px] text-secondary/80 font-normal whitespace-nowrap">
                校内自提
              </span>
            </button>
          </div>
        </section>

        {/* 2. Clean Campus Tabs / Quick Filter Strip */}
        <section
          aria-label="商品分类筛选"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab && !activeZone;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveZone(undefined);
                  setActiveTab(tab);
                }}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] shrink-0 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-on-surface text-white font-medium'
                    : 'bg-white text-secondary hover:text-on-surface font-normal'
                }`}
              >
                {tab}
              </button>
            );
          })}
          {activeZone && (
            <button
              type="button"
              onClick={() => setActiveZone(undefined)}
              className="px-3 py-1.5 rounded-full bg-primary-fixed text-primary text-[12px] font-medium shrink-0 whitespace-nowrap"
            >
              {activeZone} ×
            </button>
          )}
        </section>

        {/* 3. Two-Column Waterfall Feed */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center space-y-2">
            <p className="text-sm text-on-surface font-medium">
              暂未找到匹配的校内闲置
            </p>
            <p className="text-xs text-secondary">
              可以切换分类，或去「求购广场」发布你的需求
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('推荐');
                setActiveZone(undefined);
              }}
              className="mt-2 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium"
            >
              查看全部闲置
            </button>
          </div>
        ) : (
          <section
            aria-label="闲置商品列表"
            className="grid grid-cols-2 gap-3.5"
          >
            {filteredProducts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(item)}
                className="bg-white rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-shadow hover:shadow-sm text-left"
              >
                <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.title}
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between pt-3.5 w-full">
                  <div>
                    <h3 className="text-[13.5px] font-normal text-on-surface line-clamp-2 leading-relaxed">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-2.5 pt-1">
                    {/* Price Line */}
                    <div className="flex items-baseline text-xy-coral font-bold tracking-tight tabular-nums">
                      <span className="text-xs font-semibold mr-0.5">¥</span>
                      <span className="text-[19px] leading-none">
                        {item.price}
                      </span>
                    </div>
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-[11px] text-secondary/70 mt-1.5 gap-1">
                      <span className="truncate">{item.location}</span>
                      <span className="shrink-0 whitespace-nowrap">
                        {item.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </section>
        )}

        {/* Bottom Hint */}
        <div className="py-6 text-center">
          <p className="text-xs text-secondary/70 font-medium">
            广东建设职业技术学院 · 校内当面验货自提
          </p>
          <p className="text-[11px] text-secondary/60 mt-1">
            清远环城东路北38号 | 广州白云丛云路306号 · 谨防私下转账
          </p>
        </div>
      </main>

      <BottomNavBar
        activeScreen="home"
        unreadTotal={unreadTotal}
        onNavigate={onNavigate}
      />
    </div>
  );
};
