import React from 'react';
import { ChevronLeft, MoreHorizontal, CircleDot } from 'lucide-react';
import { CampusLogo } from './CampusLogo';

interface HeaderCapsuleProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  subTitle?: string;
  isHome?: boolean;
}

export const HeaderCapsule: React.FC<HeaderCapsuleProps> = ({
  title,
  showBack = false,
  onBack,
  subTitle,
  isHome = false,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/60 px-3 py-2 flex items-center justify-between select-none">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 active:scale-95 transition-transform"
            aria-label="返回"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        ) : null}

        {isHome ? (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <CampusLogo className="w-7 h-7" />
            </div>
            <div className="truncate">
              <span className="font-bold text-slate-800 text-[15px] tracking-tight">
                广东建院·校园闲置循环
              </span>
              <span className="ml-1.5 text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium border border-emerald-200/60">
                互助服务
              </span>
            </div>
          </div>
        ) : (
          <div className="min-w-0 flex items-center gap-1.5">
            {!showBack && <CampusLogo className="w-5 h-5 flex-shrink-0" />}
            {showBack && !title?.includes('物品详情') && <CampusLogo className="w-5 h-5 flex-shrink-0" />}
            <h1 className="font-bold text-slate-800 text-base truncate">
              {title}
            </h1>
            {subTitle && (
              <span className="text-[11px] text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded font-medium">
                {subTitle}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Signature WeChat Mini-Program Top-Right Capsule */}
      <div className="flex items-center ml-2 bg-stone-100/90 border border-stone-300/80 rounded-full px-2.5 py-1 text-slate-700 shadow-2xs">
        <button
          className="hover:opacity-75 active:scale-90 transition-all p-0.5"
          title="小程序菜单"
          onClick={() => alert('广东建院闲置循环：由学生会绿色校园志愿团队与建院同学共建。支持校内真实面交与当面验货。')}
        >
          <MoreHorizontal className="w-4 h-4 stroke-[2]" />
        </button>
        <span className="mx-1.5 text-stone-300 text-xs select-none">|</span>
        <button
          className="hover:opacity-75 active:scale-90 transition-all p-0.5 text-slate-700"
          title="主页/圆点"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <CircleDot className="w-3.5 h-3.5 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
