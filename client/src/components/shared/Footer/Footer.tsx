import React from 'react';
import { NavLink } from 'react-router-dom';

interface FooterProps {
  showFullNav?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ showFullNav = true, className = '' }) => {
  return (
    <footer className={`bg-white border-t border-[#E2E8F0] py-4 px-6 text-xs text-[#555E74] flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
      <span>© 2026 Placezy. All rights reserved.</span>
      {showFullNav && (
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <NavLink to="/privacy" className="hover:text-[#151C27] transition-colors">Privacy Policy</NavLink>
          <span>|</span>
          <NavLink to="/terms" className="hover:text-[#151C27] transition-colors">Terms of Service</NavLink>
          <span>|</span>
          <NavLink to="/owner/register" className="hover:text-[#151C27] transition-colors">Register Your Business</NavLink>
          <span>|</span>
          <NavLink to="/faq" className="hover:text-[#151C27] transition-colors">FAQs</NavLink>
          <span>|</span>
          <NavLink to="/contact" className="hover:text-[#151C27] transition-colors">Contact Us</NavLink>
        </div>
      )}
    </footer>
  );
};
