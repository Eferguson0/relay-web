import { HTMLAttributes, forwardRef } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ 
    className = '', 
    maxWidth = '7xl', 
    padding = 'md',
    children, 
    ...props 
  }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md', 
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '4xl': 'max-w-4xl',
      '7xl': 'max-w-7xl'
    };
    
    const paddingClasses = {
      none: '',
      sm: 'py-4 px-24',
      md: 'py-6 px-24 sm:px-36 lg:px-48',
      lg: 'py-12 px-24 sm:px-36 lg:px-48'
    };
    
    return (
      <div
        ref={ref}
        className={`min-h-screen bg-gray-50 ${paddingClasses[padding]} ${className}`}
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
