import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching Screen 21 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-2">
        <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-0.5 rounded-full border border-[#006765]/20">
          LEGAL TERMS
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Terms of Service
        </h1>
        <p className="text-xs text-[#555E74]">
          Please review the terms that apply when using Placezy.
        </p>
        <div className="flex items-center gap-3 text-[11px] text-[#555E74] pt-1">
          <span>Last Updated: September 2026</span>
          <span>•</span>
          <span>Terms & Conditions • Global Coverage</span>
        </div>
      </div>

      {/* Structured Terms List matching Screen 21 */}
      <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6 text-xs leading-relaxed text-[#555E74]">
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-[#151C27]">01 Acceptance of Terms</h3>
          <p>
            By accessing, browsing, or utilizing the Placezy platform, mobile applications, APIs, or location services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not consent to these terms, you must discontinue platform usage immediately.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">02 Using Placezy</h3>
          <p>
            Placezy grants you a personal, non-exclusive, non-transferable license to access our platform for urban discovery, itinerary formulation, venue navigation, and local spot evaluation in accordance with these standards.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">03 User Accounts</h3>
          <p>
            Certain features require registering a curated profile. You must maintain strict governance over your credentials, provide accurate information, and not misuse another user's account.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">04 Business Listings</h3>
          <p>
            Venue managers who claim or submit locations must supply verifiable, precise operating details, hours, geographic coordinates, and amenities. Keeping listings updated preserves platform discovery integrity and avoids spatial routing anomalies.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">05 Reviews & User Content</h3>
          <p>
            You retain ownership of the photos, itineraries, and reviews you author. However, by posting on Placezy, you grant us a worldwide, royalty-free license to index, display, and analyze your content to benefit the explorer community. All contributions must reflect genuine, respectful, first-hand experiences.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">06 Acceptable Use</h3>
          <p>
            We strictly enforce community standards. Prohibited activities across Placezy nodes include no misleading information, no abusive content, no spam, and no unauthorized data extraction.
          </p>
        </div>

        <div className="space-y-1.5 pt-4 border-t border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#151C27]">07 Account Suspension</h3>
          <p>
            We reserve the prerogative to suspend, terminate, or restrict user access to Placezy services immediately, without prior notice, upon detection of system tampering, fraudulent ratings, scrapers, or direct breaches of our terms.
          </p>
        </div>

        {/* Question banner */}
        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between gap-4 pt-4">
          <div>
            <h4 className="text-xs font-bold text-[#151C27]">Questions about these terms?</h4>
            <p className="text-[11px] text-[#555E74]">Contact the Placezy Legal & Compliance Office.</p>
          </div>
          <Button size="sm" onClick={() => navigate('/contact')}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
