import React from 'react';

interface AvatarProps {
  gender?: 'female' | 'male';
  size?: number;
  className?: string;
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  gender = 'female',
  size = 36,
  className = '',
  name,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden shrink-0 border border-[#E2E8F0] bg-[#CFE7E6]/40 flex items-center justify-center relative ${className}`}
      title={name}
    >
      {gender === 'female' ? (
        // Sharp vector illustration for female user (e.g. Mahek, Ananya, Priya)
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="20" cy="20" r="20" fill="#E8F4F4" />
          {/* Hair back */}
          <path
            d="M10 20C10 14 14 9 20 9C26 9 30 14 30 20C30 25 29 29 29 29L11 29C11 29 10 25 10 20Z"
            fill="#006765"
          />
          {/* Face */}
          <ellipse cx="20" cy="18.5" rx="6.5" ry="7.5" fill="#FED7AA" />
          {/* Hair front bangs */}
          <path
            d="M13.5 16C15 13 18 11.5 22 12C25 12.5 26.5 14 26.5 14C26.5 14 24 13 20 13.5C16 14 14 16 13.5 16Z"
            fill="#004D4D"
          />
          {/* Torso */}
          <path
            d="M9 37C9 31.5 13.5 27 19 27H21C26.5 27 31 31.5 31 37V40H9V37Z"
            fill="#006765"
          />
          {/* Collar/Neck */}
          <path d="M17.5 25V27.5C17.5 28.5 18.5 29.5 20 29.5C21.5 29.5 22.5 28.5 22.5 27.5V25H17.5Z" fill="#FDBA74" />
        </svg>
      ) : (
        // Sharp vector illustration for male user (e.g. Bhavik, Raviraj, Gaurav)
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="20" cy="20" r="20" fill="#E2E8F0" />
          {/* Hair */}
          <path
            d="M13 16C13 12 16 9.5 20 9.5C24 9.5 27 12 27 16C27 17 26.5 17.5 26.5 17.5C26.5 17.5 25.5 12.5 20 12.5C14.5 12.5 13.5 17.5 13.5 17.5C13.5 17.5 13 17 13 16Z"
            fill="#151C27"
          />
          {/* Face */}
          <ellipse cx="20" cy="18.5" rx="6.5" ry="7.5" fill="#FDE047" opacity="0.8" />
          {/* Torso */}
          <path
            d="M9 37C9 31.5 13.5 27 19 27H21C26.5 27 31 31.5 31 37V40H9V37Z"
            fill="#151C27"
          />
          {/* Neck */}
          <path d="M17.5 25V27.5C17.5 28.5 18.5 29.5 20 29.5C21.5 29.5 22.5 28.5 22.5 27.5V25H17.5Z" fill="#FACC15" opacity="0.8" />
        </svg>
      )}
    </div>
  );
};
