import React, { useState } from 'react';

interface CampusSelectViewProps {
  currentCampus: '清远校区' | '广州校区';
  onBack: () => void;
  onSelectCampus: (campus: '清远校区' | '广州校区') => void;
}

const CAMPUS_LIST: {
  id: '清远校区' | '广州校区';
  name: string;
  badge: string;
  address: string;
  activeCount: string;
  spots: string[];
  desc: string;
}[] = [
  {
    id: '清远校区',
    name: '清远校区',
    badge: '省职教城主校区',
    address: '清远市清城区环城东路北38号',
    activeCount: '1,280+ 件在售闲置',
    spots: ['桂香园宿舍区', '榕香园宿舍区', '图文信息中心', '第一食堂门口'],
    desc: '涵盖建工、市政、机电等大部分院系，宿舍楼下与图书馆大堂均可当面自提。',
  },
  {
    id: '广州校区',
    name: '广州校区',
    badge: '白云丛云路校区',
    address: '广州市白云区丛云路306号',
    activeCount: '540+ 件在售闲置',
    spots: ['丛云路教学楼', '第一食堂门口', '学生公寓架空层', '实训楼大堂'],
    desc: '适合广州校区常驻及实习返校同学，支持教学楼与食堂周边快速面交。',
  },
];

export const CampusSelectView: React.FC<CampusSelectViewProps> = ({
  currentCampus,
  onBack,
  onSelectCampus,
}) => {
  const [selected, setSelected] = useState<'清远校区' | '广州校区'>(currentCampus);
  const [preferredSpot, setPreferredSpot] = useState<string>(
    currentCampus === '清远校区' ? '桂香园宿舍区' : '丛云路教学楼'
  );

  const handleConfirm = (campusId: '清远校区' | '广州校区') => {
    onSelectCampus(campusId);
    onBack();
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface-container-lowest relative pb-24 antialiased">
      {/* Top App Bar */}
      <header className="w-full bg-surface-container-lowest sticky top-0 z-30 border-b border-black/[0.04]">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="size-10 flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform cursor-pointer"
          >
            <svg
              fill="currentColor"
              height="22px"
              viewBox="0 0 256 256"
              width="22px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-on-surface tracking-tight">
            切换所在校区
          </h1>
          <div className="size-10" />
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 flex-1">
        {/* Current Status Banner */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined material-fill text-[20px]">
                location_on
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-secondary">当前浏览校区：</span>
                <span className="text-sm font-bold text-on-surface">
                  {currentCampus}
                </span>
              </div>
              <p className="text-[11px] text-secondary/80 mt-0.5">
                切换后将优先展示对应校区的当面自提好物与求购需求
              </p>
            </div>
          </div>
        </div>

        {/* Campus Cards */}
        <section aria-label="可选校区列表" className="space-y-3">
          {CAMPUS_LIST.map((item) => {
            const isSelected = selected === item.id;
            const isCurrent = currentCampus === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  setPreferredSpot(item.spots[0]);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(item.id);
                    setPreferredSpot(item.spots[0]);
                  }
                }}
                className={`w-full rounded-2xl p-4 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FFF9F7] border-primary ring-1 ring-primary/20 shadow-xs'
                    : 'bg-white border-black/[0.06] hover:border-black/[0.12]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] font-bold text-on-surface">
                        {item.name}
                      </h2>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-medium">
                        {item.badge}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                          当前所在
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-secondary/70">
                        pin_drop
                      </span>
                      <span>{item.address}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-primary border-primary text-white'
                          : 'border-outline-variant bg-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-primary">
                      {item.activeCount}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-secondary/90 leading-relaxed mt-2.5">
                  {item.desc}
                </p>

                {/* Popular Pickup Spots */}
                <div className="mt-3 pt-2.5 border-t border-black/[0.05]">
                  <span className="text-[11px] text-secondary block mb-1.5">
                    常用校内当面自提点：
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.spots.map((spot) => {
                      const spotActive = isSelected && preferredSpot === spot;
                      return (
                        <button
                          key={spot}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(item.id);
                            setPreferredSpot(spot);
                          }}
                          className={`px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                            spotActive
                              ? 'bg-primary text-white font-medium'
                              : 'bg-surface-container-low text-secondary hover:text-on-surface'
                          }`}
                        >
                          {spot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Campus Safety Tip */}
        <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/30">
          <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">
              verified_user
            </span>
            <span>跨校区流转小贴士</span>
          </div>
          <p className="text-[11px] text-secondary leading-relaxed">
            建院闲置鼓励同校区当面验货自提；若需跨清远/广州校区流转，请先在私信中与实名校友确认好交接方式，切勿提前私下转账。
          </p>
        </div>
      </main>

      {/* Bottom Sticky Confirm Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-black/[0.05] px-4 py-3 z-30">
        <button
          type="button"
          onClick={() => handleConfirm(selected)}
          className="w-full h-11 rounded-full bg-primary hover:opacity-95 text-white text-sm font-semibold shadow-sm active:scale-98 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">
            check_circle
          </span>
          <span>
            确认切换至「{selected}」（默认自提：{preferredSpot}）
          </span>
        </button>
      </div>
    </div>
  );
};
