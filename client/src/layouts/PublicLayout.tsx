import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Top Public Navigation Header */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-4 md:px-8 flex items-center justify-between">
        <Logo size={34} />

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#F0F3FF] transition-colors"
            >
              <Avatar gender={user.gender || 'female'} size={32} name={user.name} />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#151C27]">{user.name}</span>
                <span className="text-[10px] text-[#555E74] capitalize">{user.role} Member</span>
              </div>
            </div>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                icon={<LogIn size={14} />}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="sm"
                icon={<UserPlus size={14} />}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Reusable Global Footer */}
      <Footer className="border-t border-[#E2E8F0] bg-white" />
    </div>
  );
};
