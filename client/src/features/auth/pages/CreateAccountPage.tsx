import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { User, Mail, Phone, MapPin, Lock, ArrowRight } from 'lucide-react';

export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register/interests');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 px-4">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <Logo size={36} />
      </header>

      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto mb-4 border border-[#006765]/20">
          <User size={22} />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">Create Your Account</h1>
          <p className="text-xs text-[#555E74] mt-1">Join us and discover places personalized for you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Full Name"
              placeholder="e.g. Mahek Godvani"
              icon={<User size={16} />}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. mahek.patel@example..."
              icon={<Mail size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="+91 98765 43210"
              icon={<Phone size={16} />}
              required
            />
            <Input
              label="City"
              placeholder="Rajkot, Gujarat"
              icon={<MapPin size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              icon={<Lock size={16} />}
              iconPosition="left"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              icon={<Lock size={16} />}
              iconPosition="left"
              required
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-[#E2E8F0] text-[#006765] focus:ring-[#006765]"
              required
            />
            <label htmlFor="terms" className="text-xs text-[#555E74] leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-[#006765] font-semibold hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#006765] font-semibold hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Create Account
          </Button>

          <div className="text-center pt-2">
            <span className="text-xs text-[#555E74]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#006765] font-semibold hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
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
