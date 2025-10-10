'use client';

import { useState } from 'react';
import Image from 'next/image';

export type DraftType = 'doc' | 'email' | 'slack' | 'other';

interface DraftTypeSelectorProps {
  value?: DraftType;
  onChange?: (type: DraftType) => void;
}

export default function DraftTypeSelector({ value = 'doc', onChange }: DraftTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<DraftType>(value);

  const handleSelect = (type: DraftType) => {
    setSelectedType(type);
    onChange?.(type);
  };

  const types: Array<{ id: DraftType; label: string; icon: React.ReactNode }> = [
    {
      id: 'doc',
      label: 'Document',
      icon: (
        <Image 
          src="/google_docs_icon.png" 
          alt="Google Docs" 
          width={24} 
          height={24}
          className="w-6 h-6"
          unoptimized
        />
      )
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <Image 
          src="/Gmail-SVG-Icon.svg" 
          alt="Email" 
          width={24} 
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      id: 'slack',
      label: 'Slack',
      icon: (
        <Image 
          src="/Slack-SVG-Icon.svg" 
          alt="Slack" 
          width={24} 
          height={24}
          className="w-6 h-6"
        />
      )
    },
    {
      id: 'other',
      label: 'Other',
      icon: (
        <svg 
          className="w-6 h-6"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
          />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-center text-muted-foreground text-base font-light">
        Draft Type
      </h2>

      {/* Type Buttons */}
      <div className="flex gap-3 justify-center">
        {types.map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`
                flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 w-32
                ${isSelected 
                  ? 'border-primary/50 bg-primary/5 text-primary' 
                  : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted/30'
                }
              `}
            >
              <div className={`transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                {type.icon}
              </div>
              <span className="text-sm font-medium">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

