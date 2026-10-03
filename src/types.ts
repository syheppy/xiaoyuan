export type Campus = '广州校区' | '清远校区' | '全部校区';

export type Condition = '全新未拆' | '95新' | '9成新' | '8成以下';

export type CirculationMethod = '校内当面自提' | '同宿舍楼顺手带';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: Condition;
  category: string;
  subCategory?: string;
  images: string[];
  description: string;
  tags: string[];
  features: string[];
  seller: {
    id: string;
    name: string;
    avatar: string;
    department: string;
    campus: '广州校区' | '清远校区';
    verified: boolean;
    studentIdVerified: boolean;
    carbonOffsetKg?: number;
  };
  meetupLocation: string;
  meetupAdvice?: string;
  circulationMethod: CirculationMethod;
  createdAt: string;
  isFree?: boolean;
  tagline?: string;
  favoritesCount: number;
  viewsCount: number;
  status: 'active' | 'reserved' | 'sold';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other' | 'system';
  senderName?: string;
  senderAvatar?: string;
  text?: string;
  image?: string;
  attachedProduct?: {
    id: string;
    title: string;
    price: number;
    image: string;
    campus: string;
  };
  time: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    department: string;
    campus: '广州校区' | '清远校区';
    isOfficial?: boolean;
  };
  product?: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  statusTag?: string;
  messages: ChatMessage[];
}

export interface Appointment {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  partnerName: string;
  partnerRole: '买家' | '卖家';
  campus: '广州校区' | '清远校区';
  location: string;
  dateTime: string;
  verificationCode: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}
