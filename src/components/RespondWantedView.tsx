import React, { useState } from 'react';
import {
  HOTLINK_IMAGES,
  WantedItem,
  evaluateOfferPrice,
} from '../data/marketplaceData';

interface RespondWantedViewProps {
  wantedItem: WantedItem;
  onBack: () => void;
  onOpenChatWithBuyer: (wantedItem: WantedItem, offerSummary?: string) => void;
}

const MATCHED_IDLE_CANDIDATES = [
  {
    title: '小熊宿舍分体电煮锅 450W',
    condition: '9成新',
    meta: '原发布价 ¥35 · 宿舍不跳闸带蒸笼',
    image: HOTLINK_IMAGES.cookerMatched,
  },
  {
    title: '罗技 Pebble 静音无线鼠标 珊瑚粉',
    condition: '95新',
    meta: '原发布价 ¥38 · 图书馆静音无磨损',
    image: HOTLINK_IMAGES.mouse1,
  },
  {
    title: '自用考研 iPad 9代 64G 银色',
    condition: '95新',
    meta: '原发布价 ¥1350 · 带电容笔与保护壳',
    image: HOTLINK_IMAGES.ipadThumb,
  },
];

const LOCATION_OPTIONS = [
  '榕香园1号楼架空层',
  '一食堂西门口',
  '图文信息中心大堂',
];

const TIME_OPTIONS = ['今晚 19:30 - 21:00', '明天中午 12:00 - 13:00'];

