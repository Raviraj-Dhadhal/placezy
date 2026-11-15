import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 px-4">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <Logo size={36} />
        <span className="text-xs text-[#555E74] flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006765]"></span>
          Curated Urban Navigator
        </span>
      </header>

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        <div className="w-12 h-12 rounded-xl bg-[#006765] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Logo size={28} showText={false} />
        </div>
        <span className="block text-center text-sm font-bold text-[#151C27] mb-0.5">
          Placezy
        </span>
        <h2 className="text-xl font-bold font-serif text-center text-[#151C27]">
          Welcome Back
        </h2>
        <p className="text-xs text-[#555E74] text-center mt-1 mb-6">
          Sign in to discover places personalized for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              iconPosition="left"
              required
            />
            <div className="flex justify-end mt-1.5">
              <Link
                to="/forgot-password"
                className="text-xs text-[#555E74] hover:text-[#006765] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Login
          </Button>

          <div className="text-center pt-2">
            <span className="text-xs text-[#555E74]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#006765] font-semibold hover:underline">
                Sign Up
              </Link>
            </span>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#F1F5F9] text-center">
          <span className="text-[10px] text-[#8E98B0]">
            🔒 Protected by enterprise-grade cryptographic standards & privacy architecture.
          </span>
        </div>
      </div>

      <footer className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#555E74] pt-6 gap-3">
        <span>© 2024 Placezy. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-[#151C27]">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-[#151C27]">Terms of Service</Link>
          <span>|</span>
          <Link to="/owner/register" className="hover:text-[#151C27]">Register Your Business</Link>
          <span>|</span>
          <Link to="/faq" className="hover:text-[#151C27]">FAQs</Link>
          <span>|</span>
          <Link to="/contact" className="hover:text-[#151C27]">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};
