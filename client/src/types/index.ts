export interface Place {
  id: string;
  _id?: string;
  slug?: string;
  name: string;
  category: string;
  subCategory?: string;
  status?: string;
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  address: string;
  city: string;
  location?: any;
  tagline?: string;
  distance?: string;
  distanceKm?: number;
  imageUrl?: string;
  coverImage?: string;
  images?: string[];
  galleryImages?: string[];
  priceLevel?: '$' | '$$' | '$$$' | '$$$$' | string;
  priceRange?: string;
  cuisines?: string[];
  features?: string[];
  facilities?: string[];
  isVerified?: boolean;
  openingStatus?: string;
  openingHours?: any;
  timings?: string;
  phone?: string;
  email?: string;
  description?: string;
  matchPercentage?: number;
  isWishlisted?: boolean;
  featured?: boolean;
  trending?: boolean;
  hiddenGem?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Review {
  id: string;
  _id?: string;
  placeId: any;
  userName: string;
  userAvatar?: string;
  userGender?: 'male' | 'female';
  userRole?: string;
  rating: number;
  status?: 'pending' | 'approved' | 'rejected' | string;
  date?: string;
  createdAt?: string;
  content: string;
  comment?: string;
  title?: string;
  images?: string[];
  likes?: number;
  tags?: string[];
  verified?: boolean;
  ownerReply?: {
    date: string | Date;
    content: string;
  };
}

export interface Trip {
  id: string;
  _id?: string;
  title: string;
  destination?: string;
  startDate: string;
  endDate: string;
  durationDays?: number;
  travelersCount?: number;
  pace?: string;
  interests?: string[];
  coverImage?: string;
  stopsCount: number;
  places: {
    placeId: string;
    name: string;
    category: string;
    dayNumber: number;
    time?: string;
    imageUrl?: string;
    address?: string;
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
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  status?: 'active' | 'suspended';
  avatar?: string;
  gender?: 'male' | 'female';
  interests?: string[];
  city?: string;
  phone?: string;
  createdAt: string;
}
