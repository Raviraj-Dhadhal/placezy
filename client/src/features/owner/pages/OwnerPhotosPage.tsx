import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import {
  UploadCloud,
  Check,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

export const OwnerPhotosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Photos (24)');

  const tabs = [
    'All Photos (24)',
    'Cover Photo (1)',
    'Business Logo (1)',
    'Interior (8)',
    'Exterior (4)',
    'Food (6)',
    'Facilities (4)',
  ];

  const photos = [
    {
      id: 'ph1',
      title: 'Main Entrance & Courtyard',
      category: 'Cover Photo',
      dimensions: '2400 × 1600 • 3.2 MB',
      date: 'Oct 24, 2026',
      src: '/images/places/grand-courtyard.jpg',
      isCover: true,
    },
    {
      id: 'ph2',
      title: 'Official Storefront Logo',
      category: 'Business Logo',
      dimensions: '1200 × 1200 • 850 KB',
      date: 'Oct 15, 2026',
      src: '/images/places/kavita-tea.jpg',
    },
    {
      id: 'ph3',
      title: 'Main Dining & Work Lounge',
      category: 'Interior',
      dimensions: '2048 × 1365 • 2.6 MB',
      date: 'Oct 20, 2026',
      src: '/images/gallery/cafe-hero.jpg',
    },
    {
      id: 'ph4',
      title: 'Signature Brews & Snacks',
      category: 'Food',
      dimensions: '2560 × 1440 • 3.8 MB',
      date: 'Oct 22, 2026',
      src: '/images/gallery/cafe-thumb-1.jpg',
    },
    {
      id: 'ph5',
      title: 'Espresso Bar & Order Counter',
      category: 'Interior',
      dimensions: '1920 × 1080 • 2.1 MB',
      date: 'Oct 18, 2026',
      src: '/images/gallery/cafe-thumb-2.jpg',
    },
    {
      id: 'ph6',
      title: 'Customer Parking & EV Station',
      category: 'Facilities',
      dimensions: '2400 × 1350 • 2.9 MB',
      date: 'Oct 10, 2026',
      src: '/images/gallery/cafe-thumb-3.jpg',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching Screen 05 Module 02 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#555E74]">
            <span>Business Portal</span>
            <span>/</span>
            <span className="font-semibold text-[#151C27]">Photos</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Manage Business Photos
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            Add and manage photos that represent your business across Rajkot listings.
          </p>
        </div>

        <Button size="md" icon={<UploadCloud size={16} />}>
          Upload Photos
        </Button>
      </div>

      {/* Upload Drag & Drop Box with Active Progress Bar matching Screen 05 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
        <div className="border-2 border-dashed border-[#CFE7E6] hover:border-[#006765] rounded-xl p-8 text-center cursor-pointer transition-colors space-y-2 bg-[#F8FAFC]">
          <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto">
            <UploadCloud size={24} />
          </div>
          <span className="text-sm font-bold text-[#151C27] block">
            Drag & drop photos here or <span className="text-[#006765] underline">click to browse</span>
          </span>
          <p className="text-xs text-[#8E98B0]">
            Supported formats: JPG, PNG, WEBP • Max file size: 10 MB per photo
          </p>
        </div>

        {/* Upload Progress Bar Pill */}
        <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006765] animate-pulse"></span>
            <span className="font-semibold text-[#151C27]">
              Uploading "rajkot_cafe_interior_seating.webp"
            </span>
            <span className="text-[#555E74]">• 68% completed (3.4 MB of 5.0 MB)</span>
          </div>
          <span className="text-[#006765] font-bold">Uploading...</span>
        </div>
      </div>

      {/* Photo Categories Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeTab === tab
                ? 'bg-[#006765] text-white border-[#006765]'
                : 'bg-white text-[#555E74] border-[#E2E8F0] hover:bg-[#F0F3FF]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 6-Photo Grid matching Screen 05 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                {item.isCover && (
                  <span className="absolute top-2.5 right-2.5 bg-[#006765] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Current Cover
                  </span>
                )}
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-[#151C27]">{item.title}</h4>
                <p className="text-[10px] text-[#555E74]">Uploaded {item.date}</p>
                <span className="text-[10px] text-[#8E98B0] block">{item.dimensions}</span>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#555E74]">
              <button className="text-[11px] font-semibold text-[#006765] hover:underline">
                Set as Cover
              </button>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:text-[#006765] rounded">
                  <Edit size={14} />
                </button>
                <button className="p-1 hover:text-red-600 rounded">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
