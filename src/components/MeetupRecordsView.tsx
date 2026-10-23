import React, { useState } from 'react';
import { HOTLINK_IMAGES, ScreenId } from '../data/marketplaceData';

interface MeetupRecordsViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

interface MeetupItem {
  id: string;
  title: string;
  image: string;
  condition: string;
  price: number;
  partnerName: string;
  partnerDept: string;
  role: '买入' | '卖出';
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  code: string;
}

const INITIAL_MEETUPS: MeetupItem[] = [
  {
    id: 'm-1',
    title: '工程制图丁字尺+圆规套装',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBudINYbF4twxDej2p13Wc0rndxkOWKDRMPZwrmBT8stkILPL7RhxN1KZnwvbc_HFl0qEtQKz7Fgi8sL7H63PqFBkNDz47SOr2uwmTjilY3nZg5owws8nGHv-0YSqEprXCIrwOa1rExRPoYQs8P0A1HGCSzp2qINepiU6hM22MLJF0tlNW_ukE4WM5K_N0TkVhnh4vCL1gctqUwwLupbosxwsNeWusxqDQ4k_k8XNqOxnz0yCRBMbQK',
    condition: '95新',
    price: 30,
    partnerName: '周同学',
    partnerDept: '建筑工程系',
    role: '买入',
    time: '今日 18:30',
    location: '清远校区 · 一食堂门口',
    status: 'upcoming',
    code: 'JY-8642',
  },
  {
    id: 'm-2',
    title: '自用考研 iPad 9代 64G 银色',
    image: HOTLINK_IMAGES.ipadThumb,
    condition: '95新',
    price: 1350,
    partnerName: '陈学姐',
    partnerDept: '工程造价',
    role: '买入',
    time: '今日 19:00',
    location: '清远校区 · 桂园宿舍楼下',
    status: 'upcoming',
    code: 'JY-3915',
  },
  {
    id: 'm-3',
    title: '富士拍立得 mini11（送相纸）',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOBsy8RSsmduByUyZlW7GQlexJCsYYnsg6L-ef2na_toZot7VHWa-MjHlYg51q70w6fA53PaDJk70ePEwTTzQoIzom8Jg18k7mu7Ep6iDJPYGHIOqzzKow5ou453Eas7tVZYMaLqdhPe6qcH8X87kWY8i-ZH7tz9fkvM7YpARGmi1Gm6RZXgFn1Oyt2pGGZVbOobS5_psfJlXhRnuA6jgsrvDfdQ9xVj8f7cjdgBetr4McyNr_DHg',
    condition: '9成新',
    price: 260,
    partnerName: '陈学姐',
    partnerDept: '建筑工程系',
    role: '买入',
    time: '昨天 17:40',
    location: '清远校区 · 图文信息中心',
    status: 'completed',
    code: 'JY-5028',
  },
  {
    id: 'm-4',
    title: '宿舍台式迷你静音小风扇',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIgsdNVHXy4V0D06UecC6Q36FJbbZ8PRBkpJchWC1arUIFRKRNrkH6BoNEFpDrb0F6BCbvQCfI-Ok0kL4fQpvI2N2TKSQTd_deqIG2k8vhewlFgGYkRw2KgU4zCZxgjWMdUO0MPPssiJ08QxctR5_hgmnTV-03PW_JSkj8C64cwbcR112RKjJCHFEIuFrRfneLE1FvHYJHySvDzmSRjpr6r8nCn521CgMUMTpFObCEGj2Pd8q_BCa4',
    condition: '9成新',
    price: 15,
    partnerName: '黄学姐',
    partnerDept: '市政经管',
    role: '卖出',
    time: '3天前 12:20',
    location: '清远校区 · 一食堂旁',
    status: 'completed',
    code: 'JY-1190',
  },
];

export const MeetupRecordsView: React.FC<MeetupRecordsViewProps> = ({
  onBack,
  onNavigate,
}) => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [records, setRecords] = useState<MeetupItem[]>(INITIAL_MEETUPS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2000);
  };

  const handleCompleteMeetup = (id: string) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'completed' } : item
      )
    );
    showToast('已确认当面交接完成');
  };

  const filtered = records.filter((r) => r.status === tab);
  const upcomingCount = records.filter((r) => r.status === 'upcoming').length;
  const completedCount = records.filter((r) => r.status === 'completed').length;

  return (
    <div className="w-full min-h-screen bg-background text-on-surface antialiased flex flex-col relative pb-12 font-['Plus_Jakarta_Sans','Noto_Sans_SC',sans-serif]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-outline-variant/20 px-3 pt-3 pb-3">
        <div className="flex items-center justify-between h-10">
          <button
            aria-label="返回上一页"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-semibold text-on-surface tracking-tight">
            面交记录与约定
          </h1>
          <div className="w-9 h-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 pt-3.5 space-y-3">
        {/* Segmented Control */}
        <div className="bg-surface-container p-1 rounded-2xl grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setTab('upcoming')}
            className={`py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'upcoming'
                ? 'bg-white text-on-surface font-semibold shadow-2xs'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            待面交 ({upcomingCount})
          </button>
          <button
            type="button"
            onClick={() => setTab('completed')}
            className={`py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'completed'
                ? 'bg-white text-on-surface font-semibold shadow-2xs'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            已完成 ({completedCount})
          </button>
        </div>

        {/* Records List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-outline-variant/30 p-8 text-center space-y-2">
            <p className="text-sm font-medium text-on-surface">
              暂无相关面交记录
            </p>
            <p className="text-xs text-secondary/80">
              在私聊中与校友约定时间和地点后会自动生成记录
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-3.5 space-y-3"
              >
                {/* Top Row: Time & Status */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-on-surface">
                    <span className="material-symbols-outlined !text-[16px] text-secondary">
                      schedule
                    </span>
                    <span>{item.time}</span>
                    <span className="text-secondary/50">·</span>
                    <span className="text-secondary">
                      {item.role}（{item.partnerName} · {item.partnerDept}）
                    </span>
                  </div>
                  {item.status === 'upcoming' ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container text-primary shrink-0">
                      待当面验货
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#2E7D32] shrink-0">
                      <span className="material-symbols-outlined !text-[12px] fill-icon">
                        check_circle
                      </span>
                      已交接
                    </span>
                  )}
                </div>

                {/* Middle Row: Image + Item Info + Price */}
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/55 text-white text-[10px] leading-none">
                      {item.condition}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-on-surface truncate">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold text-primary shrink-0 tabular-nums">
                        ¥{item.price}
                      </span>
                    </div>
                    <div className="mt-2 bg-surface-container-low rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-secondary truncate">
                        <span className="material-symbols-outlined !text-[14px]">
                          location_on
                        </span>
                        <span className="truncate">{item.location}</span>
                      </div>
                      <span className="text-[11px] font-mono text-secondary/80 shrink-0 ml-2">
                        核销码 {item.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-secondary/70">
                    支持现场验货后当面结清
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('chat')}
                      className="px-3 py-1.5 rounded-xl border border-outline-variant/40 text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      联系对方
                    </button>
                    {item.status === 'upcoming' && (
                      <button
                        type="button"
                        onClick={() => handleCompleteMeetup(item.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-medium hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                      >
                        确认已自提
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-on-surface/90 text-surface text-xs font-medium px-4 py-2 rounded-full shadow-md whitespace-nowrap">
          {toastMsg}
        </div>
      )}
    </div>
  );
};
