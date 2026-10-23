import React, { useState } from 'react';
import { ScreenId } from '../data/marketplaceData';

interface SettingsViewProps {
  campus: '清远校区' | '广州校区';
  userName?: string;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  onSwitchCampus: (campus: '清远校区' | '广州校区') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  campus,
  onBack,
  onNavigate,
  onSwitchCampus,
}) => {
  const [meetupNotify, setMeetupNotify] = useState(true);
  const [messageNotify, setMessageNotify] = useState(true);
  const [soundVibration, setSoundVibration] = useState(false);
  const [cacheText, setCacheText] = useState('12.8 MB');

  const handleClearCache = () => {
    if (cacheText !== '0.0 MB' && cacheText !== '清理中...') {
      setCacheText('清理中...');
      window.setTimeout(() => {
        setCacheText('0.0 MB');
      }, 600);
    }
  };

  const handleToggleCampus = () => {
    onSwitchCampus(campus === '清远校区' ? '广州校区' : '清远校区');
  };

  return (
    <div className="w-full min-h-screen bg-background text-on-surface antialiased flex flex-col relative selection:bg-primary-fixed selection:text-on-primary-fixed font-['Plus_Jakarta_Sans','Noto_Sans_SC',sans-serif]">
      {/* Mini Program Top App Bar (Back-to-Main Exception for Focused Secondary View) */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-outline-variant/20 px-4 pt-3 pb-3">
        <div className="flex items-center justify-between h-10">
          {/* Return Button */}
          <button
            aria-label="返回上一页"
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          {/* Title */}
          <h1 className="text-base font-semibold text-on-surface tracking-tight">
            设置
          </h1>
          {/* Mini Program Capsule Right Placeholder Balance */}
          <div className="w-9 h-9" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-5 pb-12 space-y-6">
        {/* Section 1: 账号与安全 */}
        <section className="space-y-2 mb-5">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            账号与安全
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {/* 个人资料设置 */}
            <div
              onClick={() => onNavigate('profile')}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  person
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    个人资料设置
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    头像、昵称、常用联系方式
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-secondary/60">
                <span className="material-symbols-outlined !text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* 校内学籍认证管理 */}
            <div
              onClick={() => onNavigate('register')}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  verified_user
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                      校内学籍认证管理
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#2E7D32] shrink-0 gap-1">
                      <span className="material-symbols-outlined !text-[12px] fill-icon">
                        check_circle
                      </span>
                      已认证
                    </span>
                  </div>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    广东建院建筑工程学院 · 实名流转保护
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-secondary/60">
                <span className="material-symbols-outlined !text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* 手机号与密码安全 */}
            <div
              onClick={() => onNavigate('register')}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  lock_open
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    手机号与密码安全
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    用于登录保护与校内交易校验
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-secondary/70">
                <span className="text-xs font-mono">138****6688</span>
                <span className="material-symbols-outlined !text-[18px] text-secondary/60">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 消息与通知 */}
        <section className="space-y-2 mb-5">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            消息与通知
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {/* 面交通知与提醒 */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  notifications_active
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">
                    面交通知与提醒
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    自提约定时间、地点变动微提醒
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    checked={meetupNotify}
                    onChange={(e) => setMeetupNotify(e.target.checked)}
                    className="sr-only switch-checkbox"
                    type="checkbox"
                  />
                  <div className="switch-label w-11 h-6 bg-surface-container-highest rounded-full transition-colors duration-200 ease-in-out relative p-0.5">
                    <div className="switch-indicator w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out" />
                  </div>
                </label>
              </div>
            </div>

            {/* 新留言与求购推送 */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  chat_bubble
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">
                    新留言与求购推送
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    闲置咨询、即时还价及意向匹配
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    checked={messageNotify}
                    onChange={(e) => setMessageNotify(e.target.checked)}
                    className="sr-only switch-checkbox"
                    type="checkbox"
                  />
                  <div className="switch-label w-11 h-6 bg-surface-container-highest rounded-full transition-colors duration-200 ease-in-out relative p-0.5">
                    <div className="switch-indicator w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out" />
                  </div>
                </label>
              </div>
            </div>

            {/* 声音与振动提示 */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  vibration
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">
                    声音与振动提示
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    应用内收到新消息时保持微提示
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    checked={soundVibration}
                    onChange={(e) => setSoundVibration(e.target.checked)}
                    className="sr-only switch-checkbox"
                    type="checkbox"
                  />
                  <div className="switch-label w-11 h-6 bg-surface-container-highest rounded-full transition-colors duration-200 ease-in-out relative p-0.5">
                    <div className="switch-indicator w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 通用与隐私 */}
        <section className="space-y-2 mb-6">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            通用与隐私
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {/* 常用校区偏好 */}
            <div
              onClick={handleToggleCampus}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  apartment
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    常用校区偏好
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    优先推荐同校区近距离面交商品
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/30 hover:border-primary/40 transition-colors">
                <span className="text-xs font-medium text-on-surface">
                  {campus}
                </span>
                <span className="material-symbols-outlined !text-[15px] text-secondary">
                  sync_alt
                </span>
              </div>
            </div>

            {/* 清除本地缓存 */}
            <div
              id="clear-cache-btn"
              onClick={handleClearCache}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  cleaning_services
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    清除本地缓存
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    释放离线商品图与临时流转数据
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-secondary/70">
                <span className="text-xs font-mono" id="cache-size">
                  {cacheText}
                </span>
                <span className="material-symbols-outlined !text-[18px] text-secondary/60">
                  chevron_right
                </span>
              </div>
            </div>

            {/* 校园闲置互助安全公约与条款 */}
            <div
              onClick={() => onNavigate('guide')}
              className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  gavel
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    校园闲置互助安全公约
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    防诈指引、绿色互换与违规处理规约
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-secondary/60">
                <span className="material-symbols-outlined !text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* 关于建院流转 */}
            <div className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low/50 active:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0 !text-[21px]">
                  info
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    关于建院流转
                  </p>
                  <p className="text-xs text-secondary/80 truncate mt-0.5">
                    校园微公益 · 绿色可持续
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-secondary/70">
                <span className="text-xs font-mono">v2.4.0</span>
                <span className="material-symbols-outlined !text-[18px] text-secondary/60">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions Area */}
        <section className="pt-2 space-y-4">
          {/* Logout Button */}
          <button
            onClick={() => onNavigate('register')}
            className="w-full bg-white text-primary border border-outline-variant/30 hover:bg-surface-container-low active:scale-[0.99] font-medium text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined !text-[18px]">
              logout
            </span>
            退出当前学生账号
          </button>

          {/* Footer Tagline */}
          <div className="text-center pt-2 pb-2">
            <p className="text-[11px] text-secondary/70 tracking-wider">
              广东建设职业技术学院 · 绿色低碳闲置互助
            </p>
            <p className="text-[10px] text-secondary/50 font-mono mt-0.5">
              Campus Circulation &amp; Eco-Exchange
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
