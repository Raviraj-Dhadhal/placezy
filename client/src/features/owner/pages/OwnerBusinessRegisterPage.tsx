import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import {
  Building2,
  Clock,
  Image as ImageIcon,
  User,
  CheckCircle,
  UploadCloud,
  Check,
  ArrowRight,
  X,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const OwnerBusinessRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Cafés');
  const [subCategory, setSubCategory] = useState('Specialty Roastery');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city] = useState('Rajkot');
  const [state] = useState('Gujarat');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  // Timings & Pricing
  const [openingTime, setOpeningTime] = useState('09:00 AM');
  const [closingTime, setClosingTime] = useState('11:00 PM');
  const [priceLevel, setPriceLevel] = useState<'₹' | '₹₹' | '₹₹₹' | 'Free Entry'>('₹₹');

  // Amenities
  const allAmenities = [
    'Free Wi-Fi',
    'Valet Parking',
    'Air Conditioned',
    'Outdoor Seating',
    'Pet Friendly',
    'Wheelchair Accessible',
    'Card Payments',
    'Pure Veg',
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Free Wi-Fi',
    'Air Conditioned',
    'Card Payments',
  ]);

  // Images state & upload
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Owner contact details
  const [ownerName, setOwnerName] = useState(user?.name || '');
  const [ownerEmail, setOwnerEmail] = useState(user?.email || '');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Submission state
  const [loading, setLoading] = useState(false);
  const [submittedPlace, setSubmittedPlace] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Image Upload to backend
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!isAuthenticated) {
      alert('Please log in first to upload business pictures.');
      navigate('/login');
      return;
    }

    setUploading(true);
    setErrorMsg('');
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const res = await api.post('/upload/place-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data?.data?.urls) {
        setUploadedImages((prev) => [...prev, ...res.data.data.urls]);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in first to register your business.');
      navigate('/login');
      return;
    }

    if (!businessName.trim() || !address.trim() || !description.trim()) {
      setErrorMsg('Please fill in Business Name, Address, and Description.');
      return;
    }

    if (!termsAgreed) {
      setErrorMsg('Please accept the Terms & Conditions.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const cover = uploadedImages.length > 0 ? uploadedImages[0] : '/images/places/grand-courtyard.jpg';

    const payload = {
      name: businessName.trim(),
      category,
      subCategory: subCategory.trim() || category,
      description: description.trim(),
      address: address.trim(),
      city: 'Rajkot',
      timings: `${openingTime} – ${closingTime}`,
      openingStatus: 'Open Now',
      phone: contactNumber.trim() || ownerPhone.trim(),
      email: email.trim() || ownerEmail.trim(),
      website: website.trim(),
      priceLevel,
      facilities: selectedAmenities,
      features: selectedAmenities,
      imageUrl: cover,
      coverImage: cover,
      galleryImages: uploadedImages,
      latitude: 22.3039,
      longitude: 70.8022,
    };

    try {
      const res = await api.post('/owner/register', payload);
      const created = res.data?.data;
      setSubmittedPlace(created);

      // Upgrade local user role if needed
      if (user && user.role !== 'owner' && user.role !== 'admin') {
        updateUser({ role: 'owner' });
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMsg(err.response?.data?.message || 'Could not register business. Please try again.');
    } finally {
      setLoading(false);
    }
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
            List your business on Placezy. Upload photos and make your venue instantly discoverable across Rajkot and Gujarat!
          </p>
        </div>

        {/* 3 Step Pill Tracker */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006765] text-white text-xs font-semibold">
            <span>1</span>
            <span>Business Info</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006765] text-white text-xs font-semibold">
            <span>2</span>
            <span>Photos & Details</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006765] text-white text-xs font-semibold">
            <span>3</span>
            <span>Go Live</span>
          </div>
        </div>
      </div>

      {submittedPlace ? (
        <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-2xl shadow-sm space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle size={38} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              ⏳ Application Submitted for Admin Verification
            </span>
            <h3 className="text-2xl font-bold text-[#151C27]">
              {submittedPlace.name} has been submitted!
            </h3>
            <p className="text-xs text-[#555E74] max-w-md mx-auto leading-relaxed mt-1">
              Your venue registration and uploaded photos have been stored in the database. Our Rajkot admin team will review and verify your listing. Once approved by Admin, your venue will automatically go live for public explorers!
            </p>
          </div>

          {/* Place Preview Card */}
          <div className="max-w-md mx-auto bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden p-4 text-left flex gap-4 items-center">
            <img
              src={submittedPlace.coverImage || '/images/places/grand-courtyard.jpg'}
              alt={submittedPlace.name}
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#CBD5E1]"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#006765] uppercase">
                {submittedPlace.category}
              </span>
              <h4 className="text-sm font-bold text-[#151C27] truncate">{submittedPlace.name}</h4>
              <p className="text-[11px] text-[#555E74] truncate flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#006765]" />
                {submittedPlace.address || 'Rajkot, Gujarat'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  Pending Admin Approval
                </span>
                <span className="text-[10px] font-bold text-[#151C27]">
                  {submittedPlace.priceLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="md"
              onClick={() => navigate('/owner/dashboard')}
            >
              Go to Owner Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between">
              <span>{errorMsg}</span>
              <button type="button" onClick={() => setErrorMsg('')}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Section 1: Business Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 1: Business Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Business Name"
                placeholder="e.g., The Heritage Courtyard"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#151C27]">
                  Primary Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-button border border-[#E2E8F0] py-2.5 px-3.5 text-xs text-[#151C27] bg-white outline-none focus:border-[#006765]"
                >
                  <option value="Cafés">Cafés & Bakeries</option>
                  <option value="Restaurants">Restaurants & Dining</option>
                  <option value="Attractions">Attractions & Monuments</option>
                  <option value="Nature & Parks">Nature & Parks</option>
                  <option value="Culture">Heritage & Culture</option>
                  <option value="Shopping">Shopping & Retail</option>
                  <option value="Entertainment">Entertainment & Leisure</option>
                  <option value="Religious Places">Religious Places</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Specialty / Subcategory"
                placeholder="e.g., Artisan Brews & European Pastries"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
              <Input
                label="Website (Optional)"
                placeholder="https://yourcafe.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#151C27]">
                  Business Description <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-[#8E98B0]">{description.length}/500 characters</span>
              </div>
              <textarea
                rows={3}
                placeholder="Tell guests what makes your place special, the vibe, signature items, and atmosphere..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#151C27] focus:outline-none focus:border-[#006765] leading-relaxed resize-none"
                required
              />
            </div>

            <Input
              label="Business Address (Street, Area, Landmark)"
              placeholder="e.g., Near Crystal Mall, Kalawad Road, Rajkot"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input label="City" value={city} disabled />
              <Input label="State" value={state} disabled />
              <Input
                label="Public Phone Number"
                placeholder="+91 98765 43210"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <Input
                label="Business Email"
                type="email"
                placeholder="hello@yourbusiness.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Section 2: Business Details & Timings */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 2: Operating Hours & Price Level
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Opening Time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                icon={<Clock size={15} />}
              />
              <Input
                label="Closing Time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                icon={<Clock size={15} />}
              />
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#151C27]">Price Tier</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { tier: '₹', label: '₹ (Budget Friendly)' },
                  { tier: '₹₹', label: '₹₹ (Moderate)' },
                  { tier: '₹₹₹', label: '₹₹₹ (Fine Experience)' },
                  { tier: 'Free Entry', label: 'Free Entry' },
                ].map(({ tier, label }) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPriceLevel(tier as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      priceLevel === tier
                        ? 'bg-[#006765] text-white border-[#006765] shadow-xs'
                        : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities & Amenities checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#151C27]">Facilities & Amenities</label>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((item) => {
                  const isChecked = selectedAmenities.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAmenity(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                        isChecked
                          ? 'bg-[#006765] text-white border-[#006765] font-semibold'
                          : 'bg-[#F8FAFC] text-[#555E74] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Live Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
              <div>
                <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                  Section 3: Upload Photos (Real File Upload)
                </h3>
                <p className="text-[11px] text-[#555E74] mt-0.5">
                  Uploaded images are permanently stored on the website server and displayed publicly to visitors.
                </p>
              </div>
              <span className="text-xs font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full">
                {uploadedImages.length} uploaded
              </span>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Upload trigger dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] rounded-2xl p-6 text-center cursor-pointer hover:bg-[#F0F3FF]/50 transition-all space-y-2 flex flex-col items-center justify-center min-h-[140px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/50 text-[#006765] flex items-center justify-center">
                  <UploadCloud size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#151C27] block">
                    {uploading ? 'Uploading pictures to server...' : 'Click to Browse & Upload Photos'}
                  </span>
                  <span className="text-[10px] text-[#8E98B0] block mt-0.5">
                    PNG, JPG, WEBP up to 5MB (First image will be cover photo)
                  </span>
                </div>
              </div>

              {/* Uploaded Gallery Grid */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-3 flex flex-wrap gap-2.5 items-center min-h-[140px]">
                {uploadedImages.length === 0 ? (
                  <div className="text-center w-full py-4 text-xs text-[#8E98B0]">
                    <ImageIcon size={24} className="mx-auto mb-1 opacity-40" />
                    <span>No photos uploaded yet. Click the box to upload your storefront or interior pictures.</span>
                  </div>
                ) : (
                  uploadedImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-[#CBD5E1] bg-white">
                      <img
                        src={imgUrl}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.2 rounded">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Owner Verification & Submit */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#151C27] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Section 4: Owner Identity & Agreement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Owner Full Name"
                placeholder="e.g., Rajesh Mehta"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
              <Input
                label="Owner Personal Email"
                type="email"
                placeholder="rajesh@example.com"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                required
              />
              <Input
                label="Owner Direct Phone"
                placeholder="+91 98765 43210"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="merchant-terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 rounded text-[#006765] focus:ring-[#006765]"
                required
              />
              <label htmlFor="merchant-terms" className="text-xs text-[#555E74] leading-relaxed cursor-pointer">
                I confirm that I am the authorized owner or manager of this establishment in Rajkot, Gujarat. All provided commercial information and photos are authentic.
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={loading}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              {loading ? 'Submitting Application for Approval...' : 'Submit Registration for Admin Approval'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
