'use client';

import { useState, forwardRef, HTMLAttributes } from 'react';
import Button from './Button';

interface ThreadComposerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  onSubmit?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ThreadComposer = forwardRef<HTMLDivElement, ThreadComposerProps>(
  ({ onSubmit, placeholder = 'Type your message...', disabled = false, className = '', ...props }, ref) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content.trim() || disabled || isSubmitting) return;

      setIsSubmitting(true);
      try {
        await onSubmit?.(content.trim());
        setContent('');
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    return (
      <div
        ref={ref}
        className={`bg-card border border-border rounded-lg p-4 ${className}`}
        {...props}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isSubmitting}
            className="w-full min-h-[80px] px-3 py-2 bg-background border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </p>
            <Button
              type="submit"
              disabled={!content.trim() || disabled || isSubmitting}
              size="sm"
              className="!bg-foreground !text-background hover:!bg-foreground/80"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

ThreadComposer.displayName = 'ThreadComposer';

export default ThreadComposer;
