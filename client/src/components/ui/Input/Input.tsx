import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, icon, iconPosition = 'left', rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#151C27] tracking-wide">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3.5 text-[#555E74] pointer-events-none flex items-center">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-button border text-sm text-[#151C27] bg-white placeholder-[#8E98B0]
              transition-colors duration-150 py-2.5 px-3.5
              ${icon && iconPosition === 'left' ? 'pl-10' : ''}
              ${icon && iconPosition === 'right' ? 'pr-10' : ''}
              ${rightElement ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E2E8F0] focus:border-[#006765] focus:ring-1 focus:ring-[#006765]'}
              focus:outline-none
              disabled:bg-[#F8FAFC] disabled:text-[#8E98B0] disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />

          {rightElement ? (
            <div className="absolute right-3.5 flex items-center">
              {rightElement}
            </div>
          ) : icon && iconPosition === 'right' ? (
            <div className="absolute right-3.5 text-[#555E74] flex items-center">
              {icon}
            </div>
          ) : null}
        </div>

        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        {!error && helperText && <span className="text-xs text-[#555E74]">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
