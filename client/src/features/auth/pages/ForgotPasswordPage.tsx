import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Footer } from '../../../components/shared/Footer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../services/api';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Unable to process reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        {!submitted ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-[#006765] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Mail size={22} />
            </div>
            <h1 className="text-xl font-bold font-serif text-center text-[#151C27]">
              Reset Your Password
            </h1>
            <p className="text-xs text-[#555E74] text-center mt-1 mb-6">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />

              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={isLoading}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#555E74] hover:text-[#006765] font-semibold"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-xl font-bold font-serif text-[#151C27]">Check Your Email</h2>
            <p className="text-xs text-[#555E74] leading-relaxed">
              We've dispatched password reset instructions to{' '}
              <strong className="text-[#151C27]">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Button onClick={() => navigate('/login')} fullWidth size="lg">
                Return to Login
              </Button>
            </div>
          </div>
        )}
      </div>
  );
};
