import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { adminApi } from '../services/adminService';
import type { Place } from '../../../types';
import api from '../../../services/api';
import {
  Building2,
  Search,
  CheckCircle,
  XCircle,
  Plus,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  X,
  UploadCloud,
  Loader2,
  Tag,
  DollarSign
} from 'lucide-react';

export const AdminBusinessesPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Place[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Add Business Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Restaurants');
  const [subCategory, setSubCategory] = useState('Fine Dining');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Rajkot');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [openingTime, setOpeningTime] = useState('10:00 AM');
  const [closingTime, setClosingTime] = useState('11:00 PM');
  const [priceLevel, setPriceLevel] = useState<'₹' | '₹₹' | '₹₹₹' | 'Free Entry'>('₹₹');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVerified, setIsVerified] = useState(true);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const fetchBusinesses = async () => {
    try {
      const data = await adminApi.getBusinesses();
      setBusinesses(data || []);
      if (data && data.length > 0 && !selectedBusiness) {
        setSelectedBusiness(data[0]);
      }
    } catch (err) {
      console.error('Failed to load businesses from database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleOpenAddModal = () => {
    setName('');
    setCategory('Restaurants');
    setSubCategory('Fine Dining');
    setDescription('');
    setAddress('');
    setCity('Rajkot');
    setPhone('');
    setEmail('');
    setOpeningTime('10:00 AM');
    setClosingTime('11:00 PM');
    setPriceLevel('₹₹');
    setUploadedImages([]);
    setIsVerified(true);
    setModalError('');
    setModalSuccess('');
    setShowAddModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setModalError('');

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
      setModalError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');

    if (!name.trim() || !address.trim() || !description.trim()) {
      setModalError('Please fill in Business Name, Address, and Description.');
      return;
    }

    setModalSubmitting(true);
    try {
      const cover = uploadedImages.length > 0 ? uploadedImages[0] : '/images/places/grand-courtyard.jpg';
      const payload = {
        name: name.trim(),
        category,
        subCategory: subCategory.trim() || category,
        description: description.trim(),
        address: address.trim(),
        city: city.trim() || 'Rajkot',
        timings: `${openingTime} – ${closingTime}`,
        openingStatus: 'Open Now',
        phone: phone.trim(),
        email: email.trim(),
        priceLevel,
        isVerified,
        status: isVerified ? 'active' : 'pending',
        imageUrl: cover,
        coverImage: cover,
        galleryImages: uploadedImages.length > 0 ? uploadedImages : [cover],
        facilities: ['Air Conditioned', 'Card Payments', 'Pure Veg'],
        features: ['Air Conditioned', 'Card Payments', 'Pure Veg'],
      };

      await adminApi.createBusiness(payload);
      setModalSuccess('Business registered successfully in database!');
      setTimeout(() => {
        setShowAddModal(false);
        fetchBusinesses();
      }, 700);
    } catch (err: any) {
      setModalError(err.response?.data?.message || err.message || 'Failed to register business');
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleToggleVerify = async (business: Place) => {
    try {
      const id = business.id || (business as any)._id;
      const updated = await adminApi.verifyBusiness(id, !business.isVerified);
      setBusinesses((prev) =>
        prev.map((b) => ((b.id || (b as any)._id) === id ? updated : b))
      );
      if (selectedBusiness && ((selectedBusiness.id || (selectedBusiness as any)._id) === id)) {
        setSelectedBusiness(updated);
      }
    } catch (err) {
      alert('Failed to update business verification status');
    }
  };

  const activeCount = businesses.filter((b) => b.isVerified || b.status === 'active').length;
  const pendingCount = businesses.filter((b) => !b.isVerified || b.status === 'pending').length;

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.city && b.city.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (statusFilter === 'Active') return b.isVerified || b.status === 'active';
    if (statusFilter === 'Pending') return !b.isVerified || b.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header matching Screen 03 Module 03 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Businesses
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Review, approve, and manage registered businesses and merchants across Gujarat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" icon={<Plus size={14} />} onClick={handleOpenAddModal}>
            Add New Business
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{businesses.length}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">↑ 6.8% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Businesses</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{activeCount}</span>
          <span className="text-[10px] text-[#006765] font-semibold">{businesses.length > 0 ? Math.round((activeCount / businesses.length) * 100) : 0}% verified & live</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Pending Approvals</span>
          <span className="text-2xl font-bold font-serif text-amber-600 block mt-1">{pendingCount}</span>
          <span className="text-[10px] text-amber-700 font-semibold">Urgent KYC reviews</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Suspended</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">0</span>
          <span className="text-[10px] text-[#555E74]">Under compliance review</span>
        </div>
      </div>

      {/* Main Grid: Data Table Left, Business Profile Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search business or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search size={14} />}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {[
                { key: 'All', label: `All (${businesses.length})` },
                { key: 'Active', label: `Active (${activeCount})` },
                { key: 'Pending', label: `Pending (${pendingCount})` },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setStatusFilter(t.key)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === t.key ? 'bg-[#006765] text-white' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-8 text-center text-xs text-[#555E74]">
                Loading businesses from MongoDB...
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#555E74]">
                No businesses match your filter.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2.5 pl-2">Business Name</th>
                    <th className="pb-2.5">Category</th>
                    <th className="pb-2.5">Location</th>
                    <th className="pb-2.5">Rating</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredBusinesses.map((b) => (
                    <tr
                      key={b.id || (b as any)._id}
                      onClick={() => setSelectedBusiness(b)}
                      className={`hover:bg-[#F0F3FF] cursor-pointer transition-colors ${
                        (selectedBusiness?.id || (selectedBusiness as any)?._id) === (b.id || (b as any)._id)
                          ? 'bg-[#CFE7E6]/20'
                          : ''
                      }`}
                    >
                      <td className="py-3 pl-2 font-bold text-[#151C27]">{b.name}</td>
                      <td className="py-3 text-[#555E74]">{b.category}</td>
                      <td className="py-3 text-[#555E74]">{b.city || 'Rajkot'}</td>
                      <td className="py-3 font-semibold text-[#151C27]">★ {b.rating || '5.0'}</td>
                      <td className="py-3 pr-2 text-right">
                        {b.isVerified || b.status === 'active' ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Business Profile Slide-over Drawer matching Screen 03 */}
        {selectedBusiness && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                Business Profile
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedBusiness.isVerified || selectedBusiness.status === 'active'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-amber-700 bg-amber-50'
              }`}>
                {selectedBusiness.isVerified || selectedBusiness.status === 'active' ? 'Active' : 'Pending'}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#151C27]">{selectedBusiness.name}</h3>
              <span className="text-[10px] text-[#555E74] block mt-0.5">
                {selectedBusiness.category} • {selectedBusiness.subCategory || 'Venue'}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">★ {selectedBusiness.rating || '5.0'}</span>
                <span className="text-[9px] text-[#555E74]">{selectedBusiness.reviewsCount || 0} reviews</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">
                  {((selectedBusiness.reviewsCount || 1) * 35 + 240).toLocaleString()}
                </span>
                <span className="text-[9px] text-[#555E74]">Total Views</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-sm font-bold text-[#151C27] block">
                  {Math.round(((selectedBusiness.reviewsCount || 1) * 5) + 12)}
                </span>
                <span className="text-[9px] text-[#555E74]">Wishlist Saves</span>
              </div>
            </div>

            {/* Merchant Details */}
            <div className="space-y-2 text-xs text-[#555E74] pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <span className="font-bold text-[#151C27] max-w-[200px] truncate text-right">
                  {selectedBusiness.address || selectedBusiness.city}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Timings:</span>
                <span className="font-bold text-[#151C27]">{selectedBusiness.timings || '10:00 AM - 10:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verification:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck size={13} />
                  <span>{selectedBusiness.isVerified ? 'KYC & Placezy Verified' : 'Pending Verification'}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-xs">
              <Button
                size="sm"
                onClick={() => handleToggleVerify(selectedBusiness)}
              >
                {selectedBusiness.isVerified ? 'Revoke Verify' : 'Approve & Verify'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`/place/${selectedBusiness.slug || selectedBusiness.id || (selectedBusiness as any)._id}`, '_blank')}
              >
                View Public
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Business Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center border border-[#006765]/20">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#151C27]">Add New Business</h3>
                  <p className="text-xs text-[#555E74]">Register a new venue or business listing directly into MongoDB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#555E74] hover:bg-[#F1F5F9] hover:text-[#151C27] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateBusiness} className="p-6 space-y-4 overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                  <XCircle size={14} className="shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {modalSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle size={14} className="shrink-0 text-emerald-600" />
                  <span>{modalSuccess}</span>
                </div>
              )}

              {/* Business Name */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Royal Heritage Dining"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<Building2 size={16} />}
                  required
                />
              </div>

              {/* Category & SubCategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#151C27] focus:outline-none focus:border-[#006765]"
                  >
                    <option value="Restaurants">Restaurants</option>
                    <option value="Cafés">Cafés</option>
                    <option value="Culture">Culture</option>
                    <option value="Attractions">Attractions</option>
                    <option value="Nature & Parks">Nature & Parks</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Sub-Category / Cuisine
                  </label>
                  <Input
                    placeholder="e.g. Regional Dining, Specialty Coffee"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    icon={<Tag size={16} />}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe venue highlights, signature items, and atmosphere..."
                  className="w-full text-xs p-3 rounded-xl border border-[#E2E8F0] bg-white text-[#151C27] focus:outline-none focus:border-[#006765] resize-none"
                  required
                />
              </div>

              {/* Address & City */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Full Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Near Race Course Ring Road, Rajkot"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    icon={<MapPin size={16} />}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    City
                  </label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Rajkot"
                  />
                </div>
              </div>

              {/* Contact Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Contact Phone
                  </label>
                  <Input
                    placeholder="+91 98251 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={<Phone size={16} />}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    placeholder="venue@placezy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={16} />}
                  />
                </div>
              </div>

              {/* Timings & Price Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Opening Time
                  </label>
                  <Input
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    placeholder="10:00 AM"
                    icon={<Clock size={16} />}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Closing Time
                  </label>
                  <Input
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    placeholder="11:00 PM"
                    icon={<Clock size={16} />}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Price Level
                  </label>
                  <select
                    value={priceLevel}
                    onChange={(e: any) => setPriceLevel(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#151C27] focus:outline-none focus:border-[#006765]"
                  >
                    <option value="₹">₹ (Budget-friendly)</option>
                    <option value="₹₹">₹₹ (Moderate)</option>
                    <option value="₹₹₹">₹₹₹ (Premium / Fine Dining)</option>
                    <option value="Free Entry">Free Entry</option>
                  </select>
                </div>
              </div>

              {/* Photos Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Venue Photos (Optional)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  multiple
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] bg-[#F8FAFC] rounded-xl p-4 text-center cursor-pointer transition-colors space-y-1"
                >
                  <UploadCloud size={20} className="mx-auto text-[#006765]" />
                  <p className="text-xs font-semibold text-[#151C27]">
                    {uploading ? 'Uploading to server...' : 'Click to Browse & Upload Photos'}
                  </p>
                  <p className="text-[10px] text-[#8E98B0]">PNG, JPG up to 5MB (First image will be cover)</p>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {uploadedImages.map((url, idx) => (
                      <div key={idx} className="relative group w-14 h-14 rounded-lg overflow-hidden border border-[#CBD5E1]">
                        <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Instant Verification Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="adminVerifyCheck"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#006765] focus:ring-[#006765]"
                />
                <label htmlFor="adminVerifyCheck" className="text-xs text-[#151C27] font-medium cursor-pointer">
                  Approve & mark as Verified immediately (published live to public view)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={modalSubmitting || uploading}
                >
                  {modalSubmitting ? 'Saving to Database...' : 'Save & Register Business'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
