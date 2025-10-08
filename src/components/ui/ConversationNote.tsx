'use client';

import { HTMLAttributes, forwardRef, useState } from 'react';

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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);
      onContentChange?.(newContent);
    };

    return (
      <div className={`flex flex-col ${className}`} ref={ref} {...props}>
        {/* Header */}
        {title && title !== 'New Message' && (
          <div className="flex items-center justify-between mb-3 flex-none">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
          </div>
        )}

        {/* Editable Text Area */}
        <textarea
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full flex-1 px-3 py-3 resize-none focus:outline-none text-base leading-relaxed min-h-0"
          style={{ 
            fontFamily: 'inherit',
            lineHeight: '1.6'
          }}
        />
      </div>
    );
  }
);

ConversationNote.displayName = 'ConversationNote';

export default ConversationNote;
