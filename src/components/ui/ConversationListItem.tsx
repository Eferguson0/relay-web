import { HTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import MessageTypeIcon, { MessageType } from './MessageTypeIcon';

interface ConversationListItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  href: string;
  messageType?: MessageType;
}

const ConversationListItem = forwardRef<HTMLDivElement, ConversationListItemProps>(
  ({ title, lastMessage, time, href, messageType = 'doc', className = '', ...props }, ref) => {
    return (
      <Link href={href}>
        <div
          ref={ref}
          className={`flex items-center justify-between py-2 px-4 border border-transparent rounded-xl hover:bg-muted cursor-pointer transition-all duration-150 ${className}`}
          {...props}
        >
          {/* Message Type Icon */}
          <div className="flex-shrink-0 mr-3">
            <MessageTypeIcon type={messageType} size="lg" />
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

ConversationListItem.displayName = 'ConversationListItem';

export default ConversationListItem;
