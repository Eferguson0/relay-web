import { HTMLAttributes, forwardRef } from 'react';
import { Badge } from '../ui';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  };
  actions?: React.ReactNode;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className = '', title, subtitle, badge, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white shadow rounded-lg mb-6 ${className}`}
        {...props}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {badge && (
                <Badge variant={badge.variant}>{badge.text}</Badge>
              )}
              {actions}
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
);

Header.displayName = 'Header';

export default Header;
