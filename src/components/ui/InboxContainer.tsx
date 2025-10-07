import { HTMLAttributes, forwardRef } from 'react';

interface InboxContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const InboxContainer = forwardRef<HTMLDivElement, InboxContainerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-transparent text-card-foreground rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InboxContainer.displayName = 'InboxContainer';

export default InboxContainer;