export const RespondWantedView: React.FC<RespondWantedViewProps> = ({
  wantedItem,
  onBack,
  onOpenChatWithBuyer,
}) => {
  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [quickNewTitle, setQuickNewTitle] = useState('');
  const [offerPrice, setOfferPrice] = useState<number>(
    wantedItem.recommendedPrice || 25
  );
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_OPTIONS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
  const [message, setMessage] = useState(
    '锅很好用，毕业打包转让，今晚就能在榕香园拿给你~ 支持插电试用。'
  );
  const [submitting, setSubmitting] = useState<'idle' | 'sending' | 'done'>(
    'idle'
  );

  const activeCandidate = MATCHED_IDLE_CANDIDATES[candidateIndex];
  const priceEval = evaluateOfferPrice(
    offerPrice,
    wantedItem.budgetMin,
    wantedItem.budgetMax
  );

  const insertQuickMsg = (phrase: string) => {
    if (message.includes(phrase)) return;
    const next = (message ? `${message} ` : '') + phrase;
    if (next.length <= 100) {
      setMessage(next);
    }
  };

  const handleConfirmRespond = () => {
    setSubmitting('sending');
    setTimeout(() => {
      setSubmitting('done');
      setTimeout(() => {
        const itemTitle =
          mode === 'existing'
            ? activeCandidate.title
            : quickNewTitle.trim() || '九阳折叠电煮锅 500W';
        const summary = `我用「${itemTitle}」响应了你的求购，意向报价 ¥${offerPrice}，约在 ${selectedLocation}（${selectedTime}）当面验货。${message}`;
        onOpenChatWithBuyer(wantedItem, summary);
      }, 900);
    }, 400);
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface flex flex-col min-h-screen w-full relative">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
        <div className="h-14 px-margin flex items-center justify-between">
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-on-surface active:opacity-60 transition-opacity"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back_ios_new
            </span>
          </button>
          <h1 className="text-[17px] font-semibold text-on-surface select-none pr-10 flex-1 text-center">
            响应求购
          </h1>
        </div>
      </header>

      <main className="flex flex-col relative w-full pb-28 bg-surface-container-lowest flex-1">
        {/* 买家求购需求卡片 */}
        <section className="px-4 pt-4">
          <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-semibold text-on-secondary-container text-sm shrink-0">
                  {wantedItem.userSurname}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-on-surface truncate">
                    {wantedItem.userName} · {wantedItem.userDept}
                  </span>
                  <span className="text-[11px] text-outline">
                    {wantedItem.campus}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 tabular-nums">
                <span className="text-[11px] text-outline block">求购预算</span>
                <span className="text-base text-primary font-bold tracking-tight">
                  {wantedItem.budgetText}
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-3 flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                check_circle
              </span>
              <span className="text-[13px] leading-snug">
                {wantedItem.shortNeed}
              </span>
            </div>
          </div>
        </section>

        {/* 功能区一：选择要转让的闲置（双模式微切换） */}
        <section className="px-4 pt-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-on-surface">
              选择转让物品
            </span>
            <div className="flex items-center bg-surface-container-low p-0.5 rounded-xl gap-0.5">
              <button
                type="button"
                onClick={() => setMode('existing')}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all whitespace-nowrap ${
                  mode === 'existing'
                    ? 'font-semibold bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                已发闲置 (1)
              </button>
              <button
                type="button"
                onClick={() => setMode('new')}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-all whitespace-nowrap ${
                  mode === 'new'
                    ? 'font-semibold bg-surface-container-lowest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                快速新转
              </button>
            </div>
          </div>

          {mode === 'existing' ? (
            <div className="bg-surface-container-low rounded-2xl p-3 flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                <img
                  alt={activeCandidate.title}
                  className="w-full h-full object-cover"
                  src={activeCandidate.image}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-inverse-surface/80 text-inverse-on-surface text-[10px] leading-none">
                  {activeCandidate.condition}
                </span>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-medium text-on-surface truncate">
                    {activeCandidate.title}
                  </h3>
                </div>
                <p className="text-[11px] text-outline truncate">
                  {activeCandidate.meta}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCandidateIndex(
                    (prev) => (prev + 1) % MATCHED_IDLE_CANDIDATES.length
                  )
                }
                className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-[11px] font-medium border border-outline-variant/30 shrink-0 hover:bg-surface-container-high active:opacity-70 transition-all"
              >
                重选
              </button>
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl border border-dashed border-outline-variant/60 bg-surface-container-lowest flex flex-col items-center justify-center text-outline shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    add_a_photo
                  </span>
                  <span className="text-[10px] mt-0.5">拍锅具</span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <input
                    type="text"
                    value={quickNewTitle}
                    onChange={(e) => setQuickNewTitle(e.target.value)}
                    placeholder="物品名称（例：九阳折叠电煮锅 500W）"
                    className="w-full bg-surface-container-lowest px-3 py-1.5 rounded-xl text-[13px] text-on-surface placeholder:text-outline focus:outline-none"
                  />
                  <span className="text-[11px] text-outline px-1">
                    支持快速面交，免去繁琐发布流程
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 功能区二：转让意向报价 */}
        <section className="px-4 pt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-on-surface">
              转让意向报价
            </span>
            <span className="text-[11px] text-outline">
              对方预算 {wantedItem.budgetText}
            </span>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-on-surface-variant">
                意向价格
              </span>
              <div className="flex items-center gap-1 text-primary tabular-nums">
                <span className="text-[18px] font-semibold">¥</span>
                <input
                  aria-label="意向价格"
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value) || 0)}
                  className="w-20 text-right text-[22px] font-bold bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/30 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-outline shrink-0">快捷：</span>
              {[
                { label: '¥20', val: 20 },
                { label: '¥25 (推荐)', val: 25 },
                { label: '¥30', val: 30 },
                { label: '0元赠送', val: 0, isFree: true },
              ].map((chip) => {
                const active = offerPrice === chip.val;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setOfferPrice(chip.val)}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all shrink-0 whitespace-nowrap ${
                      active
                        ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                        : chip.isFree
                        ? 'bg-surface-container-lowest text-tertiary hover:bg-tertiary/10'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-secondary">{priceEval.message}</p>
          </div>
        </section>

        {/* 功能区三：约定校内面交 */}
        <section className="px-4 pt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-on-surface">
              约定校内面交
            </span>
            <span className="text-[11px] text-outline">当面验电更放心</span>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                  location_on
                </span>
                <span className="text-[11px] text-outline">选择面交地点</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-6">
                {LOCATION_OPTIONS.map((loc) => {
                  const active = selectedLocation === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-1 rounded-xl text-[11px] transition-all whitespace-nowrap ${
                        active
                          ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                          : 'bg-surface-container-lowest/60 text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                  schedule
                </span>
                <span className="text-[11px] text-outline">方便面交时间</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-6">
                {TIME_OPTIONS.map((tm) => {
                  const active = selectedTime === tm;
                  return (
                    <button
                      key={tm}
                      type="button"
                      onClick={() => setSelectedTime(tm)}
                      className={`px-3 py-1 rounded-xl text-[11px] transition-all whitespace-nowrap ${
                        active
                          ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                          : 'bg-surface-container-lowest/60 text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {tm}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 功能区四：给对方留言 */}
        <section className="px-4 pt-5 pb-8 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-semibold text-on-surface">
              给对方留言
            </span>
            <span className="text-[11px] text-outline tabular-nums">
              {message.length}/100
            </span>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-3.5 flex flex-col gap-2.5">
            <textarea
              aria-label="给对方留言"
              rows={2}
              maxLength={100}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent text-[13px] text-on-surface placeholder:text-outline focus:outline-none resize-none leading-relaxed"
              placeholder="给林学妹留言…（如成色完好，可现场试电）"
            />
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-outline-variant/20">
              {[
                { label: '+ 带原装蒸笼', text: '带原装蒸笼' },
                { label: '+ 现场试电', text: '支持现场试电' },
                { label: '+ 附送收纳包', text: '附送收纳包' },
              ].map((phrase) => (
                <button
                  key={phrase.label}
                  type="button"
                  onClick={() => insertQuickMsg(phrase.text)}
                  className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-outline text-[11px] whitespace-nowrap hover:text-primary transition-all"
                >
                  {phrase.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Dock */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 px-4 py-3 z-30 flex items-center gap-3 shadow-lg">
          <button
            type="button"
            onClick={() => onOpenChatWithBuyer(wantedItem)}
            className="h-12 px-4 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center gap-1.5 text-on-surface text-sm font-medium shrink-0 active:opacity-70 transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              chat_bubble_outline
            </span>
            <span>先聊聊</span>
          </button>
          <button
            type="button"
            disabled={submitting !== 'idle'}
            onClick={handleConfirmRespond}
            className={`flex-1 h-12 rounded-full text-white text-base font-semibold flex items-center justify-center gap-2 shadow-md active:opacity-90 transition-all whitespace-nowrap ${
              submitting === 'done' ? 'bg-tertiary' : 'bg-primary'
            }`}
          >
            {submitting === 'sending' ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>正在发送响应...</span>
              </>
            ) : submitting === 'done' ? (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
                <span>已发送！等待确认</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  handshake
                </span>
                <span>确认响应 · 发起面交约定</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
