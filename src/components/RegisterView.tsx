import React, { useEffect, useState } from 'react';
import { validateRegisterForm } from '../data/marketplaceData';

interface RegisterViewProps {
  onBack: () => void;
  onCompleteRegister: (campus: '清远校区' | '广州校区', phone: string) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onBack,
  onCompleteRegister,
}) => {
  const [selectedCampus, setSelectedCampus] = useState<'清远校区' | '广州校区'>(
    '清远校区'
  );
  const [phone, setPhone] = useState('13800138000');
  const [code, setCode] = useState('668899');
  const [password, setPassword] = useState('jianYuan2026');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleGetCode = () => {
    if (countdown > 0) return;
    if (!/^1\d{10}$/.test(phone.replace(/\s+/g, ''))) {
      setFeedback({ type: 'error', text: '请先输入有效的11位手机号码' });
      return;
    }
    setCountdown(60);
    setCode('826419');
    setFeedback({
      type: 'success',
      text: '建院实名验证码已发送（已自动填入 826419）',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateRegisterForm({ phone, code, password, agreed });
    if (!check.valid) {
      setFeedback({
        type: 'error',
        text: check.error || '请检查注册信息是否完整',
      });
      return;
    }
    setFeedback({
      type: 'success',
      text: isLoginMode
        ? '登录成功！正在返回建院闲置集市...'
        : '实名学籍注册成功！正在进入建院闲置集市...',
    });
    setTimeout(() => {
      onCompleteRegister(selectedCampus, phone);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF9FD] text-[#1A1B1E] flex flex-col px-6 pt-3 pb-10 relative">
      {/* Top Back Arrow */}
      <header className="h-12 flex items-center -ml-2">
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1B1E] hover:bg-black/5 active:scale-95 transition"
        >
          <span className="material-symbols-outlined text-[24px]">
            arrow_back
          </span>
        </button>
      </header>

      {/* Brand Badge Icon */}
      <div className="mt-4">
        <div className="w-14 h-14 rounded-2xl bg-[#F4F3F7] border border-black/[0.04] flex items-center justify-center shadow-2xs">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9F4031] via-[#E97865] to-[#FFDAD4] flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-white rotate-45" />
          </div>
        </div>

        <h1 className="text-[24px] font-bold text-[#1A1B1E] tracking-tight mt-5">
          {isLoginMode ? '登录建院账号' : '注册新账号'}
        </h1>
        <p className="text-[13px] text-[#665C59] mt-1">
          广东建设职业技术学院 · 实名学生{isLoginMode ? '登录' : '注册'}
        </p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`mt-4 px-3.5 py-2 rounded-xl text-xs font-medium ${
            feedback.type === 'error'
              ? 'bg-error-container text-on-error-container'
              : 'bg-emerald-50 text-tertiary'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5 flex-1">
        {/* 所在校区 */}
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[#665C59] block">
            所在校区
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['清远校区', '广州校区'] as const).map((cp) => {
              const active = selectedCampus === cp;
              return (
                <button
                  key={cp}
                  type="button"
                  onClick={() => setSelectedCampus(cp)}
                  className={`h-12 rounded-2xl text-[14px] font-medium transition-all ${
                    active
                      ? 'bg-[#FDF1EE] border border-[#E2BFB8] text-[#9F4031] font-semibold'
                      : 'bg-[#F4F3F7] border border-transparent text-[#665C59]'
                  }`}
                >
                  {cp}
                </button>
              );
            })}
          </div>
        </div>

        {/* 手机号码 */}
        <div className="space-y-2">
          <label
            htmlFor="reg-phone"
            className="text-[13px] font-medium text-[#665C59] block"
          >
            手机号码
          </label>
          <div className="h-14 rounded-2xl bg-[#F4F3F7] border border-black/[0.03] px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-[15px] font-semibold text-[#1A1B1E] shrink-0">
              <span>+86</span>
              <span className="material-symbols-outlined text-[16px] text-[#89726E]">
                arrow_drop_down
              </span>
            </div>
            <div className="w-px h-5 bg-black/10 shrink-0" />
            <input
              id="reg-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setFeedback(null);
              }}
              placeholder="常用手机号"
              className="w-full bg-transparent text-right text-[15px] text-[#1A1B1E] placeholder:text-[#56423F] focus:outline-none tabular-nums"
            />
          </div>
        </div>

        {/* 短信验证码 */}
        <div className="space-y-2">
          <label
            htmlFor="reg-code"
            className="text-[13px] font-medium text-[#665C59] block"
          >
            短信验证码
          </label>
          <div className="h-14 rounded-2xl bg-[#F4F3F7] border border-black/[0.03] px-4 flex items-center justify-between gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#A09896] shrink-0">
              sms
            </span>
            <input
              id="reg-code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setFeedback(null);
              }}
              placeholder="6位验证码"
              className="flex-1 bg-transparent text-[15px] text-[#1A1B1E] placeholder:text-[#56423F] focus:outline-none tabular-nums"
            />
            <button
              type="button"
              onClick={handleGetCode}
              className="text-[13px] font-semibold text-[#9F4031] hover:opacity-80 shrink-0 whitespace-nowrap"
            >
              {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
            </button>
          </div>
        </div>

        {/* 设置登录密码 */}
        <div className="space-y-2">
          <label
            htmlFor="reg-password"
            className="text-[13px] font-medium text-[#665C59] block"
          >
            设置登录密码
          </label>
          <div className="h-14 rounded-2xl bg-[#F4F3F7] border border-black/[0.03] px-4 flex items-center justify-between gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#A09896] shrink-0">
              lock
            </span>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFeedback(null);
              }}
              placeholder="设置密码 (8-20位)"
              className="flex-1 bg-transparent text-[15px] text-[#1A1B1E] placeholder:text-[#56423F] focus:outline-none"
            />
            <button
              type="button"
              aria-label={showPassword ? '隐藏密码' : '显示密码'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[#665C59] hover:text-[#1A1B1E] shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
        </div>

        {/* 协议勾选 */}
        <div className="flex items-start gap-2.5 pt-2">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            aria-label="同意建院校园闲置平台使用协议与隐私保护规则"
            onClick={() => setAgreed((prev) => !prev)}
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              agreed
                ? 'bg-[#9F4031] text-white'
                : 'bg-[#E3E2E6] text-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] font-bold">
              check
            </span>
          </button>
          <p className="text-[12px] text-[#665C59] leading-relaxed">
            已阅读并同意{' '}
            <span className="text-[#9F4031] font-medium">
              《建院校园闲置平台使用协议》
            </span>{' '}
            与{' '}
            <span className="text-[#9F4031] font-medium">
              《隐私保护规则》
            </span>
          </p>
        </div>

        {/* 完成注册按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-14 rounded-full bg-[#E97865] text-white text-[16px] font-bold shadow-[0_6px_20px_rgba(233,120,101,0.3)] hover:brightness-105 active:scale-[0.99] transition-all"
          >
            {isLoginMode ? '立即登录' : '完成注册'}
          </button>
        </div>

        {/* 底部去登录 */}
        <div className="pt-2 text-center">
          <p className="text-[13px] text-[#665C59]">
            {isLoginMode ? '还没有账号？' : '已有账号？'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLoginMode((prev) => !prev);
                setFeedback(null);
              }}
              className="text-[#9F4031] font-semibold ml-1 hover:underline"
            >
              {isLoginMode ? '去注册' : '去登录'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
