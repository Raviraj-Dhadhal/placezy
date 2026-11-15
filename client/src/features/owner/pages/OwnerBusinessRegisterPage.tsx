import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import {
  Building2,
  Clock,
  Image,
  User,
  CheckCircle,
  UploadCloud,
  Check,
  ArrowRight
} from 'lucide-react';

export const OwnerBusinessRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('The Grand Heritage Cafe');
  const [category, setCategory] = useState('Cafe & Restaurant');
  const [description, setDescription] = useState(
    'Artisan single-origin brews, fresh stone-fired bakes, and peaceful conservatory seating curated for modern remote workers and social gatherings.'
  );
  const [address, setAddress] = useState('Crystal Mall Promenade, Kalawad Road');
  const [city] = useState('Rajkot');
  const [state] = useState('Gujarat');
  const [contactNumber, setContactNumber] = useState('+91 98251 22440');
  const [email, setEmail] = useState('contact@grandheritagecafe.com');

  const [ownerName, setOwnerName] = useState('Rajesh Mehta');
  const [ownerEmail, setOwnerEmail] = useState('rajesh.mehta@example.com');
  const [ownerPhone, setOwnerPhone] = useState('+91 98765 43210');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner & Progress Header matching Screen 01 Module 02 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-0.5 rounded-full border border-[#006765]/20">
            Verified Merchant Onboarding
          </span>
          <h1 className="text-2xl font-bold font-serif text-[#151C27] mt-1">
            Register Your Business
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            List your business and help people discover your space across Gujarat.
          </p>
        </div>

        {/* 3 Step Pill Tracker */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006765] text-white text-xs font-semibold">
            <span>1</span>
            <span>Business Info</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#555E74] text-xs font-medium">
            <span>2</span>
            <span>Photos & Logo</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#555E74] text-xs font-medium">
            <span>3</span>
            <span>Verification</span>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-2xl shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
          <h3 className="text-xl font-bold text-[#151C27]">
            Business Registration Submitted!
          </h3>
          <p className="text-xs text-[#555E74] max-w-md mx-auto leading-relaxed">
            Your venue <strong>{businessName}</strong> has been submitted to the Rajkot territory admin queue. Verification typically concludes within 24 business hours.
          </p>
          <div className="pt-2">
            <Button size="md" onClick={() => navigate('/owner/dashboard')}>
              Go to Owner Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Business Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 1: Business Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#151C27]">Business Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-button border border-[#E2E8F0] py-2.5 px-3.5 text-xs text-[#151C27] bg-white outline-none"
                >
                  <option>Cafe & Restaurant</option>
                  <option>Heritage & Culture</option>
                  <option>Boutique & Retail</option>
                  <option>Entertainment & Leisure</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#151C27]">Business Description</label>
                <span className="text-[10px] text-[#8E98B0]">{description.length}/500 characters</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#151C27] focus:outline-none focus:border-[#006765] leading-relaxed resize-none"
                required
              />
            </div>

            <Input
              label="Business Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input label="City" value={city} disabled />
              <Input label="State" value={state} disabled />
              <Input label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          {/* Section 2: Business Details & Timings */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 2: Business Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Opening Hours" defaultValue="09:00 AM" icon={<Clock size={15} />} />
              <Input label="Closing Hours" defaultValue="11:00 PM" icon={<Clock size={15} />} />
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#151C27]">Price Range</label>
              <div className="grid grid-cols-4 gap-3">
                {['$ (Budget)', '$$ (Moderate)', '$$$ (Upscale)', '$$$$ (Luxury)'].map((p, idx) => (
                  <button
                    key={p}
                    type="button"
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      idx === 1
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-white text-[#555E74] border-[#E2E8F0]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities & Amenities checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#151C27]">Facilities & Amenities</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Free Wi-Fi',
                  'Valet Parking',
                  'Air Conditioned',
                  'Outdoor Seating',
                  'Pet Friendly',
                  'Wheelchair Accessible',
                  'Card Payments',
                  'Pure Veg'
                ].map((item, idx) => (
                  <span
                    key={item}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                      idx < 4
                        ? 'bg-[#006765] text-white border-[#006765]'
                        : 'bg-[#F8FAFC] text-[#555E74] border-[#E2E8F0]'
                    }`}
                  >
                    {idx < 4 && <Check size={12} />}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Business Images & Logo */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 3: Business Images
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Logo Uploader */}
              <div className="border-2 border-dashed border-[#CFE7E6] rounded-xl p-4 text-center cursor-pointer hover:bg-[#F0F3FF] transition-colors space-y-1">
                <UploadCloud size={24} className="text-[#006765] mx-auto" />
                <span className="text-xs font-bold text-[#151C27] block">Click to upload or drag & drop</span>
                <span className="text-[10px] text-[#8E98B0]">PNG, JPG up to 5MB (Square ratio recommended)</span>
              </div>

              {/* Photo preview */}
              <div className="flex items-center gap-3">
                <img
                  src="/images/places/grand-courtyard.jpg"
                  alt="Cover"
                  className="w-24 h-24 rounded-xl object-cover border border-[#E2E8F0]"
                />
                <img
                  src="/images/places/kavita-tea.jpg"
                  alt="Thumb"
                  className="w-24 h-24 rounded-xl object-cover border border-[#E2E8F0]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Owner Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 4: Owner Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
              <Input
                label="Owner Email"
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                required
              />
              <Input
                label="Owner Contact Number"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="merchant-terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 rounded text-[#006765] focus:ring-[#006765]"
                required
              />
              <label htmlFor="merchant-terms" className="text-xs text-[#555E74]">
                I agree to the Terms & Conditions and Business Guidelines. I certify all submitted commercial information is authentic.
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Submit Registration →
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
