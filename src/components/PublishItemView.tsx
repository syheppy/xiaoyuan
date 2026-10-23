import React, { useState } from 'react';
import {
  HOTLINK_IMAGES,
  ProductItem,
  validatePublishForm,
} from '../data/marketplaceData';

interface PublishItemViewProps {
  onBack: () => void;
  onPublishSuccess: (newItem: ProductItem) => void;
}

const CONDITIONS = ['全新', '95新', '9成新', '8成以下'] as const;
const CATEGORIES = [
  '宿舍数码 / 键鼠配件',
  '图书教材 / 考证资料',
  '宿舍电器 / 生活百货',
  '工程制图 / 专业器材',
];
const QUICK_LOCATIONS = [
  '清远校区 · 宿舍区',
  '清远校区 · 图书馆',
  '广州校区 · 教学楼',
  '广州校区 · 第一食堂',
];

export const PublishItemView: React.FC<PublishItemViewProps> = ({
  onBack,
  onPublishSuccess,
}) => {
  const [photos, setPhotos] = useState<string[]>([
    HOTLINK_IMAGES.mouse1,
    HOTLINK_IMAGES.mouse2,
  ]);
  const [title, setTitle] = useState('罗技 Pebble 静音无线鼠标 珊瑚粉');
  const [condition, setCondition] = useState<string>('95新');
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [price, setPrice] = useState<string>('38');
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'deliver'>(
    'pickup'
  );
  const [campusLocation, setCampusLocation] = useState(QUICK_LOCATIONS[0]);
  const [agreed, setAgreed] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const handleToggleFree = () => {
    const next = !isFree;
    setIsFree(next);
    setPrice(next ? '0' : '38');
  };

  const handleFillTemplate = () => {
    setDescription(
      '【入手渠道】：官方旗舰店自购\n【使用情况】：大二期末买的，只用过两周网课，静音微动完好，附赠接收器与原装电池，随时在清远宿舍面交验货～'
    );
  };

  const handleAddDemoPhoto = () => {
    if (photos.length >= 9) return;
    const pool = [
      HOTLINK_IMAGES.mouse1,
      HOTLINK_IMAGES.mouse2,
      HOTLINK_IMAGES.homeIpad,
    ];
    setPhotos([...photos, pool[photos.length % pool.length]]);
  };

  const handleRemovePhoto = (idx: number) => {
    if (photos.length <= 1) return;
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handlePublish = () => {
    const check = validatePublishForm({ title, price, agreed });
    if (!check.valid) {
      setToastMsg(check.error || '请检查输入信息');
      setTimeout(() => setToastMsg(null), 2200);
      return;
    }

    const newItem: ProductItem = {
      id: `prod-${Date.now()}`,
      title: title.trim(),
      price: Number(price) || 0,
      image: photos[0] || HOTLINK_IMAGES.mouse1,
      detailImage: photos[0] || HOTLINK_IMAGES.mouse1,
      condition,
      campus: campusLocation.startsWith('广州') ? '广州校区' : '清远校区',
      location: campusLocation,
      timeAgo: '刚刚',
      category: categoryIdx === 0 ? '数码数码' : '寝室百货',
      sellerName: '嚼不断的浓痰',
      sellerAvatar: HOTLINK_IMAGES.profileAvatar,
      sellerTag: '建院已认证',
      sellerRating: '信誉极好 · 历史全5星好评',
      highlights: [
        {
          icon: 'verified',
          label: `${condition} · 实名学籍发布`,
          desc:
            description.trim() ||
            '官方渠道自购，功能完好无暗病，支持当面试用验货',
        },
        {
          icon: 'location_on',
          label:
            deliveryMode === 'pickup' ? '校内当面自提' : '同楼顺手带至寝室',
          desc: `建议面交地点：${campusLocation}`,
        },
      ],
    };

    setToastMsg('已快速发布到建院闲置集市！');
    setTimeout(() => {
      setToastMsg(null);
      onPublishSuccess(newItem);
    }, 1100);
  };

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen w-full relative">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 pt-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-14 px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="返回上一页"
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back_ios_new
              </span>
            </button>
            <h1 className="text-[16px] font-semibold text-on-surface tracking-tight truncate max-w-[160px]">
              <span className="align-middle">发布页</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-surface pb-safe">
        <div className="flex flex-col w-full pb-36">
          {/* 顶部认证与公约提示栏 */}
          <section className="px-margin pt-space-md">
            <div className="w-full flex items-center justify-between px-space-xs py-1 text-secondary">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined material-fill text-[15px] text-tertiary shrink-0">
                  verified_user
                </span>
                <p className="text-[11px] text-secondary truncate">
                  仅面向广东建设职业技术学院认证同学
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRulesModal(true)}
                className="shrink-0 flex items-center text-outline hover:text-primary text-[11px] active:opacity-70"
              >
                <span>公约细则</span>
                <span className="material-symbols-outlined text-[13px]">
                  chevron_right
                </span>
              </button>
            </div>
          </section>

          {/* 实物照片拍摄与缩略展示区 */}
          <section className="px-margin pt-space-md">
            <div className="py-space-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] text-on-surface font-semibold">
                    实物照片
                  </span>
                  <span className="text-[11px] text-outline">最多9张</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-space-md">
                {photos.map((src, idx) => (
                  <div
                    key={`${src}-${idx}`}
                    className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-low group"
                  >
                    <img
                      className="w-full h-full object-cover"
                      alt={`实物实拍图 ${idx + 1}`}
                      src={src}
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      aria-label={`删除照片 ${idx + 1}`}
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-on-background/60 text-on-primary flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
                {photos.length < 9 && (
                  <button
                    type="button"
                    onClick={handleAddDemoPhoto}
                    className="aspect-square rounded-xl bg-surface-container-low/70 flex flex-col items-center justify-center text-center p-space-xs active:bg-secondary-container/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center mb-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[22px]">
                        add_a_photo
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary font-medium">
                      添加照片
                    </span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* 核心极简输入表单 */}
          <form
            className="px-margin pt-space-md space-y-space-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-space-xl pt-space-xs">
              {/* 标题 */}
              <div className="space-y-space-md">
                <div className="flex items-center justify-between">
                  <label
                    className="text-[14px] text-on-surface font-semibold"
                    htmlFor="itemTitle"
                  >
                    标题
                  </label>
                  <span className="text-[11px] text-outline">品牌 / 型号</span>
                </div>
                <input
                  className="w-full bg-transparent text-[16px] font-semibold text-on-surface placeholder:text-outline focus:outline-none pb-1"
                  id="itemTitle"
                  maxLength={40}
                  placeholder="请输入物品名称及核心特点"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="w-full h-px bg-surface-container-highest/60" />
              </div>

              {/* 物品成色 */}
              <div className="space-y-space-sm">
                <span className="text-[14px] text-on-surface font-semibold block">
                  物品成色
                </span>
                <div className="grid grid-cols-4 gap-space-sm">
                  {CONDITIONS.map((cond) => {
                    const active = condition === cond;
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setCondition(cond)}
                        className={`py-2.5 rounded-xl text-[12px] transition-all whitespace-nowrap ${
                          active
                            ? 'font-semibold text-on-primary bg-primary-container shadow-sm'
                            : 'font-medium text-secondary bg-surface-container-low'
                        }`}
                      >
                        {cond}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 闲置分类 */}
              <div className="flex items-center justify-between py-2 border-y border-surface-container-highest/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-outline">
                    category
                  </span>
                  <span className="text-[14px] text-on-surface font-semibold">
                    闲置分类
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCategoryIdx((prev) => (prev + 1) % CATEGORIES.length)
                  }
                  className="flex items-center gap-1 py-1 active:opacity-75 transition-opacity"
                >
                  <span className="text-[14px] text-on-surface">
                    {CATEGORIES[categoryIdx]}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-outline">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* 期望价格 */}
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="priceInput"
                    className="text-[14px] text-on-surface font-semibold"
                  >
                    期望价格
                  </label>
                  <button
                    type="button"
                    onClick={handleToggleFree}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full active:scale-95 transition-transform ${
                      isFree
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container-low text-secondary'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        isFree ? 'text-on-primary' : 'text-primary'
                      }`}
                    >
                      volunteer_activism
                    </span>
                    <span className="text-[11px] whitespace-nowrap">
                      设为0元送
                    </span>
                  </button>
                </div>
                <div className="flex items-baseline gap-1 py-1 tabular-nums">
                  <span className="text-[30px] leading-[38px] text-primary font-bold">
                    ¥
                  </span>
                  <input
                    className="w-full bg-transparent text-[30px] leading-[38px] text-on-surface placeholder:text-outline focus:outline-none font-bold"
                    id="priceInput"
                    placeholder="0.00"
                    step="0.5"
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setIsFree(Number(e.target.value) === 0);
                    }}
                  />
                </div>
                <div className="w-full h-px bg-surface-container-highest/60" />
              </div>

              {/* 闲置描述 */}
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <label
                    className="text-[14px] text-on-surface font-semibold"
                    htmlFor="descInput"
                  >
                    闲置描述
                  </label>
                  <button
                    type="button"
                    onClick={handleFillTemplate}
                    className="text-[11px] text-primary flex items-center gap-0.5 active:opacity-75"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      magic_button
                    </span>{' '}
                    填入建院模版
                  </button>
                </div>
                <textarea
                  className="w-full bg-surface-container-low/60 rounded-xl p-space-md text-[14px] text-on-surface placeholder:text-outline focus:outline-none resize-none leading-relaxed"
                  id="descInput"
                  placeholder="说明入手来源、使用次数、转手原因，真实详尽更易转出..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* 校内流转方式 */}
              <div className="space-y-space-md pt-space-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-on-surface font-semibold">
                    校内流转方式
                  </span>
                  <span className="text-[11px] text-outline">
                    当面验货更安心
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-space-md">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('pickup')}
                    className={`p-space-md rounded-xl flex items-center gap-2.5 transition-all text-left ${
                      deliveryMode === 'pickup'
                        ? 'bg-primary-fixed/30'
                        : 'bg-surface-container-low'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        deliveryMode === 'pickup'
                          ? 'bg-primary-container'
                          : 'bg-surface-variant'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          deliveryMode === 'pickup'
                            ? 'bg-on-primary'
                            : 'bg-transparent'
                        }`}
                      />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[14px] ${
                          deliveryMode === 'pickup'
                            ? 'text-on-surface font-semibold'
                            : 'text-secondary font-medium'
                        }`}
                      >
                        校内当面自提
                      </p>
                      <p className="text-[11px] text-secondary truncate mt-0.5">
                        宿舍楼下 / 教学区
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMode('deliver')}
                    className={`p-space-md rounded-xl flex items-center gap-2.5 transition-all text-left ${
                      deliveryMode === 'deliver'
                        ? 'bg-primary-fixed/30'
                        : 'bg-surface-container-low'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        deliveryMode === 'deliver'
                          ? 'bg-primary-container'
                          : 'bg-surface-variant'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          deliveryMode === 'deliver'
                            ? 'bg-on-primary'
                            : 'bg-transparent'
                        }`}
                      />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[14px] ${
                          deliveryMode === 'deliver'
                            ? 'text-on-surface font-semibold'
                            : 'text-secondary font-medium'
                        }`}
                      >
                        同楼顺手带
                      </p>
                      <p className="text-[11px] text-outline truncate mt-0.5">
                        舍友互助送至寝室
                      </p>
                    </div>
                  </button>
                </div>

                {/* 快捷地点 */}
                <div className="space-y-space-xs">
                  <span className="text-[11px] text-outline block">
                    快捷地点：
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_LOCATIONS.map((loc) => {
                      const active = campusLocation === loc;
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setCampusLocation(loc)}
                          className={`px-3 py-1.5 rounded-full text-[11px] transition-colors whitespace-nowrap ${
                            active
                              ? 'bg-primary-fixed text-primary font-medium'
                              : 'bg-surface-container-low text-secondary'
                          }`}
                        >
                          {loc}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* 底部固定发布 Dock */}
          <aside className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-surface/95 backdrop-blur-md px-margin pt-3 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-center gap-1.5 mb-2.5">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                aria-label="同意广东建院闲置流转自律公约"
                onClick={() => setAgreed((prev) => !prev)}
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                  agreed
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-variant text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[13px] font-bold">
                  check
                </span>
              </button>
              <p className="text-[11px] text-secondary">
                已阅读并同意{' '}
                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="text-primary font-medium hover:underline"
                >
                  《广东建院闲置流转自律公约》
                </button>
              </p>
            </div>
            <button
              type="button"
              onClick={handlePublish}
              className="w-full h-12 bg-primary-container text-on-primary text-[16px] font-semibold rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mb-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                send
              </span>
              <span>发布到建院广场</span>
            </button>
          </aside>

          {/* Toast */}
          {toastMsg && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface/95 text-inverse-on-surface px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="material-symbols-outlined material-fill text-tertiary-fixed text-[18px]">
                check_circle
              </span>
              <span className="text-xs font-medium whitespace-nowrap">
                {toastMsg}
              </span>
            </div>
          )}

          {/* 公约细则 Modal */}
          {showRulesModal && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="广东建院闲置流转自律公约"
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-5"
            >
              <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
                <h3 className="text-base font-bold text-on-surface">
                  《广东建院闲置流转自律公约》
                </h3>
                <ul className="text-xs text-secondary space-y-2 leading-relaxed list-disc pl-4">
                  <li>仅限广东建设职业技术学院在读认证同学发布真实自用闲置。</li>
                  <li>如实描述成色、入手来源及瑕疵，上传真实实拍照片。</li>
                  <li>优先选择清远/广州校区公共区域（食堂、图书馆、宿舍架空层）当面验货自提。</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(false)}
                  className="w-full py-2.5 rounded-full bg-primary-container text-white text-xs font-semibold"
                >
                  我知道了
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
