export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  address: string;
  city: string;
  imageUrl: string;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  cuisines?: string[];
  features?: string[];
  isVerified?: boolean;
  openingStatus?: 'Open Now' | 'Closed' | 'Closes 5 PM' | 'Open 24h';
  phone?: string;
  description?: string;
  distanceKm?: number;
  latitude?: number;
  longitude?: number;
}

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  userAvatar?: string;
  userGender?: 'male' | 'female';
  rating: number;
  date: string;
  content: string;
  likes: number;
  tags?: string[];
  ownerReply?: {
    date: string;
    content: string;
  };
}

export interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  stopsCount: number;
  places: {
    placeId: string;
    name: string;
    category: string;
    dayNumber: number;
    time?: string;
    imageUrl?: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  gender?: 'male' | 'female';
  interests?: string[];
  city?: string;
  createdAt: string;
}
