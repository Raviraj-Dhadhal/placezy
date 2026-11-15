import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'white' | 'teal' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'white', // Default to white background matching Figma pills
  size = 'md',
  icon,
  className = '',
}) => {
  const variants = {
    // White background pill matching Figma category/venue taglines
    white: 'bg-white text-[#151C27] border border-[#E2E8F0] shadow-sm',
    teal: 'bg-[#CFE7E6]/50 text-[#006765] border border-[#006765]/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-[#F1F5F9] text-[#555E74] border border-[#E2E8F0]',
    outline: 'bg-transparent text-[#555E74] border border-[#E2E8F0]',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-1 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
