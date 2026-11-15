export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  gender?: 'male' | 'female';
  interests?: string[];
  role?: 'user' | 'owner';
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
  };
}
