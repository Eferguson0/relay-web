"use client";

import { forwardRef, useState, useMemo, useEffect, useRef } from 'react';

interface SelectionDetails {
  textarea: HTMLTextAreaElement;
  start: number;
  end: number;
  selectedText: string;
}

interface AIFeedbackModalProps {
  selectionDetails: SelectionDetails;
  onSubmit?: (feedback: string) => void;
  onCancel?: () => void;
}

const AIFeedbackModal = forwardRef<HTMLDivElement, AIFeedbackModalProps>(
  ({ selectionDetails, onSubmit, onCancel }, ref) => {
    const [aiFeedback, setAiFeedback] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        
        // Modal dimensions
        const modalMinWidth = 750;
        
        // Calculate modal width (using min width for positioning calculation)
        const modalWidth = modalMinWidth;
        
        // Start with right-aligned position (modal's right edge at selection end)
        let x = textareaRect.left + padding + textWidth - modalWidth;
        
        // Define boundaries
        const minX = textareaRect.left + padding;
        const maxX = textareaRect.right - padding - modalWidth;
        
        // Clamp to stay within bounds while maintaining right-alignment
        x = Math.max(minX, Math.min(x, maxX));
        
        return {
          x,
          y: textareaRect.top + padding + (endLine * lineHeight) + (lineHeight * 3.5) // Top + padding + lines above + END line + spacing below
        };
      } else {
        // Fallback to left edge if canvas context is not available
        const lineHeight = 24;
        const padding = 12;
        
        // Modal dimensions for fallback
        const modalMinWidth = 750;
        
        // For fallback, start with left-aligned position
        let x = textareaRect.left + padding;
        
        // Define boundaries
        const minX = textareaRect.left + padding;
        const maxX = textareaRect.right - padding - modalMinWidth;
        
        // Clamp to stay within bounds
        x = Math.max(minX, Math.min(x, maxX));
        
        return {
          x,
          y: textareaRect.top + padding + (endLine * lineHeight) + (lineHeight * 3.5)
        };
      }
    }, [selectionDetails]);

    // Auto-resize textarea to fit content
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [aiFeedback]);


    const handleSubmit = () => {
      if (aiFeedback.trim()) {
        onSubmit?.(aiFeedback);
        setAiFeedback('');
        onCancel?.();
      }
    };

    const handleCancel = () => {
      setAiFeedback('');
      onCancel?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    };

    return (
      <div
        ref={ref}
        className="fixed z-[9999] bg-background border border-border rounded-lg shadow-lg p-6 min-w-[750px] max-w-[1050px]"
        style={{
          left: position.x,
          top: position.y - 50, // Position above the selection (same as toolbar)
          pointerEvents: 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <label htmlFor="ai-feedback" className="block text-sm text-muted-foreground font-light mb-2">
            How should this text be changed?
          </label>
          <textarea
            ref={textareaRef}
            id="ai-feedback"
            value={aiFeedback}
            onChange={(e) => setAiFeedback(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe how you want to revise the selected text..."
            className="w-full px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-muted text-foreground placeholder:text-muted-foreground/50 overflow-hidden"
            style={{ 
              minHeight: '44px', // Single line height
              height: 'auto'
            }}
            autoFocus
          />
        </div>
      </div>
    );
  }
);

AIFeedbackModal.displayName = 'AIFeedbackModal';

export default AIFeedbackModal;
