import React, { useEffect, useRef, useState } from 'react';
import { ConversationItem, HOTLINK_IMAGES } from '../data/marketplaceData';

interface ChatDetailViewProps {
  conversation: ConversationItem;
  onBack: () => void;
  onViewProduct?: () => void;
  onSendMessage: (
    conversationId: string,
    text: string,
    extra?: {
      imageUrl?: string;
      imageTag?: string;
      voiceSeconds?: number;
      paymentInfo?: {
        amount: number;
        itemTitle: string;
        method: string;
        verified: boolean;
      };
    }
  ) => void;
  onScheduleMeetup: (
    conversationId: string,
    time: string,
    location: string,
    amount?: number
  ) => void;
}

const QUICK_REPLIES = [
  '在哪里见面方便？',
  '能当面开机验货吗？',
  '发张实拍照片看看？',
  '能少一点交个朋友吗？',
  '配件齐全吗？',
  '我马上到桂园楼下',
];

const EMOJI_AND_PHRASES = [
  '😊',
  '🤝',
  '👌',
  '🙏',
  '🎉',
  '👍',
  '✨',
  '🔥',
  '【当面验货】',
  '【诚心要】',
  '【桂园自提】',
  '【准时到】',
];

const OFFICIAL_QUICK_REPLIES = [
  '查看降价商品',
  '交易安全须知',
  '如何当面验货？',
  '举报可疑交易',
  '联系人工客服',
];

const MEETUP_LOCATIONS = [
  '清远 · 桂园宿舍值班室旁',
  '清远 · 图文信息中心大堂',
  '清远 · 第一食堂西门口',
  '广州 · 丛云路教学楼架空层',
];

const MEETUP_TIMES = [
  '今天 19:00',
  '今晚 20:30',
  '明天 12:30',
  '明天 17:30',
];

