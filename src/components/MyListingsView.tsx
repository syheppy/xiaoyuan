import React, { useState } from 'react';
import { ScreenId } from '../data/marketplaceData';

interface MyListingsViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

interface ListingItem {
  id: string;
  title: string;
  shortTitle: string;
  image: string;
  condition: string;
  conditionHighlight?: boolean;
  statusPill?: string;
  location: string;
  extraMeta?: string;
  price: number;
  views: number;
  wants: number;
  status: 'active' | 'pending' | 'sold';
}

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: 'item-1',
    title: '自用iPad Air 5 64G 考研出（配Pencil）',
    shortTitle: '自用iPad Air 5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLTJulqMeNDRTTRLGQ89N_4hm9qV2HtQnCiM1oM5Q2ruHqxProZCYq_WrnJVlCyb8PQxHJztUxQpPgGJV6G73lTzAUxNECMCkXcqBv6Zz7qD7D79nWK8SphTNuasfTbVY3l530kxFXwTKB4TLL7CP9I1btAz7RXGu0aL521ILlLIc9bWYwm70aDSgbgbYbXTkeYKtTW9B_Xasd-gfXzWOOgkWBPt8flkPEQ3e8N1ZFz5zktiH52I7Z',
    condition: '95新',
    conditionHighlight: true,
    statusPill: '正在展示',
    location: '清远校区自提',
    price: 2450,
    views: 128,
    wants: 6,
    status: 'active',
  },
  {
    id: 'item-2',
    title: '小熊宿舍多功能分体电煮锅 450W',
    shortTitle: '小熊多功能电煮锅',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxYmn7rLNi_Brggi7TaTo62Zb1d-lwJi5Q0ow_M2J9meu88aG7KVgQrifcsg4cXfcfpuvitz06BBkdLy46BXdAyjWJDOx54E1N1Yk2lZfcfRmqASjNHWR4hmumdS5jyeWulieyOWGFaZfYsiMWmy3pBbPSYdi-pstsb5keMYvuphitWyHKOTXsDH0s81_3PHur95HrD_-FyqTMOtC4UqaGx0Rq0BhoOB4-3gNiznAiF0qSo9Sx2DMP',
    condition: '9成新',
    location: '榕园自提',
    extraMeta: '· 450W限电友好',
    price: 35,
    views: 45,
    wants: 2,
    status: 'active',
  },
  {
    id: 'item-3',
    title: '加固金属折叠椅带厚坐垫',
    shortTitle: '加固金属折叠椅',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSP4Ofn8xUgmgGHkhN7iRAGT42Gi0TxTXE8oUao_rWR3kPY4cCOURz-9WFfmox4rpYGOkbA8MjLSNspqm_VmQD4Zw51GflBfU__ocIuf5avwjlDxHZ6GwjbOTJV-bfh7t-JkJ0BxcEmxhVn0w8UmBhHt4_kfg5kU-xLWl8s9H_ccpmOCdI8QCN8Q6nUyE5AGkYuTWmeKAl4389jd-aQUM3WxaVoq7fHYbXZ-L3VUEa8TXiytA4t3za',
    condition: '9成新',
    location: '桂园自提',
    extraMeta: '· 坐感扎实',
    price: 25,
    views: 62,
    wants: 4,
    status: 'active',
  },
];

