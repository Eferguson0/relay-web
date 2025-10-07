import React, { forwardRef } from 'react';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ maxWidth = 'lg', padding = 'none', responsive = true, className = '', children, ...props }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg', 
      lg: 'max-w-xl',
      xl: 'max-w-2xl',
      '2xl': 'max-w-3xl',
      '4xl': 'max-w-5xl',
      '7xl': 'max-w-8xl'
    };
    
    const paddingClasses = responsive ? {
      none: '',
      sm: 'py-4 px-4 md:py-6 md:px-6',
      md: 'py-8 px-6 md:py-12 md:px-8',
      lg: 'py-12 px-6 md:py-16 md:px-32 lg:py-24 lg:px-64'
    } : {
      none: '',
      sm: 'py-4 px-4',
      md: 'py-8 px-6',
      lg: 'py-12 px-6'
    };

    return (
      <div
        ref={ref}
        className={`min-h-screen ${paddingClasses[padding]} ${className}`}
        {...props}
      >
        <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
          {children}
        </div>
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
