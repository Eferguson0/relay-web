import { ButtonHTMLAttributes, forwardRef } from 'react';
import Button from './Button';

interface NewDraftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const NewDraftButton = forwardRef<HTMLButtonElement, NewDraftButtonProps>(
  ({ children = 'New Draft', className = '', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="lg"
        className={`bg-background backdrop-blur-xl border-border hover:bg-secondary/80 transition-all duration-300 shadow-xl text-primary font-medium ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

NewDraftButton.displayName = 'NewDraftButton';

export default NewDraftButton;
