import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../../components/shared/Logo';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto transition to Home page after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-between py-12 px-4 relative overflow-hidden select-none">
      {/* Subtle concentric radial ripples matching Screen 05 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#006765]/5 absolute animate-ping opacity-25"></div>
        <div className="w-[450px] h-[450px] rounded-full border border-[#006765]/10 absolute"></div>
        <div className="w-[300px] h-[300px] rounded-full border border-[#006765]/15 absolute"></div>
      </div>

      <div className="w-full"></div>

      {/* Center Branding Block */}
      <div className="flex flex-col items-center justify-center text-center z-10 space-y-4">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#006765] shadow-lg shadow-[#006765]/20 flex items-center justify-center transform transition-transform hover:scale-105">
          <Logo size={40} showText={false} />
        </div>

        {/* Wordmark */}
        <h1 className="text-xl font-bold tracking-widest text-[#151C27] uppercase">
          PLACEZY
        </h1>

        {/* Subtitle Tagline */}
        <p className="text-xs text-[#555E74] tracking-wide max-w-xs">
          Discover places that match you.
        </p>

        {/* Loading Indicators (3 animated dots) */}
        <div className="flex items-center gap-1.5 pt-4">
          <span className="w-2 h-2 rounded-full bg-[#006765] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#006765] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#006765] animate-bounce"></span>
        </div>
      </div>

      {/* Bottom Sub-tagline matching Screen 05 */}
      <div className="z-10 text-center">
        <span className="text-[11px] text-[#8E98B0] tracking-wider">
          Aura Places • Curated for your rhythm
        </span>
      </div>
    </div>
  );
};
