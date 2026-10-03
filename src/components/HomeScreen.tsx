import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Home as HomeIcon,
  Tag,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Product, Campus } from '../types';

interface HomeScreenProps {
  products: Product[];
  currentCampus: Campus;
  onCampusChange: (campus: Campus) => void;
  onSelectProduct: (product: Product) => void;
  onOpenPublish: () => void;
  onOpenCategory: (cat?: string) => void;
  onOpenPact: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  currentCampus,
  onCampusChange,
  onSelectProduct,
  onOpenPublish,
  onOpenCategory,
  onOpenPact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('全部动态');
  const [showCampusPicker, setShowCampusPicker] = useState(false);

  const tags = ['全部动态', '建筑/工程绘图', '专业课程课本', '宿舍生活小电'];

  const filteredProducts = products.filter((prod) => {
    // Campus filter
    if (currentCampus !== '全部校区') {
      const matchCampus = prod.meetupLocation.includes(currentCampus) || prod.seller.campus === currentCampus;
      if (!matchCampus) return false;
    }
    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const matchSearch =
        prod.title.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query);
      if (!matchSearch) return false;
    }
    // Tag filter
    if (activeTag === '建筑/工程绘图') {
      return prod.title.includes('建筑') || prod.title.includes('绘图') || prod.category === '教材资料';
    }
    if (activeTag === '专业课程课本') {
      return prod.category === '教材资料' || prod.title.includes('考研') || prod.title.includes('教材');
    }
    if (activeTag === '宿舍生活小电') {
      return prod.category === '宿舍生活' || prod.title.includes('锅') || prod.title.includes('耳机') || prod.title.includes('键盘');
    }
    return true;
  });

  return (
    <div className="pb-24 bg-[#F8F9FA] min-h-screen text-slate-800">
      {/* Top Campus Switch Bar */}
      <div className="bg-white px-3.5 pt-2 pb-2.5 border-b border-stone-100 flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowCampusPicker(!showCampusPicker)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100/90 hover:bg-stone-200/80 text-xs font-bold text-slate-800 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#E45749]"></span>
            <span>{currentCampus}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
          </button>

          {/* Campus selection dropdown */}
          {showCampusPicker && (
            <div className="absolute top-8 left-0 z-30 bg-white shadow-xl rounded-2xl border border-stone-200 p-1.5 w-36 animate-in fade-in zoom-in-95">
              {(['全部校区', '广州校区', '清远校区'] as Campus[]).map((campus) => (
                <button
                  key={campus}
                  onClick={() => {
                    onCampusChange(campus);
                    setShowCampusPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors font-medium flex items-center justify-between ${
                    currentCampus === campus
                      ? 'bg-rose-50 text-[#E45749] font-bold'
                      : 'text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{campus}</span>
                  {currentCampus === campus && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E45749]"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            const next = currentCampus === '广州校区' ? '清远校区' : '广州校区';
            onCampusChange(next);
          }}
          className="text-[11px] text-slate-500 hover:text-[#E45749] flex items-center gap-0.5"
        >
          <span>切换{currentCampus === '广州校区' ? '清远校区' : '广州校区'}</span>
        </button>
      </div>

      {/* Main Search Input */}
      <div className="bg-white px-3.5 pb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="在校内搜索教材、绘图工具、宿舍电器、单车..."
            className="w-full bg-stone-100/90 text-xs rounded-full pl-9 pr-14 py-2.5 border-none focus:outline-none focus:ring-1 focus:ring-[#E45749] placeholder:text-slate-400"
          />
          <button
            onClick={() => {}}
            className="absolute right-1.5 px-3 py-1 bg-[#E45749] text-white text-xs font-semibold rounded-full hover:bg-rose-600 transition-colors shadow-2xs"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Fast Action Row: 急需求借 / 快速登记 */}
      <div className="px-3.5 mt-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div
            onClick={() => alert('已开启【建院求借求购直通车】：可在群内发布借用丁字尺、课本或充电线等紧急需求。')}
            className="bg-gradient-to-r from-orange-50 to-amber-50/70 border border-amber-200/60 rounded-2xl p-2.5 flex items-center gap-2 cursor-pointer hover:shadow-xs transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Flame className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                <span>急需教材工具？</span>
              </div>
              <div className="text-[10px] text-amber-700/80 font-medium">发求借求购 &gt;</div>
            </div>
          </div>

          <div
            onClick={onOpenPublish}
            className="bg-gradient-to-r from-rose-50 to-pink-50/70 border border-rose-200/60 rounded-2xl p-2.5 flex items-center gap-2 cursor-pointer hover:shadow-xs transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-xl bg-[#E45749]/15 text-[#E45749] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#E45749]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 leading-tight">快速登记闲置</div>
              <div className="text-[10px] text-rose-700/80 font-medium">宿舍拍照即发 &gt;</div>
            </div>
          </div>
        </div>
      </div>

      {/* 校园专属场景专区 (建院特色互助) */}
      <div className="mt-4 px-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3.5 bg-[#E45749] rounded-full"></span>
            <h2 className="text-xs font-bold text-slate-800 tracking-tight">
              校园专属场景专区
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">建院特色互助</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* 毕业季清仓 */}
          <div
            onClick={() => onOpenCategory('exam')}
            className="bg-white border border-stone-200/80 rounded-2xl p-2.5 cursor-pointer hover:border-rose-200 transition-all shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  毕业季清仓
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  带不走的低价出
                </span>
              </div>
              <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-slate-600 group-hover:bg-rose-50 group-hover:text-[#E45749] transition-colors">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#E45749] font-medium bg-rose-50/70 px-1.5 py-0.5 rounded inline-block">
              离校专区
            </div>
          </div>

          {/* 新生专区 */}
          <div
            onClick={() => onOpenCategory('dorm')}
            className="bg-white border border-stone-200/80 rounded-2xl p-2.5 cursor-pointer hover:border-rose-200 transition-all shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  新生专区
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  宿舍神器·军训
                </span>
              </div>
              <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-slate-600 group-hover:bg-rose-50 group-hover:text-[#E45749] transition-colors">
                <HomeIcon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
              避坑指南
            </div>
          </div>

          {/* 教材资料 */}
          <div
            onClick={() => onOpenCategory('exam')}
            className="bg-white border border-stone-200/80 rounded-2xl p-2.5 cursor-pointer hover:border-rose-200 transition-all shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  教材资料
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  专业课本·制图
                </span>
              </div>
              <div className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-slate-600 group-hover:bg-rose-50 group-hover:text-[#E45749] transition-colors">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 text-[10px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded inline-block">
              真题划线
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Category Chips */}
      <div className="mt-3.5 px-3.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTag === tag
                ? 'bg-[#E45749] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200/60'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Section Header: 本校最新流转好物 */}
      <div className="mt-4 px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-[#E45749] rounded-full"></span>
          <h2 className="text-xs font-bold text-slate-800">
            本校最新流转好物
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <span>真实面交·零快递费</span>
        </div>
      </div>

      {/* 2-Column Product Grid matching Screenshot 13 */}
      <div className="mt-2.5 px-3.5 grid grid-cols-2 gap-2.5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
          >
            {/* Image container with top badge */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Floating photo tag matching screenshot */}
              {prod.tagline && (
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                  {prod.tagline}
                </div>
              )}
              {prod.isFree && (
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  0元送
                </div>
              )}
            </div>

            {/* Content info */}
            <div className="p-2.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#E45749] transition-colors">
                  {prod.title}
                </h3>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] font-bold text-[#E45749]">¥</span>
                  <span className="text-base font-extrabold text-[#E45749]">
                    {prod.price}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-[10px] text-slate-400 line-through ml-1">
                      ¥{prod.originalPrice}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[100px]">
                    {prod.meetupLocation.split('·')[0] || prod.seller.campus}
                  </span>
                  <span className="text-slate-400">
                    {prod.circulationMethod === '同宿舍楼顺手带' ? '宿楼自提' : '校内面交'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-xs text-slate-400">暂未发现符合条件的闲置好物</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveTag('全部动态');
            }}
            className="mt-2 text-xs text-[#E45749] font-medium"
          >
            重置筛选条件
          </button>
        </div>
      )}

      {/* Bottom official banner matching Screenshot 13 */}
      <div className="mt-6 px-3.5">
        <div
          onClick={onOpenPact}
          className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-3 flex items-start gap-2.5 cursor-pointer hover:bg-emerald-50 transition-colors"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] text-emerald-800 leading-snug">
            <div className="font-bold">
              广东建设职业技术学院官方认证·真实校内面交杜绝推销与寄递风险
            </div>
            <div className="text-emerald-700/80 text-[10px] mt-0.5">
              共建绿色低碳校园·互助传递温暖 (点击阅读自律公约)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
