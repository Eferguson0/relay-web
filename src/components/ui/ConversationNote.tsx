'use client';

import { HTMLAttributes, forwardRef, useState, useRef, useEffect } from 'react';

interface ConversationNoteProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  placeholder?: string;
  defaultValue?: string;
  onContentChange?: (content: string) => void;
  autoFocus?: boolean;
}

const ConversationNote = forwardRef<HTMLDivElement, ConversationNoteProps>(
  ({ 
    title = 'New Message', 
    placeholder = "Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted.", 
    defaultValue = '', 
    onContentChange,
    autoFocus = false,
    className = '', 
    ...props 
  }, ref) => {
    const [content, setContent] = useState(defaultValue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);
      onContentChange?.(newContent);
    };

    // Auto-resize textarea to fit content
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [content]);

    return (
      <div className={`flex flex-col ${className}`} ref={ref} {...props}>
        {/* Header */}
        {title && title !== 'New Message' && (
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
          </div>
        )}

        {/* Editable Text Area - auto-expands with content */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full px-3 py-3 resize-none focus:outline-none text-base leading-relaxed overflow-hidden"
          style={{ 
            fontFamily: 'inherit',
            lineHeight: '1.6',
            minHeight: '400px'
          }}
        />
        
        {/* Bottom spacer for breathing room - actual height for scrolling */}
        <div className="h-32" />
      </div>
    );
  }
);

ConversationNote.displayName = 'ConversationNote';

export default ConversationNote;
