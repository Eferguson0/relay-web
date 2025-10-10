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
          <Image 
            src="/google_docs_icon.png" 
            alt="Google Docs" 
            width={size === 'sm' ? 16 : size === 'md' ? 20 : 24} 
            height={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
            className={`${sizeClass}`}
            unoptimized
          />
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
