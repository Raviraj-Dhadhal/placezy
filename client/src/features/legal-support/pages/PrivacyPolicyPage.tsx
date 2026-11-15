import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Shield, Lock, MapPin, Database, ArrowRight } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching Screen 20 */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-2">
        <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-2.5 py-0.5 rounded-full border border-[#006765]/20">
          OFFICIAL POLICY
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#555E74]">
          Learn how Placezy collects, uses, and protects your information.
        </p>
        <div className="flex items-center gap-3 text-[11px] text-[#555E74] pt-1">
          <span>Last Updated: September 2026</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#006765] font-semibold">
            <Shield size={13} />
            <span>Privacy & Security Verified</span>
          </span>
        </div>
      </div>

      {/* Structured Policy Sections matching Screen 20 */}
      <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-8 text-xs leading-relaxed text-[#555E74]">
        {/* 01 Information We Collect */}
        <div className="space-y-2.5">
          <h2 className="text-sm font-bold text-[#151C27]">01 Information We Collect</h2>
          <p>
            We collect essential operational information necessary to customize local recommendations, verify authentic reviews, and ensure seamless account synchronization.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-medium text-[#151C27]">
              • Account Information
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-medium text-[#151C27]">
              • Location Information
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-medium text-[#151C27]">
              • Preferences & Reviews
            </div>
            <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-medium text-[#151C27]">
              • Usage Information
            </div>
          </div>
        </div>

        {/* 02 How We Use Your Information */}
        <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-sm font-bold text-[#151C27]">02 How We Use Your Information</h2>
          <p>
            Your data powers your personalized discovery feed, calculating relevant venue distances and refining citywide curation models.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
              <span className="font-bold text-[#151C27] block">Personalized Recommendations</span>
              <p className="text-[11px] text-[#555E74]">Tailored to your taste and curated local spots.</p>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
              <span className="font-bold text-[#151C27] block">Nearby Discoveries</span>
              <p className="text-[11px] text-[#555E74]">Real-time walking radius & transit-aware suggestions.</p>
            </div>
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
              <span className="font-bold text-[#151C27] block">Better User Experience</span>
              <p className="text-[11px] text-[#555E74]">Optimized app performance and seamless browsing.</p>
            </div>
          </div>
        </div>

        {/* 03 Location Information */}
        <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-sm font-bold text-[#151C27]">03 Location Information</h2>
          <p>
            Placezy may use location information to show nearby places and relevant recommendations strictly while the application is actively in use. This data is utilized to calculate walking distances, display neighborhood transit context, and present curated spots closest to you. We never track ambient movement in the background or sell location streams to third parties.
          </p>
        </div>

        {/* 04 Your Choices */}
        <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-sm font-bold text-[#151C27]">04 Your Choices</h2>
          <p>You have full autonomy over your personal profile and data history. Manage your experience directly via these controls:</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button onClick={() => navigate('/settings')} className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-semibold text-[#006765] hover:bg-[#F0F3FF]">
              Manage Profile
            </button>
            <button onClick={() => navigate('/register/interests')} className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-semibold text-[#006765] hover:bg-[#F0F3FF]">
              Update Preferences
            </button>
            <button onClick={() => navigate('/settings')} className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-semibold text-[#006765] hover:bg-[#F0F3FF]">
              Manage Location
            </button>
          </div>
        </div>

        {/* 05 Keeping Your Information Safe */}
        <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-sm font-bold text-[#151C27]">05 Keeping Your Information Safe</h2>
          <p>
            All personal and account data is safeguarded with end-to-end TLS/SSL transport protocols and stored using robust AES-256 encryption. We enforce restricted role-based internal access permissions and continuous monitoring to prevent unauthorized access, maintaining enterprise-grade protection for every user.
          </p>
        </div>

        {/* 06 Contact Us Banner */}
        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-[#151C27]">Questions about your privacy?</h4>
            <p className="text-[11px] text-[#555E74]">Contact the Placezy Privacy & Data Governance Team.</p>
          </div>
          <Button size="sm" onClick={() => navigate('/contact')}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
