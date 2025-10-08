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
        variant="primary"
        size="lg"
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

NewDraftButton.displayName = 'NewDraftButton';

export default NewDraftButton;
