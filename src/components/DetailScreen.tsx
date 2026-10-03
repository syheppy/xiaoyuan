import React, { useState } from 'react';
import {
  ChevronLeft,
  MoreHorizontal,
  CircleDot,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Gift,
  Check,
} from 'lucide-react';
import { Product } from '../types';

interface DetailScreenProps {
  product: Product;
  onBack: () => void;
  onChat: (product: Product) => void;
  onOpenAppointment: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  product,
  onBack,
  onChat,
  onOpenAppointment,
  onToggleFavorite,
  isFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div className="pb-28 bg-[#F8F9FA] min-h-screen text-slate-800">
      {/* Top Header matching Image 11 */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-3 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 active:scale-95"
            aria-label="返回"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="font-bold text-slate-800 text-base">物品详情</h1>
        </div>

        {/* Mini program capsule */}
        <div className="flex items-center bg-stone-100/90 border border-stone-300/80 rounded-full px-2.5 py-1 text-slate-700 shadow-2xs">
          <button onClick={handleShare} className="p-0.5 hover:opacity-75">
            <MoreHorizontal className="w-4 h-4 stroke-[2]" />
          </button>
          <span className="mx-1.5 text-stone-300 text-xs">|</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-0.5 hover:opacity-75"
          >
            <CircleDot className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Main Image Carousel with 1/4 indicator and verified student seller badge */}
      <div className="relative aspect-4/3 sm:aspect-16/10 bg-stone-100 overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Top-left Student Seller verification badge */}
        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-emerald-800 text-xs font-bold shadow-sm border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>建院学生在售</span>
        </div>

        {/* Bottom-right photo counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
          {activeImageIndex + 1}/{product.images.length}
        </div>

        {/* Multi-image thumbnail strip if multiple */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === i ? 'w-4 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Price & Badges Card matching Screenshot 11 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#E45749]">¥</span>
            <span className="text-3xl font-extrabold text-[#E45749] tracking-tight">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                原价 ¥{product.originalPrice}
              </span>
            )}
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-stone-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
              {product.condition}
            </span>
            <span className="text-xs bg-rose-50 text-[#E45749] font-semibold px-2 py-0.5 rounded-md">
              建院自用
            </span>
            {product.tags.filter(t => !['95新', '建院自用'].includes(t)).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-cyan-50 text-cyan-800 font-semibold px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-sm font-bold text-slate-800 leading-snug">
            {product.title}
          </h1>
        </div>

        {/* Seller Info Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-stone-200/70 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={product.seller.avatar}
              alt={product.seller.name}
              className="w-11 h-11 rounded-full object-cover border border-stone-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {product.seller.name}
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 rounded font-medium">
                  校内已实名
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                广东建院·{product.seller.campus} · {product.seller.department}
              </p>
            </div>
          </div>
          <button
            onClick={() => onChat(product)}
            className="text-xs text-[#E45749] bg-rose-50 font-semibold px-3 py-1.5 rounded-full hover:bg-rose-100 transition-colors"
          >
            与Ta打招呼
          </button>
        </div>

        {/* 转让说明 matching Screenshot 11 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <span className="text-[#E45749] font-black">☰</span>
            <span>转让说明</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          {/* Features Check Tags */}
          <div className="pt-2 flex flex-wrap gap-2">
            {product.features.map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50/70 border border-emerald-200/50 px-2 py-1 rounded-lg font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 面交建议 matching Screenshot 11 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2.5">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#E45749] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-800">
                {product.meetupLocation}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {product.meetupAdvice || '课余或晚自习均可，建议现场开机验机、试用。'}
              </p>
            </div>
          </div>
        </div>

        {/* Safe Campus Tip matching Screenshot 11 */}
        <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-3 flex items-start gap-2.5 text-[11px] text-emerald-800 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>
            建院同学现场验货后确认付款，无需垫付定金，保障交易安全。
          </span>
        </div>
      </div>

      {/* Floating Bottom Bar matching Screenshot 11 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 max-w-md mx-auto flex items-center justify-between gap-3 shadow-lg">
        {/* Favorite & Share */}
        <div className="flex items-center gap-4 text-slate-500 text-xs">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="flex flex-col items-center gap-0.5 hover:text-slate-800 active:scale-90 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? 'fill-[#E45749] text-[#E45749]'
                  : 'text-slate-600'
              }`}
            />
            <span className="text-[10px] font-medium">
              {isFavorite ? '已收藏' : '收藏'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-0.5 hover:text-slate-800 active:scale-90 transition-transform"
          >
            <Share2 className="w-5 h-5 text-slate-600" />
            <span className="text-[10px] font-medium">转发</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={() => onChat(product)}
            className="px-4 py-2.5 rounded-full border border-stone-300 text-slate-700 text-xs font-bold hover:bg-stone-50 active:scale-95 transition-all flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span>聊一聊</span>
          </button>

          <button
            onClick={() => onOpenAppointment(product)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E45749] to-[#F06A5C] text-white text-xs font-bold shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>约建院面交</span>
          </button>
        </div>
      </div>

      {copiedToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white text-xs px-4 py-2 rounded-full shadow-lg animate-in fade-in zoom-in-95">
          ✓ 已复制商品链接，可分享给同门同学
        </div>
      )}
    </div>
  );
};
