import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import { Footer } from '../components/shared/Footer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Top Header - Matching PublicLayout style: Logo linking to / with NO Login/Sign-up buttons */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E2E8F0] px-4 md:px-8 flex items-center justify-between">
        <Logo size={34} />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Outlet />
      </main>

      {/* Bottom Footer - Matching PublicLayout */}
      <Footer className="border-t border-[#E2E8F0] bg-white" />
    </div>
  );
};