export const ChatDetailView: React.FC<ChatDetailViewProps> = ({
  conversation,
  onBack,
  onViewProduct,
  onSendMessage,
  onScheduleMeetup,
}) => {
  const [inputText, setInputText] = useState('');
  const [sentReplies, setSentReplies] = useState<string[]>([]);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(1);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    tag?: string;
  } | null>(null);
  const [selectedUtility, setSelectedUtility] = useState<
    'album' | 'condition' | 'meetup' | 'payment'
  >('meetup');

  const [activeToolModal, setActiveToolModal] = useState<
    null | 'album' | 'condition' | 'meetup' | 'payment' | 'bargain'
  >(null);

  const basePrice = conversation.productPrice ?? 1350;
  const isOfficial = conversation.statusType === 'official';
  const [meetupTime, setMeetupTime] = useState('今天 19:00');
  const [meetupLocation, setMeetupLocation] = useState(MEETUP_LOCATIONS[0]);
  const [meetupAmount, setMeetupAmount] = useState<number>(basePrice);
  const [bargainPrice, setBargainPrice] = useState<number>(
    Math.max(1, basePrice > 100 ? basePrice - 20 : basePrice - 2)
  );
  const [bargainNote, setBargainNote] = useState('支持随时到宿舍楼下自提');

  const [checkedAppearance, setCheckedAppearance] = useState(true);
  const [checkedFunction, setCheckedFunction] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'campus'>(
    'wechat'
  );

  const [infoToast, setInfoToast] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const albumPresets = [
    {
      title: `${conversation.productTitle?.slice(0, 10) || '当前闲置'}正面成色实拍`,
      url: conversation.productThumb || HOTLINK_IMAGES.ipadDetailHero,
      tag: '相册原图',
    },
    {
      title: '书桌自然光日常使用状态',
      url: HOTLINK_IMAGES.homeIpad,
      tag: '相册原图',
    },
    {
      title: '细节与配件完好特写',
      url: HOTLINK_IMAGES.mouse1,
      tag: '相册原图',
    },
    {
      title: '包装与随附赠品实拍',
      url: HOTLINK_IMAGES.homePolaroid,
      tag: '相册原图',
    },
  ];

  const conditionPresets = [
    {
      title: `${conversation.productTitle?.slice(0, 12) || '闲置宝贝'}无划痕微距实拍`,
      desc: '自然光下无暗病、功能完好，支持当面核验',
      url: conversation.productThumb || HOTLINK_IMAGES.ipadDetailHero,
      tag: `${conversation.productCondition || '95新'} · 主图核验`,
    },
    {
      title: '原装配件与随附物品全家福',
      desc: '配件齐全完好，面交时一并打包带齐',
      url: HOTLINK_IMAGES.homeIpad,
      tag: '配件实拍核验',
    },
    {
      title: '边角无磕碰细节微距图',
      desc: '平时爱惜使用，外观成色如实描述',
      url: HOTLINK_IMAGES.mouse2,
      tag: '边角细节实拍',
    },
  ];

  useEffect(() => {
    const p = conversation.productPrice ?? 1350;
    setMeetupAmount(p);
    setBargainPrice(Math.max(1, p > 100 ? p - 20 : p - 2));
    setDrawerOpen(false);
    setShowEmojiPicker(false);
    setShowMoreMenu(false);
    setVoiceMode(false);
    setIsPartnerTyping(false);
  }, [conversation.id, conversation.productPrice]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [conversation.messages.length, isPartnerTyping]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => {
      setRecordSeconds((s) => (s < 60 ? s + 1 : s));
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  const triggerToast = (msg: string) => {
    setInfoToast(msg);
    setTimeout(() => setInfoToast(null), 2200);
  };

  const simulateTypingState = () => {
    setIsPartnerTyping(true);
    setTimeout(() => {
      setIsPartnerTyping(false);
    }, 640);
  };

  const handleSend = (textToSend?: string) => {
    const content = (textToSend ?? inputText).trim();
    if (!content) return;
    onSendMessage(conversation.id, content);
    simulateTypingState();
    if (textToSend) {
      setSentReplies((prev) =>
        prev.includes(textToSend) ? prev : [...prev, textToSend]
      );
    } else {
      setInputText('');
      setShowEmojiPicker(false);
    }
  };

  const handleVoiceAction = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordSeconds(1);
    } else {
      const duration = Math.max(2, recordSeconds);
      setIsRecording(false);
      onSendMessage(
        conversation.id,
        `[语音消息 ${duration}"] 同学你好，我今晚7点准时到桂园宿舍楼下当面验机～`,
        { voiceSeconds: duration }
      );
      simulateTypingState();
      triggerToast(`已发送 ${duration}" 语音消息`);
    }
  };

  // ---- Hold-to-talk voice recording (按住说话 / 移出取消) ----
  const willCancelRef = useRef(false);
  const recordSecondsRef = useRef(1);
  const [willCancel, setWillCancel] = useState(false);

  useEffect(() => {
    recordSecondsRef.current = recordSeconds;
  }, [recordSeconds]);

  const startHoldRecording = () => {
    willCancelRef.current = false;
    setWillCancel(false);
    setRecordSeconds(1);
    setIsRecording(true);
  };

  useEffect(() => {
    if (!isRecording) return;
    const finish = () => {
      setIsRecording(false);
      setWillCancel(false);
      if (willCancelRef.current) {
        triggerToast('已取消发送语音');
        return;
      }
      const duration = Math.max(1, recordSecondsRef.current);
      onSendMessage(
        conversation.id,
        `[语音消息 ${duration}"] 同学你好，我今晚7点准时到桂园宿舍楼下当面验机～`,
        { voiceSeconds: duration }
      );
      simulateTypingState();
    };
    window.addEventListener('pointerup', finish);
    return () => window.removeEventListener('pointerup', finish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const togglePanel = (panel: 'emoji' | 'tools') => {
    if (panel === 'emoji') {
      setShowEmojiPicker((v) => !v);
      setDrawerOpen(false);
      setVoiceMode(false);
    } else {
      setDrawerOpen((v) => !v);
      setShowEmojiPicker(false);
    }
  };

  const handleSendAlbumPhoto = (title: string, url: string, tag: string) => {
    onSendMessage(conversation.id, `已发送实拍图片：${title}`, {
      imageUrl: url,
      imageTag: tag,
    });
    setActiveToolModal(null);
    simulateTypingState();
    triggerToast('实拍图片已发送至聊天窗口');
  };

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    handleSendAlbumPhoto(
      file.name.replace(/\.[^.]+$/, ''),
      objectUrl,
      '本地相册实拍'
    );
  };

  const handleSaveMeetup = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleMeetup(
      conversation.id,
      meetupTime,
      meetupLocation,
      meetupAmount
    );
    setActiveToolModal(null);
    simulateTypingState();
    triggerToast('已更新并发送校内面交约定卡片');
  };

  const handleSendBargain = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(
      conversation.id,
      `同学你好，诚心想要这件「${conversation.productTitle || '闲置宝贝'}」，请问 ¥${bargainPrice} 可以出吗？（${bargainNote}）`
    );
    setMeetupAmount(bargainPrice);
    setActiveToolModal(null);
    simulateTypingState();
    triggerToast(`已发送诚心出价 ¥${bargainPrice}`);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkedAppearance || !checkedFunction) {
      triggerToast('请先确认已当面核验实物成色与功能');
      return;
    }
    onSendMessage(conversation.id, '已完成校内当面验货支付', {
      paymentInfo: {
        amount: meetupAmount,
        itemTitle: conversation.productTitle || '自用考研 iPad 9代 64G 银色',
        method:
          paymentMethod === 'wechat'
            ? '微信当面扫码付'
            : '建院校园卡实名互助付',
        verified: true,
      },
    });
    setActiveToolModal(null);
    triggerToast(`已确认当面支付 ¥${meetupAmount}`);
  };

  return (
    <div
      className={`w-full bg-surface flex flex-col min-h-screen relative transition-all ${
        drawerOpen || showEmojiPicker ? 'pb-[19rem]' : 'pb-32'
      }`}
    >
      {/* Top Navigation Header（简约：返回 · 昵称/状态 · 更多） */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md">
        <div className="h-12 px-1.5 grid grid-cols-[40px_1fr_40px] items-center">
          <button
            type="button"
            aria-label="返回"
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-low active:scale-95 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">
              arrow_back_ios_new
            </span>
          </button>

          <div className="flex flex-col items-center min-w-0 leading-tight">
            <div className="flex items-center gap-1 max-w-full">
              <h1 className="text-[15px] font-semibold text-on-surface truncate">
                {conversation.userName}
              </h1>
              {isOfficial ? (
                <span className="px-1.5 py-0.5 rounded bg-rose-50 text-[#9C3D28] text-[10px] font-medium shrink-0">
                  官方
                </span>
              ) : (
                <span
                  title="建院实名认证"
                  className="material-symbols-outlined material-fill !text-[14px] text-[#2e7d32] shrink-0"
                >
                  verified
                </span>
              )}
            </div>
            <span className="text-[10px] text-outline truncate max-w-full flex items-center gap-1">
              {isPartnerTyping ? (
                <span className="text-primary">对方正在输入…</span>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]" />
                  {conversation.onlineText}
                </>
              )}
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="更多"
              onClick={() => setShowMoreMenu((v) => !v)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-low active:scale-95 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">
                more_horiz
              </span>
            </button>
            {showMoreMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowMoreMenu(false)}
                />
                <div className="absolute right-1 top-full mt-1 w-36 rounded-xl bg-white border border-outline-variant/30 shadow-lg py-1 z-40 text-xs">
                  {[
                    { icon: 'shield', label: '交易安全须知', toast: '建议在校内公共场所当面验货后再付款' },
                    { icon: 'notifications_off', label: '消息免打扰', toast: '已开启消息免打扰' },
                    { icon: 'flag', label: '举报', toast: '已提交举报，平台将尽快核实' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setShowMoreMenu(false);
                        triggerToast(item.toast);
                      }}
                      className="w-full px-3 py-2.5 flex items-center gap-2 text-on-surface hover:bg-surface-container-low text-left cursor-pointer"
                    >
                      <span className="material-symbols-outlined !text-[16px] text-secondary">
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Pinned Item Card（点击进入商品详情） */}
        {conversation.productTitle && !isOfficial && (
          <div className="px-3 pb-2.5">
            <div className="flex items-center gap-2.5 rounded-xl bg-surface-container-low px-2.5 py-2">
              <button
                type="button"
                onClick={() => onViewProduct?.()}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer group"
              >
                <img
                  className="w-11 h-11 rounded-lg object-cover shrink-0 bg-surface-container"
                  alt={conversation.productTitle}
                  src={conversation.productThumb || HOTLINK_IMAGES.ipadThumb}
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-on-surface truncate group-hover:text-primary transition-colors">
                    {conversation.productTitle}
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-0.5 tabular-nums">
                    <span className="text-[15px] font-bold text-primary">
                      ¥{conversation.productPrice ?? 1350}
                    </span>
                    <span className="text-[10px] text-outline">
                      {conversation.productCondition || '95新'}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined !text-[18px] text-outline shrink-0">
                  chevron_right
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveToolModal('meetup')}
                className="h-8 px-3.5 rounded-full bg-primary text-white text-xs font-medium shrink-0 active:scale-95 hover:opacity-95 transition cursor-pointer"
              >
                约面交
              </button>
            </div>
          </div>
        )}
        <div className="h-px bg-outline-variant/25" />
      </header>

      {/* 3. Chat Message Stream */}
      <main className="flex-1 px-3 py-2 flex flex-col text-sm">
        <div className="flex flex-col items-center gap-1 my-2">
          <span className="text-[11px] text-outline">今天 14:15</span>
          <span className="text-[10px] text-outline/80">
            {isOfficial
              ? '官方不会向你索要验证码、密码或要求转账'
              : '建院实名交易 · 当面验货满意后再付款'}
          </span>
        </div>


        <div className="flex flex-col">
          {conversation.messages.map((msg, idx) => {
            const prevMsg = idx > 0 ? conversation.messages[idx - 1] : null;
            const prevSameSender = prevMsg?.sender === msg.sender;
            const spacingClass = idx === 0 ? 'mt-1' : prevSameSender ? 'mt-2' : 'mt-4';

            if (msg.sender === 'meetup' && msg.meetupInfo) {
              return (
                <div key={msg.id} className="w-full my-2.5">
                  <div className="rounded-2xl bg-white border border-outline-variant/30 p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant/20">
                      <div className="flex items-center gap-1.5 text-on-surface font-semibold text-xs">
                        <span className="material-symbols-outlined !text-[16px] text-primary">
                          handshake
                        </span>
                        校内面交约定
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          msg.meetupInfo.state.includes('已确认')
                            ? 'bg-[#e8f5e9] text-[#2e7d32]'
                            : 'bg-surface-container text-secondary'
                        }`}
                      >
                        {msg.meetupInfo.state}
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-secondary">时间</span>
                        <span className="text-on-surface font-medium">
                          {msg.meetupInfo.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-secondary shrink-0">地点</span>
                        <span className="text-on-surface font-medium truncate">
                          {msg.meetupInfo.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-secondary">当面应付</span>
                        <span className="text-primary font-bold tabular-nums">
                          ¥{msg.meetupInfo.amount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-outline-variant/15 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveToolModal('meetup')}
                        className="h-7 px-3 rounded-full text-[11px] font-medium bg-surface-container-low text-on-surface-variant hover:bg-surface-container cursor-pointer transition"
                      >
                        修改约定
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveToolModal('payment')}
                        className="h-7 px-3 rounded-full text-[11px] font-medium bg-primary text-white hover:opacity-95 cursor-pointer transition"
                      >
                        验收付款
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.sender === 'payment' && msg.paymentInfo) {
              return (
                <div key={msg.id} className="w-full my-3">
                  <div className="rounded-2xl border border-tertiary/25 bg-[#F2F9F5] p-3.5 shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-tertiary/15">
                      <div className="flex items-center gap-1.5 text-tertiary font-semibold text-xs">
                        <span className="material-symbols-outlined material-fill text-base">
                          verified
                        </span>
                        建院当面验货支付凭证
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tertiary text-white">
                        已当面结清
                      </span>
                    </div>
                    <div className="mt-2.5 space-y-1 text-xs text-on-surface">
                      <p className="font-semibold text-on-surface">
                        流转物品：{msg.paymentInfo.itemTitle}
                      </p>
                      <p className="text-secondary">
                        实付金额：
                        <span className="text-tertiary font-bold ml-1 tabular-nums">
                          ¥{msg.paymentInfo.amount}
                        </span>{' '}
                        · {msg.paymentInfo.method}
                      </p>
                      <p className="text-[11px] text-secondary/80">
                        已完成真机成色与功能当面核验 · 交易时间 {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            // 官方小助手：带商品图的通知以「通知卡片」形式展示
            if (isOfficial && msg.sender === 'them' && msg.imageUrl) {
              return (
                <div key={msg.id} className={`w-full ${spacingClass}`}>
                  <div className="rounded-2xl bg-white border border-outline-variant/30 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
                    <div className="px-3.5 pt-3 pb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
                        <span className="material-symbols-outlined material-fill !text-[16px] text-primary">
                          campaign
                        </span>
                        降价提醒
                      </span>
                      <span className="text-[10px] text-outline">{msg.time}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onViewProduct?.()}
                      className="w-full px-3.5 pb-3 flex items-center gap-3 text-left cursor-pointer group"
                    >
                      <img
                        src={msg.imageUrl}
                        alt={conversation.productTitle || '商品'}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-surface-container"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                          {conversation.productTitle}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-1 tabular-nums">
                          <span className="text-base font-bold text-primary">
                            ¥{conversation.productPrice}
                          </span>
                          {conversation.productOriginalPrice && (
                            <span className="text-[11px] text-outline line-through">
                              ¥{conversation.productOriginalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                    <p className="mx-3.5 pt-2.5 pb-3 border-t border-outline-variant/15 text-[11px] text-secondary leading-relaxed">
                      安全提示：请在校内公共场所当面验货后再付款，切勿私下提前转账。
                    </p>
                    <button
                      type="button"
                      onClick={() => onViewProduct?.()}
                      className="w-full h-10 border-t border-outline-variant/20 text-xs font-medium text-primary flex items-center justify-center gap-0.5 hover:bg-surface-container-low cursor-pointer"
                    >
                      查看商品详情
                      <span className="material-symbols-outlined !text-[15px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            if (msg.sender === 'them') {
              const avatarSrc =
                conversation.avatar ||
                (idx === 0
                  ? HOTLINK_IMAGES.chatAvatarChen1
                  : HOTLINK_IMAGES.chatAvatarChen2);
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${spacingClass}`}
                >
                  {prevSameSender ? (
                    <div className="w-9 h-9 shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-surface-container overflow-hidden shrink-0 border border-outline-variant/40 flex items-center justify-center">
                      {conversation.avatar ? (
                        <img
                          className="w-full h-full object-cover"
                          alt={conversation.userName}
                          src={avatarSrc}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-primary text-lg">
                          notifications_active
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col items-start max-w-[78%]">
                    {!prevSameSender && (
                      <span className="text-[11px] text-secondary mb-1 ml-0.5">
                        {conversation.userName}
                      </span>
                    )}
                    <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-outline-variant/20 leading-relaxed space-y-2">
                      {msg.imageUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewImage({
                              url: msg.imageUrl!,
                              tag: msg.imageTag,
                            })
                          }
                          className="relative block rounded-xl overflow-hidden bg-surface-container w-52 max-w-full group cursor-pointer"
                        >
                          <img
                            src={msg.imageUrl}
                            alt={msg.text || '聊天实拍图'}
                            referrerPolicy="no-referrer"
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                          />
                          {msg.imageTag && (
                            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px]">
                              {msg.imageTag}
                            </span>
                          )}
                          <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/55 text-white text-[10px] flex items-center gap-0.5">
                            <span className="material-symbols-outlined !text-[12px]">
                              zoom_in
                            </span>
                            点击放大
                          </span>
                        </button>
                      )}
                      {msg.text && <div>{msg.text}</div>}
                    </div>
                    {msg.time && (
                      <span className="text-[10px] text-outline mt-1 ml-0.5">
                        {msg.time}
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            // msg.sender === 'me'
            const isRead = msg.status?.includes('已读');
            return (
              <div
                key={msg.id}
                className={`flex items-start justify-end gap-2.5 ${spacingClass}`}
              >
                <div className="flex flex-col items-end max-w-[78%]">
                  {!prevSameSender && (
                    <span className="text-[11px] text-secondary mb-1 mr-0.5">
                      我
                    </span>
                  )}
                  <div className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 bg-primary-container text-white shadow-[0_2px_6px_rgba(233,120,101,0.22)] leading-relaxed space-y-2">
                    {msg.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: msg.imageUrl!,
                            tag: msg.imageTag,
                          })
                        }
                        className="relative block rounded-xl overflow-hidden bg-black/10 w-52 max-w-full group cursor-pointer"
                      >
                        <img
                          src={msg.imageUrl}
                          alt={msg.text || '聊天实拍图'}
                          referrerPolicy="no-referrer"
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                        />
                        {msg.imageTag && (
                          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px]">
                            {msg.imageTag}
                          </span>
                        )}
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/55 text-white text-[10px] flex items-center gap-0.5">
                          <span className="material-symbols-outlined !text-[12px]">
                            zoom_in
                          </span>
                          放大
                        </span>
                      </button>
                    )}
                    {msg.voiceSeconds ? (
                      <button
                        type="button"
                        onClick={() => {
                          setPlayingVoiceId(msg.id);
                          setTimeout(() => setPlayingVoiceId(null), 2000);
                        }}
                        className="flex items-center gap-2 text-left cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {playingVoiceId === msg.id
                            ? 'graphic_eq'
                            : 'volume_up'}
                        </span>
                        <span className="font-semibold tabular-nums">
                          {msg.voiceSeconds}&quot;
                        </span>
                        <span className="text-xs opacity-95">
                          {playingVoiceId === msg.id
                            ? '正在播放语音...'
                            : '点击播放语音'}
                        </span>
                      </button>
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-outline mt-1 mr-0.5 flex items-center gap-1">
                    {isRead && (
                      <span className="material-symbols-outlined !text-[12px] text-[#2e7d32]">
                        done_all
                      </span>
                    )}
                    <span>{msg.status || `已送达 · ${msg.time}`}</span>
                  </span>
                </div>
                {prevSameSender ? (
                  <div className="w-9 h-9 shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-outline-variant/30 bg-surface-container">
                    <img
                      src={HOTLINK_IMAGES.profileAvatar}
                      alt="我"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Partner Typing Indicator Bubble */}
          {isPartnerTyping && (
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-9 h-9 rounded-full bg-surface-container overflow-hidden shrink-0 border border-outline-variant/40 flex items-center justify-center">
                {conversation.avatar ? (
                  <img
                    className="w-full h-full object-cover"
                    alt={conversation.userName}
                    src={conversation.avatar}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-lg">
                    notifications_active
                  </span>
                )}
              </div>
              <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex items-center gap-1.5 text-xs text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                <span className="ml-1 text-[11px] text-secondary">
                  对方正在输入...
                </span>
              </div>
            </div>
          )}
        </div>
        <div ref={chatEndRef} />
      </main>

      {/* Info Toast */}
      {infoToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface/95 text-inverse-on-surface px-4 py-2 rounded-full text-xs shadow-lg whitespace-nowrap">
          {infoToast}
        </div>
      )}

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-sm w-full">
            <img
              src={previewImage.url}
              alt={previewImage.tag || '实拍大图预览'}
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-3 text-center">
              <span className="px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs">
                {previewImage.tag || '实拍高清原图'} · 点击任意处关闭
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input for Local Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLocalFileUpload}
      />

      {/* Active Tool Modals (相册图片 / 实拍成色 / 约定面交 / 校内支付 / 小刀出价) */}
      {activeToolModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="聊天快捷工具面板"
          onClick={() => setActiveToolModal(null)}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center p-4"
        >
          {/* 1. 相册图片面板 */}
          {activeToolModal === 'album' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-on-surface">
                    发送相册图片
                  </h3>
                  <p className="text-xs text-secondary">
                    选择物品细节图发送给 {conversation.userName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveToolModal(null)}
                  className="text-xs text-secondary hover:text-on-surface px-2 py-1 cursor-pointer"
                >
                  关闭
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {albumPresets.map((photo) => (
                  <button
                    key={photo.title}
                    type="button"
                    onClick={() =>
                      handleSendAlbumPhoto(photo.title, photo.url, photo.tag)
                    }
                    className="group relative rounded-2xl overflow-hidden border border-outline-variant/30 text-left bg-surface-container-low hover:border-primary transition-all cursor-pointer"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-2">
                      <p className="text-xs font-medium text-on-surface truncate">
                        {photo.title}
                      </p>
                      <span className="text-[10px] text-primary">
                        点击立即发送 →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-11 rounded-full border border-primary/40 bg-primary-fixed/30 text-primary text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary-fixed/50 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  upload_file
                </span>
                <span>从手机/电脑本地上传照片</span>
              </button>
            </div>
          )}

          {/* 2. 实拍成色面板 */}
          {activeToolModal === 'condition' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-on-surface">
                    发送实拍成色核验卡
                  </h3>
                  <p className="text-xs text-secondary">
                    建院真实成色认证 · 附带微距实拍说明
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveToolModal(null)}
                  className="text-xs text-secondary hover:text-on-surface px-2 py-1 cursor-pointer"
                >
                  关闭
                </button>
              </div>
              <div className="space-y-2.5">
                {conditionPresets.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      handleSendAlbumPhoto(
                        `${item.title}（${item.desc}）`,
                        item.url,
                        item.tag
                      )
                    }
                    className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-surface-container-low hover:bg-primary-fixed/20 border border-outline-variant/25 text-left transition cursor-pointer"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-tertiary text-[10px] font-semibold mb-0.5">
                        {item.tag}
                      </span>
                      <p className="text-xs font-semibold text-on-surface truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-secondary truncate">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-primary shrink-0">
                      发送
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. 约定面交弹窗（简约二级面板） */}
          {activeToolModal === 'meetup' && (
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSaveMeetup}
              className="w-full max-w-md bg-white rounded-3xl p-5 space-y-4 shadow-xl"
            >
              {/* Top Drag Handle & Header */}
              <div>
                <div className="w-9 h-1 rounded-full bg-outline-variant/40 mx-auto mb-3" />
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-on-surface">
                    约定校内面交
                  </h3>
                  <button
                    type="button"
                    aria-label="关闭"
                    onClick={() => setActiveToolModal(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-low cursor-pointer"
                  >
                    <span className="material-symbols-outlined !text-[18px]">
                      close
                    </span>
                  </button>
                </div>
              </div>

              {/* Compact Item & Agreed Price Card */}
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container-low px-3 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={conversation.productThumb || HOTLINK_IMAGES.ipadThumb}
                    alt={conversation.productTitle || '闲置物品'}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover shrink-0 bg-surface-container"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-on-surface truncate">
                      {conversation.productTitle || '闲置物品'}
                    </p>
                    <span className="text-[11px] text-outline">
                      当面验货满意后付款
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs font-bold text-primary">¥</span>
                  <input
                    aria-label="约定金额"
                    type="number"
                    value={meetupAmount}
                    onChange={(e) =>
                      setMeetupAmount(Number(e.target.value) || 0)
                    }
                    className="w-20 rounded-lg bg-white border border-outline-variant/30 px-2 py-1 text-right text-sm font-bold text-primary focus:border-primary focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              {/* Time Selector (Clean 2x2 Grid) */}
              <div className="space-y-2">
                <label className="text-xs text-secondary block">
                  选择时间
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MEETUP_TIMES.map((tm) => {
                    const active = meetupTime === tm;
                    return (
                      <button
                        key={tm}
                        type="button"
                        onClick={() => setMeetupTime(tm)}
                        className={`h-9 rounded-xl text-xs border transition cursor-pointer ${
                          active
                            ? 'border-primary bg-primary/8 text-primary font-semibold'
                            : 'border-transparent bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {tm}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Selector (Clean 2x2 Grid) */}
              <div className="space-y-2">
                <label className="text-xs text-secondary block">
                  面交地点
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MEETUP_LOCATIONS.map((loc) => {
                    const active = meetupLocation === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setMeetupLocation(loc)}
                        className={`h-9 px-2.5 rounded-xl text-xs border truncate transition cursor-pointer ${
                          active
                            ? 'border-primary bg-primary/8 text-primary font-semibold'
                            : 'border-transparent bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-primary text-white text-sm font-semibold active:scale-[0.99] hover:opacity-95 transition cursor-pointer"
              >
                发送面交约定
              </button>
            </form>
          )}

          {/* 4. 校内当面支付弹窗 */}
          {activeToolModal === 'payment' && (
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleConfirmPayment}
              className="w-full max-w-md bg-white rounded-3xl p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined material-fill text-tertiary">
                    verified_user
                  </span>
                  <h3 className="text-base font-bold text-on-surface">
                    建院当面验货支付
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveToolModal(null)}
                  className="text-xs text-secondary cursor-pointer"
                >
                  取消
                </button>
              </div>

              <div className="rounded-2xl bg-surface-container-low p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-secondary">当面交易物品</p>
                  <p className="text-sm font-semibold text-on-surface mt-0.5">
                    {conversation.productTitle || '自用考研 iPad 9代 64G'}
                  </p>
                </div>
                <div className="text-right tabular-nums">
                  <span className="text-xs text-secondary block">应付金额</span>
                  <span className="text-xl font-bold text-primary">
                    ¥{meetupAmount}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-on-surface">
                  当面验货安全确认：
                </p>
                <button
                  type="button"
                  onClick={() => setCheckedAppearance((v) => !v)}
                  className="w-full flex items-center gap-2 text-xs text-on-surface py-1 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      checkedAppearance
                        ? 'bg-tertiary text-white'
                        : 'bg-surface-variant text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span>已当面核验实物成色与配件无误</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCheckedFunction((v) => !v)}
                  className="w-full flex items-center gap-2 text-xs text-on-surface py-1 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      checkedFunction
                        ? 'bg-tertiary text-white'
                        : 'bg-surface-variant text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span>已现场开机试用核心功能正常</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wechat')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition cursor-pointer ${
                    paymentMethod === 'wechat'
                      ? 'border-tertiary bg-emerald-50/70 text-tertiary font-semibold'
                      : 'border-outline-variant/40 text-secondary'
                  }`}
                >
                  微信当面扫码付
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('campus')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition cursor-pointer ${
                    paymentMethod === 'campus'
                      ? 'border-tertiary bg-emerald-50/70 text-tertiary font-semibold'
                      : 'border-outline-variant/40 text-secondary'
                  }`}
                >
                  建院校园卡实名付
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-tertiary text-white text-sm font-semibold shadow-md cursor-pointer"
              >
                确认当面支付 ¥{meetupAmount}
              </button>
            </form>
          )}

          {/* 5. 诚心小刀 / 快捷出价弹窗 */}
          {activeToolModal === 'bargain' && (
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSendBargain}
              className="w-full max-w-md bg-white rounded-3xl p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-on-surface">
                    校友礼貌小刀出价
                  </h3>
                  <p className="text-xs text-secondary">
                    当前标价 ¥{basePrice} · 承诺宿舍自提更容易成交
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveToolModal(null)}
                  className="text-xs text-secondary cursor-pointer"
                >
                  取消
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: '自提诚心价',
                    val: Math.max(1, basePrice > 100 ? basePrice - 20 : basePrice - 2),
                  },
                  {
                    label: '校友交朋友',
                    val: Math.max(1, basePrice > 100 ? basePrice - 50 : basePrice - 4),
                  },
                  {
                    label: '爽快一口价',
                    val: Math.max(1, basePrice > 100 ? basePrice - 10 : basePrice - 1),
                  },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setBargainPrice(opt.val)}
                    className={`p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                      bargainPrice === opt.val
                        ? 'border-primary bg-primary-fixed/40 text-primary font-bold'
                        : 'border-outline-variant/30 bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="text-[11px] text-secondary block">
                      {opt.label}
                    </span>
                    <span className="text-sm font-bold tabular-nums">
                      ¥{opt.val}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-3.5 py-2.5">
                <span className="text-xs font-medium text-on-surface">
                  自定义意向出价 (元)
                </span>
                <input
                  type="number"
                  value={bargainPrice}
                  onChange={(e) =>
                    setBargainPrice(Number(e.target.value) || 0)
                  }
                  className="w-24 bg-white rounded-xl px-2.5 py-1 text-right text-sm font-bold text-primary focus:outline-none tabular-nums"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  '支持随时到宿舍楼下自提',
                  '当面验货爽快不墨迹',
                  '今晚即可碰面交易',
                ].map((note) => (
                  <button
                    key={note}
                    type="button"
                    onClick={() => setBargainNote(note)}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer ${
                      bargainNote === note
                        ? 'bg-primary text-white font-medium'
                        : 'bg-surface-container-low text-secondary'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-primary text-white text-sm font-semibold shadow-md cursor-pointer"
              >
                发送诚心出价 ¥{bargainPrice}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Hold-to-talk Recording Overlay */}
      {isRecording && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
          <div
            className={`w-40 rounded-3xl px-4 py-5 flex flex-col items-center gap-2.5 shadow-2xl backdrop-blur-md transition-colors ${
              willCancel ? 'bg-[#b3261e]/90' : 'bg-black/70'
            }`}
          >
            <span className="material-symbols-outlined material-fill text-white text-[34px]">
              {willCancel ? 'undo' : 'mic'}
            </span>
            {!willCancel && (
              <div className="flex items-end gap-[3px] h-5">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-white/90 animate-pulse"
                    style={{
                      height: `${8 + ((i * 7 + recordSeconds * 5) % 12)}px`,
                      animationDelay: `${i * 90}ms`,
                    }}
                  />
                ))}
              </div>
            )}
            <span className="text-white text-sm font-semibold tabular-nums">
              {recordSeconds}&quot;
            </span>
            <span className="text-white/85 text-[11px]">
              {willCancel ? '松开手指，取消发送' : '松开发送 · 移出取消'}
            </span>
          </div>
        </div>
      )}

      {/* Sticky Bottom Interactive Area */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full z-30 bg-white/95 backdrop-blur-md border-t border-outline-variant/25 shadow-[0_-4px_20px_rgba(26,27,30,0.04)] pb-safe">
        {/* Quick Reply Pills */}
        {!isRecording && (
          <div
            className="pl-3 pr-6 pt-2.5 pb-0.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth"
            style={{
              maskImage:
                'linear-gradient(to right, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 88%, transparent 100%)',
            }}
          >
            {(isOfficial ? OFFICIAL_QUICK_REPLIES : QUICK_REPLIES).map((reply) => {
              const isSent = sentReplies.includes(reply);
              return (
                <button
                  key={reply}
                  type="button"
                  onClick={() =>
                    isOfficial && reply === '查看降价商品'
                      ? onViewProduct?.()
                      : handleSend(reply)
                  }
                  className={`shrink-0 h-7 px-3 rounded-full text-[11px] border transition active:scale-95 whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    isSent
                      ? 'bg-surface-container-low border-transparent text-outline'
                      : 'bg-white border-outline-variant/40 text-on-surface-variant hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {isSent && (
                    <span className="material-symbols-outlined !text-[12px]">
                      done
                    </span>
                  )}
                  <span>{reply}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Input Row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={`pt-2 pb-2.5 flex items-end gap-1.5 ${
            isOfficial ? 'px-3' : 'px-2.5'
          }`}
        >
          {/* Voice / Keyboard Toggle（官方小助手不需要语音） */}
          {!isOfficial && (
          <button
            type="button"
            aria-label={voiceMode ? '切换键盘输入' : '切换语音输入'}
            onClick={() => {
              setVoiceMode((prev) => !prev);
              setShowEmojiPicker(false);
              setDrawerOpen(false);
            }}
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low active:scale-90 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">
              {voiceMode ? 'keyboard' : 'keyboard_voice'}
            </span>
          </button>
          )}

          {voiceMode ? (
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                startHoldRecording();
              }}
              onPointerLeave={() => {
                if (isRecording) {
                  willCancelRef.current = true;
                  setWillCancel(true);
                }
              }}
              onPointerEnter={() => {
                if (isRecording) {
                  willCancelRef.current = false;
                  setWillCancel(false);
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
              className={`flex-1 h-10 rounded-full text-sm font-medium select-none touch-none transition-all cursor-pointer ${
                isRecording
                  ? willCancel
                    ? 'bg-[#fbe9e7] text-[#b3261e]'
                    : 'bg-surface-container-high text-on-surface scale-[0.98]'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {isRecording
                ? willCancel
                  ? '松开 取消'
                  : '松开 发送'
                : '按住 说话'}
            </button>
          ) : (
            <div
              className={`flex-1 min-h-10 flex items-center rounded-full pl-4 pr-1 border transition-all ${
                showEmojiPicker
                  ? 'bg-white border-primary/50'
                  : 'bg-surface-container-low border-transparent focus-within:bg-white focus-within:border-primary/50'
              }`}
            >
              <input
                aria-label="聊天消息输入框"
                value={inputText}
                onFocus={() => {
                  setShowEmojiPicker(false);
                  setDrawerOpen(false);
                }}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 min-w-0 h-10 bg-transparent border-0 p-0 text-sm text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none"
                placeholder={
                  isOfficial
                    ? '输入问题咨询建院小助手…'
                    : '说点什么，约个面交吧…'
                }
                type="text"
                enterKeyHint="send"
              />
              {!isOfficial && (
                <button
                  type="button"
                  aria-label="表情"
                  onClick={() => togglePanel('emoji')}
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    showEmojiPicker
                      ? 'text-primary'
                      : 'text-outline hover:text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showEmojiPicker ? 'keyboard' : 'mood'}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Send (when has text) / More tools；官方小助手只保留发送 */}
          {(inputText.trim() || isOfficial) && !voiceMode ? (
            <button
              type="submit"
              aria-label="发送"
              disabled={!inputText.trim()}
              className="h-10 px-4 shrink-0 rounded-full bg-primary text-white text-sm font-semibold flex items-center gap-1 shadow-[0_2px_8px_rgba(233,120,101,0.35)] active:scale-95 hover:opacity-95 transition cursor-pointer disabled:opacity-40 disabled:shadow-none disabled:cursor-default"
            >
              <span>发送</span>
              <span className="material-symbols-outlined !text-[16px]">
                send
              </span>
            </button>
          ) : (
            <button
              type="button"
              aria-label="更多功能"
              aria-expanded={drawerOpen}
              onClick={() => togglePanel('tools')}
              className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center active:scale-90 transition cursor-pointer ${
                drawerOpen
                  ? 'text-primary bg-primary-fixed/50'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[26px] transition-transform duration-200 ${
                  drawerOpen ? 'rotate-45' : ''
                }`}
              >
                add_circle
              </span>
            </button>
          )}
        </form>

        {/* Emoji & Phrase Panel (inline) */}
        {showEmojiPicker && (
          <div className="border-t border-outline-variant/20 bg-surface-container-lowest px-4 pt-3 pb-4">
            <p className="text-[11px] text-outline mb-2">常用表情</p>
            <div className="grid grid-cols-8 gap-1">
              {EMOJI_AND_PHRASES.filter((t) => !t.startsWith('【')).map(
                (token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => setInputText((prev) => `${prev}${token}`)}
                    className="h-10 rounded-xl text-[22px] flex items-center justify-center hover:bg-surface-container-low active:scale-90 transition cursor-pointer"
                  >
                    {token}
                  </button>
                )
              )}
            </div>
            <p className="text-[11px] text-outline mt-3 mb-2">交易短语</p>
            <div className="flex flex-wrap gap-1.5">
              {EMOJI_AND_PHRASES.filter((t) => t.startsWith('【')).map(
                (token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() =>
                      setInputText(
                        (prev) => `${prev}${token.replace(/[【】]/g, '')}`
                      )
                    }
                    className="h-7 px-3 rounded-full bg-surface-container-low text-[11px] text-on-surface-variant hover:text-primary hover:bg-primary-fixed/40 transition active:scale-95 cursor-pointer"
                  >
                    {token.replace(/[【】]/g, '')}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Quick Action Tools Panel */}
        <div
          aria-hidden={!drawerOpen}
          className={`border-t border-outline-variant/20 bg-surface-container-lowest px-5 pt-4 pb-5 grid-cols-4 gap-y-4 gap-x-3 ${
            drawerOpen ? 'grid' : 'hidden'
          }`}
        >
          {(
            [
              { id: 'album', icon: 'photo_library', label: '相册' },
              { id: 'condition', icon: 'photo_camera', label: '实拍成色' },
              { id: 'meetup', icon: 'handshake', label: '约面交' },
              { id: 'payment', icon: 'account_balance_wallet', label: '验货支付' },
              { id: 'bargain', icon: 'sell', label: '小刀出价' },
            ] as const
          ).map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                if (tool.id !== 'bargain') setSelectedUtility(tool.id);
                setActiveToolModal(tool.id);
              }}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:border-primary/30 group-active:scale-95 transition">
                <span className="material-symbols-outlined text-[26px]">
                  {tool.icon}
                </span>
              </div>
              <span className="text-[11px] text-secondary group-hover:text-on-surface transition-colors">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
