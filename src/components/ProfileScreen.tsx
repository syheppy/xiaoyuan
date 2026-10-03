import React, { useState } from 'react';
import {
  Edit3,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Package,
  Clock,
  IdCard,
  MapPin,
  BookOpen,
  Headphones,
  Award,
  Sparkles,
} from 'lucide-react';
import { Appointment, Campus, Product } from '../types';
import { CampusLogo } from './CampusLogo';

interface ProfileScreenProps {
  currentCampus: Campus;
  onCampusChange: (campus: Campus) => void;
  appointments: Appointment[];
  myProductsCount: number;
  favoritesCount: number;
  onOpenAppointmentModal: (appointment?: Appointment) => void;
  onOpenPact: () => void;
  onOpenCert: () => void;
  onViewMyProducts: () => void;
  onViewFavorites: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentCampus,
  onCampusChange,
  appointments,
  myProductsCount,
  favoritesCount,
  onOpenAppointmentModal,
  onOpenPact,
  onOpenCert,
  onViewMyProducts,
  onViewFavorites,
}) => {
  const pendingApt = appointments.find((a) => a.status === 'pending');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setShowFeedbackModal(false);
      setFeedbackText('');
    }, 1500);
  };

  return (
    <div className="pb-28 bg-[#F8F9FA] min-h-screen text-slate-800">
      <div className="p-3.5 space-y-3.5">
        {/* User Card matching Image 5 */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar with verification badge */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                  alt="建院小李同学"
                  className="w-15 h-15 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-slate-800">
                    建院小李同学
                  </h2>
                  <button
                    onClick={() => alert('编辑资料：可修改个人个性签名与展示系别')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  广东建院·{currentCampus}·建筑工程学院
                </p>
                <div className="mt-1">
                  <span
                    onClick={onOpenCert}
                    className="cursor-pointer text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/70 px-2 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 hover:bg-emerald-100/60"
                  >
                    实名校内认证已通过 &gt;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Carbon offset badge matching Image 5 */}
          <div className="bg-gradient-to-r from-rose-50 to-amber-50/80 border border-rose-100 rounded-2xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#E45749]"></span>
              <span className="font-medium">已助力建院减碳</span>
              <span className="font-bold text-[#E45749]">14.8 kg</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              校级第 42 名
            </span>
          </div>

          {/* Stats Row matching Image 5 */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-center">
            <div
              onClick={onViewMyProducts}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-lg font-bold text-slate-800 leading-tight">
                {myProductsCount}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">我发布的</div>
            </div>

            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-lg font-bold text-slate-800 leading-tight">
                5
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">我卖出的</div>
            </div>

            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-lg font-bold text-slate-800 leading-tight">
                2
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">我买到的</div>
            </div>

            <div
              onClick={onViewFavorites}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-lg font-bold text-slate-800 leading-tight">
                {favoritesCount}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">我的收藏</div>
            </div>
          </div>
        </div>

        {/* Pending Appointment Banner matching Image 5 */}
        {pendingApt && (
          <div className="bg-rose-50/90 border border-rose-200/80 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#E45749]/15 text-[#E45749] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800">
                  今日有1个待面交约定
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {pendingApt.location}
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAppointmentModal(pendingApt)}
              className="px-3 py-1 rounded-full bg-[#E45749] text-white text-xs font-bold shadow-xs hover:bg-rose-600 flex-shrink-0"
            >
              查看
            </button>
          </div>
        )}

        {/* Menu Items List matching Screenshot 5 */}
        <div className="bg-white rounded-3xl p-2 border border-stone-200/80 shadow-2xs space-y-1">
          {/* 我的闲置物品 */}
          <div
            onClick={onViewMyProducts}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  我的闲置物品
                </h4>
                <p className="text-[10px] text-slate-400">
                  管理在架与已流转教材、绘图工具
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span>{myProductsCount}件在架</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 校内面交约定 */}
          <div
            onClick={() => onOpenAppointmentModal(pendingApt)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  校内面交约定
                </h4>
                <p className="text-[10px] text-slate-400">
                  查看待面交地点、时间提醒与核销码
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E45749]"></span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 我的校内认证 */}
          <div
            onClick={onOpenCert}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <IdCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  我的校内认证
                </h4>
                <p className="text-[10px] text-slate-400">
                  学信网 / 广东建院校园卡绑定状态
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <span>已绑定</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 常驻校区设置 */}
          <div
            onClick={() => {
              const next = currentCampus === '广州校区' ? '清远校区' : '广州校区';
              onCampusChange(next);
            }}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  常驻校区设置
                </h4>
                <p className="text-[10px] text-slate-400">
                  快速切换 Guangzhou / Qingyuan...
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-700 font-semibold">
              <span>{currentCampus}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 建院闲置互助公约 */}
          <div
            onClick={onOpenPact}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  建院闲置互助公约
                </h4>
                <p className="text-[10px] text-slate-400">
                  了解安全自提、文明流转与防骗指引
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* 意见反馈与客服 */}
          <div
            onClick={() => setShowFeedbackModal(true)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-600">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  意见反馈与客服
                </h4>
                <p className="text-[10px] text-slate-400">
                  联系学生会志愿服务团队
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Footer info matching Screenshot 5 */}
        <div className="pt-2 pb-6 text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
            <CampusLogo className="w-4 h-4 flex-shrink-0" />
            <span>广东建设职业技术学院·绿色校园闲置互助项目 v2.4</span>
          </div>
          <p className="text-[10px] text-slate-400">
            让闲置教材绘图仪在同门师弟师妹手中延续价值
          </p>
        </div>
      </div>

      {/* Feedback Dialog Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">意见反馈与仲裁咨询</h3>
            <p className="text-[11px] text-slate-500">
              如在校内交易中遇到违规加价、虚假描述或需要学生会志愿服务队协助：
            </p>
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="请输入您的反馈或学号信息..."
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#E45749]"
            />
            {feedbackSent ? (
              <div className="text-xs text-emerald-600 font-bold text-center py-2">
                ✓ 感谢反馈，学生会服务团队已受理！
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 py-2 text-xs text-slate-500 hover:bg-stone-100 rounded-full"
                >
                  取消
                </button>
                <button
                  onClick={handleSendFeedback}
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#E45749] rounded-full shadow-xs"
                >
                  提交反馈
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
