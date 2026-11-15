import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Button } from '../../../components/ui/Button';
import {
  Utensils,
  Coffee,
  ShoppingBag,
  Trees,
  Compass,
  Tv,
  Landmark,
  Church,
  Check,
  ArrowRight
} from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const RegisterInterestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'food',
    'cafes',
    'nature',
    'culture'
  ]);

  const categories: CategoryOption[] = [
    {
      id: 'food',
      name: 'Food & Restaurants',
      subtitle: 'Bistros, fine dining & stalls',
      icon: <Utensils size={20} />,
    },
    {
      id: 'cafes',
      name: 'Cafés',
      subtitle: 'Specialty roasters & tea rooms',
      icon: <Coffee size={20} />,
    },
    {
      id: 'shopping',
      name: 'Shopping',
      subtitle: 'Independent boutiques & markets',
      icon: <ShoppingBag size={20} />,
    },
    {
      id: 'nature',
      name: 'Nature & Parks',
      subtitle: 'Urban reserves & waterfronts',
      icon: <Trees size={20} />,
    },
    {
      id: 'travel',
      name: 'Travel & Attractions',
      subtitle: 'Landmarks & scenic viewpoints',
      icon: <Compass size={20} />,
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      subtitle: 'Live music, theatre & cinema',
      icon: <Tv size={20} />,
    },
    {
      id: 'culture',
      name: 'Culture',
      subtitle: 'Galleries, architecture & history',
      icon: <Landmark size={20} />,
    },
    {
      id: 'religious',
      name: 'Religious Places',
      subtitle: 'Heritage sanctuaries & temples',
      icon: <Church size={20} />,
    },
  ];

  const toggleCategory = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleContinue = () => {
    // Navigate to Home screen
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 px-4">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <Logo size={36} />
      </header>

      {/* Main Container matching Screen 02 */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        {/* Brand Icon Header */}
        <div className="w-12 h-12 rounded-xl bg-[#006765] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Logo size={28} showText={false} />
        </div>
        <span className="block text-center text-[11px] font-bold tracking-widest text-[#555E74] uppercase mb-1">
          PLACEZY
        </span>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">
            What are you interested in?
          </h1>
          <p className="text-xs text-[#555E74] mt-1">
            Select your interests to get personalized place recommendations.
          </p>
        </div>

        {/* 2-Column Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => {
            const isSelected = selectedIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`
                  p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between
                  ${
                    isSelected
                      ? 'border-[#006765] bg-[#CFE7E6]/30'
                      : 'border-[#E2E8F0] bg-white hover:border-[#006765]/40 hover:bg-[#CFE7E6]/10'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-[#006765] text-white' : 'bg-[#F1F5F9] text-[#555E74]'}
                    `}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151C27] leading-tight">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-[#555E74] line-clamp-1 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Checkmark indicator */}
                <div
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center border transition-all
                    ${
                      isSelected
                        ? 'bg-[#006765] border-[#006765] text-white'
                        : 'border-[#CBD5E1] bg-white'
                    }
                  `}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <p className="text-center text-[11px] text-[#555E74] mb-5">
          ⓘ You can change these preferences anytime.
        </p>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          fullWidth
          size="lg"
          icon={<ArrowRight size={16} />}
          iconPosition="right"
        >
          Continue
        </Button>
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
