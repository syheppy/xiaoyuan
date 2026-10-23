import React, { useState } from 'react';
import { ScreenId } from '../data/marketplaceData';

interface SupportAssistantViewProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

const FAQS = [
  {
    q: '如何完成广东建院学生学籍认证？',
    a: '点击「我的 - 校园身份认证」或「设置 - 校内学籍认证管理」，使用本人常用手机号接收实名验证码即可完成绑定。',
  },
  {
    q: '面交后发现物品有问题怎么办？',
    a: '建议在面交现场通电验货。若交接后发现与描述严重不符，可先通过私聊与同学协商退换，或提交面交凭据由小助手介入协调。',
  },
  {
    q: '发布的闲置或求购如何下架？',
    a: '在「在售发布」或「求购广场」中找到自己发布的条目，点击「下架」或「撤回」即可随时停止展示。',
  },
];

export const SupportAssistantView: React.FC<SupportAssistantViewProps> = ({
  onBack,
  onNavigate,
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setSubmitted(true);
    setFeedbackText('');
    window.setTimeout(() => setSubmitted(false), 2500);
  };

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
            联系建院流转小助手
          </h1>
          <div className="w-9 h-9" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3.5 pt-4 pb-12 space-y-5">
        {/* Section 1: 服务时间与站点 */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            校内服务信息
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary !text-[20px]">
                  schedule
                </span>
                <span className="text-sm font-medium text-on-surface">
                  在线值班时间
                </span>
              </div>
              <span className="text-xs text-secondary font-mono">
                每日 09:00 - 22:00
              </span>
            </div>

            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary !text-[20px]">
                  apartment
                </span>
                <span className="text-sm font-medium text-on-surface">
                  清远校区服务点
                </span>
              </div>
              <span className="text-xs text-secondary">
                学生活动中心 204
              </span>
            </div>

            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary !text-[20px]">
                  location_city
                </span>
                <span className="text-sm font-medium text-on-surface">
                  广州校区服务点
                </span>
              </div>
              <span className="text-xs text-secondary">
                学生服务大厅一楼
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: 常见问题解答 */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            常见问题
          </h2>
          <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-outline-variant/20">
            {FAQS.map((item) => (
              <div key={item.q} className="p-4 space-y-1.5">
                <p className="text-sm font-medium text-on-surface">{item.q}</p>
                <p className="text-xs text-secondary/80 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 留言反馈 */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-secondary px-1 tracking-wide">
            问题反馈与申诉
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 space-y-3"
          >
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="请简要描述你遇到的问题或建议..."
              className="w-full rounded-xl bg-surface-container-low p-3 text-xs text-on-surface placeholder:text-secondary/50 focus:outline-none resize-none leading-relaxed"
            />
            {submitted && (
              <p className="text-xs text-[#2E7D32]">
                已收到你的反馈，小助手将在消息中心回复你。
              </p>
            )}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                提交留言
              </button>
              <button
                type="button"
                onClick={() => onNavigate('messages')}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-95 transition-opacity cursor-pointer"
              >
                前往消息中心私聊
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
