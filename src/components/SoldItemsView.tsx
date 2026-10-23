import React, { useState } from 'react';

interface SoldItemsViewProps {
  onBack: () => void;
}

interface SoldRecordItem {
  id: string;
  receiptId: string;
  title: string;
  image: string;
  price: number;
  buyer: string;
  location: string;
}

const INITIAL_SOLD_ITEMS: SoldRecordItem[] = [
  {
    id: 'sold-1',
    receiptId: 'REC-20230914-01',
    title: '工程制图丁字尺+圆规套装',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBudINYbF4twxDej2p13Wc0rndxkOWKDRMPZwrmBT8stkILPL7RhxN1KZnwvbc_HFl0qEtQKz7Fgi8sL7H63PqFBkNDz47SOr2uwmTjilY3nZg5owws8nGHv-0YSqEprXCIrwOa1rExRPoYQs8P0A1HGCSzp2qINepiU6hM22MLJF0tlNW_ukE4WM5K_N0TkVhnh4vCL1gctqUwwLupbosxwsNeWusxqDQ4k_k8XNqOxnz0yCRBMbQK',
    price: 28,
    buyer: '建工系 · 周同学',
    location: '清远校区 · 桂园宿舍楼下',
  },
  {
    id: 'sold-2',
    receiptId: 'REC-20230910-04',
    title: '宿舍台式迷你静音小风扇',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgsdNVHXy4V0D06UecC6Q36FJbbZ8PRBkpJchWC1arUIFRKRNrkH6BoNEFpDrb0F6BCbvQCfI-Ok0kL4fQpvI2N2TKSQTd_deqIG2k8vhewlFgGYkRw2KgU4zCZxgjWMdUO0MPPssiJ08QxctR5_hgmnTV-03PW_JSkj8C64cwbcR112RKjJCHFEIuFrRfneLE1FvHYJHySvDzmSRjpr6r8nCn521CgMUMTpFObCEGj2Pd8q_BCa4',
    price: 15,
    buyer: '黄学姐',
    location: '清远校区 · 一食堂旁',
  },
  {
    id: 'sold-3',
    receiptId: 'REC-20230829-08',
    title: '索尼头戴降噪耳机 WH-1000XM4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsYFqElLCIknNgw0Rc3fE78nUJjuzRlZcJ52t3hf-qRh0tQuFuoE9_qc6xOIf-fmtdiEx_aLcAkamgibR7FCorSp7z1_cWzeCZzKzCLBncm2PNcSBfG9iRhk_qgxbnkbYfXt9W6lZrVMDLnY199ocmrlbU7c-dNTtOW2O_l_tqEE2eCC8G5npVuaiDjDtjwMhfhqPbXkNuAf6Qf42RDSVpwWHUvjfVfOIQi1XnMLrLTwn8g6NGAht',
    price: 880,
    buyer: '张同学',
    location: '广州校区 · 教学楼',
  },
];

