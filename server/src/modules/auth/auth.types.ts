export interface RegisterDTO {
  name: string;
  email: string;
  phone?: string;
  password: string;
  gender?: 'male' | 'female';
  interests?: string[];
  role?: 'user' | 'owner';
  city?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    gender?: 'male' | 'female';
  };
}