export const MyListingsView: React.FC<MyListingsViewProps> = ({
  onBack,
  onNavigate,
}) => {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'sold'>(
    'active'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 1600);
  };

  const handlePriceDrop = (id: string, shortTitle: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const dropAmount = item.price > 500 ? 50 : 3;
        return { ...item, price: Math.max(1, item.price - dropAmount) };
      })
    );
    showToast(`已开启「${shortTitle}」降价提醒`);
  };

  const visibleListings = listings.filter((item) => item.status === activeTab);

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface text-on-surface relative antialiased pb-24">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-md border-b border-black/[0.03] pt-safe">
        <div className="h-14 px-margin flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              aria-label="返回"
              onClick={onBack}
              type="button"
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-on-surface hover:bg-black/[0.04] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">
                arrow_back
              </span>
            </button>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              在售发布
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Top Segmented Filter Bar */}
        <div className="px-margin pt-space-sm pb-space-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#F4F3F7] p-1 rounded-full">
            {[
              { id: 'active' as const, label: '全部在售', count: listings.filter((l) => l.status === 'active').length },
              { id: 'pending' as const, label: '审核中', count: 0 },
              { id: 'sold' as const, label: '已下架', count: 0 },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1 rounded-full font-medium text-[13px] transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFF1ED] text-[#E0634B] border border-[#E0634B]/30 shadow-xs'
                      : 'text-[#665c59] border border-transparent hover:text-[#1a1b1e]'
                  }`}
                >
                  {tab.label}{' '}
                  <span className="text-[11px] opacity-80">({tab.count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center text-[#665c59] text-[12px] font-medium">
            <span className="material-symbols-outlined text-[16px] mr-1 text-[#E0634B]">
              verified
            </span>
            <span>校内同城面交</span>
          </div>
        </div>

        {/* Content List */}
        {visibleListings.length === 0 ? (
          <div className="px-margin py-20 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-[28px]">
                inventory_2
              </span>
            </div>
            <p className="text-sm font-semibold text-on-surface">
              暂无相关物品
            </p>
            <p className="text-xs text-secondary mt-1">
              当前分类下空空如也，随时可发布新闲置
            </p>
          </div>
        ) : (
          <div className="px-margin pt-space-md pb-space-xl flex flex-col gap-space-lg">
            {visibleListings.map((item) => (
              <article
                key={item.id}
                className="relative flex flex-col p-4 bg-white rounded-2xl border border-[#EFEDF1] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F3F7]">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.title}
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-1 left-1 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded-md text-[11px] font-medium shadow-xs ${
                        item.conditionHighlight
                          ? 'text-[#E0634B]'
                          : 'text-[#665c59]'
                      }`}
                    >
                      {item.condition}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-24">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        {item.statusPill && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#FFF1ED] text-[#E0634B] text-[11px] font-medium">
                            {item.statusPill}
                          </span>
                        )}
                        <span className="text-[#665c59] text-[12px] flex items-center">
                          <span className="material-symbols-outlined text-[13px] mr-0.5 text-[#89726e]">
                            location_on
                          </span>
                          {item.location}
                        </span>
                        {item.extraMeta && (
                          <span className="text-[#89726e] text-[12px]">
                            {item.extraMeta}
                          </span>
                        )}
                      </div>
                      <h2 className="text-[15px] font-semibold text-[#1a1b1e] line-clamp-2 tracking-tight leading-snug">
                        {item.title}
                      </h2>
                    </div>

                    <div className="flex items-baseline text-[#E0634B]">
                      <span className="text-[13px] mr-0.5 font-bold">¥</span>
                      <span className="text-[22px] font-bold leading-none tracking-tight">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F4F3F7] flex items-center justify-between">
                  <span className="text-[#89726e] text-[12px] flex items-center gap-2">
                    <span className="flex items-center">
                      <span className="material-symbols-outlined text-[15px] mr-1 text-[#89726e]">
                        visibility
                      </span>
                      {item.views} 浏览
                    </span>
                    <span className="text-[#dcc0bb]">·</span>
                    <span className="flex items-center">
                      <span className="material-symbols-outlined text-[15px] mr-1 text-[#89726e]">
                        favorite_border
                      </span>
                      {item.wants} 想要
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        showToast('进入编辑页面...');
                        window.setTimeout(() => onNavigate('publish'), 400);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#F4F3F7] text-[#56423f] text-[12px] font-medium hover:bg-[#EAE8ED] active:scale-95 transition-all cursor-pointer"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handlePriceDrop(item.id, item.shortTitle)
                      }
                      className="px-3 py-1.5 rounded-full bg-[#FFF1ED] text-[#E0634B] border border-[#E0634B]/20 text-[12px] font-medium hover:bg-[#FFE3DB] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        trending_down
                      </span>
                      <span>降价</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Floating Bottom CTA */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button
            type="button"
            onClick={() => onNavigate('publish')}
            className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#E0634B] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(224,99,75,0.35)] hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>发布新闲置</span>
          </button>
        </div>

        {/* Toast */}
        <div
          className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-space-lg py-2 bg-inverse-surface/90 backdrop-blur-xs text-inverse-on-surface font-label-sm text-label-sm rounded-full shadow-lg pointer-events-none transition-opacity duration-300 z-50 ${
            toastMsg ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {toastMsg || '操作成功'}
        </div>
      </main>
    </div>
  );
};
