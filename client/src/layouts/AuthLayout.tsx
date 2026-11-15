import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/shared/Logo';
import { Footer } from '../components/shared/Footer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 px-4">
      {/* Top Simple Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <Logo size={36} />
      </header>

      {/* Auth Content (Login, Register, Forgot Password) */}
      <main className="w-full my-auto">
        <Outlet />
      </main>

      {/* Footer with 2026 */}
      <Footer className="max-w-6xl w-full mx-auto bg-transparent border-t border-[#E2E8F0] mt-8" />
    </div>
  );
};
