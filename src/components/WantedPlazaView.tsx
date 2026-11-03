import React, { useState } from 'react';
import {
  ScreenId,
  WantedItem,
  buildWantedItem,
  filterWantedItems,
} from '../data/marketplaceData';
import { BottomNavBar } from './BottomNavBar';

interface WantedPlazaViewProps {
  wantedItems: WantedItem[];
  campus: '清远校区' | '广州校区';
  onToggleCampus: () => void;
  onRespondWanted: (item: WantedItem) => void;
  onAddWanted: (newWanted: WantedItem) => void;
  onDeleteWanted?: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  unreadTotal: number;
}

const WANTED_CATEGORIES = [
  { label: '全部', value: 'all' },
  { label: '工程制图', value: '建筑与工程绘图' },
  { label: '宿舍好物', value: '宿舍生活好物' },
  { label: '教材书籍', value: '教材与考证' },
  { label: '数码配件', value: '数码配件' },
] as const;

const QUICK_DESC_TAGS = [
  '下周急用',
  '功能完好即可',
  '随时宿舍楼下自提',
];

const WANTED_TEMPLATES: {
  label: string;
  title: string;
  category: WantedItem['category'];
  budgetMin: string;
  budgetMax: string;
  locationSuffix: string;
  desc: string;
}[] = [
  {
    label: '工程制图尺规',
    title: '急收一套大一工程制图丁字尺+圆规套装',
    category: '建筑与工程绘图',
    budgetMin: '20',
    budgetMax: '35',
    locationSuffix: '桂香园宿舍',
    desc: '下周制图课急用，刻度清晰无缺角即可，桂香园或教学楼随时可下楼自提。',
  },
  {
    label: '宿舍小电煮锅',
    title: '收一个500W内宿舍可用小电煮锅',
    category: '宿舍生活好物',
    budgetMin: '20',
    budgetMax: '35',
    locationSuffix: '榕香园/一食堂',
    desc: '平时在宿舍煮面用，不跳闸、内胆完好即可，支持当面通电验收。',
  },
  {
    label: '二建/专升本教材',
    title: '收全套二建建筑实务教材+真题笔记',
    category: '教材与考证',
    budgetMin: '15',
    budgetMax: '30',
    locationSuffix: '图文信息中心',
    desc: '备考急需，有重点笔记更佳，图文信息中心大堂当面自提。',
  },
  {
    label: '自习降噪耳机',
    title: '收一副头戴式无线降噪耳机',
    category: '数码配件',
    budgetMin: '120',
    budgetMax: '260',
    locationSuffix: '图文信息中心',
    desc: '图书馆看网课用，降噪与续航正常即可，支持校内当面试听。',
  },
];

