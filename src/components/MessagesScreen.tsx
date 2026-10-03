import React, { useState } from 'react';
import { Conversation } from '../types';
import { ShieldCheck, Bell } from 'lucide-react';
import { CampusLogo } from './CampusLogo';

interface MessagesScreenProps {
  conversations: Conversation[];
  onSelectConversation: (conv: Conversation) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  conversations,
  onSelectConversation,
}) => {
  const [activeFilter, setActiveFilter] = useState('全部消息');
  const filters = ['全部消息', '未读消息', '官方通知'];

  const filtered = conversations.filter((c) => {
    if (activeFilter === '未读消息') return c.unreadCount > 0;
    if (activeFilter === '官方通知') return c.otherUser.isOfficial;
    return true;
  });

  return (
    <div className="pb-24 bg-[#F8F9FA] min-h-screen text-slate-800">
      {/* Top Filter Tabs matching Image 3 */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-stone-200/70">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#8F352A] text-white shadow-2xs'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-3.5 space-y-3">
        {filtered.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv)}
            className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-2xs hover:shadow-sm transition-all flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Avatar with unread badge */}
            <div className="relative flex-shrink-0">
              {conv.otherUser.isOfficial ? (
                <div className="w-13 h-13 rounded-full bg-rose-50/80 flex items-center justify-center border border-rose-200/60 p-2 shadow-2xs">
                  <CampusLogo className="w-9 h-9" />
                </div>
              ) : (
                <img
                  src={conv.otherUser.avatar}
                  alt={conv.otherUser.name}
                  className="w-13 h-13 rounded-full object-cover border border-stone-200"
                />
              )}

              {conv.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E45749] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {conv.unreadCount}
                </span>
              )}
            </div>

            {/* Middle Message Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {conv.otherUser.name}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                    {conv.otherUser.department}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0 ml-1">
                  {conv.lastTime}
                </span>
              </div>

              <p className="text-xs text-slate-500 truncate mt-1 leading-snug">
                {conv.lastMessage}
              </p>

              {/* Status Tag Pill if any */}
              {conv.statusTag && (
                <div className="mt-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium inline-block ${
                      conv.statusTag.includes('想买')
                        ? 'bg-rose-50 text-[#E45749]'
                        : 'bg-stone-100 text-slate-500'
                    }`}
                  >
                    {conv.statusTag}
                  </span>
                </div>
              )}
            </div>

            {/* Right Product Card Thumbnail */}
            {conv.product && (
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative border border-stone-200/80">
                <img
                  src={conv.product.image}
                  alt={conv.product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-2xs text-white text-[9px] font-bold text-center py-0.5">
                  ¥{conv.product.price}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
