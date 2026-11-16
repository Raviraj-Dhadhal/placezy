import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../../components/ui/Button';
import { ownerApi } from '../services/ownerService';
import api from '../../../services/api';
import {
  UploadCloud,
  Check,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Star,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import type { Place } from '../../../types';

export const OwnerPhotosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Photos');
  const [listings, setListings] = useState<Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchListings = async () => {
    try {
      const data = await ownerApi.getListings();
      setListings(data || []);
      if (data && data.length > 0 && !selectedPlaceId) {
        const firstId = (data[0] as any)._id || data[0].id || data[0].slug;
        setSelectedPlaceId(firstId);
      }
    } catch (err) {
      console.error('Error fetching listings for photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const currentVenue = listings.find(
    (l) => ((l as any)._id || l.id || l.slug) === selectedPlaceId
  ) || listings[0];

  // Handle image files selection and direct upload to storage
  const handleSelectFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setStatusMsg(null);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('images', file));

      const res = await api.post('/upload/place-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.data?.urls) {
        setPreviewUrls((prev) => [...prev, ...res.data.data.urls]);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setStatusMsg({
        text: err.response?.data?.message || 'Failed to upload photo. Please try again.',
        type: 'error',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Commit uploaded images into the selected listing in database
  const handleSavePhotosToVenue = async () => {
    if (!currentVenue || previewUrls.length === 0) return;
    const vId = (currentVenue as any)._id || currentVenue.id;
    try {
      await ownerApi.addPhotos(vId, previewUrls);
      setStatusMsg({
        text: `Successfully added ${previewUrls.length} photo(s) to "${currentVenue.name}". Public visitors can now see them!`,
        type: 'success',
      });
      setPreviewUrls([]);
      setShowUploadModal(false);
      fetchListings();
    } catch (err: any) {
      console.error('Failed to save photos to venue:', err);
      setStatusMsg({
        text: err.response?.data?.message || 'Could not save photos to listing.',
        type: 'error',
      });
    }
  };

  // Set an image as primary cover
  const handleSetCover = async (venueId: string, imgUrl: string) => {
    try {
      await ownerApi.setCoverPhoto(venueId, imgUrl);
      setStatusMsg({ text: 'Cover photo updated successfully!', type: 'success' });
      fetchListings();
    } catch (err) {
      console.error('Failed to set cover photo:', err);
    }
  };

  // Delete an image from gallery
  const handleDeletePhoto = async (venueId: string, imgUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this photo from your listing?')) return;
    try {
      await ownerApi.deletePhoto(venueId, imgUrl);
      setStatusMsg({ text: 'Photo removed from listing.', type: 'success' });
      fetchListings();
    } catch (err) {
      console.error('Failed to delete photo:', err);
    }
  };

  // Collect all photos from real database venues
  const allPhotos: Array<{
    id: string;
    venueId: string;
    title: string;
    category: string;
    src: string;
    isCover: boolean;
    venueName: string;
    slug?: string;
  }> = [];

  listings.forEach((venue) => {
    const vId = (venue as any)._id || venue.id;
    if (venue.coverImage || venue.imageUrl) {
      allPhotos.push({
        id: `${vId}-cover`,
        venueId: vId,
        title: `${venue.name} Cover Photo`,
        category: 'Cover Photo',
        src: venue.coverImage || venue.imageUrl || '',
        isCover: true,
        venueName: venue.name,
        slug: venue.slug,
      });
    }
    if (venue.galleryImages && Array.isArray(venue.galleryImages)) {
      venue.galleryImages.forEach((img, idx) => {
        // Prevent duplicate if already same as cover
        if (img !== venue.coverImage) {
          allPhotos.push({
            id: `${vId}-gallery-${idx}`,
            venueId: vId,
            title: `${venue.name} Gallery Photo ${idx + 1}`,
            category: 'Interior & Ambience',
            src: img,
            isCover: false,
            venueName: venue.name,
            slug: venue.slug,
          });
        }
      });
    }
  });

  const filteredPhotos = allPhotos.filter((p) => {
    if (selectedPlaceId && p.venueId !== selectedPlaceId) return false;
    if (activeTab === 'Cover Photos') return p.isCover;
    if (activeTab === 'Gallery Photos') return !p.isCover;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Photo Gallery</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Photo Management & Live Uploads
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Upload and manage photos for your listed venues. All uploaded photos are stored permanently in the database and visible to public visitors across Gujarat!
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="md"
            icon={<UploadCloud size={16} />}
            onClick={() => {
              setStatusMsg(null);
              setShowUploadModal(true);
            }}
          >
            Upload New Photos
          </Button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between animate-in fade-in ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Venue Selector Switcher (if multiple venues owned) */}
      {listings.length > 1 && (
        <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#555E74] shrink-0 pl-1">Filter by Venue:</span>
          <button
            onClick={() => setSelectedPlaceId('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedPlaceId === ''
                ? 'bg-[#006765] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#555E74] hover:bg-[#F0F3FF] border border-[#E2E8F0]'
            }`}
          >
            All Venues ({listings.length})
          </button>
          {listings.map((l: any) => {
            const lId = l._id || l.id;
            const isSelected = selectedPlaceId === lId;
            return (
              <button
                key={lId}
                onClick={() => setSelectedPlaceId(lId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#006765] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#555E74] hover:bg-[#F0F3FF] border border-[#E2E8F0]'
                }`}
              >
                {l.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 text-xs">
        {['All Photos', 'Cover Photos', 'Gallery Photos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-[#006765] text-white shadow-xs'
                : 'text-[#555E74] hover:bg-[#F0F3FF]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#006765] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span className="text-xs text-[#555E74] font-medium block">
              Loading venue photos from database...
            </span>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto">
              <ImageIcon size={26} />
            </div>
            <h3 className="text-sm font-bold text-[#151C27]">No photos found</h3>
            <p className="text-xs text-[#555E74] max-w-sm mx-auto">
              Upload high-resolution photos of your venue so travellers and locals in Rajkot can discover your space.
            </p>
            <Button
              size="sm"
              icon={<UploadCloud size={14} />}
              onClick={() => setShowUploadModal(true)}
              className="mt-2"
            >
              Upload Your First Photo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] hover:shadow-md hover:border-[#006765]/40 transition-all flex flex-col justify-between"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Action overlays on hover */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!photo.isCover && (
                      <button
                        onClick={() => handleSetCover(photo.venueId, photo.src)}
                        className="p-1.5 bg-black/75 hover:bg-black text-white rounded-lg text-[10px] font-semibold flex items-center gap-1 shadow-md"
                        title="Make Primary Cover Photo"
                      >
                        <Star size={11} className="text-amber-400" />
                        <span>Set Cover</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePhoto(photo.venueId, photo.src)}
                      className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md"
                      title="Delete photo"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded">
                      {photo.category}
                    </span>
                    {photo.isCover && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Primary Cover
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-[#151C27] truncate">{photo.venueName}</h4>
                  <p className="text-[11px] text-[#555E74] truncate">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal (Stores directly to server storage and updates MongoDB listing) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#151C27]">
                  Upload Photos for Public Display
                </h3>
                <p className="text-[11px] text-[#555E74]">
                  Photos will be stored on the server and immediately visible on your public listing.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewUrls([]);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Target venue picker if multiple */}
            {listings.length > 0 && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#151C27]">Select Target Listing:</label>
                <select
                  value={selectedPlaceId || ((listings[0] as any)._id || listings[0].id)}
                  onChange={(e) => setSelectedPlaceId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-white outline-none focus:border-[#006765]"
                >
                  {listings.map((v: any) => (
                    <option key={v._id || v.id} value={v._id || v.id}>
                      {v.name} ({v.city || 'Rajkot'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleSelectFiles}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              className="hidden"
            />

            {/* Upload Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] rounded-2xl p-6 text-center cursor-pointer hover:bg-[#F0F3FF]/40 transition-all space-y-2 flex flex-col items-center justify-center min-h-[130px]"
            >
              <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center">
                <UploadCloud size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#151C27] block">
                  {uploading ? 'Uploading image files...' : 'Click to Browse & Select Photos'}
                </span>
                <span className="text-[10px] text-[#8E98B0] block mt-0.5">
                  PNG, JPG, WEBP up to 5MB (Multiple selection allowed)
                </span>
              </div>
            </div>

            {/* Preview of newly uploaded files */}
            {previewUrls.length > 0 && (
              <div className="space-y-2 flex-1 overflow-y-auto">
                <span className="text-xs font-semibold text-[#151C27]">
                  Ready to add to listing ({previewUrls.length}):
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[#CBD5E1]">
                      <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPreviewUrls((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100"
                        title="Remove"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F1F5F9]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewUrls([]);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={previewUrls.length === 0}
                onClick={handleSavePhotosToVenue}
              >
                Save & Publish Photos ({previewUrls.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
