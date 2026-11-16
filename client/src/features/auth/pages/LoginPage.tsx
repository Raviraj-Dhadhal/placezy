import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Footer } from '../../../components/shared/Footer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success && res.data?.data) {
        const { token, user } = res.data.data;
        const determinedGender = user.gender || (user.name && /(aarav|gaurav|bhavik|raviraj|devang|harish|rajesh)/i.test(user.name) ? 'male' : 'female');
        login(token, {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          gender: determinedGender,
        });

        // Role-based routing redirection
        if (user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (user.role === 'owner') {
          navigate('/owner/dashboard', { replace: true });
        } else {
          // If first-time user login or general user login, route through splash
          navigate('/splash', { replace: true });
        }
      } else {
        setErrorMsg(res.data?.message || 'Invalid email or password');
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      if (serverMessage) {
        setErrorMsg(serverMessage);
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setErrorMsg('Cannot connect to backend server. Please make sure the backend server is running on port 5000.');
      } else {
        setErrorMsg('Unable to connect to login server. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

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
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              iconPosition="left"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#555E74] hover:text-[#006765] transition-colors focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
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
            disabled={isSubmitting}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            {isSubmitting ? 'Authenticating...' : 'Login'}
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
    );
  };
