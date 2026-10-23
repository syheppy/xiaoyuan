import React, { useState } from 'react';
import { ScreenId } from '../data/marketplaceData';

interface PurchasedItemsViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

interface PurchasedRecordItem {
  id: string;
  title: string;
  image: string;
  cornerTag: string;
  sellerInfo: string;
  sellerShortName: string;
  price: number;
  pickupLocation: string;
  completedTime: string;
}

const INITIAL_PURCHASED_ITEMS: PurchasedRecordItem[] = [
  {
    id: 'buy-1',
    title: '富士拍立得 mini11',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOBsy8RSsmduByUyZlW7GQlexJCsYYnsg6L-ef2na_toZot7VHWa-MjHlYg51q70w6fA53PaDJk70ePEwTTzQoIzom8Jg18k7mu7Ep6iDJPYGHIOqzzKow5ou453Eas7tVZYMaLqdhPe6qcH8X87kWY8i-ZH7tz9fkvM7YpARGmi1Gm6RZXgFn1Oyt2pGGZVbOobS5_psfJlXhRnuA6jgsrvDfdQ9xVj8f7cjdgBetr4McyNr_DHg',
    cornerTag: '送相纸',
    sellerInfo: '陈学姐 · 建筑工程',
    sellerShortName: '陈学姐',
    price: 260,
    pickupLocation: '清远校区 · 图文信息中心',
    completedTime: '昨天',
  },
  {
    id: 'buy-2',
    title: '建筑力学考研教材与重点笔记',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkRIyL0GbRdoST8aGey_w4hfN4bPtP3yZAiV7FRSdGfo-yIyJrOS5HVGf7-sglUh2RRWdmnrNJaPGwD8JFRZobt0xB4hnvORA9iL1-AU9cEI_nEiH1pEdTWgliImd7_HUXXXJHgclF4vgL4J99SgNxL_8b-GxPCSm8eI-0p0uCla_gaCy3JKy8BdzbLxe2UE33AEXkNakckikkKXmeOiIhmMI2koSECUe5I7Qdj3assLwC9JPRWZTy',
    cornerTag: '笔记全',
    sellerInfo: '林学长 · 广州校区',
    sellerShortName: '林学长',
    price: 18,
    pickupLocation: '广州校区 · 榕园宿舍区',
    completedTime: '3天前',
  },
];

export const PurchasedItemsView: React.FC<PurchasedItemsViewProps> = ({
  onBack,
  onNavigate,
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface text-on-surface relative antialiased pb-16">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-md border-b border-black/[0.03] pt-safe">
        <div className="h-14 px-margin flex items-center justify-between">
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
            买到好物
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Subheader */}
        <div className="px-margin pt-4 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-semibold text-on-surface">
              全部好物
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF1ED] text-[#E0634B] text-[11px] font-semibold">
              {INITIAL_PURCHASED_ITEMS.length}
            </span>
          </div>
          <span className="text-[12px] text-secondary/80">
            已完成面交 · 校园留存
          </span>
        </div>

        {/* Purchased Cards List */}
        <div className="px-margin flex flex-col gap-4">
          {INITIAL_PURCHASED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col gap-3.5 border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-200"
            >
              {/* Media + Primary Info */}
              <div className="flex gap-3.5 items-start">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.title}
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 text-[10px] font-medium text-on-tertiary bg-tertiary/85 backdrop-blur-xs px-1.5 py-0.5 rounded">
                    {item.cornerTag}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
                  <div className="flex flex-col">
                    <h2 className="text-[16px] font-semibold text-on-surface truncate tracking-tight">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-secondary/70">
                        转让人
                      </span>
                      <span className="text-[12px] text-on-surface-variant font-medium">
                        {item.sellerInfo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-[13px] font-semibold text-[#E0634B]">
                      ¥
                    </span>
                    <span className="text-[22px] font-bold text-[#E0634B] tracking-tight leading-none">
                      {item.price}
                    </span>
                    <span className="text-[11px] text-secondary/70 ml-1.5">
                      买入价
                    </span>
                  </div>
                </div>
              </div>

              {/* Meta Info Strip */}
              <div className="bg-surface-container-low/70 rounded-xl px-3 py-2 flex flex-col gap-1.5 text-secondary border border-black/[0.02]">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#89726E]">
                    <span className="material-symbols-outlined text-[17px] opacity-80">
                      location_on
                    </span>
                    提货地点
                  </span>
                  <span className="text-on-surface font-medium text-[12px] truncate max-w-[190px]">
                    {item.pickupLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-1 text-[#89726E]">
                    <span className="material-symbols-outlined text-[17px] opacity-80">
                      schedule
                    </span>
                    面交完成
                  </span>
                  <span className="text-on-surface-variant font-normal text-[12px]">
                    {item.completedTime}
                  </span>
                </div>
              </div>

              {/* Quick Actions Pills */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`正在为您连线${item.sellerShortName}...`);
                    window.setTimeout(() => onNavigate('chat'), 450);
                  }}
                  className="flex-1 h-9 rounded-full bg-[#F4F3F7] hover:bg-[#eae8ee] text-[#56423F] text-[13px] font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#89726E]">
                    chat_bubble_outline
                  </span>
                  <span>联系对方</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`正在打开${item.sellerShortName}的闲置书架...`);
                    window.setTimeout(() => onNavigate('home'), 500);
                  }}
                  className="flex-1 h-9 rounded-full bg-[#FFF1ED] hover:bg-[#ffe6df] text-[#E0634B] border border-[#E0634B]/20 text-[13px] font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#E0634B]">
                    storefront
                  </span>
                  <span>再看看TA的闲置</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Journal End Note */}
        <div className="mt-10 px-margin flex flex-col items-center justify-center text-center gap-1.5 select-none">
          <div className="w-5 h-0.5 rounded-full bg-secondary-container/80 mb-1" />
          <p className="text-[12px] text-secondary/80 font-normal tracking-wide">
            好物在校园流转 · 记忆在彼此传递
          </p>
          <p className="text-[11px] text-secondary/50">
            广东建院二手无忧面交存档
          </p>
        </div>

        {/* Interactive Feedback Toast Container */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 z-50 ${
            toastMsg
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="bg-inverse-surface/90 backdrop-blur-md text-inverse-on-surface text-[13px] px-4 py-2 rounded-full shadow-md flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">
              check_circle
            </span>
            <span>{toastMsg || '提示'}</span>
          </div>
        </div>
      </main>
    </div>
  );
};
