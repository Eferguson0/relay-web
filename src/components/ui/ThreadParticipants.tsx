import { HTMLAttributes, forwardRef } from 'react';
import Badge from './Badge';

interface ThreadParticipantsProps extends HTMLAttributes<HTMLDivElement> {
  participants: string[];
  maxVisible?: number;
}

const ThreadParticipants = forwardRef<HTMLDivElement, ThreadParticipantsProps>(
  ({ participants, maxVisible = 5, className = '', ...props }, ref) => {
    const visibleParticipants = participants.slice(0, maxVisible);
    const hiddenCount = participants.length - maxVisible;

    return (
      <div
        ref={ref}
        className={`space-y-3 ${className}`}
        {...props}
      >
        <h3 className="text-sm font-medium text-foreground">Participants</h3>
        <div className="flex flex-wrap gap-2">
          {visibleParticipants.map((participant, index) => (
            <Badge 
              key={index} 
              variant="default"
              className="bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              {participant}
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Badge 
              variant="default"
              className="bg-muted text-muted-foreground border border-muted-foreground/30"
            >
              +{hiddenCount} more
            </Badge>
          )}
        </div>
      </div>
    );
  }
);

ThreadParticipants.displayName = 'ThreadParticipants';

export default ThreadParticipants;
