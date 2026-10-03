import React from 'react';
import { X, CheckCircle2, ShieldCheck, GraduationCap, School } from 'lucide-react';

interface CertificationModalProps {
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <School className="w-6 h-6" />
            <span className="font-bold text-sm tracking-wide">
              广东建设职业技术学院
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <h3 className="text-lg font-bold">校内学生实名身份卡</h3>
            <span className="bg-emerald-400/30 text-white text-[10px] px-2 py-0.5 rounded-full border border-emerald-300/40 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-200" />
              已认证
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5 text-xs text-slate-700">
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">认证姓名</span>
              <span className="font-bold text-slate-800">李*（建院小李同学）</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">在读学号</span>
              <span className="font-mono font-medium text-slate-800">2023****0812</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">所属学院</span>
              <span className="font-medium text-slate-800">建筑工程学院</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">常驻校区</span>
              <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                清远主校区
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">校园一卡通</span>
              <span className="font-mono text-slate-800">6225****8823 (正常)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">认证来源</span>
              <span className="text-slate-600 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                学信网在线学籍核验通过
              </span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              您的建院学生身份信息已完成双重核验，可享有【免定金校内预约面交】与【校内自律维权】权益。
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs hover:bg-slate-800"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
};
