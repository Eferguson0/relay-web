'use client';

import { HTMLAttributes, forwardRef, useState, useRef, useEffect } from 'react';
import TextFormattingToolbar from './TextFormattingToolbar';
import AIFeedbackModal from './AIFeedbackModal';

interface ConversationNoteProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  placeholder?: string;
  defaultValue?: string;
  onContentChange?: (content: string) => void;
  autoFocus?: boolean;
  onBold?: (selectedText: string) => void;
  onItalic?: (selectedText: string) => void;
  onAIRevise?: (selectedText: string, feedback: string) => void;
}

const ConversationNote = forwardRef<HTMLDivElement, ConversationNoteProps>(
  ({ 
    title = 'New Message', 
    placeholder = "Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted.", 
    defaultValue = '', 
    onContentChange,
    autoFocus = false,
    onBold,
    onItalic,
    onAIRevise,
    className = '', 
    ...props 
  }, ref) => {
  const [content, setContent] = useState(defaultValue);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{
    textarea: HTMLTextAreaElement;
    start: number;
    end: number;
    selectedText: string;
  } | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showHighlightedText, setShowHighlightedText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);
      onContentChange?.(newContent);
    };

    const handleMouseUp = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Use textarea selection properties instead of window.getSelection()
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      if (start === end) {
        setShowToolbar(false);
        setShowAIModal(false);
        return;
      }

      const selectedText = textarea.value.substring(start, end).trim();
      
      if (selectedText.length === 0) {
        setShowToolbar(false);
        setShowAIModal(false);
        return;
      }

      // Store selection details for positioning calculation
      const selectionDetails = {
        textarea,
        start,
        end,
        selectedText
      };
      
      setSelectedText(selectedText);
      setSelectionPosition(selectionDetails);
      setShowToolbar(true);
      setShowAIModal(false);
    };

    const handleBold = () => {
      if (selectedText && textareaRef.current) {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        // Create new content with bold markdown
        const beforeSelection = content.substring(0, start);
        const afterSelection = content.substring(end);
        const newContent = beforeSelection + `**${selectedText}**` + afterSelection;
        
        // Update content
        setContent(newContent);
        onContentChange?.(newContent);
        
        // Call parent callback if provided
        onBold?.(selectedText);
        
        // Clear selection and close popups
        setShowToolbar(false);
        setShowAIModal(false);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + 2, end + 2); // Select the bolded text
        }, 0);
      }
    };

    const handleItalic = () => {
      if (selectedText && textareaRef.current) {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        // Create new content with italic markdown
        const beforeSelection = content.substring(0, start);
        const afterSelection = content.substring(end);
        const newContent = beforeSelection + `*${selectedText}*` + afterSelection;
        
        // Update content
        setContent(newContent);
        onContentChange?.(newContent);
        
        // Call parent callback if provided
        onItalic?.(selectedText);
        
        // Clear selection and close popups
        setShowToolbar(false);
        setShowAIModal(false);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + 1, end + 1); // Select the italicized text
        }, 0);
      }
    };

    const handleAIRevise = (feedback: string) => {
      if (selectedText) {
        onAIRevise?.(selectedText, feedback);
      }
      setShowAIModal(false);
      setShowToolbar(false);
    };

    const handleShowAIModal = () => {
      setShowAIModal(true);
      setShowToolbar(false);
      setShowHighlightedText(true);
    };

    const handleCloseToolbar = () => {
      setShowToolbar(false);
      // Clear selection
      if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
      }
    };

    const handleCloseAIModal = () => {
      setShowAIModal(false);
      setShowHighlightedText(false);
    };

    // Render highlighted text when AI modal is open
    const renderHighlightedContent = () => {
      if (!showAIModal || !selectionPosition || !showHighlightedText) {
        return null;
      }

      const { start, end } = selectionPosition;
      const beforeText = content.substring(0, start);
      const selectedText = content.substring(start, end);
      const afterText = content.substring(end);

      return (
        <div className="w-full px-3 py-3 text-base leading-relaxed whitespace-pre-wrap"
          style={{ 
            fontFamily: 'inherit',
            lineHeight: '1.6',
            minHeight: '400px'
          }}>
          {beforeText}
          <span 
            style={{
              backgroundColor: 'var(--text-highlight)'
            }}>
            {selectedText}
          </span>
          {afterText}
        </div>
      );
    };

    // Auto-resize textarea to fit content
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [content]);

    // Hide popup when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        
        // Don't close if clicking inside textarea
        if (textareaRef.current && textareaRef.current.contains(target)) {
          return;
        }
        
        // Don't close if clicking on popup elements (check for popup-related classes)
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          const element = target as Element;
          if (element.closest('[class*="fixed z-[9999]"]') || 
              element.classList.contains('font-bold') || 
              element.classList.contains('italic')) {
            return;
          }
        }
        
        // Close popups for all other clicks
        if (showToolbar) {
          setShowToolbar(false);
        }
        if (showAIModal) {
          setShowAIModal(false);
        }
      };

      if (showToolbar || showAIModal) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [showToolbar, showAIModal]);

    return (
      <div className={`flex flex-col ${className}`} ref={ref} {...props}>
        {/* Header */}
        {title && title !== 'New Message' && (
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
          </div>
        )}

        {/* Editable Text Area - auto-expands with content */}
        {showAIModal && showHighlightedText && selectionPosition ? (
          <div className="relative">
            {/* Hidden textarea for functionality */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              onMouseUp={handleMouseUp}
              placeholder={placeholder}
              autoFocus={autoFocus}
              className="absolute inset-0 w-full px-3 py-3 resize-none focus:outline-none text-base leading-relaxed overflow-hidden opacity-0 pointer-events-none"
              style={{ 
                fontFamily: 'inherit',
                lineHeight: '1.6',
                minHeight: '400px'
              }}
            />
            {/* Visible highlighted content */}
            {renderHighlightedContent()}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full px-3 py-3 resize-none focus:outline-none text-base leading-relaxed overflow-hidden"
            style={{ 
              fontFamily: 'inherit',
              lineHeight: '1.6',
              minHeight: '400px'
            }}
          />
        )}
        
        {/* Text Formatting Toolbar */}
        {showToolbar && selectionPosition && (
          <TextFormattingToolbar
            selectionDetails={selectionPosition}
            onBold={handleBold}
            onItalic={handleItalic}
            onAIRevise={handleShowAIModal}
            onClose={handleCloseToolbar}
          />
        )}

        {/* AI Feedback Modal */}
        {showAIModal && selectionPosition && (
          <AIFeedbackModal
            selectionDetails={selectionPosition}
            onSubmit={handleAIRevise}
            onCancel={handleCloseAIModal}
          />
        )}
        
        {/* Bottom spacer for breathing room - actual height for scrolling */}
        <div className="h-32" />
      </div>
    );
  }
);

ConversationNote.displayName = 'ConversationNote';

export default ConversationNote;
