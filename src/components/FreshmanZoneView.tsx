import React, { useEffect, useState } from 'react';
import {
  ProductItem,
  ScreenId,
  ZONE_CONFIGS,
  ZoneId,
  filterZoneItems,
} from '../data/marketplaceData';

interface FreshmanZoneViewProps {
  zoneId?: ZoneId;
  onBack: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const FreshmanZoneView: React.FC<FreshmanZoneViewProps> = ({
  zoneId = 'freshman',
  onBack,
  onSelectProduct,
  onNavigate,
}) => {
  const config = ZONE_CONFIGS[zoneId] || ZONE_CONFIGS.freshman;
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setSelectedCategory('全部');
    setSearchKeyword('');
    setShowSearch(false);
  }, [zoneId]);

  const filteredItems = filterZoneItems(
    zoneId,
    selectedCategory,
    searchKeyword
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface-container-lowest shadow-sm relative pb-16">
      {/* Shared TopAppBar Anchor Component */}
      <div className="w-full bg-surface-container-lowest sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest">
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="size-10 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform"
          >
            <svg
              fill="currentColor"
              height="22px"
              viewBox="0 0 256 256"
              width="22px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-on-surface tracking-tight">
            {config.title}
          </h1>
          <button
            type="button"
            aria-label={`搜索${config.title}好物`}
            onClick={() => setShowSearch((prev) => !prev)}
            className="size-10 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform"
          >
            <svg
              fill="currentColor"
              height="20px"
              viewBox="0 0 256 256"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </button>
        </div>

        {showSearch && (
          <div className="px-4 pb-2">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={config.searchPlaceholder}
              className="w-full rounded-xl bg-surface-container-low px-3.5 py-2 text-xs text-on-surface placeholder:text-secondary focus:outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar">
          {config.tabs.map((tab) => {
            const active = selectedCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`px-3 py-1 rounded-full text-xs shrink-0 transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-secondary-fixed/60 font-semibold text-on-surface'
                    : 'font-normal text-secondary hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Product Grid */}
      {filteredItems.length === 0 ? (
        <div className="px-4 py-12 text-center flex-1 flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-on-surface font-medium">
            暂无符合筛选的{config.title}好物
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('全部');
              setSearchKeyword('');
            }}
            className="mt-1 px-3.5 py-1.5 rounded-full bg-secondary-fixed/60 text-xs font-semibold text-on-surface"
          >
            重置筛选
          </button>
        </div>
      ) : (
        <main className="px-4 pt-3 pb-8 grid grid-cols-2 gap-3.5 flex-1">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden group cursor-pointer text-left"
            >
              <div className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={item.title}
                  src={item.image}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-surface-container-lowest/85 backdrop-blur text-[10px] text-secondary">
                  {item.condition}
                </span>
              </div>
              <div className="pt-2 flex flex-col gap-1.5 w-full">
                <h3 className="text-xs font-normal text-on-surface line-clamp-1 leading-normal">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline text-primary font-semibold text-sm tabular-nums">
                    <span>¥</span>
                    <span className="text-base ml-0.5">{item.price}</span>
                    {item.price === 0 && (
                      <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium leading-none">
                        0元送
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-secondary/70">
                    {item.location}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </main>
      )}

      {/* Zone Dorm/Campus Tip */}
      <div className="px-4 mb-5">
        <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-outline-variant/30">
          <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">
              tips_and_updates
            </span>
            <span>{config.tipTitle}</span>
          </div>
          <p className="text-[11px] text-secondary leading-relaxed">
            {config.tipContent}
          </p>
        </div>
      </div>

      <div className="px-4 pb-8 text-center">
        <p className="text-[11px] text-secondary/70">
          已显示清远/广州校区精选好物 · 没找到想要的？
          <button
            type="button"
            onClick={() => onNavigate('wanted')}
            className="text-primary hover:underline ml-0.5 font-medium"
          >
            去「求购」发布 ➔
          </button>
        </p>
      </div>

      {/* Floating Quick Action: Publish */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pointer-events-none z-30 flex justify-end">
        <button
          type="button"
          aria-label="发布闲置"
          onClick={() => onNavigate('publish')}
          className="pointer-events-auto size-12 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg
            fill="currentColor"
            height="22px"
            viewBox="0 0 256 256"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
