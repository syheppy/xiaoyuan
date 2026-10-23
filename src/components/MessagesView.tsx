import React, { useState } from 'react';
import { ConversationItem, ScreenId } from '../data/marketplaceData';
import { BottomNavBar } from './BottomNavBar';

interface MessagesViewProps {
  conversations: ConversationItem[];
  onSelectConversation: (conv: ConversationItem) => void;
  onClearUnread: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  onSelectConversation,
  onClearUnread,
  onNavigate,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'meetup' | 'system'>('all');
  const [showMeetupDetail, setShowMeetupDetail] = useState(false);

  const unreadTotal = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const filteredList = conversations.filter((c) => {
    if (filterTab === 'meetup') {
      return c.statusType === 'negotiating' || c.statusType === 'waiting';
    }
    if (filterTab === 'system') {
      return c.statusType === 'official';
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#1F2937] relative flex flex-col pb-28">
      {/* 顶部状态栏占位 & 原生微导航栏 */}
      <header className="sticky top-0 z-40 bg-[#F8F9FA]/90 backdrop-blur-md pt-3 pb-2 px-5 transition-all">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-2">
            <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
              消息
            </h1>
            {unreadTotal > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-semibold text-[#9C3D28] bg-rose-50 rounded-full tabular-nums">
                {unreadTotal}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <button
              type="button"
              onClick={onClearUnread}
              aria-label="消息设置与已读"
              className="p-2 hover:text-gray-800 transition active:scale-95"
              title="全部标为已读"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 分类筛选轻量胶囊 */}
        <div className="flex items-center space-x-2 mt-3 mb-1">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 text-xs rounded-full flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              filterTab === 'all'
                ? 'font-semibold bg-white text-gray-900 shadow-sm border border-gray-100'
                : 'font-medium text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            <span>全部消息</span>
            {unreadTotal > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#9C3D28]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('meetup')}
            className={`px-3.5 py-1.5 text-xs rounded-full flex items-center space-x-1 transition-all whitespace-nowrap ${
              filterTab === 'meetup'
                ? 'font-semibold bg-white text-gray-900 shadow-sm border border-gray-100'
                : 'font-medium text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            <span>面交待约</span>
            <span className="text-[11px] text-gray-400 font-normal">1</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('system')}
            className={`px-3.5 py-1.5 text-xs rounded-full flex items-center space-x-1 transition-all whitespace-nowrap ${
              filterTab === 'system'
                ? 'font-semibold bg-white text-gray-900 shadow-sm border border-gray-100'
                : 'font-medium text-gray-500 hover:text-gray-800 bg-transparent'
            }`}
          >
            <span>系统通知</span>
          </button>
        </div>
      </header>

      {/* 主体消息流 */}
      <main className="flex-1 px-5 pt-3 space-y-3">
        {/* 核心重点看板：今日面交待约 */}
        <div className="bg-gradient-to-r from-rose-50/80 via-white to-white rounded-2xl border border-rose-100/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-[#9C3D28] shadow-sm flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-semibold text-gray-900">
                  今日面交约定
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#9C3D28] text-white rounded">
                  待面交
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                18:30 · 清远·桂园宿舍楼下 ·「自用iPad 9代」
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const chenConv = conversations.find((c) => c.id === 'conv-chen');
              if (chenConv) onSelectConversation(chenConv);
              else setShowMeetupDetail(true);
            }}
            className="px-2.5 py-1 text-xs font-medium text-[#9C3D28] bg-white rounded-lg border border-rose-100 shadow-xs flex items-center space-x-0.5 active:scale-95 transition shrink-0 whitespace-nowrap"
          >
            <span>查看</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 消息会话卡片列表 */}
        <div className="pt-1 space-y-2.5">
          {filteredList.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelectConversation(conv)}
              className="w-full text-left block bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] active:bg-gray-50/80 transition-all relative overflow-hidden group px-4 py-3.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0 pr-2">
                  {/* 头像与未读数字红点 */}
                  <div className="relative flex-shrink-0">
                    {conv.statusType === 'official' ? (
                      <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#9C3D28] shadow-2xs">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={conv.avatar}
                        alt={conv.userName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-2xs"
                      />
                    )}
                    {conv.unreadCount > 0 &&
                      (conv.statusType === 'official' ? (
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#9C3D28] rounded-full ring-2 ring-white" />
                      ) : (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#9C3D28] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                          {conv.unreadCount}
                        </span>
                      ))}
                  </div>

                  {/* 核心内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {conv.userName}
                      </h3>
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap ${conv.badgeBg} ${conv.badgeText}`}
                      >
                        {conv.userBadge}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 truncate ${
                        conv.unreadCount > 0
                          ? 'text-gray-700 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5">
                      {conv.statusType === 'negotiating' ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] text-[#9C3D28] bg-rose-50/70 px-2 py-0.5 rounded-full font-medium">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{conv.statusTag}</span>
                        </span>
                      ) : conv.statusType === 'official' ? (
                        <span className="text-[11px] text-gray-400">
                          {conv.statusTag}
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                          <span>{conv.statusTag}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 右侧：时间与关联商品微缩图 */}
                <div className="flex flex-col items-end space-y-1.5 flex-shrink-0">
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
                    {conv.timeAgo}
                  </span>
                  {conv.productThumb && conv.statusType !== 'official' && (
                    <div className="relative group-hover:scale-105 transition-transform">
                      <img
                        src={conv.productThumb}
                        alt={conv.productTitle || '关联商品'}
                        referrerPolicy="no-referrer"
                        className="w-[52px] h-[52px] rounded-xl object-cover border border-gray-100"
                      />
                      <span className="absolute bottom-0 right-0 left-0 bg-black/50 text-[10px] text-white text-center py-0.5 rounded-b-xl font-medium tracking-tight tabular-nums">
                        ¥{conv.productPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 底部安全保障与互助提示 */}
        <div className="pt-6 pb-4 text-center">
          <p className="text-[11px] text-gray-400 tracking-tight">
            广东建设职业技术学院 · 校内学生当面自提验货
          </p>
          <p className="text-[10px] text-gray-300 mt-0.5">
            绿色校园 · 真实学籍实名流转
          </p>
        </div>
      </main>

      {showMeetupDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-5"
        >
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3">
            <h3 className="text-sm font-bold text-gray-900">今日面交约定详情</h3>
            <p className="text-xs text-gray-600">
              18:30 · 清远校区桂园宿舍楼下 · 自用iPad 9代 (¥1350)
            </p>
            <button
              type="button"
              onClick={() => setShowMeetupDetail(false)}
              className="w-full py-2 rounded-full bg-[#9C3D28] text-white text-xs font-semibold"
            >
              知道了
            </button>
          </div>
        </div>
      )}

      <BottomNavBar
        activeScreen="messages"
        unreadTotal={unreadTotal}
        onNavigate={onNavigate}
      />
    </div>
  );
};
