import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Tablet,
  Headphones,
  UtensilsCrossed,
  Palette,
  ShieldCheck,
  ArrowUpDown,
} from 'lucide-react';
import { Product, Campus } from '../types';
import { CATEGORIES_DATA } from '../data/mockData';

interface CategoryScreenProps {
  products: Product[];
  currentCampus: Campus;
  onCampusChange: (campus: Campus) => void;
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  products,
  currentCampus,
  onCampusChange,
  onSelectProduct,
  initialCategory = 'digital',
}) => {
  const [selectedCatId, setSelectedCatId] = useState(initialCategory);
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'priceAsc' | 'priceDesc'>('latest');

  const campusTabs = ['全部校区', '清远主校区', '广州校区'];

  // Subcategories mapping
  const subCategoryChips = [
    { label: 'iPad平板', icon: Tablet },
    { label: '降噪耳机', icon: Headphones },
    { label: '折叠煮锅', icon: UtensilsCrossed },
    { label: '手绘板', icon: Palette },
  ];

  // Filtering products
  const categoryProducts = products.filter((item) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category mapping
    if (selectedCatId !== 'all') {
      const catObj = CATEGORIES_DATA.find((c) => c.id === selectedCatId);
      if (catObj && catObj.name !== item.category && !item.title.includes(catObj.name)) {
        if (selectedCatId === 'digital' && item.category !== '数码数码') return false;
        if (selectedCatId === 'exam' && item.category !== '教材资料' && item.category !== '考公考研') return false;
        if (selectedCatId === 'dorm' && item.category !== '宿舍生活') return false;
        if (selectedCatId === 'photo' && item.category !== '摄影穿搭') return false;
        if (selectedCatId === 'free' && !item.isFree && item.price > 0) return false;
      }
    }

    // Subcategory chip filter
    if (selectedSubCat) {
      if (!item.title.includes(selectedSubCat) && item.subCategory !== selectedSubCat) {
        return false;
      }
    }

    // Campus filter
    if (currentCampus === '广州校区' && !item.meetupLocation.includes('广州') && item.seller.campus !== '广州校区') {
      return false;
    }
    if (currentCampus === '清远校区' && !item.meetupLocation.includes('清远') && item.seller.campus !== '清远校区') {
      return false;
    }

    return true;
  });

  return (
    <div className="pb-24 bg-[#F8F9FA] min-h-screen text-slate-800 flex flex-col">
      {/* Top Search & Filter Bar */}
      <div className="bg-white px-3.5 pt-2 pb-2.5 border-b border-stone-200/80">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="在建院搜索教材、绘图工具、小电风扇..."
              className="w-full bg-stone-100/90 text-xs rounded-full pl-9 pr-8 py-2 border-none focus:outline-none focus:ring-1 focus:ring-[#E45749]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setSortOrder(sortOrder === 'latest' ? 'priceAsc' : 'latest');
            }}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 transition-colors"
            title="筛选"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Campus Switch Tabs & Sort */}
        <div className="flex items-center justify-between mt-2.5 overflow-x-auto no-scrollbar pt-0.5">
          <div className="flex items-center gap-1.5">
            {campusTabs.map((c) => {
              const normalized = c === '清远主校区' ? '清远校区' : c;
              const isActive =
                currentCampus === normalized || (c === '全部校区' && currentCampus === '全部校区');
              return (
                <button
                  key={c}
                  onClick={() => onCampusChange(normalized as Campus)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-rose-100/80 text-[#E45749]'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/60'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setSortOrder(sortOrder === 'latest' ? 'priceAsc' : sortOrder === 'priceAsc' ? 'priceDesc' : 'latest')
            }
            className="flex items-center gap-0.5 text-xs text-slate-600 font-medium whitespace-nowrap pl-1"
          >
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <span>
              {sortOrder === 'latest' ? '最新发布' : sortOrder === 'priceAsc' ? '价格最低' : '价格最高'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Body: Left Vertical Navigation + Right Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side Navigation */}
        <div className="w-24 bg-stone-100/80 border-r border-stone-200/70 overflow-y-auto no-scrollbar flex flex-col justify-between">
          <div className="space-y-0.5 py-1">
            {CATEGORIES_DATA.map((cat) => {
              const active = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    setSelectedSubCat(null);
                  }}
                  className={`w-full py-3 px-2 text-center text-xs transition-colors relative block ${
                    active
                      ? 'bg-white font-bold text-[#E45749] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/40'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#E45749] rounded-r"></span>
                  )}
                  <div className="leading-tight">{cat.name}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${active ? 'text-[#E45749]/80' : 'text-slate-400'}`}>
                    {cat.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Left Footer Badge matching Image 9 */}
          <div className="p-2 border-t border-stone-200/60 text-center">
            <div className="w-6 h-6 rounded-full bg-rose-50 text-[#E45749] flex items-center justify-center mx-auto mb-1">
              <span className="text-[10px] font-bold">♻</span>
            </div>
            <div className="text-[9px] text-slate-400 leading-tight">
              建院低碳<br />物尽其用
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Top Subcategories quick pills matching Image 9 */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5">
              <span>热门细分</span>
              <span className="text-[10px] text-slate-400">建筑工程系精选</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {subCategoryChips.map((chip) => {
                const Icon = chip.icon;
                const active = selectedSubCat === chip.label;
                return (
                  <button
                    key={chip.label}
                    onClick={() =>
                      setSelectedSubCat(active ? null : chip.label)
                    }
                    className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all border ${
                      active
                        ? 'border-[#E45749] bg-rose-50/50 text-[#E45749] font-bold'
                        : 'border-stone-200/70 bg-white text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-0.5 text-rose-500/80" />
                    <span className="text-[10px] truncate max-w-full">
                      {chip.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List Title Header */}
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-xs font-bold text-slate-800">
              当前分类闲置 ({categoryProducts.length})
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200/50">
              已核验本校学生身份
            </span>
          </div>

          {/* Product Items List matching Image 9 format */}
          <div className="space-y-2.5">
            {categoryProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-white rounded-2xl p-2.5 border border-stone-200/70 shadow-2xs hover:shadow-sm transition-all flex gap-3 cursor-pointer group"
              >
                {/* Thumbnail with condition pill badge on image */}
                <div className="w-22 h-22 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                    {prod.subCategory || prod.condition}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-[#E45749] transition-colors">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {prod.description}
                    </p>
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
                      <span className="ml-auto text-[10px] text-slate-400 truncate max-w-[80px]">
                        {prod.meetupLocation.split('·')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xs text-slate-400">该分类暂无更多物品</p>
              <button
                onClick={() => {
                  setSelectedCatId('all');
                  setSelectedSubCat(null);
                  setSearchQuery('');
                }}
                className="mt-2 text-xs text-[#E45749] font-medium"
              >
                查看全部闲置
              </button>
            </div>
          )}

          {/* Bottom Campus Trading Guarantee Banner */}
          <div className="pt-2">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 bg-stone-100/90 py-2 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>只支持校内同学校园卡认证后当面验货交易</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
