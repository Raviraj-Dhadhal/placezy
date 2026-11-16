import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Footer } from '../../../components/shared/Footer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { User, Mail, Phone, MapPin, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Rajkot, Gujarat');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Password Match Validation
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your passwords.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    // 2. Mobile Number Validation (Strict 10 digits check)
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    if (cleanPhone) {
      if (!/^\d{10}$/.test(cleanPhone) && !/^(91)?\d{10}$/.test(cleanPhone)) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return;
      }
    } else {
      setErrorMsg('Mobile number is required (10 digits).');
      return;
    }

    if (!agreed) {
      setErrorMsg('Please accept the Terms of Service and Privacy Policy to register.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post('/auth/register', {
        name: fullName,
        email,
        phone,
        password,
        city: city || 'Rajkot',
        role: 'user',
      });

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
          city: user.city,
        });
        navigate('/register/interests');
      } else {
        setErrorMsg(res.data?.message || 'Registration failed.');
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      if (serverMessage) {
        setErrorMsg(serverMessage);
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setErrorMsg('Cannot connect to backend server. Please make sure the backend server is running on port 5000.');
      } else {
        setErrorMsg('Unable to complete registration. Try a different email.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
      <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto mb-4 border border-[#006765]/20">
        <User size={22} />
      </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">Create Your Account</h1>
          <p className="text-xs text-[#555E74] mt-1">Join us and discover places personalized for you.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Full Name"
              placeholder="e.g. Aarav Patel"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User size={16} />}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. aarav@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => {
                // Only allow numbers, +, -, and spaces
                const val = e.target.value.replace(/[^\d+\-\s]/g, '');
                setPhone(val);
              }}
              icon={<Phone size={16} />}
              required
            />
            <Input
              label="City"
              placeholder="Rajkot, Gujarat"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              icon={<MapPin size={16} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create strong password"
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
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={16} />}
              iconPosition="left"
              required
            />
          </div>

          {/* Validation feedback preview */}
          {password && confirmPassword && (
            <div className="text-[11px] font-medium pt-0.5">
              {password === confirmPassword ? (
                <span className="text-emerald-600">✓ Passwords match</span>
              ) : (
                <span className="text-red-500">✗ Passwords do not match</span>
              )}
            </div>
          )}

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
            disabled={isSubmitting || (password !== confirmPassword && !!confirmPassword)}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
  );
};
