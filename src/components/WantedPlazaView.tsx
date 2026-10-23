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
  '全部求购',
  '建筑与工程绘图',
  '宿舍生活好物',
  '教材与考证',
  '数码配件',
] as const;

const QUICK_DESC_TAGS = [
  '下周上课急用',
  '功能正常即可',
  '宿舍楼下自提',
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
  const [selectedCategory, setSelectedCategory] = useState<string>('全部求购');
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
    setSelectedCategory('全部求购');
    setSearchQuery('');
    setJustPostedBanner(`已成功发布求购：「${result.item.title}」`);
    setNewTitle('');
    setNewDesc('');
    setPostError('');
    setShowPostModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] text-text-main font-sans flex flex-col relative antialiased pb-36">
      {/* 顶部轻量导航与状态栏 */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-5 py-3.5 flex items-center justify-between border-b border-black/[0.03]">
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] font-bold text-text-main tracking-tight">
            求购广场
          </h1>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-light text-brand font-medium">
            校内互助
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCampus}
            aria-label={`切换校区，当前为${campus}`}
            className="flex items-center gap-1.5 bg-black/[0.03] border border-black/[0.04] px-2.5 py-1 rounded-full shrink-0 active:scale-95 transition-transform"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[11px] font-medium text-text-sub whitespace-nowrap">
              {campus}
            </span>
            <span className="material-symbols-outlined text-[14px] text-text-tertiary">
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </header>

      {/* 搜索栏 */}
      <section className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3.5 py-2.5 border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="material-symbols-outlined text-[18px] text-text-tertiary">
            search
          </span>
          <input
            aria-label="搜索求购需求"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索求购的工程制图仪、小电锅、教材…"
            className="w-full bg-transparent border-none p-0 text-[13px] text-text-main placeholder-text-tertiary focus:outline-none focus:ring-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-text-tertiary hover:text-text-main shrink-0"
            >
              清除
            </button>
          )}
        </div>
      </section>

      {/* 分类轻标签 */}
      <section className="px-5 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {WANTED_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[12px] font-medium shrink-0 transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-white text-text-sub border border-black/[0.04] hover:bg-black/[0.02]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 校园信任小微标 */}
      <section className="px-5 py-1.5">
        <div className="flex items-center justify-between text-[11px] text-text-tertiary px-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">
              verified
            </span>
            建院校友实名认证 · 宿舍楼下面交
          </span>
          <span>共 {10 + wantedItems.length} 条急需需求</span>
        </div>
      </section>

      {/* 发布成功反馈横幅 */}
      {justPostedBanner && (
        <div className="mx-5 mt-2 px-3.5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined material-fill text-emerald-600 text-[18px] shrink-0">
              check_circle
            </span>
            <p className="text-xs font-medium text-emerald-900 truncate">
              {justPostedBanner}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setJustPostedBanner(null)}
            className="text-[11px] text-emerald-700 hover:underline shrink-0"
          >
            知道了
          </button>
        </div>
      )}

      {/* 求购内容列表 */}
      <main className="px-5 pt-3 pb-6 space-y-4 flex-1">
        {filteredWanted.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center space-y-2.5 border border-black/[0.03]">
            <p className="text-sm font-semibold text-text-main">
              当前分类暂无匹配的求购需求
            </p>
            <p className="text-xs text-text-tertiary">
              你可以直接发布一条求购，同校学长学姐看到后会主动联系你
            </p>
            <button
              type="button"
              onClick={handleOpenPostModal}
              className="mt-1 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-brand text-white text-xs font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">
                edit_square
              </span>
              <span>立即发布求购</span>
            </button>
          </div>
        ) : (
          filteredWanted.map((item) => {
            const isMine = item.userName === '嚼不断的浓痰' || item.timeAgo === '刚刚';
            return (
              <article
                key={item.id}
                className={`bg-card-bg rounded-2xl p-5 border transition hover:shadow-md ${
                  isMine
                    ? 'border-brand/30 ring-1 ring-brand/10 shadow-[0_4px_16px_rgba(224,99,75,0.08)]'
                    : 'border-black/[0.03] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                }`}
              >
                {/* 用户与元信息 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        backgroundColor: item.avatarBg,
                        color: item.avatarText,
                      }}
                      className="w-8 h-8 rounded-full font-semibold text-[12px] flex items-center justify-center shrink-0"
                    >
                      {item.userSurname}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[13px] font-semibold text-text-main">
                          {item.userName}
                        </span>
                        <span className="text-[10px] text-text-tertiary px-1.5 py-0.5 rounded bg-black/[0.03]">
                          {item.userDept}
                        </span>
                        {isMine && (
                          <span className="text-[10px] text-brand bg-brand-light px-1.5 py-0.5 rounded font-medium">
                            我的求购
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-text-tertiary whitespace-nowrap">
                    {item.timeAgo}
                  </span>
                </div>

                {/* 标题与预算 */}
                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <h2 className="text-[14px] font-semibold text-text-main leading-snug">
                    {item.title}
                  </h2>
                  <div className="shrink-0 text-right tabular-nums">
                    <span className="text-[11px] text-text-tertiary">预算</span>
                    <span className="text-[15px] font-bold text-brand ml-0.5">
                      {item.budgetText}
                    </span>
                  </div>
                </div>

                {/* 描述内容 */}
                <p className="text-[12px] text-text-sub mt-1.5 leading-relaxed">
                  {item.description}
                </p>

                {/* 底部自提地点与轻量行动按钮 */}
                <div className="flex items-center justify-between pt-3 mt-2.5 border-t border-black/[0.03] gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-text-tertiary min-w-0">
                    <span className="material-symbols-outlined text-[14px] shrink-0">
                      location_on
                    </span>
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isMine && onDeleteWanted && (
                      <button
                        type="button"
                        onClick={() => onDeleteWanted(item.id)}
                        className="px-2.5 py-1.5 rounded-full bg-stone-100 text-text-sub hover:text-error text-[11px] font-medium transition"
                      >
                        撤回
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRespondWanted(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-light text-brand text-[12px] font-medium hover:bg-brand/10 active:scale-95 transition whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined text-[14px]">
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

      {/* 右下角极简悬浮“发求购”微按钮 (Aligned inside the 430px mobile container) */}
      <aside className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pointer-events-none z-30 flex justify-end">
        <button
          type="button"
          onClick={handleOpenPostModal}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1F2329] hover:bg-brand text-white shadow-[0_8px_24px_rgba(31,35,41,0.22)] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            edit_square
          </span>
          <span className="text-[12px] font-semibold whitespace-nowrap">
            发求购
          </span>
        </button>
      </aside>

      {/* 发求购二级页面视图 */}
      {showPostModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="发布求购"
          className="fixed inset-0 z-[90] flex justify-center bg-black/20 backdrop-blur-[1px]"
        >
          <div className="w-full max-w-[430px] min-h-screen bg-background text-on-surface flex flex-col shadow-xl overflow-y-auto">
            {/* 顶部导航栏 (与其他二级页保持一致) */}
            <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-outline-variant/20 px-4 py-3">
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
                <span className="text-xs text-secondary shrink-0">常用：</span>
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
              <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="wanted-title-input"
                    className="text-xs font-semibold text-secondary block"
                  >
                    求购物品
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
                    className="w-full bg-transparent text-sm font-medium text-on-surface placeholder:text-secondary/50 focus:outline-none pb-2 border-b border-outline-variant/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="wanted-desc-input"
                    className="text-xs font-semibold text-secondary block"
                  >
                    补充说明
                  </label>
                  <textarea
                    id="wanted-desc-input"
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="简单描述成色要求或方便面交的时间（选填）"
                    className="w-full rounded-xl bg-surface-container-low p-3 text-xs text-on-surface placeholder:text-secondary/50 focus:outline-none resize-none leading-relaxed"
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
              <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 space-y-4">
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

                <div className="h-px bg-outline-variant/20" />

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
                              ? 'bg-primary text-white font-semibold'
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
                  className="w-full py-3.5 rounded-2xl bg-primary text-white text-sm font-semibold hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
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
