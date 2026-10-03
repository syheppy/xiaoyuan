import React, { useState, useRef } from 'react';
import {
  Camera,
  X,
  Lightbulb,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Send,
} from 'lucide-react';
import { Product, Condition, CirculationMethod } from '../types';

interface PublishScreenProps {
  onPublishSuccess: (newProduct: Product) => void;
  onBack: () => void;
  onOpenPact: () => void;
}

export const PublishScreen: React.FC<PublishScreenProps> = ({
  onPublishSuccess,
  onBack,
  onOpenPact,
}) => {
  // Preset demo image matching Image 1
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
  ]);

  const [title, setTitle] = useState('罗技 Pebble 静音无线鼠标 珊瑚粉');
  const [condition, setCondition] = useState<Condition>('95新');
  const [category, setCategory] = useState('宿舍数码/键鼠配件');
  const [price, setPrice] = useState<string>('38');
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState(
    '大二在宿舍配平板使用的，按键非常静音，图书馆自习完全不吵人。平时很爱惜无划痕，送原装无线接收器和全新超霸南孚电池一颗，清远校区可当面验货试用。'
  );
  const [circulationMethod, setCirculationMethod] = useState<CirculationMethod>('校内当面自提');
  const [meetupLocation, setMeetupLocation] = useState('清远校区·宿舍生活区');
  const [agreePact, setAgreePact] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const conditions: Condition[] = ['全新未拆', '95新', '9成新', '8成以下'];

  const categories = [
    '宿舍数码/键鼠配件',
    '数码数码/平板外设',
    '教材资料/专业课本',
    '宿舍生活/锅具收纳',
    '摄影穿搭/拍立得',
    '校园出行/滑板车',
    '0元互助/爱心赠送',
  ];

  const quickTags = ['#仅用过两周', '#功能完全正常', '#附赠全新电池', '#毕业急出'];

  const quickLocations = [
    '清远校区·宿舍生活区',
    '清远校区·图书馆前坪',
    '广州校区·教学楼大厅',
    '广州校区·第一食堂旁',
  ];

  const handleFillTemplate = () => {
    setDescription(
      `【入手渠道】：官方旗舰店自用购买\n【使用频次】：仅在建院图书馆与宿舍使用过数次\n【成色瑕疵】：外观基本95新，所有功能完好，无暗病\n【转让原因】：毕业/考研整理闲置，低价出给本校师弟师妹\n【交接建议】：支持在校内指定地点当面开机验货！`
    );
  };

  const handleAddTag = (tag: string) => {
    if (!description.includes(tag)) {
      setDescription((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setImages([...images, url]);
    }
  };

  const handleSetFree = () => {
    setIsFree(true);
    setPrice('0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('请填写物品标题');
      return;
    }
    if (!agreePact) {
      alert('请先阅读并勾选《广东建院校校园闲置流转真实自律公约》');
      return;
    }

    setIsSubmitting(true);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title,
      price: isFree ? 0 : Number(price) || 0,
      originalPrice: (Number(price) || 0) * 2,
      condition,
      category: category.split('/')[0] || '数码数码',
      subCategory: category.split('/')[1] || '键鼠配件',
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80'],
      description,
      tags: [condition, '校内实名', '支持当面验货'],
      features: ['当面验货', '原装正品', '本校自用'],
      seller: {
        id: 'user-self',
        name: '建院小李同学',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        department: '建筑工程学院',
        campus: meetupLocation.includes('广州') ? '广州校区' : '清远校区',
        verified: true,
        studentIdVerified: true,
        carbonOffsetKg: 14.8,
      },
      meetupLocation,
      circulationMethod,
      createdAt: '刚刚',
      isFree: isFree || Number(price) === 0,
      tagline: '宿舍自用转出',
      favoritesCount: 1,
      viewsCount: 1,
      status: 'active',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onPublishSuccess(newProd);
    }, 400);
  };

  return (
    <div className="pb-28 bg-[#F8F9FA] min-h-screen text-slate-800">
      {/* Top Green Certification Banner matching Screenshot 1 */}
      <div
        onClick={onOpenPact}
        className="bg-emerald-50/90 border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-800 cursor-pointer hover:bg-emerald-100/60 transition-colors"
      >
        <div className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="truncate font-medium">
            仅面向广东建设职业技术学院认证同学·校内公约
          </span>
        </div>
        <span className="text-[11px] text-emerald-700 font-semibold flex items-center flex-shrink-0 ml-2">
          细则 &gt;
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-3.5 space-y-4">
        {/* Section 1: 实物实拍 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-slate-800">实物实拍</h2>
              <span className="text-[10px] text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded">
                最多9张
              </span>
            </div>
            <span className="text-[11px] text-amber-600 font-medium flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              自然光更容易出
            </span>
          </div>

          {/* Photo Thumbnails Grid */}
          <div className="flex flex-wrap gap-2.5">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-22 h-22 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 group"
              >
                <img src={img} alt="预览" className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    主图
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Add Photo Button */}
            {images.length < 9 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-22 h-22 rounded-xl border border-dashed border-rose-300 bg-rose-50/40 flex flex-col items-center justify-center text-slate-500 hover:bg-rose-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-rose-100 text-[#E45749] flex items-center justify-center mb-1">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-700">添加照片</span>
                <span className="text-[8px] text-slate-400">支持实况/视频</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          {/* Tip Box matching Screenshot 1 */}
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>宿舍书桌随手拍，展示真实细节，转出率翻倍</span>
          </div>
        </div>

        {/* Section 2: 物品标题 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">物品标题</label>
            <span className="text-[10px] text-slate-400">品牌 / 型号 / 特点</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="如：罗技 Pebble 静音无线鼠标 珊瑚粉"
            className="w-full text-xs font-medium text-slate-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#E45749]"
          />
        </div>

        {/* Section 3: 物品成色 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2.5">
          <label className="text-xs font-bold text-slate-800 block">物品成色</label>
          <div className="grid grid-cols-4 gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={`py-2 rounded-xl text-xs font-semibold text-center transition-all ${
                  condition === c
                    ? 'bg-[#E45749] text-white shadow-xs ring-2 ring-rose-200'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: 闲置分类 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">闲置分类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer text-right"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 5: 期望出价 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">期望出价</label>
            <button
              type="button"
              onClick={handleSetFree}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                isFree
                  ? 'bg-rose-50 border-[#E45749] text-[#E45749] font-bold'
                  : 'border-rose-200 text-[#E45749] bg-rose-50/40 hover:bg-rose-50'
              }`}
            >
              设为0元送 (爱心互助)
            </button>
          </div>

          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-[#E45749]">¥</span>
              <input
                type="number"
                value={price}
                disabled={isFree}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setIsFree(false);
                }}
                className="w-24 text-lg font-extrabold text-slate-800 bg-transparent focus:outline-none"
              />
            </div>
            <span className="text-[11px] text-slate-400">支持建院校内砍价</span>
          </div>
        </div>

        {/* Section 6: 闲置描述 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">闲置描述</label>
            <button
              type="button"
              onClick={handleFillTemplate}
              className="text-[11px] text-[#E45749] font-semibold flex items-center gap-0.5 hover:underline"
            >
              <Sparkles className="w-3 h-3 text-[#E45749]" />
              填入建院模版
            </button>
          </div>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="说明入手来源、使用次数、有无瑕疵，真实详尽更容易转出给同门同学..."
            className="w-full text-xs text-slate-700 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-[#E45749] leading-relaxed resize-none"
          />

          {/* Quick Hashtag Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="text-[10px] font-medium bg-stone-100 text-slate-600 hover:bg-rose-50 hover:text-[#E45749] px-2 py-1 rounded-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Section 7: 校内流转方式 */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/70 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">校内流转方式</label>
            <span className="text-[10px] text-emerald-700 font-medium">当面验货最安心</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              {
                method: '校内当面自提',
                desc: '宿舍楼下/教学区交接',
              },
              {
                method: '同宿舍楼顺手带',
                desc: '舍友互助送至门牌',
              },
            ].map((item) => (
              <button
                key={item.method}
                type="button"
                onClick={() => setCirculationMethod(item.method as CirculationMethod)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  circulationMethod === item.method
                    ? 'border-[#E45749] bg-rose-50/50 text-slate-900 ring-1 ring-[#E45749]'
                    : 'border-stone-200 bg-stone-50/60 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      circulationMethod === item.method
                        ? 'border-[#E45749] bg-[#E45749] text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {circulationMethod === item.method && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <span className="text-xs font-bold">{item.method}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 pl-5">{item.desc}</p>
              </button>
            ))}
          </div>

          {/* Quick selection of common meetup points */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-slate-500 font-medium">
              快捷选择常见交接地点：
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setMeetupLocation(loc)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                    meetupLocation === loc
                      ? 'border-[#E45749] bg-rose-50 text-[#E45749] font-bold'
                      : 'border-stone-200 text-slate-600 bg-white hover:bg-stone-50'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center gap-2 px-1 text-[11px] text-slate-600">
          <input
            type="checkbox"
            id="agreement"
            checked={agreePact}
            onChange={(e) => setAgreePact(e.target.checked)}
            className="w-4 h-4 rounded text-[#E45749] focus:ring-[#E45749]"
          />
          <label htmlFor="agreement" className="cursor-pointer">
            已阅读并同意
            <span
              onClick={(e) => {
                e.stopPropagation();
                onOpenPact();
              }}
              className="text-[#E45749] hover:underline font-medium ml-0.5"
            >
              《广东建院校校园闲置流转真实自律公约》
            </span>
          </label>
        </div>

        {/* Submit Button matching Screenshot 1 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E45749] to-[#F06A5C] text-white font-bold text-sm shadow-md shadow-rose-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? '正在提交建院审核...' : '发布到建院广场'}</span>
        </button>
      </form>
    </div>
  );
};
