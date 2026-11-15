import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-button focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    // Primary: #006765 background with #FFFFFF text
    primary: 'bg-[#006765] hover:bg-[#005553] text-[#FFFFFF] focus:ring-[#006765]',
    secondary: 'bg-[#CFE7E6]/40 hover:bg-[#CFE7E6]/70 text-[#006765] focus:ring-[#006765]',
    outline: 'border border-[#E2E8F0] hover:bg-[#F0F3FF] text-[#151C27] focus:ring-[#006765]',
    ghost: 'hover:bg-[#F0F3FF] text-[#555E74] hover:text-[#151C27] focus:ring-[#006765]',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
