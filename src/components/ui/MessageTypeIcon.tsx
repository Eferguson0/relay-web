import { HTMLAttributes } from 'react';
import Image from 'next/image';

export type MessageType = 'doc' | 'email' | 'slack';

interface MessageTypeIconProps extends HTMLAttributes<HTMLDivElement> {
  type: MessageType;
  size?: 'sm' | 'md' | 'lg';
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5', 
  lg: 'w-6 h-6'
};

const MessageTypeIcon = ({ type, size = 'md', className = '', ...props }: MessageTypeIconProps) => {
  const sizeClass = iconSizes[size];
  
  const renderIcon = () => {
    switch (type) {
      case 'doc':
        return (
          <svg 
            className={`${sizeClass} text-muted-foreground`}
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
        );
      
      case 'email':
        return (
          <Image 
            src="/Gmail-SVG-Icon.svg" 
            alt="Email" 
            width={size === 'sm' ? 16 : size === 'md' ? 20 : 24} 
            height={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
            className={`${sizeClass} text-muted-foreground`}
          />
        );
      
      case 'slack':
        return (
          <Image 
            src="/Slack-SVG-Icon.svg" 
            alt="Slack" 
            width={size === 'sm' ? 16 : size === 'md' ? 20 : 24} 
            height={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
            className={`${sizeClass} text-muted-foreground`}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex-shrink-0 ${className}`} {...props}>
      {renderIcon()}
    </div>
  );
};

export default MessageTypeIcon;
