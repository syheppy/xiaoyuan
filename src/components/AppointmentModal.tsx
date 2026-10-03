import React, { useState } from 'react';
import { X, Calendar, MapPin, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { Product, Campus, CirculationMethod } from '../types';

interface AppointmentModalProps {
  product: Product;
  currentCampus: Campus;
  onClose: () => void;
  onSuccess: (appointment: {
    campus: '广州校区' | '清远校区';
    location: string;
    dateTime: string;
    circulationMethod: CirculationMethod;
    verificationCode: string;
  }) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  product,
  currentCampus,
  onClose,
  onSuccess,
}) => {
  const initialCampus = currentCampus === '广州校区' ? '广州校区' : '清远校区';
  const [selectedCampus, setSelectedCampus] = useState<'广州校区' | '清远校区'>(initialCampus);
  
  const locationsMap = {
    清远校区: [
      '清远校区·图文信息中心一楼自习大厅',
      '清远校区·1号宿舍楼下阿姨门禁处',
      '清远校区·弘毅楼1楼大厅',
      '清远校区·第一学生食堂东门',
    ],
    广州校区: [
      '广州校区·教学楼大厅服务台',
      '广州校区·第一食堂旁快递服务点',
      '广州校区·弘毅楼前坪草坪',
      '广州校区·文体中心门口',
    ],
  };

  const [selectedLocation, setSelectedLocation] = useState(
    product.meetupLocation.includes('广州') ? '广州校区·教学楼大厅服务台' : locationsMap['清远校区'][0]
  );
  const [selectedTime, setSelectedTime] = useState('今日 17:30 (下午课后)');
  const [circulationMethod, setCirculationMethod] = useState<CirculationMethod>('校内当面自提');
  const [buyerNote, setBuyerNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const timeOptions = [
    '今日 17:30 (下午课后)',
    '今日 19:00 (晚自习前)',
    '明天中午 12:30 (午休自提)',
    '明天下午 17:30 (课间面交)',
  ];

  const handleConfirm = () => {
    const code = `JY-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(code);
    setConfirmed(true);
    onSuccess({
      campus: selectedCampus,
      location: selectedLocation,
      dateTime: selectedTime,
      circulationMethod,
      verificationCode: code,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E45749]"></span>
            <h3 className="font-bold text-slate-800 text-base">约定建院校内面交</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!confirmed ? (
          <div className="p-4 space-y-4">
            {/* Target Item summary */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-[#E45749]">
                    ¥{product.price}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    卖家: {product.seller.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Campus selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                选择面交校区
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['清远校区', '广州校区'] as const).map((campus) => (
                  <button
                    key={campus}
                    type="button"
                    onClick={() => {
                      setSelectedCampus(campus);
                      setSelectedLocation(locationsMap[campus][0]);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedCampus === campus
                        ? 'border-[#E45749] bg-rose-50/50 text-[#E45749] font-bold ring-1 ring-[#E45749]'
                        : 'border-stone-200 bg-white text-slate-600 hover:border-stone-300'
                    }`}
                  >
                    {campus}
                  </button>
                ))}
              </div>
            </div>

            {/* Campus location picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E45749]" />
                选择约定交接地点 (校内安全点)
              </label>
              <div className="space-y-1.5">
                {locationsMap[selectedCampus].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all flex items-center justify-between ${
                      selectedLocation === loc
                        ? 'border-[#E45749] bg-rose-50/40 text-slate-900 font-medium'
                        : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{loc}</span>
                    {selectedLocation === loc && (
                      <CheckCircle2 className="w-4 h-4 text-[#E45749] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Meetup time */}
            <div>
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E45749]" />
                期望面交时间
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-xl text-[11px] border text-left transition-all ${
                      selectedTime === time
                        ? 'border-[#E45749] bg-rose-50/40 text-[#E45749] font-semibold'
                        : 'border-stone-200 text-slate-600 hover:bg-stone-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Circulation Method */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                流转交接方式
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: '校内当面自提', desc: '现场验货开机最稳妥' },
                  { title: '同宿舍楼顺手带', desc: '舍友互助送至门牌' },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setCirculationMethod(item.title as CirculationMethod)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      circulationMethod === item.title
                        ? 'border-[#E45749] bg-rose-50/40 text-slate-800'
                        : 'border-stone-200 text-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Note input */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">
                给同学留言 (选填，如：我穿白色卫衣在自习室靠窗)
              </label>
              <input
                type="text"
                placeholder="方便彼此相认的特征或特殊要求..."
                value={buyerNote}
                onChange={(e) => setBuyerNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#E45749]"
              />
            </div>

            {/* Guarantee note */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                建院校内互助提醒：无需提前垫付押金，双方到达约定地点现场验货无误后再确认付款。
              </p>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#E45749] to-[#F06A5C] text-white font-bold text-sm shadow-md shadow-rose-500/25 active:scale-98 transition-transform"
            >
              确认生成校内面交约定
            </button>
          </div>
        ) : (
          <div className="p-5 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-800">
                面交约定已成功发起！
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                已向卖家 {product.seller.name} 发送面交提醒卡片
              </p>
            </div>

            {/* Verification code voucher card */}
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-4 text-center space-y-2">
              <div className="text-[11px] text-slate-400 font-medium">
                广东建院校内核销码
              </div>
              <div className="text-2xl font-mono font-bold tracking-widest text-[#E45749]">
                {generatedCode}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-white px-2 py-1 rounded-md border border-stone-200">
                <QrCode className="w-3.5 h-3.5 text-slate-400" />
                当面验货无误后向对方出示
              </div>

              <div className="border-t border-stone-200/80 pt-3 text-left space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">面交地点：</span>
                  <span className="font-medium text-slate-800">{selectedLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">约定时间：</span>
                  <span className="font-medium text-slate-800">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">交接金额：</span>
                  <span className="font-bold text-[#E45749]">¥{product.price}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-stone-900 text-white font-medium text-xs hover:bg-stone-800"
            >
              我知道了，返回浏览
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
