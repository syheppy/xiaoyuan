import React from 'react';

interface SafetyGuideViewProps {
  onBack: () => void;
}

const GUIDE_RULES = [
  {
    icon: 'place',
    title: '推荐校内公共面交点',
    desc: '优先约在清远校区一食堂门口、图文信息中心大堂、桂园/榕园宿舍楼下值班室旁，或广州校区教学楼一楼中庭交接。',
  },
  {
    icon: 'fact_check',
    title: '当面验货后再付款',
    desc: '数码产品、小功率宿舍电器（如500W内电煮锅、风扇）请现场通电或试用，确认功能无误后再当面结清。',
  },
  {
    icon: 'shield_lock',
    title: '警惕脱离平台提前转账',
    desc: '切勿在未见到实物前私下提前支付定金、押金，或点击外部不明付款链接，谨防校外人员冒充学生。',
  },
  {
    icon: 'Electric_bolt',
    title: '遵守宿舍用电与流转规范',
    desc: '请勿发布或购买违规大功率电器、过期食品及盗版资料，共同维护广东建院绿色安全的流转环境。',
  },
];

const CAMPUS_SPOTS = [
  {
    campus: '清远校区',
    spots: ['桂园宿舍楼下值班室', '榕园一食堂西门口', '图文信息中心一楼大堂'],
  },
  {
    campus: '广州校区',
    spots: ['教学楼一楼中庭', '榕园宿舍区门岗旁', '学生服务大厅门口'],
  },
];

export const SafetyGuideView: React.FC<SafetyGuideViewProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen bg-background text-on-surface antialiased flex flex-col relative font-['Plus_Jakarta_Sans','Noto_Sans_SC',sans-serif]">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-outline-variant/20 px-3.5 pt-3 pb-3">
        <div className="flex items-center justify-between h-10">
          <button
            aria-label="返回上一页"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-semibold text-on-surface tracking-tight">
            安全面交公约与指南
          </h1>
          <div className="w-9 h-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3.5 pt-4 pb-12 space-y-5">
        {/* Section 1: 核心安全守则 */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            面交安全守则
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {GUIDE_RULES.map((item) => (
              <div key={item.title} className="p-4 flex items-start gap-3.5">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[20px] mt-0.5">
                  {item.icon.toLowerCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface">
                    {item.title}
                  </p>
                  <p className="text-xs text-secondary/80 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 推荐面交点 */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            校内推荐交接点
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {CAMPUS_SPOTS.map((group) => (
              <div key={group.campus} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">
                    {group.campus}
                  </span>
                  <span className="text-[11px] text-secondary/70">
                    监控覆盖 · 照明充足
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.spots.map((spot) => (
                    <span
                      key={spot}
                      className="px-2.5 py-1 rounded-xl bg-surface-container-low text-xs text-on-surface"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Tagline */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-secondary/70 tracking-wider">
            广东建设职业技术学院 · 实名学籍互助保障
          </p>
        </div>
      </main>
    </div>
  );
};