export const WantedPlazaView: React.FC<WantedPlazaViewProps> = ({
  wantedItems,
  campus,
  onToggleCampus,
  onRespondWanted,
  onAddWanted,
  onDeleteWanted,
  onNavigate,
  unreadTotal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [justPostedBanner, setJustPostedBanner] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<WantedItem['category']>('宿舍生活好物');
  const [budgetMin, setBudgetMin] = useState('20');
  const [budgetMax, setBudgetMax] = useState('35');
  const [newDept, setNewDept] = useState('建工系·大一');
  const [newLoc, setNewLoc] = useState(`${campus} · 桂香园宿舍`);
  const [newDesc, setNewDesc] = useState('');
  const [postError, setPostError] = useState('');

  const filteredWanted = filterWantedItems(
    wantedItems,
    searchQuery,
    selectedCategory
  );

  const pickupSpots = [
    `${campus} · 桂香园宿舍`,
    `${campus} · 榕香园/一食堂`,
    `${campus} · 图文信息中心`,
    '广州校区 · 丛云路自提',
  ];

  const handleOpenPostModal = () => {
    setPostError('');
    setNewLoc(`${campus} · 桂香园宿舍`);
    setShowPostModal(true);
  };

  const handleApplyTemplate = (tpl: (typeof WANTED_TEMPLATES)[number]) => {
    setNewTitle(tpl.title);
    setNewCategory(tpl.category);
    setBudgetMin(tpl.budgetMin);
    setBudgetMax(tpl.budgetMax);
    setNewLoc(`${campus} · ${tpl.locationSuffix}`);
    setNewDesc(tpl.desc);
    setPostError('');
  };

  const handleAppendDescTag = (tag: string) => {
    setNewDesc((prev) => {
      if (prev.includes(tag)) return prev;
      return prev.trim() ? `${prev.trim()}，${tag}` : tag;
    });
  };

  const handleCreateWanted = (e: React.FormEvent) => {
    e.preventDefault();
    const result = buildWantedItem({
      title: newTitle,
      category: newCategory,
      budgetMin,
      budgetMax,
      location: newLoc,
      campus,
      userDept: newDept,
      description: newDesc,
    });

    if (!result.valid || !result.item) {
      setPostError(result.error || '请完善求购信息后再发布');
      return;
    }

    onAddWanted(result.item);
    setSelectedCategory('all');
    setSearchQuery('');
    setJustPostedBanner(`已成功发布求购：「${result.item.title}」`);
    setNewTitle('');
    setNewDesc('');
    setPostError('');
    setShowPostModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-on-surface font-sans flex flex-col relative antialiased pb-32">
      {/* 顶部吸顶区域：导航标题 + 搜索 + 标签分类 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 pt-3 pb-2.5 border-b border-black/[0.04]">
        {/* 第一行：页面标题与校区选择 */}
        <div className="flex items-center justify-between">
          <h1 className="text-[17px] font-bold text-on-surface tracking-tight">
            求购广场
          </h1>
          <button
            type="button"
            onClick={onToggleCampus}
            aria-label={`切换校区，当前为${campus}`}
            className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[11.5px] font-medium text-secondary whitespace-nowrap">
              {campus}
            </span>
            <span className="material-symbols-outlined !text-[14px] text-outline">
              keyboard_arrow_down
            </span>
          </button>
        </div>

        {/* 第二行：简约搜索输入栏 */}
        <div className="mt-2.5">
          <div className="relative flex items-center h-9 w-full rounded-full bg-[#F2F3F5] px-3.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-outline !text-[18px] mr-2 shrink-0">
              search
            </span>
            <input
              aria-label="搜索求购需求"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索急需的制图仪、小电锅、教材…"
              className="w-full bg-transparent border-none p-0 text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-outline hover:text-on-surface px-1 shrink-0 cursor-pointer"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* 第三行：精简分类标签 */}
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {WANTED_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1 rounded-full text-[12px] shrink-0 transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-neutral-900 text-white font-medium shadow-2xs'
                    : 'bg-surface-container-low text-secondary hover:text-on-surface'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 发布成功反馈通知 */}
      {justPostedBanner && (
        <div className="mx-4 mt-3 px-3.5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined material-fill text-emerald-600 !text-[18px] shrink-0">
              check_circle
            </span>
            <p className="text-xs font-medium text-emerald-900 truncate">
              {justPostedBanner}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setJustPostedBanner(null)}
            className="text-[11px] text-emerald-700 font-medium hover:underline shrink-0 cursor-pointer"
          >
            关闭
          </button>
        </div>
      )}

      {/* 主求购列表 */}
      <main className="px-4 pt-3.5 space-y-3 flex-1">
        {filteredWanted.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center space-y-2.5 border border-black/[0.03] shadow-2xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-surface-container-low flex items-center justify-center text-outline">
              <span className="material-symbols-outlined !text-[24px]">
                inbox
              </span>
            </div>
            <p className="text-[13.5px] font-semibold text-on-surface">
              暂无匹配的求购需求
            </p>
            <p className="text-xs text-secondary max-w-xs mx-auto">
              你可以发布一条求购，同校校友看到后会主动联系你
            </p>
            <button
              type="button"
              onClick={handleOpenPostModal}
              className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-medium shadow-xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined !text-[15px]">
                edit_square
              </span>
              <span>发布第一条求购</span>
            </button>
          </div>
        ) : (
          filteredWanted.map((item) => {
            const isMine =
              item.userName === '嚼不断的浓痰' || item.timeAgo === '刚刚';
            return (
              <article
                key={item.id}
                className={`bg-white rounded-2xl p-4 border transition-all ${
                  isMine
                    ? 'border-primary/25 ring-1 ring-primary/10 shadow-[0_4px_16px_rgba(233,120,101,0.08)]'
                    : 'border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md'
                }`}
              >
                {/* 顶部：发布者信息与发布时间 */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      style={{
                        backgroundColor: item.avatarBg,
                        color: item.avatarText,
                      }}
                      className="w-8 h-8 rounded-full font-semibold text-xs flex items-center justify-center shrink-0 shadow-2xs"
                    >
                      {item.userSurname}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[13px] font-semibold text-on-surface truncate">
                        {item.userName}
                      </span>
                      <span className="text-[11px] text-secondary bg-surface-container-low px-1.5 py-0.5 rounded-md shrink-0">
                        {item.userDept}
                      </span>
                      {isMine && (
                        <span className="text-[10px] text-primary bg-primary-fixed/50 px-1.5 py-0.5 rounded font-medium shrink-0">
                          我的求购
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-outline shrink-0 whitespace-nowrap">
                    {item.timeAgo}
                  </span>
                </div>

                {/* 标题与预期预算 */}
                <div className="mt-2.5 flex items-baseline justify-between gap-2.5">
                  <h2 className="text-[14.5px] font-semibold text-on-surface leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="shrink-0 text-right tabular-nums whitespace-nowrap">
                    <span className="text-[11px] text-secondary mr-1">预算</span>
                    <span className="text-base font-bold text-primary">
                      {item.budgetText}
                    </span>
                  </div>
                </div>

                {/* 详细描述 */}
                {item.description && (
                  <p className="text-[12.5px] text-secondary mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* 底部：自提位置与响应按钮 */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-outline-variant/15 gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-secondary min-w-0">
                    <span className="material-symbols-outlined !text-[14px] text-outline shrink-0">
                      location_on
                    </span>
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isMine && onDeleteWanted && (
                      <button
                        type="button"
                        onClick={() => onDeleteWanted(item.id)}
                        className="px-2.5 py-1 rounded-full text-secondary hover:text-error text-[11px] font-medium transition cursor-pointer"
                      >
                        撤回
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRespondWanted(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-semibold hover:bg-primary hover:text-white active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <span className="material-symbols-outlined !text-[14px]">
                        chat
                      </span>
                      <span>我有闲置</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </main>

      {/* 右下角悬浮发求购按钮 */}
      <aside className="fixed bottom-22 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pointer-events-none z-30 flex justify-end">
        <button
          type="button"
          onClick={handleOpenPostModal}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-primary text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined !text-[17px]">
            edit_square
          </span>
          <span className="text-[12.5px] font-semibold whitespace-nowrap">
            发求购
          </span>
        </button>
      </aside>

      {/* 发布求购二级弹窗 */}
      {showPostModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="发布求购"
          className="fixed inset-0 z-[90] flex justify-center bg-black/35 backdrop-blur-xs"
        >
          <div className="w-full max-w-[430px] min-h-screen bg-[#F8F9FA] text-on-surface flex flex-col shadow-xl overflow-y-auto">
            {/* 顶部导航 */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-black/[0.04] px-4 py-3">
              <div className="flex items-center justify-between h-10">
                <button
                  type="button"
                  aria-label="返回求购广场"
                  onClick={() => setShowPostModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-base font-semibold text-on-surface tracking-tight">
                  发布求购
                </h2>
                <div className="w-9 h-9" />
              </div>
            </header>

            <form
              onSubmit={handleCreateWanted}
              className="flex-1 px-4 pt-4 pb-10 space-y-4 flex flex-col"
            >
              {/* 快捷模版 */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-xs text-secondary shrink-0">快捷常用：</span>
                {WANTED_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.label}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    className="px-3 py-1.5 rounded-full bg-white border border-outline-variant/30 text-xs text-on-surface hover:border-primary/40 hover:text-primary shrink-0 transition-colors cursor-pointer"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>

              {postError && (
                <div className="px-3.5 py-2.5 rounded-xl bg-error-container/50 text-on-error-container text-xs flex items-center justify-between">
                  <span>{postError}</span>
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate(WANTED_TEMPLATES[0])}
                    className="text-primary font-medium underline shrink-0 ml-2 cursor-pointer"
                  >
                    填入示例
                  </button>
                </div>
              )}

              {/* 卡片一：求购物品与详情 */}
              <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="wanted-title-input"
                    className="text-xs font-semibold text-secondary block"
                  >
                    求购物品名称
                  </label>
                  <input
                    id="wanted-title-input"
                    type="text"
                    maxLength={36}
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      setPostError('');
                    }}
                    placeholder="请输入你想收的物品名称"
                    className="w-full bg-transparent text-sm font-medium text-on-surface placeholder:text-outline focus:outline-none pb-2 border-b border-outline-variant/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="wanted-desc-input"
                    className="text-xs font-semibold text-secondary block"
                  >
                    补充说明（选填）
                  </label>
                  <textarea
                    id="wanted-desc-input"
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="简单描述成色要求或方便面交的时间"
                    className="w-full rounded-xl bg-surface-container-low p-3 text-xs text-on-surface placeholder:text-outline focus:outline-none resize-none leading-relaxed"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {QUICK_DESC_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAppendDescTag(tag)}
                        className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-[11px] text-secondary transition-colors cursor-pointer"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 卡片二：预算与自提地点 */}
              <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 space-y-4">
                {/* 预算范围 */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-secondary block">
                    预算区间 (元)
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                        ¥
                      </span>
                      <input
                        aria-label="最低预算"
                        type="number"
                        min={0}
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        placeholder="20"
                        className="w-full rounded-xl bg-surface-container-low pl-7 pr-3 py-2 text-sm font-semibold text-on-surface focus:outline-none tabular-nums"
                      />
                    </div>
                    <span className="text-xs text-secondary">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                        ¥
                      </span>
                      <input
                        aria-label="最高预算"
                        type="number"
                        min={1}
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        placeholder="35"
                        className="w-full rounded-xl bg-surface-container-low pl-7 pr-3 py-2 text-sm font-semibold text-on-surface focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-outline-variant/15" />

                {/* 自提地点 */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-secondary block">
                    自提地点
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pickupSpots.map((spot) => {
                      const active = newLoc === spot;
                      return (
                        <button
                          key={spot}
                          type="button"
                          onClick={() => setNewLoc(spot)}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                            active
                              ? 'bg-neutral-900 text-white font-semibold'
                              : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {spot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 底部提交按钮 */}
              <div className="pt-2 mt-auto">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-primary text-white text-sm font-semibold hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                >
                  确认发布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showPostModal && (
        <BottomNavBar
          activeScreen="wanted"
          unreadTotal={unreadTotal}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
