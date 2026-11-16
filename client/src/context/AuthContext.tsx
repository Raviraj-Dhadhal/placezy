import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  gender?: 'male' | 'female';
  city?: string;
  interests?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  unreadNotificationsCount: number;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
  refreshNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('placezy_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('placezy_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUnreadCount = async () => {
    const storedToken = localStorage.getItem('placezy_token');
    if (!storedToken) {
      setUnreadNotificationsCount(0);
      return;
    }
    try {
      const res = await api.get('/notifications');
      if (res.data?.success && Array.isArray(res.data?.data)) {
        const count = res.data.data.filter((n: any) => !n.read).length;
        setUnreadNotificationsCount(count);
      }
    } catch {
      // Ignore if unauthenticated
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const storedToken = localStorage.getItem('placezy_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data?.success && res.data?.data) {
          const freshUser = res.data.data;
          const determineGender = (name?: string, explicit?: 'male' | 'female'): 'male' | 'female' => {
            if (explicit) return explicit;
            if (name && /(aarav|gaurav|bhavik|raviraj|devang|harish|rajesh)/i.test(name)) return 'male';
            return 'female';
          };

          setUser({
            id: freshUser._id || freshUser.id,
            name: freshUser.name,
            email: freshUser.email,
            role: freshUser.role,
            avatar: freshUser.avatar,
            gender: determineGender(freshUser.name, freshUser.gender),
            city: freshUser.city || 'Rajkot',
            interests: freshUser.interests || [],
          });
          localStorage.setItem('placezy_user', JSON.stringify(freshUser));
        }
        await fetchUnreadCount();
      } catch (err) {
        console.warn('Session expired or invalid token');
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = (newToken: string, newUser: UserProfile) => {
    const gender = newUser.gender || (newUser.name && /(aarav|gaurav|bhavik|raviraj|devang|harish|rajesh)/i.test(newUser.name) ? 'male' : 'female');
    const enrichedUser = { ...newUser, gender };
    setToken(newToken);
    setUser(enrichedUser);
    localStorage.setItem('placezy_token', newToken);
    localStorage.setItem('placezy_user', JSON.stringify(enrichedUser));
    fetchUnreadCount();
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUnreadNotificationsCount(0);
    localStorage.removeItem('placezy_token');
    localStorage.removeItem('placezy_user');
  };

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('placezy_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        unreadNotificationsCount,
        login,
        logout,
        updateUser,
        refreshNotifications: fetchUnreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
