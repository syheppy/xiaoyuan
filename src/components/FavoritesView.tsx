import React, { useState } from 'react';
import { ProductItem, ScreenId } from '../data/marketplaceData';

interface FavoritesViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct?: (product: ProductItem) => void;
}

interface FavoriteCardItem {
  id: string;
  title: string;
  image: string;
  dropBadge?: string;
  cornerBadge?: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  priceSubtext?: string;
  location: string;
  campusType: 'qingyuan' | 'guangzhou';
  isDrop: boolean;
  favorited: boolean;
}

const INITIAL_FAVORITE_ITEMS: FavoriteCardItem[] = [
  {
    id: 'fav-1',
    title: '罗技 K380 蓝牙键盘 自用粉色',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0ofdTGIepUWLc7a7RakSy2pN6dh0vVchswY3dSoB-ONkFaZN1rHAXocCO6qHkl5GxRuy5q7Py_ecx50sb2QMBMG0NHWyA5iIoD7i9JiMxVm2429WBF8BtsO5JXJw3HNlutVOFVY-9sNsab3DKTvn7pEN0LqjGQl1WXQSz-aWOm0FRBHQs0TDIhHhy_M9IugQUrIYfM81dRJCT1GOzEF7W7F0SswPw3xcB_df7wOASYKo0NOvlInO',
    dropBadge: '降¥10',
    tags: ['95新', '女生自用'],
    price: 55,
    originalPrice: 65,
    location: '广州校区 · 教学楼自提',
    campusType: 'guangzhou',
    isDrop: true,
    favorited: true,
  },
  {
    id: 'fav-2',
    title: '考研转自用 iPad Air 5 64G 银色',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7UlCb7twrDVBmoNmkyV5FZdR_quTzMssbaLmvkeDnO-MYDiHvcDILyjb0oYAF2uQooaymej5V-nk3QTZLzfZ7T6rurm9gss4BQiWeQyqIFQ5kiY445N2uZjQWfDQtbsy4n_Qk2KK3P9XBqFOfJkYpxAUThH6gM_LkerJrbew6E87tV_NYj65R7rFbRJ-HZF0PyU2NmxiEpo5nhLt0ffoncXb_DvrIQUcfGYeLlj45rI6eJ7IGC2D',
    tags: ['95新', '箱说全'],
    price: 2450,
    priceSubtext: '带原装充电器',
    location: '清远校区 · 桂园自提',
    campusType: 'qingyuan',
    isDrop: true,
    favorited: true,
  },
  {
    id: 'fav-3',
    title: '多层抽屉式桌面收纳盒',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYD00u3thApZUvniiesVGfL4QqMpkBQkxX9LPVunHblEqxMg07WsHZhnIdC7Fxt-ZSNZ8f8rsquwp5o9nbhVoYNSAh6hsJdDoZBCmqu8G0zbH7uQ_O6x3R7SXTGS0EcZ7kD4KuTt4FC6KdKaLG_pIhtVGyn2MNxVuHeLAanOqHKvFHW4CKHDOhU_yF62tAIBbVm4RlmhDaS9qhQ81CWRPKB8GO08gb_W6v6bWiu0Qmk9ENM0Fi2a8X',
    tags: ['95新', '超大容量'],
    price: 18,
    priceSubtext: '毕业带不走求出',
    location: '清远校区 · 榕园自提',
    campusType: 'qingyuan',
    isDrop: false,
    favorited: true,
  },
  {
    id: 'fav-4',
    title: '校内通勤代步车带车锁',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPB3-36Z_eEn5Wdb3byeHGO9WqKxHJcFqWVF7cYM2qCUF0Azv4uh-yPNv_xYtae_6wUzWzzWcf7gsycBDZT6TmKWiQdLKCrLgUSGpsmxDVI9o8NcI9eHI467t8Iaat5vi9NJqYzNrHmGiZfIXxhOLy5EUeVvTG_jRDzlIx91YIslKocsRFwlGHiuQliOdiM2wQP_tnwpocsdd401VCuZX9zt8QxtYL4g1J-GYU6n-wcBVRhe4yOFoO',
    cornerBadge: '含密码锁',
    tags: ['85新', '刹车灵敏'],
    price: 85,
    priceSubtext: '骑行顺畅',
    location: '清远校区 · 桂园车棚自提',
    campusType: 'qingyuan',
    isDrop: false,
    favorited: true,
  },
];

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onBack,
  onNavigate,
}) => {
  const [items, setItems] = useState<FavoriteCardItem[]>(INITIAL_FAVORITE_ITEMS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'drop' | 'campus'>(
    'all'
  );
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 1800);
  };

  const handleSelectFilter = (filter: 'all' | 'drop' | 'campus') => {
    setActiveFilter(filter);
    showToast('已更新筛选条件');
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextFav = !item.favorited;
        showToast(nextFav ? '已加入心愿单' : '已取消收藏');
        return { ...item, favorited: nextFav };
      })
    );
  };

  const handleToggleBatchMode = () => {
    setIsBatchMode((prev) => {
      const next = !prev;
      showToast(next ? '点击红心可快速取消' : '已保存最新收藏');
      return next;
    });
  };

  const handleContactSeller = (title: string) => {
    showToast(`正在打开与「${title}」同学的私聊...`);
    window.setTimeout(() => {
      onNavigate('chat');
    }, 450);
  };

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'drop') return item.isDrop;
    if (activeFilter === 'campus') return item.campusType === 'qingyuan';
    return true;
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface text-on-surface relative antialiased">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.02)] pt-safe">
        <div className="h-14 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="返回"
              onClick={onBack}
              type="button"
              className="w-11 h-11 -ml-space-xs flex items-center justify-center rounded-full text-on-surface active:bg-secondary-container/30 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">
                arrow_back
              </span>
            </button>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight select-none">
              我的收藏
            </h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              aria-label="更多操作"
              onClick={() => handleToggleBatchMode()}
              className="w-9 h-9 flex items-center justify-center rounded-full text-secondary hover:bg-secondary-container/20 active:bg-secondary-container/30 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                more_horiz
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pb-safe bg-surface">
        <div className="flex flex-col w-full pb-12">
          {/* 顶层提示与数据轻量概览 */}
          <div className="px-margin pt-space-md pb-space-sm flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              <span className="font-label-sm text-label-sm text-secondary">
                已保存的心动闲置
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleBatchMode}
              className={`font-label-sm text-label-sm transition-colors cursor-pointer ${
                isBatchMode
                  ? 'text-primary font-semibold'
                  : 'text-secondary active:text-primary'
              }`}
            >
              {isBatchMode ? '完成' : '批量整理'}
            </button>
          </div>

          {/* 轻巧分类微标签滑动行 */}
          <div className="w-full overflow-x-auto no-scrollbar px-margin py-space-xs flex items-center gap-space-xs">
            {[
              { id: 'all' as const, label: '全部收藏 · 8' },
              { id: 'drop' as const, label: '降价好物 · 2' },
              { id: 'campus' as const, label: '本校区自提 · 6' },
            ].map((pill) => {
              const active = activeFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => handleSelectFilter(pill.id)}
                  className={`shrink-0 px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFF1ED] text-primary border border-primary/30'
                      : 'bg-surface-container-lowest text-secondary border border-outline-variant/30 hover:bg-secondary-container/20'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* 收藏物品列表 (极简呼吸感、大留白单列卡片) */}
          <div className="px-margin mt-space-md flex flex-col gap-space-lg">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-space-lg shadow-xs flex flex-col gap-space-md transition-transform active:scale-[0.995]"
              >
                <div className="flex items-start gap-space-md">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden bg-surface-container-low shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.title}
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                    {item.dropBadge && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#FFF1ED] text-primary border border-primary/20 font-caption text-caption">
                        {item.dropBadge}
                      </span>
                    )}
                    {item.cornerBadge && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-xs text-secondary font-caption text-caption">
                        {item.cornerBadge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-space-xs">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1">
                          {item.title}
                        </h2>
                        <button
                          aria-label={item.favorited ? '取消收藏' : '加入收藏'}
                          onClick={(e) => handleToggleFavorite(item.id, e)}
                          type="button"
                          className="w-8 h-8 -mr-1.5 -mt-1.5 flex items-center justify-center rounded-full text-primary active:scale-90 transition-transform cursor-pointer"
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              item.favorited
                                ? 'material-fill text-primary'
                                : 'text-outline'
                            }`}
                          >
                            favorite
                          </span>
                        </button>
                      </div>
                      <div className="flex items-center gap-space-xs mt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded bg-surface-container-low text-secondary font-caption text-caption"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-space-xs mt-2">
                      <span className="font-headline-lg text-headline-lg text-primary tracking-tight">
                        ¥{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="font-caption text-caption text-outline line-through">
                          ¥{item.originalPrice}
                        </span>
                      )}
                      {item.priceSubtext && (
                        <span className="font-caption text-caption text-secondary">
                          {item.priceSubtext}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-space-xs flex items-center justify-between">
                  <div className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[15px] text-outline">
                      location_on
                    </span>
                    <span className="font-caption text-caption truncate max-w-[160px]">
                      {item.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button
                      type="button"
                      onClick={() => handleContactSeller(item.title)}
                      className="h-8 px-space-md rounded-full bg-[#FFF1ED] text-primary hover:bg-[#FFE6E0] border border-primary/20 font-label-sm text-label-sm flex items-center gap-1 active:opacity-90 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        chat_bubble
                      </span>
                      <span>去聊聊</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 底部轻提示与呼吸感留白 */}
          <div className="mt-space-xl flex flex-col items-center justify-center gap-1 text-secondary opacity-60">
            <span className="w-6 h-0.5 rounded-full bg-surface-container-highest" />
            <p className="font-caption text-caption">
              仅保留在售闲置 · 遇到心动不妨直接联系
            </p>
          </div>

          {/* 轻量交互轻提示 Toast */}
          <div
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-space-lg py-2 rounded-full bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm shadow-xl transition-all duration-300 z-50 flex items-center gap-1.5 pointer-events-none ${
              toastMsg
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
              check_circle
            </span>
            <span>{toastMsg || '已同步'}</span>
          </div>
        </div>
      </main>
    </div>
  );
};
