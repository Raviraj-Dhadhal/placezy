import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

export const PublicFaqPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: '01',
      q: 'What is Placezy?',
      a: 'Placezy is an intelligent urban discovery platform that helps you find curated local spots, hidden gems, and personalized city recommendations across Gujarat.',
    },
    {
      id: '02',
      q: 'How do I create an account?',
      a: 'You can create an account using your email address and mobile number. Click the Sign In / Register button in the top navigation to begin.',
    },
    {
      id: '03',
      q: 'How do I find nearby places?',
      a: 'Enable your device location or choose your neighborhood from the top location selector. Placezy calculates exact distances and walking radiuses in real time.',
    },
    {
      id: '04',
      q: 'How do I save a place?',
      a: 'Click the heart icon on any venue card to instantly store it in your Wishlist for easy access when exploring or planning trips.',
    },
    {
      id: '05',
      q: 'How do I write a review?',
      a: 'Navigate to any venue page, scroll to the Reviews section, and click "Write a Review" to rate food, ambience, and service with optional photos.',
    },
    {
      id: '06',
      q: 'How do I register my business?',
      a: 'Venue owners can click "Register Your Business" in the footer or navigation to access the merchant onboarding wizard and claim their verified listing.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching Screen 22 */}
      <div className="text-center space-y-2 py-4">
        <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-3 py-1 rounded-full border border-[#006765]/20">
          HELP & SUPPORT
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#555E74] max-w-md mx-auto">
          Quick answers to common questions about urban curation, account tools, and city discovery.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
            className="border-none bg-[#F8FAFC]"
          />
        </div>
        <Button size="md">Search</Button>
      </div>

      {/* Accordion Table matching Screen 22 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-[#E2E8F0] shadow-sm overflow-hidden">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.id} className="transition-colors">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#006765] bg-[#CFE7E6]/40 px-2 py-0.5 rounded">
                    {faq.id}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#151C27]">
                    {faq.q}
                  </span>
                </div>
                {isOpen ? (
                  <span className="text-[#006765] font-bold text-lg leading-none">-</span>
                ) : (
                  <span className="text-[#555E74] font-bold text-lg leading-none">+</span>
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs text-[#555E74] leading-relaxed pl-14">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions card matching Screen 22 */}
      <div className="p-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
            <MessageCircle size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151C27]">Still have questions?</h4>
            <p className="text-[11px] text-[#555E74]">Our local support team is ready to help 24/7.</p>
          </div>
        </div>
        <Button size="sm" onClick={() => navigate('/contact')}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};
