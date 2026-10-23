import React, { useState } from 'react';
import {
  ConversationItem,
  INITIAL_CONVERSATIONS,
  INITIAL_PRODUCTS,
  INITIAL_WANTED_ITEMS,
  ProductItem,
  ScreenId,
  WantedItem,
} from './data/marketplaceData';
import { HomeView } from './components/HomeView';
import { CampusSelectView } from './components/CampusSelectView';
import { FreshmanZoneView } from './components/FreshmanZoneView';
import { ItemDetailView } from './components/ItemDetailView';
import { WantedPlazaView } from './components/WantedPlazaView';
import { RespondWantedView } from './components/RespondWantedView';
import { PublishItemView } from './components/PublishItemView';
import { MessagesView } from './components/MessagesView';
import { ChatDetailView } from './components/ChatDetailView';
import { ProfileView } from './components/ProfileView';
import { FavoritesView } from './components/FavoritesView';
import { MyListingsView } from './components/MyListingsView';
import { SoldItemsView } from './components/SoldItemsView';
import { PurchasedItemsView } from './components/PurchasedItemsView';
import { MeetupRecordsView } from './components/MeetupRecordsView';
import { SafetyGuideView } from './components/SafetyGuideView';
import { SupportAssistantView } from './components/SupportAssistantView';
import { SettingsView } from './components/SettingsView';
import { RegisterView } from './components/RegisterView';

