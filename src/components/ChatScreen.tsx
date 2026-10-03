import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  MoreHorizontal,
  CircleDot,
  Image as ImageIcon,
  Mic,
  Send,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { Conversation, Product, ChatMessage } from '../types';

interface ChatScreenProps {
  conversation: Conversation;
  product?: Product;
  onBack: () => void;
  onOpenAppointment: () => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  conversation,
  product,
  onBack,
  onOpenAppointment,
  onSelectProduct,
  allProducts,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const targetProduct =
    product ||
    allProducts.find((p) => p.id === conversation.product?.id) ||
    allProducts[0];

  const quickReplies = ['还在吗', '可以当面验机吗', '在哪个校区交易方便'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: '刚刚',
      read: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate smart seller reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '好的呀！我随身带着，支持在建院校内当面开机验货试用，没问题再收货~';
      if (text.includes('还在吗')) {
        replyText = '还在的呢！今天有空可以随时约在校内当面验货开机～';
      } else if (text.includes('验机')) {
        replyText = '完全没问题！可以带充电宝现场试充、试用Apple Pencil防误触和蓝牙连接，当面验机最放心啦！';
      } else if (text.includes('校区')) {
        replyText = '我平时都在清远校区自习，周四在广州校区有实验课，看你方便约在哪个校区都可以哦！';
      }

      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'other',
        senderName: conversation.otherUser.name,
        text: replyText,
        time: '刚刚',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA] text-slate-800 max-w-md mx-auto">
      {/* Top Custom Chat Navigation Bar matching Image 7 */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-3 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 active:scale-95"
            aria-label="返回"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-800 text-sm truncate">
                {conversation.otherUser.name}（{conversation.otherUser.department}）
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#E45749] font-medium">
              <CheckCircle2 className="w-3 h-3 text-[#E45749]" />
              <span>学号已认证·{conversation.otherUser.campus}</span>
            </div>
          </div>
        </div>

        {/* Mini program capsule */}
        <div className="flex items-center ml-2 bg-stone-100/90 border border-stone-300/80 rounded-full px-2.5 py-1 text-slate-700 shadow-2xs">
          <button className="p-0.5 hover:opacity-75">
            <MoreHorizontal className="w-4 h-4 stroke-[2]" />
          </button>
          <span className="mx-1.5 text-stone-300 text-xs">|</span>
          <button className="p-0.5 hover:opacity-75">
            <CircleDot className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Sticky Top Attached Product Card matching Image 7 */}
      {targetProduct && (
        <div className="bg-white px-3.5 py-2.5 border-b border-stone-200/70 shadow-2xs flex items-center justify-between gap-3">
          <div
            onClick={() => onSelectProduct(targetProduct)}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
          >
            <img
              src={targetProduct.images[0]}
              alt={targetProduct.title}
              className="w-13 h-13 rounded-lg object-cover flex-shrink-0 border border-stone-200"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] bg-rose-50 text-[#E45749] font-medium px-1.5 py-0.2 rounded">
                  95新·自用
                </span>
                <span className="text-[10px] bg-cyan-50 text-cyan-700 font-medium px-1.5 py-0.2 rounded">
                  带磁吸笔
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 truncate">
                {targetProduct.title}
              </h4>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xs font-bold text-[#E45749]">
                  ¥ {targetProduct.price}
                </span>
                {targetProduct.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through">
                    ¥{targetProduct.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenAppointment}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E45749] to-[#F06A5C] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex-shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>预约面交</span>
            <span className="text-[10px] opacity-80">详情 &gt;</span>
          </button>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center my-2">
                <div className="inline-flex items-center gap-1.5 bg-rose-50/70 border border-rose-200/60 rounded-full px-3 py-1 text-[11px] text-[#A63529]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E45749]"></span>
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          }

          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[78%] flex flex-col items-end">
                  <div className="bg-[#E45749] text-white text-xs rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-2xs leading-relaxed font-normal">
                    {msg.text}
                  </div>
                  {msg.read && (
                    <span className="text-[9px] text-slate-400 mt-0.5 mr-1">
                      已读
                    </span>
                  )}
                </div>
              </div>
            );
          }

          // Other person's message
          return (
            <div key={msg.id} className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-stone-200 border border-stone-300">
                <img
                  src={conversation.otherUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="max-w-[78%] space-y-1.5">
                <div className="text-[10px] text-slate-400">
                  {conversation.otherUser.name}
                </div>

                {/* Optional embedded image inside message (matching Screenshot 7) */}
                {msg.image && (
                  <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xs max-w-[220px] bg-stone-100">
                    <img
                      src={msg.image}
                      alt="实物图"
                      className="w-full h-auto object-cover"
                    />
                    <div className="bg-black/60 text-white text-[9px] px-2 py-0.5 text-center font-medium">
                      📷 实拍书桌实物
                    </div>
                  </div>
                )}

                {msg.text && (
                  <div className="bg-white border border-stone-200/70 text-slate-800 text-xs rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-2xs leading-relaxed">
                    {msg.text}
                  </div>
                )}

                {/* Optional attached roommate product recommendation card matching Image 7 */}
                {msg.attachedProduct && (
                  <div
                    onClick={() => {
                      const found = allProducts.find((p) => p.id === msg.attachedProduct?.id);
                      if (found) onSelectProduct(found);
                    }}
                    className="bg-white border border-stone-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-2xs hover:border-rose-300 cursor-pointer"
                  >
                    <img
                      src={msg.attachedProduct.image}
                      alt={msg.attachedProduct.title}
                      className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[11px] font-bold text-slate-800 truncate">
                        {msg.attachedProduct.title}
                      </h5>
                      <div className="text-[10px] text-[#E45749] font-bold">
                        ¥{msg.attachedProduct.price} · {msg.attachedProduct.campus}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#E45749] font-medium bg-rose-50 px-2 py-1 rounded-md flex-shrink-0">
                      瞧瞧
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-10">
            <span className="animate-pulse">对方正在输入中...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips matching Screenshot 7 */}
      <div className="bg-white/90 px-3 py-1.5 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {quickReplies.map((qr) => (
          <button
            key={qr}
            onClick={() => handleSendMessage(qr)}
            className="text-xs text-slate-700 bg-stone-100 hover:bg-rose-50 hover:text-[#E45749] px-3 py-1 rounded-full whitespace-nowrap transition-colors border border-stone-200/60"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Bottom Message Input Bar matching Screenshot 7 */}
      <div className="bg-white border-t border-stone-200/80 p-2.5 flex items-center gap-2">
        <button
          onClick={() => alert('语音输入：建院方言与普通话自动转文字')}
          className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
          title="语音"
        >
          <Mic className="w-5 h-5 stroke-[1.8]" />
        </button>

        <button
          onClick={() => {
            const sampleImageMsg: ChatMessage = {
              id: `img-${Date.now()}`,
              sender: 'user',
              image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
              text: '学姐你看，我在弘毅楼自习室这边，这是我的位置~',
              time: '刚刚',
            };
            setMessages((prev) => [...prev, sampleImageMsg]);
          }}
          className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
          title="发送实物图"
        >
          <ImageIcon className="w-5 h-5 stroke-[1.8]" />
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="想跟学姐聊点什么... (可直接输入发消息)"
            className="w-full bg-stone-100/90 text-xs rounded-full px-3.5 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#E45749]"
          />
          <button
            onClick={() => {}}
            className="absolute right-2 text-slate-400 hover:text-slate-600"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => handleSendMessage()}
          className="px-4 py-2 rounded-full bg-[#E45749] text-white text-xs font-bold hover:bg-rose-600 shadow-xs active:scale-95 transition-all flex items-center gap-1"
        >
          <span>发送</span>
        </button>
      </div>
    </div>
  );
};
