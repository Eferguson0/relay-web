import { HTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

interface ConversationNoteProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  href: string;
}

const ConversationNote = forwardRef<HTMLDivElement, ConversationNoteProps>(
  ({ title, lastMessage, time, href, className = '', ...props }, ref) => {
    return (
      <Link href={href}>
        <div
          ref={ref}
          className={`flex items-center justify-between py-2 px-4 border border-transparent rounded-full hover:bg-blur-md hover:border-secondary/50 hover:shadow-md cursor-pointer transition-all duration-150 ${className}`}
          {...props}
        >
          {/* Document Icon */}
          <div className="flex-shrink-0 mr-3">
            <svg 
              className="w-5 h-5 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-secondary-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{lastMessage}</p>
          </div>
          <div className="text-xs text-muted-foreground">{time}</div>
        </div>
      </Link>
    );
  }
);

ConversationNote.displayName = 'ConversationNote';

export default ConversationNote;
