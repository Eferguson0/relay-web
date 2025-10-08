import { HTMLAttributes, forwardRef } from 'react';

interface ThreadMessageProps extends HTMLAttributes<HTMLDivElement> {
  author: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
  avatar?: string;
}

const ThreadMessage = forwardRef<HTMLDivElement, ThreadMessageProps>(
  ({ author, content, timestamp, isOwn = false, avatar, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex gap-3 mb-6 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${className}`}
        {...props}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isOwn ? 'ml-3' : 'mr-3'}`}>
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 max-w-[70%] ${isOwn ? 'flex flex-col items-end' : ''}`}>
          {/* Author and timestamp */}
          <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-medium text-foreground">{author}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(timestamp).toLocaleString()}
            </span>
          </div>

          {/* Message bubble */}
          <div
            className={`px-4 py-3 rounded-2xl ${
              isOwn
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-muted-foreground rounded-bl-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    );
  }
);

ThreadMessage.displayName = 'ThreadMessage';

export default ThreadMessage;
