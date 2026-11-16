import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';
import { Footer } from '../../../components/shared/Footer';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
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
  ArrowRight,
  Sparkles
} from 'lucide-react';
import api from '../../../services/api';

interface CategoryOption {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const RegisterInterestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  // By default, NOTHING is selected as requested
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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
      name: 'Tourist Attractions',
      subtitle: 'Landmarks, plazas & viewpoints',
      icon: <Compass size={20} />,
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      subtitle: 'Live venues, cinemas & gaming',
      icon: <Tv size={20} />,
    },
    {
      id: 'culture',
      name: 'Culture & Heritage',
      subtitle: 'Museums, galleries & architecture',
      icon: <Landmark size={20} />,
    },
    {
      id: 'religious',
      name: 'Spiritual & Religious',
      subtitle: 'Historic temples, ashrams & shrines',
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

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      if (selectedIds.length > 0) {
        const selectedNames = categories
          .filter((c) => selectedIds.includes(c.id))
          .map((c) => c.name);
        await api.put('/auth/interests', { interests: selectedNames });
        updateUser({ interests: selectedNames });
      }
    } catch (err) {
      console.warn('Could not save interests to backend, continuing...');
    } finally {
      setIsSaving(false);
      navigate('/splash');
    }
  };

  const handleSkip = () => {
    navigate('/splash');
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
        <div className="w-12 h-12 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center mx-auto mb-3 border border-[#006765]/20">
          <Sparkles size={22} />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-[#006765] uppercase tracking-wider block mb-1">
            Personalization Step
          </span>
          <h1 className="text-2xl font-bold font-serif text-[#151C27]">
            What do you love exploring?
          </h1>
          <p className="text-xs text-[#555E74] mt-1 max-w-sm mx-auto">
            Select your favorite interests to tailor your city discovery recommendations, or tap skip.
          </p>
        </div>

        {/* 8 Category Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => {
            const isSelected = selectedIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`
                  p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all
                  ${
                    isSelected
                      ? 'border-[#006765] bg-[#CFE7E6]/30 shadow-sm'
                      : 'border-[#E2E8F0] hover:border-[#006765]/30 hover:bg-[#F8FAFC]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                      ${
                        isSelected
                          ? 'bg-[#006765] text-white'
                          : 'bg-slate-100 text-[#555E74]'
                      }
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

        <p className="text-center text-[11px] text-[#555E74] mb-5">
          ⓘ You can customize or change these preferences anytime in Settings.
        </p>

        {/* Actions: Continue or Skip */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            onClick={handleSkip}
            variant="outline"
            fullWidth
            size="lg"
            className="order-2 sm:order-1 text-xs"
          >
            Skip for Now
          </Button>

          <Button
            onClick={handleSaveAndContinue}
            fullWidth
            size="lg"
            disabled={isSaving}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="order-1 sm:order-2"
          >
            {selectedIds.length > 0
              ? `Continue with ${selectedIds.length} Selected`
              : 'Continue'}
          </Button>
        </div>
      </div>
  );
};
