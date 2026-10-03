import React from 'react';
import { X, ShieldCheck, Check, AlertCircle } from 'lucide-react';

interface PactModalProps {
  onClose: () => void;
}

export const PactModal: React.FC<PactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 px-5 py-4 border-b border-rose-100/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E45749] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                广东建院校园闲置流转公约
              </h3>
              <p className="text-[10px] text-slate-500">绿色低碳 · 真实自提 · 互助自律</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-[#E45749] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">仅限本校实名同学</h4>
              <p className="text-[11px] text-slate-500">
                平台仅向广东建设职业技术学院（广州校区、清远校区）经学信网或校园一卡通认证学生开放，严禁校外人员发布商业推广。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-[#E45749] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">坚持校内当面验货</h4>
              <p className="text-[11px] text-slate-500">
                提倡在图书馆、弘毅楼大厅、食堂及宿舍楼下等校内安全公共区域当面验货开机，确认无瑕疵后再支付，杜绝提前付定金或快递诈骗。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-[#E45749] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">实物实拍与诚实描述</h4>
              <p className="text-[11px] text-slate-500">
                严禁网图搬运，请在宿舍书桌自然光下拍摄真实实物，如实注明成色、使用频次、配件包装与潜在瑕疵。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-[#E45749] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
              4
            </span>
            <div>
              <h4 className="font-bold text-slate-800 mb-0.5">绿色校园 · 爱心传递</h4>
              <p className="text-[11px] text-slate-500">
                鼓励毕业季书籍教材、绘图工具、军训用品低价转出或0元爱心赠送，共同助力建院低碳校园建设。
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-[11px] text-amber-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>
              若遇到纠纷或违规人员，可前往个人中心点击【意见反馈与客服】联系院团委学生会志愿仲裁小组。
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#E45749] text-white font-bold text-xs shadow-md shadow-rose-500/20 active:scale-98 transition-transform flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            我已知悉并承诺遵守
          </button>
        </div>
      </div>
    </div>
  );
};
