import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  AlertTriangle,
  HelpCircle,
  FileQuestion
} from 'lucide-react';

export const UserHelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I create a Placezy account?',
      a: 'Click on the Profile icon or Sign Up button in the top navigation, enter your email and password, or continue with Google to start discovering curated places personalized for you.',
    },
    {
      q: 'How do I find places near me?',
      a: 'Ensure location services are enabled, or select your current city (e.g. Rajkot) from the top location bar to discover curated spots within your preferred radius.',
    },
    {
      q: 'How do I save a place to Wishlist?',
      a: 'Tap the heart icon on any venue card or place detail view. You can access all your saved gems anytime from the Wishlist tab in your sidebar.',
    },
    {
      q: 'How do I plan a trip?',
      a: 'Navigate to "Trip Planner" in the sidebar or click "+ Plan New Trip" to customize travel dates, group size, budget tier, and curated stops day by day.',
    },
    {
      q: 'How do I write a review?',
      a: 'Visit any venue details page, scroll down to the Community Reviews section, and click "Write a Review" to share your rating, photos, and insights.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-1 hover:text-[#151C27] font-medium"
        >
          <ArrowLeft size={15} />
          <span>Back to Profile</span>
        </button>
      </div>

      {/* Header matching Screen 19 */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          How can we help?
        </h1>
        <p className="text-xs text-[#555E74] mt-0.5">
          Find quick answers or get direct assistance from the Placezy support team.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <Input
          placeholder="Search for help, accounts, places, trips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={16} />}
          className="border-none bg-[#F8FAFC]"
        />
      </div>

      {/* FAQ Accordion List matching Screen 19 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#151C27] border-b border-[#F1F5F9] pb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E2E8F0] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#F8FAFC] hover:bg-[#F0F3FF] transition-colors"
                >
                  <span className="text-xs font-bold text-[#151C27]">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-[#006765]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#555E74]" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-[#555E74] leading-relaxed border-t border-[#E2E8F0]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Still Need Help 2 Cards matching Screen 19 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
              <MessageCircle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#151C27]">Contact Support</h4>
              <p className="text-[10px] text-[#555E74]">Send us your questions or issues</p>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#151C27]">Report a Problem</h4>
              <p className="text-[10px] text-[#555E74]">Tell us if something isn't working</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
            Report Problem
          </Button>
        </div>
      </div>
    </div>
  );
};
