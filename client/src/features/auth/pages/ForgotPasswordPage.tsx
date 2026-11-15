import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Mail, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 px-4">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <Logo size={36} />
      </header>

      {/* Center Auth Card matching Screen 04 */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        {/* Brand Icon Header */}
        <div className="w-12 h-12 rounded-xl bg-[#006765] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Logo size={28} showText={false} />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">
            Forgot Password?
          </h1>
          <p className="text-xs text-[#555E74] mt-1.5 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
            <CheckCircle size={32} className="text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">Reset Link Sent</h4>
            <p className="text-xs text-emerald-800">
              We've dispatched a recovery link to <strong>{email}</strong>. Check your inbox and spam folders.
            </p>
            <div className="pt-2">
              <Link to="/login">
                <Button size="sm" variant="outline" fullWidth>
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="EMAIL ADDRESS"
              type="email"
              placeholder="rajesh.mehta@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />

            <div className="flex items-center gap-1.5 text-[11px] text-[#555E74]">
              <ShieldCheck size={14} className="text-[#006765]" />
              <span>We'll never share your email with third parties.</span>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <span className="text-xs text-[#555E74]">
                Remember your password?{' '}
                <Link to="/login" className="text-[#006765] font-semibold hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        )}

        {/* Security badge at bottom */}
        <div className="mt-8 pt-4 border-t border-[#F1F5F9] text-center">
          <span className="text-[10px] text-[#8E98B0]">
            🔒 Protected by 256-bit enterprise token encryption
          </span>
        </div>
      </div>

      {/* Footer */}
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
