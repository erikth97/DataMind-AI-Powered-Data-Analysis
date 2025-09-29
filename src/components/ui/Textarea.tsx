import React, { forwardRef } from 'react';

// Define TextareaProps with all necessary HTML textarea attributes
export interface TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  
  // Common HTML textarea attributes
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  
  // Allow any other textarea attributes
  [key: string]: any;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    maxLength, 
    showCount = false, 
    className = '', 
    value = '', 
    ...props 
  }, ref) => {
    const baseClasses = [
      'w-full px-3 py-2 rounded-xl border transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
      'resize-none custom-scrollbar',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
    ];

    const stateClasses = error
      ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
      : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500';

    const backgroundClasses = 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';

    const allClasses = [...baseClasses, stateClasses, backgroundClasses, className].join(' ');

    const currentLength = typeof value === 'string' ? value.length : 0;
    const showCounter = showCount && maxLength;

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={allClasses}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${props.id}-error` : 
              helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />
          
          {showCounter && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
              {currentLength}{maxLength && `/${maxLength}`}
            </div>
          )}
        </div>

        {error && (
          <p 
            id={`${props.id}-error`}
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p 
            id={`${props.id}-helper`}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';