export const SoldItemsView: React.FC<SoldItemsViewProps> = ({ onBack }) => {
  const [soldItems, setSoldItems] =
    useState<SoldRecordItem[]>(INITIAL_SOLD_ITEMS);
  const [activeReceipt, setActiveReceipt] = useState<SoldRecordItem | null>(
    null
  );

  const handleDelete = (id: string) => {
    setSoldItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface text-on-surface relative antialiased pb-16">
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
              已出卖出
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Top Eco Summary Pill */}
        <div className="px-margin pt-space-md pb-space-sm flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary/10 text-tertiary shadow-xs">
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span className="font-caption text-caption tracking-wide select-none text-tertiary">
              已流转{' '}
              <span className="font-headline-sm text-label-sm text-primary font-semibold">
                {Math.max(5, soldItems.length + 2)}
              </span>{' '}
              件闲置 · 助力建院低碳循环
            </span>
          </div>
        </div>

        {/* Content List with Generous Breathing Space */}
        <div className="px-margin flex flex-col gap-space-lg mt-space-sm">
          {soldItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-surface-container-lowest p-space-lg shadow-xs flex flex-col gap-space-md transition-all duration-300 border border-outline-variant/20"
            >
              <div className="flex items-start gap-space-md">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.title}
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                  <div className="flex items-start justify-between gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                      {item.title}
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-caption text-caption font-medium flex-shrink-0">
                      已面交完成
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-label-sm text-label-sm text-primary font-medium">
                      ¥
                    </span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-caption text-caption text-secondary truncate">
                    <span className="material-symbols-outlined text-[13px] text-secondary">
                      person
                    </span>
                    <span className="truncate">{item.buyer}</span>
                  </div>
                </div>
              </div>

              {/* Minimal Info Micro-Row */}
              <div className="flex items-center justify-between pt-space-xs">
                <div className="flex items-center gap-1.5 font-caption text-caption text-secondary/80 truncate pr-2">
                  <span className="material-symbols-outlined text-[13px] text-secondary/70">
                    location_on
                  </span>
                  <span className="truncate">{item.location}</span>
                </div>
                <span className="font-caption text-caption text-tertiary/90 bg-surface-container-low px-2 py-0.5 rounded flex-shrink-0">
                  已当面核销验货
                </span>
              </div>

              {/* Lightweight Minimalist Actions */}
              <div className="flex items-center justify-between pt-space-sm border-t border-surface-container-low">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="font-caption text-caption text-secondary/60 hover:text-error active:opacity-70 transition-colors flex items-center gap-1 py-1 px-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    delete_outline
                  </span>
                  <span>删除记录</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReceipt(item)}
                  className="font-label-sm text-label-sm text-on-surface bg-surface-container-low hover:bg-secondary-container active:scale-[0.98] transition-all px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer"
                >
                  <span>查看面交凭据</span>
                  <span className="material-symbols-outlined text-[14px] text-secondary">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Warm & Gentle Eco Milestone Note */}
        <div className="px-margin mt-space-xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="material-symbols-outlined text-[18px] text-primary/70">
              recycling
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface/90 font-medium">
            物品换个寝室，继续闪闪发光
          </p>
          <p className="font-caption text-caption text-secondary/60 mt-0.5">
            累计为校园减少约 8.4kg 碳排放
          </p>
        </div>

        {/* Receipt Bottom Sheet Modal */}
        {activeReceipt && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="校内面交电子凭据"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveReceipt(null);
            }}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center p-4"
          >
            <div className="w-full max-w-[400px] rounded-3xl bg-surface-container-lowest p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">
                      verified
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">
                      校内面交电子凭据
                    </h3>
                    <p className="text-[11px] text-secondary">
                      单号：{activeReceipt.receiptId}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveReceipt(null)}
                  className="text-secondary hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    close
                  </span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-secondary">
                  <span>流转物品</span>
                  <span className="text-on-surface font-semibold truncate max-w-[200px]">
                    {activeReceipt.title}
                  </span>
                </div>
                <div className="flex justify-between items-center text-secondary">
                  <span>成交款项</span>
                  <span className="text-primary font-bold text-sm">
                    ¥{activeReceipt.price}
                  </span>
                </div>
                <div className="flex justify-between items-center text-secondary">
                  <span>交验学友</span>
                  <span className="text-on-surface font-medium">
                    {activeReceipt.buyer}
                  </span>
                </div>
                <div className="flex justify-between items-center text-secondary">
                  <span>完成地点</span>
                  <span className="text-on-surface truncate max-w-[200px]">
                    {activeReceipt.location}
                  </span>
                </div>
                <div className="flex justify-between items-center text-secondary">
                  <span>核销方式</span>
                  <span className="text-tertiary font-medium">
                    当面双向动态码验核
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="w-full h-11 rounded-full bg-primary text-on-primary font-label-md text-label-md font-medium flex items-center justify-center mt-space-xs active:opacity-90 cursor-pointer"
              >
                我知道了
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
