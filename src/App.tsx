import React, { useState } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CONVERSATIONS,
  INITIAL_APPOINTMENTS,
} from './data/mockData';
import { Product, Conversation, Appointment, Campus } from './types';
import { HeaderCapsule } from './components/HeaderCapsule';
import { BottomNav, TabKey } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { PublishScreen } from './components/PublishScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { DetailScreen } from './components/DetailScreen';
import { ChatScreen } from './components/ChatScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AppointmentModal } from './components/AppointmentModal';
import { PactModal } from './components/PactModal';
import { CertificationModal } from './components/CertificationModal';
import { CampusLogo } from './components/CampusLogo';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  CheckCircle,
  Package,
  Heart,
  X,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [currentCampus, setCurrentCampus] = useState<Campus>('广州校区');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [favorites, setFavorites] = useState<string[]>(['prod-1', 'prod-6']);

  // Navigation states for deep pages
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Modals
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentTargetProduct, setAppointmentTargetProduct] = useState<Product | null>(null);
  const [showPactModal, setShowPactModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showMyProductsModal, setShowMyProductsModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Device view toggles for desktop previewing
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [activeCategoryParam, setActiveCategoryParam] = useState('digital');

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      showToast('已取消收藏');
    } else {
      setFavorites([...favorites, id]);
      showToast('已加入我的收藏');
    }
  };

  const handleOpenCategory = (cat?: string) => {
    if (cat) setActiveCategoryParam(cat);
    setActiveTab('category');
    setSelectedProduct(null);
  };

  const handlePublishSuccess = (newProd: Product) => {
    setProducts([newProd, ...products]);
    showToast('发布成功！已同步至建院广场');
    setActiveTab('home');
    setSelectedProduct(newProd);
  };

  const handleOpenAppointmentForProduct = (prod: Product) => {
    setAppointmentTargetProduct(prod);
    setShowAppointmentModal(true);
  };

  const handleAppointmentCreated = (data: {
    campus: '广州校区' | '清远校区';
    location: string;
    dateTime: string;
    verificationCode: string;
  }) => {
    if (!appointmentTargetProduct) return;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      productId: appointmentTargetProduct.id,
      productTitle: appointmentTargetProduct.title,
      productPrice: appointmentTargetProduct.price,
      productImage: appointmentTargetProduct.images[0],
      partnerName: appointmentTargetProduct.seller.name,
      partnerRole: '卖家',
      campus: data.campus,
      location: data.location,
      dateTime: data.dateTime,
      verificationCode: data.verificationCode,
      status: 'pending',
    };
    setAppointments([newApt, ...appointments]);
    showToast(`面交约定已生效，核销码：${data.verificationCode}`);
  };

  const handleStartChatWithProduct = (product: Product) => {
    let existingConv = conversations.find(
      (c) => c.otherUser.id === product.seller.id
    );
    if (!existingConv) {
      existingConv = {
        id: `conv-${Date.now()}`,
        otherUser: {
          id: product.seller.id,
          name: product.seller.name,
          avatar: product.seller.avatar,
          department: product.seller.department,
          campus: product.seller.campus,
        },
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
        },
        lastMessage: '同学你好，对这个物品感兴趣，想当面看看~',
        lastTime: '刚刚',
        unreadCount: 0,
        messages: [
          {
            id: `m-init-${Date.now()}`,
            sender: 'system',
            text: `你正在与 ${product.seller.department}·${product.seller.name}（学号已认证）沟通`,
            time: '刚刚',
          },
          {
            id: `m-init-user-${Date.now()}`,
            sender: 'user',
            text: `同学你好！请问【${product.title}】还在吗？方便约在校内当面验货吗？`,
            time: '刚刚',
            read: true,
          },
        ],
      };
      setConversations([existingConv, ...conversations]);
    }
    setSelectedConversation(existingConv);
    setSelectedProduct(null);
  };

  // Header Title Resolver
  const getHeaderTitle = () => {
    if (activeTab === 'home') return '广东建院·校园闲置循环';
    if (activeTab === 'category') return '分类';
    if (activeTab === 'publish') return '发布页';
    if (activeTab === 'messages') return '消息';
    if (activeTab === 'profile') return '个人中心';
    return '';
  };

  // Unread badge count
  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-stone-200/70 text-slate-800 flex flex-col items-center justify-start antialiased selection:bg-rose-100 selection:text-rose-700">
      {/* Top Desktop Helper Toolbar (allows switching mobile simulator vs full width) */}
      <header className="w-full bg-stone-900 text-stone-300 px-4 py-2 flex items-center justify-between text-xs z-50 shadow-md">
        <div className="flex items-center gap-2">
          <CampusLogo className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold text-white tracking-wide">
            广东建设职业技术学院 · 校园闲置流转平台
          </span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-emerald-400 font-medium">
            ● 校内安全面交模式已就绪
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition-colors"
            title="切换真机手机尺寸 / 宽屏响应式"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E45749]" />
            <span>{isPhoneFrame ? '全屏自适应' : '真机模拟框'}</span>
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <main
        className={`w-full transition-all duration-300 relative bg-[#F8F9FA] shadow-2xl ${
          isPhoneFrame
            ? 'max-w-md my-0 sm:my-5 sm:rounded-[36px] sm:border-[8px] sm:border-stone-800 sm:overflow-hidden min-h-[850px]'
            : 'max-w-xl my-0 sm:my-3 sm:rounded-2xl min-h-screen'
        }`}
      >
        {/* Dynamic Screen Rendering */}
        {selectedProduct ? (
          <DetailScreen
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onChat={(prod) => handleStartChatWithProduct(prod)}
            onOpenAppointment={(prod) => handleOpenAppointmentForProduct(prod)}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.includes(selectedProduct.id)}
          />
        ) : selectedConversation ? (
          <ChatScreen
            conversation={selectedConversation}
            product={
              selectedConversation.product
                ? products.find((p) => p.id === selectedConversation.product?.id)
                : undefined
            }
            onBack={() => setSelectedConversation(null)}
            onOpenAppointment={() => {
              const target =
                products.find((p) => p.id === selectedConversation.product?.id) ||
                products[0];
              handleOpenAppointmentForProduct(target);
            }}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            allProducts={products}
          />
        ) : (
          <div className="flex flex-col min-h-full">
            {/* Top WeChat Mini-Program Header */}
            <HeaderCapsule
              title={getHeaderTitle()}
              isHome={activeTab === 'home'}
              showBack={activeTab === 'publish'}
              onBack={() => setActiveTab('home')}
            />

            {/* Tab Contents */}
            {activeTab === 'home' && (
              <HomeScreen
                products={products}
                currentCampus={currentCampus}
                onCampusChange={setCurrentCampus}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onOpenPublish={() => setActiveTab('publish')}
                onOpenCategory={handleOpenCategory}
                onOpenPact={() => setShowPactModal(true)}
              />
            )}

            {activeTab === 'category' && (
              <CategoryScreen
                products={products}
                currentCampus={currentCampus}
                onCampusChange={setCurrentCampus}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                initialCategory={activeCategoryParam}
              />
            )}

            {activeTab === 'publish' && (
              <PublishScreen
                onPublishSuccess={handlePublishSuccess}
                onBack={() => setActiveTab('home')}
                onOpenPact={() => setShowPactModal(true)}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesScreen
                conversations={conversations}
                onSelectConversation={(conv) => {
                  // Mark as read
                  setConversations(
                    conversations.map((c) =>
                      c.id === conv.id ? { ...c, unreadCount: 0 } : c
                    )
                  );
                  setSelectedConversation(conv);
                }}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                currentCampus={currentCampus}
                onCampusChange={setCurrentCampus}
                appointments={appointments}
                myProductsCount={products.filter((p) => p.seller.id === 'user-self' || p.seller.name.includes('小李')).length || 3}
                favoritesCount={favorites.length}
                onOpenAppointmentModal={(apt) => {
                  const targetProd =
                    products.find((p) => p.id === apt?.productId) || products[0];
                  handleOpenAppointmentForProduct(targetProd);
                }}
                onOpenPact={() => setShowPactModal(true)}
                onOpenCert={() => setShowCertModal(true)}
                onViewMyProducts={() => setShowMyProductsModal(true)}
                onViewFavorites={() => setShowFavoritesModal(true)}
              />
            )}

            {/* Bottom Tab Bar */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setSelectedProduct(null);
                setSelectedConversation(null);
              }}
              unreadCount={totalUnread}
            />
          </div>
        )}

        {/* Global Appointment Booking Modal */}
        {showAppointmentModal && appointmentTargetProduct && (
          <AppointmentModal
            product={appointmentTargetProduct}
            currentCampus={currentCampus}
            onClose={() => setShowAppointmentModal(false)}
            onSuccess={handleAppointmentCreated}
          />
        )}

        {/* Self-Discipline Pact Modal */}
        {showPactModal && <PactModal onClose={() => setShowPactModal(false)} />}

        {/* School Certification Modal */}
        {showCertModal && (
          <CertificationModal onClose={() => setShowCertModal(false)} />
        )}

        {/* My Products Drawer Modal */}
        {showMyProductsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
            <div className="bg-white rounded-3xl p-5 w-full max-w-sm max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#E45749]" />
                  <h3 className="font-bold text-sm text-slate-800">
                    我的闲置物品 (在架管理)
                  </h3>
                </div>
                <button
                  onClick={() => setShowMyProductsModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {products.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-200"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <div className="text-xs font-bold text-[#E45749] mt-0.5">
                        ¥{item.price}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      在架中
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowMyProductsModal(false);
                  setActiveTab('publish');
                }}
                className="w-full py-2.5 rounded-full bg-[#E45749] text-white text-xs font-bold shadow-xs mt-2"
              >
                + 发布新闲置
              </button>
            </div>
          </div>
        )}

        {/* My Favorites Modal */}
        {showFavoritesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
            <div className="bg-white rounded-3xl p-5 w-full max-w-sm max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#E45749] fill-[#E45749]" />
                  <h3 className="font-bold text-sm text-slate-800">
                    我的收藏好物 ({favorites.length})
                  </h3>
                </div>
                <button
                  onClick={() => setShowFavoritesModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                {products
                  .filter((p) => favorites.includes(p.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowFavoritesModal(false);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {item.title}
                        </h4>
                        <div className="text-xs font-bold text-[#E45749] mt-0.5">
                          ¥{item.price}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        查看 &gt;
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
