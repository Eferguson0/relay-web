"use client";

import { forwardRef, useMemo } from 'react';
import Button from './Button';

interface SelectionDetails {
  textarea: HTMLTextAreaElement;
  start: number;
  end: number;
  selectedText: string;
}

interface TextFormattingToolbarProps {
  selectionDetails: SelectionDetails;
  onBold?: () => void;
  onItalic?: () => void;
  onAIRevise?: () => void;
  onClose?: () => void;
}

const TextFormattingToolbar = forwardRef<HTMLDivElement, TextFormattingToolbarProps>(
  ({ selectionDetails, onBold, onItalic, onAIRevise, onClose }, ref) => {
    const position = useMemo(() => {
      const { textarea, end } = selectionDetails;
      const textareaRect = textarea.getBoundingClientRect();
      
      // Calculate approximate position based on where selection ENDS
      // Handle case where selection includes newline character (triple-click)
      let adjustedEnd = end;
      if (textarea.value[end - 1] === '\n') {
        adjustedEnd = end - 1; // Don't include the newline in positioning
      }
      
      const textUpToSelectionEnd = textarea.value.substring(0, adjustedEnd);
      const linesUpToEnd = textUpToSelectionEnd.split('\n');
      const endLine = linesUpToEnd.length - 1; // Use the line where selection ends
      const endLineText = linesUpToEnd[endLine] || ''; // Text on the line where selection ends
      
      // Calculate horizontal position based on text width
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = window.getComputedStyle(textarea).font;
        const textWidth = context.measureText(endLineText).width;
        
        // Estimate position based on line number and textarea properties
        const lineHeight = 24; // Approximate line height
        const padding = 12; // Approximate padding
        
        return {
          x: textareaRect.left + padding + textWidth, // Left edge + padding + text width
          y: textareaRect.top + padding + (endLine * lineHeight) + (lineHeight * 3.5) // Top + padding + lines above + END line + spacing below
        };
      } else {
        // Fallback to left edge if canvas context is not available
        const lineHeight = 24;
        const padding = 12;
        
        return {
          x: textareaRect.left + padding,
          y: textareaRect.top + padding + (endLine * lineHeight) + (lineHeight * 3.5)
        };
      }
    }, [selectionDetails]);
    const handleBold = () => {
      onBold?.();
      onClose?.();
    };

    const handleItalic = () => {
      onItalic?.();
      onClose?.();
    };

    const handleAIClick = () => {
      onAIRevise?.();
    };

    return (
      <div
        ref={ref}
        className="fixed z-[9999] bg-background border border-border rounded-lg shadow-lg p-2 flex items-center space-x-1"
        style={{
          left: position.x,
          top: position.y - 50, // Position above the selection
          pointerEvents: 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBold();
          }}
          className="w-10 py-2 text-sm font-bold hover:bg-accent"
          title="Bold"
        >
          <span className="font-bold">B</span>
        </Button>

        <div className="w-px h-6 bg-border mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleItalic();
          }}
          className="w-10 py-2 text-sm italic hover:bg-accent"
          title="Italic"
        >
          <span className="italic">I</span>
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAIClick}
          className="w-10 py-2 text-sm hover:bg-accent"
          title="AI Revise"
        >
          <span>AI</span>
        </Button>
      </div>
    );
  }
);

TextFormattingToolbar.displayName = 'TextFormattingToolbar';

export default TextFormattingToolbar;
