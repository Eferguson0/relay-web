'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface DraftFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows?: number;
}

const DraftField = forwardRef<HTMLTextAreaElement, DraftFieldProps>(
  ({ label, rows = 4, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label */}
        <label className="block text-sm text-muted-foreground font-light">
          {label}
        </label>
        
        {/* Textarea */}
        <textarea
          ref={ref}
          rows={rows}
          className={`
            w-full px-4 py-3 
            bg-background border border-border rounded-lg 
            resize-none 
            focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-muted
            text-foreground placeholder:text-muted-foreground/50
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

DraftField.displayName = 'DraftField';

export default DraftField;

