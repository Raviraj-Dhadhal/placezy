import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLACES } from '../../../utils/mockData';
import { PlaceCard } from '../../places/components/PlaceCard';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const UserHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cafés', 'Heritage & Culture', 'Fine Dining', 'Nature'];

  // 1. Recommended for You (first 4 items)
  const recommendedPlaces = MOCK_PLACES.filter((p) => p.featured || p.category === 'Cafés').slice(0, 4);

  // 2. Trending Places in Gujarat (Ahmedabad, Vadodara, Surat, Gandhinagar)
  const trendingPlaces = MOCK_PLACES.filter((p) => p.trending);

  // 3. Hidden Gems in Gujarat (Oasis, Adalaj, Polo Forest)
  const hiddenGems = MOCK_PLACES.filter((p) => p.hiddenGem);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Greeting Section matching Screen 06 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div>
          <span className="text-[11px] font-bold text-[#006765] tracking-widest uppercase">
            INSIDER EDITION • Today's Curated Dispatch
          </span>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27] mt-1">
            Good Morning, Mahek!
          </h1>
          <p className="text-xs text-[#555E74] mt-1.5 max-w-2xl leading-relaxed">
            Tailored to your taste for artisan cafes, heritage architecture, and tranquil courtyards in Rajkot.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-full transition-all font-medium whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#006765] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#555E74] border border-[#E2E8F0] hover:bg-[#CFE7E6]/30 hover:text-[#151C27]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Recommended For You */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006765]"></span>
            <h2 className="text-lg font-bold text-[#151C27]">Recommended For You</h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs text-[#006765] font-semibold flex items-center gap-1 hover:underline"
          >
            <span>View All (8)</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Section 2: Trending Places in Gujarat */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <h2 className="text-lg font-bold text-[#151C27]">Trending Places in Gujarat</h2>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">
              Popular culinary and cultural hotspots buzzing this week across the state
            </p>
          </div>

          <div className="flex items-center gap-1 text-[#555E74]">
            <button className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F0F3FF]">
              &larr;
            </button>
            <button className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F0F3FF]">
              &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      {/* Section 3: Hidden Gems in Gujarat */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h2 className="text-lg font-bold text-[#151C27]">Hidden Gems in Gujarat</h2>
            </div>
            <p className="text-xs text-[#555E74] mt-0.5">
              Lesser-known, highly-rated tranquil retreats and artisan corners
            </p>
          </div>
          <span className="text-[11px] text-[#8E98B0]">Updated 2 days ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hiddenGems.map((gem) => (
            <div
              key={gem.id}
              onClick={() => navigate(`/place/${gem.id}`)}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#006765]/40 hover:shadow-card transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={gem.coverImage}
                    alt={gem.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {gem.subCategory}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3">
                    <span className="bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      ★ {gem.rating} ({gem.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-[#151C27]">{gem.name}</h3>
                  <p className="text-xs text-[#555E74] line-clamp-2 leading-relaxed">
                    {gem.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {gem.facilities.slice(0, 2).map((fac) => (
                      <span
                        key={fac}
                        className="text-[10px] text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded-full font-medium"
                      >
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[#555E74] font-medium">{gem.distance}</span>
                <span className="text-[#006765] font-bold flex items-center gap-1 hover:underline">
                  <span>Explore Place</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
