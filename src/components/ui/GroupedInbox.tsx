import { HTMLAttributes, forwardRef } from 'react';
import ConversationListItem from './ConversationListItem';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  href: string;
  date: string;
}

interface GroupedInboxProps extends HTMLAttributes<HTMLDivElement> {
  conversations: Conversation[];
}

const GroupedInbox = forwardRef<HTMLDivElement, GroupedInboxProps>(
  ({ conversations, className = '', ...props }, ref) => {
    // Group conversations by date
    const groupedConversations = conversations.reduce((groups, conversation) => {
      const date = conversation.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(conversation);
      return groups;
    }, {} as Record<string, Conversation[]>);

    // Sort dates in descending order (most recent first)
    const sortedDates = Object.keys(groupedConversations).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });

    return (
      <div ref={ref} className={`bg-transparent text-card-foreground rounded-lg ${className}`} {...props}>
        {sortedDates.map((date) => (
          <div key={date} className="mb-12">
            {/* Date Header */}
            <div className="sticky top-0 bg-transparent backdrop-blur z-10">
              <h2 className="text-sm font-bold text-muted-foreground mb-3">
                {date}
              </h2>
            </div>
            
            {/* Conversation Items with spacing */}
            <div>
              {groupedConversations[date].map((conversation, index) => (
                <div key={conversation.id} className={index > 0 ? "mt-2" : ""}>
                  <ConversationListItem
                    id={conversation.id}
                    title={conversation.title}
                    lastMessage={conversation.lastMessage}
                    time={conversation.time}
                    href={conversation.href}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

GroupedInbox.displayName = 'GroupedInbox';

export default GroupedInbox;
