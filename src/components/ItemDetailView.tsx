import React, { useState } from 'react';
import { ProductItem } from '../data/marketplaceData';

interface ItemDetailViewProps {
  product: ProductItem;
  onBack: () => void;
  onToggleFavorite: (productId: string) => void;
  onOpenChat: (product: ProductItem, startMeetup?: boolean) => void;
}

export const ItemDetailView: React.FC<ItemDetailViewProps> = ({
  product,
  onBack,
  onToggleFavorite,
  onOpenChat,
}) => {
  const [shareToast, setShareToast] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);

  const displayTitle = product.detailTitle || product.title;
  const displayPrice = product.detailPrice || product.price;
  const displayImage = product.detailImage || product.image;

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased min-h-screen pb-32 w-full relative">
      {/* 1. 顶部：微信小程序原生透明/白底导航栏 */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container/60 transition-colors">
        <div className="px-4 h-12 flex items-center justify-between">
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">
              arrow_back
            </span>
          </button>
          <h1 className="text-base font-semibold text-on-surface tracking-tight text-center flex-1">
            商品详情
          </h1>
          <button
            type="button"
            aria-label="更多操作"
            onClick={handleShare}
            className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">
              more_horiz
            </span>
          </button>
        </div>
      </header>

      {/* 主体视口容器 */}
      <main className="px-4 pt-3 space-y-5">
        {/* 2. 大尺寸商品实拍图 */}
        <div
          onClick={() => setPhotoIndex((prev) => (prev % 3) + 1)}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container-low shadow-sm cursor-pointer"
        >
          <img
            className="w-full h-full object-cover object-center"
            alt={displayTitle}
            src={displayImage}
            referrerPolicy="no-referrer"
          />
          {/* 右下角极轻量页码标 */}
          <div className="absolute right-3.5 bottom-3.5 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-sm text-[11px] font-medium text-white tracking-widest">
            {photoIndex} / 3
          </div>
        </div>

        {/* 3. 价格与标题黄金视线区 */}
        <section className="space-y-2 pt-1">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-baseline tabular-nums">
              <span className="text-[#E0634B] text-[20px] font-bold tracking-tight mr-1">
                ¥
              </span>
              <span className="text-[#E0634B] text-[32px] font-bold leading-none tracking-tight">
                {displayPrice}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF7F2] text-tertiary">
                {product.condition} · 自用
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-secondary">
                当面验机
              </span>
            </div>
          </div>

          <h2 className="text-[19px] font-bold text-on-surface leading-snug tracking-normal pt-1">
            {displayTitle}
          </h2>
        </section>

        {/* 4. 卖家信息极简条 */}
        <section className="flex items-center justify-between py-2 border-y border-surface-container/60">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-container"
              alt={product.sellerName}
              src={product.sellerAvatar}
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-on-surface">
                  {product.sellerName}
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#E6F4EA] text-tertiary">
                  <span className="material-symbols-outlined material-fill text-[13px]">
                    verified_user
                  </span>
                  <span>{product.sellerTag}</span>
                </span>
              </div>
              <p className="text-[11px] text-secondary mt-0.5">
                {product.sellerRating}
              </p>
            </div>
          </div>
          <span className="text-xs text-secondary/80 whitespace-nowrap">
            {product.campus} · 20分钟前发布
          </span>
        </section>

        {/* 5. 物品描述“减字增符”与呼吸感要点列表 */}
        <section className="py-1">
          <div className="space-y-3.5">
            {product.highlights.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-[14px] leading-relaxed text-on-surface"
              >
                <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                  <span className="material-symbols-outlined text-[17px]">
                    {hl.icon}
                  </span>
                </div>
                <div className="pt-0.5">
                  <span className="font-medium text-on-surface">{hl.label}</span>
                  <span className="text-secondary ml-1">· {hl.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 安全自提轻微条 */}
        <section className="bg-[#F2F9F5] border border-[#DCEDE3] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
          <span className="material-symbols-outlined material-fill text-tertiary text-[18px]">
            security
          </span>
          <p className="text-xs text-on-tertiary-container tracking-tight">
            仅限同校当面验机交易，杜绝快递诈骗 · 现场试用满意再付款
          </p>
        </section>
      </main>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface/95 text-inverse-on-surface px-4 py-2 rounded-full text-xs font-medium shadow-lg">
          已复制建院内部分享口令，可发给室友或班级群
        </div>
      )}

      {/* 7. 底部悬浮玻璃胶囊栏 */}
      <aside
        aria-label="快捷操作栏"
        className="fixed bottom-0 inset-x-0 z-50 p-3 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-high/80 rounded-2xl shadow-xl px-4 py-2.5 flex items-center justify-between gap-3">
          {/* 左侧图标交互 */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              className={`flex flex-col items-center justify-center transition-colors focus:outline-none min-w-[44px] min-h-[44px] ${
                product.favorited
                  ? 'text-[#E0634B]'
                  : 'text-secondary hover:text-[#E0634B]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform active:scale-125 ${
                  product.favorited ? 'material-fill' : ''
                }`}
              >
                {product.favorited ? 'favorite' : 'favorite_border'}
              </span>
              <span className="text-[10px] mt-0.5 font-medium leading-none whitespace-nowrap">
                {product.favorited ? '已收藏' : '收藏'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex flex-col items-center justify-center text-secondary hover:text-on-surface transition-colors focus:outline-none min-w-[44px] min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[22px] transition-transform active:scale-125">
                share
              </span>
              <span className="text-[10px] mt-0.5 font-medium leading-none whitespace-nowrap">
                分享
              </span>
            </button>
          </div>

          {/* 右侧优雅操作胶囊按钮群 */}
          <div className="flex items-center gap-2.5 flex-1 justify-end">
            <button
              type="button"
              onClick={() => onOpenChat(product, false)}
              className="flex-1 max-w-[110px] h-10 rounded-full border border-outline-variant/60 bg-surface-container-lowest text-on-surface text-sm font-semibold hover:bg-surface-container transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[17px]">
                chat_bubble_outline
              </span>
              <span>聊一聊</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenChat(product, true)}
              className="flex-1 max-w-[130px] h-10 rounded-full bg-[#E0634B] text-white text-sm font-semibold hover:brightness-105 active:scale-[0.98] transition-all shadow-md shadow-[#E0634B]/20 flex items-center justify-center gap-1 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[17px]">
                handshake
              </span>
              <span>约建院面交</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