const SCREEN_DIRECTORY: {
  id: ScreenId;
  title: string;
  subtitle: string;
  icon: string;
}[] = [
  { id: 'home', title: '首页 · 建院闲置', subtitle: '校区切换与瀑布流好物', icon: 'home' },
  { id: 'campus', title: '切换所在校区', subtitle: '清远/广州校区与自提点选择', icon: 'location_on' },
  { id: 'graduation', title: '毕业清仓', subtitle: '学长学姐离校打包带走', icon: 'school' },
  { id: 'freshman', title: '新生专区', subtitle: '宿舍神器与入住贴士', icon: 'local_mall' },
  { id: 'textbook', title: '教材课件', subtitle: '专业课本与考证划线笔记', icon: 'menu_book' },
  { id: 'freebie', title: '免费互助', subtitle: '0元爱心转赠与校内自提', icon: 'volunteer_activism' },
  { id: 'detail', title: '商品详情', subtitle: 'iPad Air 5 实拍与面交保障', icon: 'tablet_mac' },
  { id: 'wanted', title: '求购广场', subtitle: '校内急需与校友互助', icon: 'assignment' },
  { id: 'respond', title: '响应求购', subtitle: '意向报价与约定面交地点', icon: 'handshake' },
  { id: 'publish', title: '发布页', subtitle: '极简6项发布与建院模版', icon: 'add_circle' },
  { id: 'messages', title: '消息中心', subtitle: '今日面交待约与私信流', icon: 'chat_bubble' },
  { id: 'chat', title: '闲置沟通', subtitle: '陈学姐对话与面交卡片', icon: 'forum' },
  { id: 'profile', title: '我的 · 个人中心', subtitle: '实名学籍看板与流转记录', icon: 'person' },
  { id: 'favorites', title: '我的收藏', subtitle: '心愿单与降价好物提醒', icon: 'favorite' },
  { id: 'selling', title: '在售发布', subtitle: '在售闲置管理与一键降价', icon: 'inventory_2' },
  { id: 'sold', title: '已出卖出', subtitle: '低碳流转记录与电子面交凭据', icon: 'eco' },
  { id: 'purchased', title: '买到好物', subtitle: '已完成面交的校内好物存档', icon: 'shopping_bag' },
  { id: 'meetup', title: '面交记录与约定', subtitle: '待当面验货与历史核销记录', icon: 'handshake' },
  { id: 'guide', title: '安全面交公约', subtitle: '校内推荐自提点与防诈守则', icon: 'verified_user' },
  { id: 'support', title: '联系流转小助手', subtitle: '校内服务站与问题申诉反馈', icon: 'support_agent' },
  { id: 'settings', title: '设置与偏好', subtitle: '校区自提点、通知与账号管理', icon: 'settings' },
  { id: 'register', title: '注册新账号', subtitle: '广东建院实名学生认证注册', icon: 'verified_user' },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenId>(() => {
    const param = new URLSearchParams(window.location.search).get('screen');
    const validIds: ScreenId[] = [
      'home',
      'campus',
      'wanted',
      'publish',
      'messages',
      'profile',
      'favorites',
      'selling',
      'sold',
      'purchased',
      'meetup',
      'guide',
      'support',
      'detail',
      'freshman',
      'graduation',
      'textbook',
      'freebie',
      'respond',
      'chat',
      'settings',
      'register',
    ];
    if (param && validIds.includes(param as ScreenId)) {
      return param as ScreenId;
    }
    return 'home';
  });
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['home']);
  const [campus, setCampus] = useState<'清远校区' | '广州校区'>('清远校区');
  const [userName] = useState('嚼不断的浓痰');

  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [wantedItems, setWantedItems] =
    useState<WantedItem[]>(INITIAL_WANTED_ITEMS);
  const [conversations, setConversations] = useState<ConversationItem[]>(
    INITIAL_CONVERSATIONS
  );

  const [selectedProductId, setSelectedProductId] = useState<string>(
    INITIAL_PRODUCTS[0].id
  );
  const [selectedWantedId, setSelectedWantedId] = useState<string>(
    INITIAL_WANTED_ITEMS[1].id // Default to 林学妹 · 机电工程
  );
  const [selectedConvId, setSelectedConvId] = useState<string>(
    INITIAL_CONVERSATIONS[0].id // Default to 陈学姐
  );

  const navigateTo = (target: ScreenId) => {
    setHistoryStack((prev) => [...prev.slice(-10), target]);
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const nextStack = historyStack.slice(0, -1);
      const prevScreen = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setScreen(prevScreen);
    } else {
      setScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleToggleCampus = () => {
    setCampus((prev) => (prev === '清远校区' ? '广州校区' : '清远校区'));
  };

  const unreadTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const activeProduct =
    products.find((p) => p.id === selectedProductId) || products[0];
  const activeWanted =
    wantedItems.find((w) => w.id === selectedWantedId) || wantedItems[1];
  const activeConversation =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSelectProduct = (item: ProductItem) => {
    // Ensure item exists in products list if clicked from Freshman Zone
    setProducts((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
    setSelectedProductId(item.id);
    navigateTo('detail');
  };

  const handleToggleFavorite = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, favorited: !p.favorited } : p
      )
    );
  };

  const handleOpenChatFromProduct = (
    product: ProductItem,
    startMeetup?: boolean
  ) => {
    const existing = conversations.find((c) => c.productId === product.id);
    if (existing) {
      if (startMeetup) {
        handleScheduleMeetup(
          existing.id,
          '今天 19:00',
          `${product.campus} · 桂园宿舍正门口值班室旁`
        );
      }
      setSelectedConvId(existing.id);
      navigateTo('chat');
      return;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: ConversationItem = {
      id: newConvId,
      userName: product.sellerName,
      userBadge: '建院实名校友',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      onlineText: `${product.campus} · 刚刚在线`,
      avatar: product.sellerAvatar,
      unreadCount: 0,
      lastMessage: startMeetup
        ? '已发起校内当面验货约定'
        : `你好，我想咨询「${product.title}」`,
      timeAgo: '刚刚',
      statusTag: startMeetup ? '面交地点协商中' : '正在沟通',
      statusType: 'negotiating',
      productId: product.id,
      productTitle: product.detailTitle || product.title,
      productSubtitle: '支持当面验机 · 校内自提',
      productCondition: product.condition,
      productPrice: product.detailPrice || product.price,
      productOriginalPrice: product.originalPrice,
      productThumb: product.image,
      messages: [
        {
          id: `m-${Date.now()}-1`,
          sender: 'them',
          text: `同学你好！「${product.title}」还在的，支持在${product.location}当面验货。`,
          time: '刚刚',
        },
        ...(startMeetup
          ? [
              {
                id: `m-${Date.now()}-2`,
                sender: 'meetup' as const,
                time: '刚刚',
                meetupInfo: {
                  time: '今天 19:00',
                  location: `${product.campus} · 桂香园宿舍区/图书馆`,
                  amount: product.detailPrice || product.price,
                  state: '待赴约',
                },
              },
            ]
          : []),
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setSelectedConvId(newConvId);
    navigateTo('chat');
  };

  const handleRespondWanted = (item: WantedItem) => {
    setSelectedWantedId(item.id);
    navigateTo('respond');
  };

  const handleOpenChatWithBuyer = (
    wanted: WantedItem,
    offerSummary?: string
  ) => {
    const convId = `conv-want-${wanted.id}`;
    const existing = conversations.find((c) => c.id === convId);
    if (existing) {
      if (offerSummary) {
        handleSendMessage(convId, offerSummary);
      }
      setSelectedConvId(convId);
      navigateTo('chat');
      return;
    }

    const newConv: ConversationItem = {
      id: convId,
      userName: wanted.userName,
      userBadge: wanted.userDept,
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      onlineText: `${wanted.userDept} · 5分钟前在线`,
      avatar: INITIAL_CONVERSATIONS[2].avatar,
      unreadCount: 0,
      lastMessage: offerSummary || `你好，我有闲置可以满足你的「${wanted.shortNeed}」`,
      timeAgo: '刚刚',
      statusTag: '已响应求购',
      statusType: 'negotiating',
      productTitle: '小熊宿舍分体电煮锅 450W',
      productSubtitle: '原发布价 ¥35 · 宿舍不跳闸带蒸笼',
      productCondition: '9成新',
      productPrice: wanted.recommendedPrice,
      productOriginalPrice: 35,
      productThumb: INITIAL_CONVERSATIONS[2].productThumb,
      messages: [
        {
          id: `wm-1`,
          sender: 'me',
          text:
            offerSummary ||
            `你好！看到你在求购「${wanted.shortNeed}」，我正好有一件闲置可出，支持校内当面试用～`,
          time: '刚刚',
          status: '已送达 · 刚刚',
        },
        {
          id: `wm-2`,
          sender: 'meetup',
          time: '刚刚',
          meetupInfo: {
            time: '今晚 19:30 - 21:00',
            location: '清远校区 · 榕香园1号楼架空层',
            amount: wanted.recommendedPrice,
            state: '待赴约',
          },
        },
      ],
    };

    setConversations((prev) => [newConv, ...prev]);
    setSelectedConvId(convId);
    navigateTo('chat');
  };

  const handlePublishSuccess = (newItem: ProductItem) => {
    setProducts((prev) => [newItem, ...prev]);
    setSelectedProductId(newItem.id);
    navigateTo('home');
  };

  const getContextualReply = (
    text: string,
    conv: ConversationItem
  ): { text: string; imageUrl?: string; imageTag?: string } => {
    if (conv.statusType === 'official') {
      if (text.includes('安全')) {
        return {
          text: '【建院安全流转须知】1. 请优先选择桂园/榕园宿管值班室旁、图文信息中心大堂等监控覆盖区域当面交接；2. 验货满意后再当面付款，切勿提前私下转账或脱离平台付定金。',
        };
      }
      if (text.includes('验货') || text.includes('怎么验')) {
        return {
          text: '【当面验货指南】数码产品建议现场开机测试屏幕触控、Wi-Fi、摄像头及电池健康度；教材与日用百货请当面清点配件是否齐全，双方确认无误后再完成支付。',
        };
      }
      if (text.includes('举报') || text.includes('可疑')) {
        return {
          text: '如遇校外推销、要求提前转账或货不对板，请点击聊天右上角「···」选择「举报」，建院学生自律委与平台管理员将在 15 分钟内极速核实处理。',
        };
      }
      if (text.includes('客服') || text.includes('人工')) {
        return {
          text: '已为你连线建院校园服务台（每日 09:00 - 22:00 在线），请直接发送你需要协助处理的商品或订单问题～',
        };
      }
      return {
        text: '你好，这里是建院流转小助手！你可以点击上方降价卡片直接查看宝贝详情，或点击底部快捷标签了解校内当面交易安全规则。',
      };
    }

    const sellerName = conv.userName;
    const price = conv.productPrice ?? 1350;
    if (text.includes('哪里见面') || text.includes('地点')) {
      return {
        text: '清远校区桂园宿舍一楼值班室旁或者图文信息中心大堂都可以，看你离哪边更近～',
      };
    }
    if (text.includes('开机验货') || text.includes('验机')) {
      return {
        text: '当然可以！我会提前准备好带过去，支持当场试用核验各项细节。',
      };
    }
    if (text.includes('配件')) {
      return {
        text: '随附配件和保护套都齐全完好，面交时一并带给你核对～',
      };
    }
    if (text.includes('电池') || text.includes('健康度')) {
      return {
        text: '电池健康度还有 92%，平时只在图书馆看网课记笔记，续航一整天没问题～',
      };
    }
    if (text.includes('今晚') || text.includes('有空')) {
      return {
        text: '今晚 19:00 后我都在宿舍，随时可以下楼当面交接！',
      };
    }
    if (text.includes('实拍') || text.includes('照片') || text.includes('看看')) {
      return {
        text: `刚给你拍了一张「${conv.productTitle || '闲置宝贝'}」自然光下的实拍细节图，成色很新无暗病，你可以点击放大看看～`,
        imageUrl:
          conv.productThumb ||
          INITIAL_PRODUCTS[0].detailImage ||
          INITIAL_PRODUCTS[0].image,
        imageTag: `${conv.productCondition || '95新'} · 校友实拍`,
      };
    }
    if (
      text.includes('少一点') ||
      text.includes('便宜') ||
      text.includes('刀') ||
      text.includes('出价')
    ) {
      const discount = price > 100 ? 20 : 2;
      const finalOffer = Math.max(1, price - discount);
      return {
        text: `都是建院同校校友，如果你能直接来宿舍楼下自提的话，给你少 ¥${discount}，按 ¥${finalOffer} 交个朋友～`,
      };
    }
    if (text.includes('马上到') || text.includes('楼下')) {
      return {
        text: '好的！我现在拿上东西下楼，大约2分钟到值班室门口，穿米白色卫衣～',
      };
    }
    if (text.includes('语音') || text.includes('图片')) {
      return {
        text: '收到啦！成色细节都在上面，面交时可以再当面仔细核验～',
      };
    }
    return {
      text: `收到！我是${sellerName}，校内当面验货没问题后再付款，随时保持联系～`,
    };
  };

  const handleOpenProductFromChat = (conv: ConversationItem) => {
    const matched = products.find((p) => p.id === conv.productId);
    if (matched) {
      setSelectedProductId(matched.id);
      navigateTo('detail');
      return;
    }
    if (conv.productTitle) {
      const fallbackProduct: ProductItem = {
        id: conv.productId || `prod-chat-${conv.id}`,
        title: conv.productTitle,
        price: conv.productPrice ?? 99,
        originalPrice: conv.productOriginalPrice,
        image: conv.productThumb || INITIAL_PRODUCTS[0].image,
        detailImage: conv.productThumb || INITIAL_PRODUCTS[0].image,
        condition: conv.productCondition || '95新',
        campus,
        location: `${campus} · 宿舍楼下自提`,
        timeAgo: '刚刚',
        category: '数码数码',
        sellerName: conv.userName,
        sellerAvatar: conv.avatar || INITIAL_PRODUCTS[0].sellerAvatar,
        sellerTag: '建院已认证',
        sellerRating: '信誉极好 · 实名学籍校友',
        highlights: [
          {
            icon: 'verified',
            label: `${conv.productCondition || '95新'} · 实名学籍担保`,
            desc: conv.productSubtitle || '支持当面试用验货，满意后再付款',
          },
          {
            icon: 'location_on',
            label: '校内自提点',
            desc: `${campus}桂园/榕园宿舍楼下或图文信息中心`,
          },
        ],
      };
      handleSelectProduct(fallbackProduct);
    }
  };

  const handleSendMessage = (
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
  ) => {
    const nowTime = new Date().toTimeString().slice(0, 5);
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const newMsg = extra?.paymentInfo
          ? {
              id: `pay-${Date.now()}`,
              sender: 'payment' as const,
              time: nowTime,
              paymentInfo: extra.paymentInfo,
            }
          : {
              id: `msg-${Date.now()}`,
              sender: 'me' as const,
              text,
              time: nowTime,
              status: `已送达 · ${nowTime}`,
              imageUrl: extra?.imageUrl,
              imageTag: extra?.imageTag,
              voiceSeconds: extra?.voiceSeconds,
            };
        return {
          ...c,
          lastMessage: extra?.paymentInfo
            ? `[校内当面付] 已支付 ¥${extra.paymentInfo.amount}`
            : text,
          timeAgo: '刚刚',
          unreadCount: 0,
          messages: [...c.messages, newMsg],
        };
      })
    );

    // Simulate realistic campus seller reply after 650ms
    if (!extra?.paymentInfo) {
      setTimeout(() => {
        const replyTime = new Date().toTimeString().slice(0, 5);
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== conversationId) return c;
            const replyObj = getContextualReply(text, c);
            const updatedMessages = c.messages.map((m) =>
              m.sender === 'me' && m.status?.startsWith('已送达')
                ? { ...m, status: `已读 · ${m.time}` }
                : m
            );
            return {
              ...c,
              lastMessage: replyObj.text,
              timeAgo: '刚刚',
              statusTag: '已回复对方',
              statusType:
                c.statusType === 'official' ? 'official' : 'replied',
              messages: [
                ...updatedMessages,
                {
                  id: `reply-${Date.now()}`,
                  sender: 'them',
                  text: replyObj.text,
                  time: replyTime,
                  imageUrl: replyObj.imageUrl,
                  imageTag: replyObj.imageTag,
                },
              ],
            };
          })
        );
      }, 650);
    }
  };

  const handleScheduleMeetup = (
    conversationId: string,
    time: string,
    location: string,
    amount?: number
  ) => {
    const meetupMsgId = `meetup-${Date.now()}`;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const finalAmount = amount ?? c.productPrice ?? 1350;
        return {
          ...c,
          lastMessage: `[校内面交约定] ${time} · ${location}`,
          timeAgo: '刚刚',
          statusTag: '面交待赴约',
          statusType: 'negotiating',
          messages: [
            ...c.messages,
            {
              id: meetupMsgId,
              sender: 'meetup',
              time: '刚刚',
              meetupInfo: {
                time,
                location,
                amount: finalAmount,
                state: '待对方确认',
              },
            },
          ],
        };
      })
    );

    setTimeout(() => {
      const replyTime = new Date().toTimeString().slice(0, 5);
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          const updatedMsgs = c.messages.map((m) =>
            m.id === meetupMsgId && m.meetupInfo
              ? {
                  ...m,
                  meetupInfo: {
                    ...m.meetupInfo,
                    state: '双方已确认',
                  },
                }
              : m
          );
          return {
            ...c,
            lastMessage: `好的！已确认面交约定，${time}不见不散～`,
            timeAgo: '刚刚',
            statusTag: '面交已确认',
            messages: [
              ...updatedMsgs,
              {
                id: `meetup-reply-${Date.now()}`,
                sender: 'them',
                text: `好的！已收到面交约定，${time}在「${location}」准时碰面，支持当场验货～`,
                time: replyTime,
              },
            ],
          };
        })
      );
    }, 650);
  };

  const handleSelectConversation = (conv: ConversationItem) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
    setSelectedConvId(conv.id);
    navigateTo('chat');
  };

  const handleClearUnread = () => {
    setConversations((prev) => prev.map((c) => ({ ...c, unreadCount: 0 })));
  };

  return (
    <div className="min-h-screen bg-[#F3F2F7] text-on-surface flex justify-center relative">
      {/* Desktop Companion Screen Switcher (Pinned Left on Wide Viewports so Mobile Frame stays Dead-Center) */}
      <aside
        aria-label="页面快速预览切换栏"
        className="hidden xl:flex flex-col w-72 fixed left-6 top-6 z-40 bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-black/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-3"
      >
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-black/[0.05]">
          <div className="w-9 h-9 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined material-fill text-[20px]">
              storefront
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface tracking-tight">
              建院闲置 · 全站导航
            </h2>
            <p className="text-[11px] text-secondary">
              广东建设职业技术学院 · 实名流转
            </p>
          </div>
        </div>

        <div className="space-y-1 max-h-[calc(100vh-170px)] overflow-y-auto no-scrollbar">
          {SCREEN_DIRECTORY.map((item) => {
            const active = screen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                  active
                    ? 'bg-primary text-white shadow-xs'
                    : 'hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] shrink-0 ${
                    active ? 'text-white' : 'text-primary'
                  }`}
                >
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold truncate ${
                      active ? 'text-white' : 'text-on-surface'
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`text-[10px] truncate ${
                      active ? 'text-white/80' : 'text-secondary'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between text-xs text-secondary">
          <span>当前：{campus}</span>
          <button
            type="button"
            onClick={handleToggleCampus}
            className="text-primary font-semibold hover:underline"
          >
            切换校区
          </button>
        </div>
      </aside>

      {/* Mobile Viewport Container (Dead-center on all viewports) */}
      <div className="w-full max-w-[430px] min-h-screen bg-surface-container-lowest shadow-[0_12px_48px_rgba(0,0,0,0.06)] border-x border-black/[0.05] overflow-x-hidden relative flex flex-col">
          {screen === 'home' && (
            <HomeView
              products={products}
              campus={campus}
              onToggleCampus={handleToggleCampus}
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
              unreadTotal={unreadTotal}
            />
          )}

          {screen === 'campus' && (
            <CampusSelectView
              currentCampus={campus}
              onBack={goBack}
              onSelectCampus={(nextCampus) => setCampus(nextCampus)}
            />
          )}

          {(screen === 'freshman' ||
            screen === 'graduation' ||
            screen === 'textbook' ||
            screen === 'freebie') && (
            <FreshmanZoneView
              zoneId={screen}
              onBack={goBack}
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'detail' && (
            <ItemDetailView
              product={activeProduct}
              onBack={goBack}
              onToggleFavorite={handleToggleFavorite}
              onOpenChat={handleOpenChatFromProduct}
            />
          )}

          {screen === 'wanted' && (
            <WantedPlazaView
              wantedItems={wantedItems}
              campus={campus}
              onToggleCampus={handleToggleCampus}
              onRespondWanted={handleRespondWanted}
              onAddWanted={(newW) => setWantedItems((prev) => [newW, ...prev])}
              onDeleteWanted={(id) =>
                setWantedItems((prev) => prev.filter((w) => w.id !== id))
              }
              onNavigate={navigateTo}
              unreadTotal={unreadTotal}
            />
          )}

          {screen === 'respond' && (
            <RespondWantedView
              wantedItem={activeWanted}
              onBack={goBack}
              onOpenChatWithBuyer={handleOpenChatWithBuyer}
            />
          )}

          {screen === 'publish' && (
            <PublishItemView
              onBack={goBack}
              onPublishSuccess={handlePublishSuccess}
            />
          )}

          {screen === 'messages' && (
            <MessagesView
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onClearUnread={handleClearUnread}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'chat' && (
            <ChatDetailView
              conversation={activeConversation}
              onBack={goBack}
              onViewProduct={() => handleOpenProductFromChat(activeConversation)}
              onSendMessage={handleSendMessage}
              onScheduleMeetup={handleScheduleMeetup}
            />
          )}

          {screen === 'profile' && (
            <ProfileView
              products={products}
              campus={campus}
              userName={userName}
              unreadTotal={unreadTotal}
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {screen === 'favorites' && (
            <FavoritesView
              onBack={goBack}
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {screen === 'selling' && (
            <MyListingsView
              onBack={goBack}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'sold' && (
            <SoldItemsView
              onBack={goBack}
            />
          )}

          {screen === 'purchased' && (
            <PurchasedItemsView
              onBack={goBack}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'meetup' && (
            <MeetupRecordsView
              onBack={goBack}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'guide' && (
            <SafetyGuideView
              onBack={goBack}
            />
          )}

          {screen === 'support' && (
            <SupportAssistantView
              onBack={goBack}
              onNavigate={navigateTo}
            />
          )}

          {screen === 'settings' && (
            <SettingsView
              campus={campus}
              userName={userName}
              onBack={goBack}
              onNavigate={navigateTo}
              onSwitchCampus={setCampus}
            />
          )}

          {screen === 'register' && (
            <RegisterView
              onBack={goBack}
              onCompleteRegister={(selectedCp) => {
                setCampus(selectedCp);
                navigateTo('profile');
              }}
            />
          )}
      </div>
    </div>
  );
}
