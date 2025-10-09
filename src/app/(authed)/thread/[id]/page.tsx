'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJSON } from '@/lib/api';
import { logEvent } from '@/lib/log';
import { MOCK_CONFIG } from '@/lib/mock';
import { 
  Button, 
  LoadingSpinner, 
  PageContainer, 
  ConversationNote
} from '@/components';
import MessageTypeIcon, { MessageType } from '@/components/ui/MessageTypeIcon';
import Link from 'next/link';

interface ThreadMetadata {
  id: string;
  title: string;
  participants: string[];
  created_at: string;
  updated_at: string;
  status: 'active' | 'archived' | 'deleted';
  message_count: number;
  message_type?: MessageType;
  last_message?: {
    content: string;
    author: string;
    timestamp: string;
  };
}

interface ThreadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ThreadPage({ params }: ThreadPageProps) {
  const { id } = use(params);

  // Different placeholder content based on thread ID
  const getPlaceholderContent = (threadId: string) => {
    const placeholders: Record<string, string> = {
      '1': "PROJECT DISCUSSION SUMMARY\n\nDocument Version: 1.0\nDate: December 18, 2024\nAuthor: Project Team\nStatus: Approved\n\nEXECUTIVE SUMMARY\nThis document provides a comprehensive overview of the project discussion held on December 18, 2024, including key decisions, action items, and next steps for the dashboard development initiative.\n\nKEY DECISIONS\n1. Dashboard Mockups\n   - Initial design mockups completed and approved\n   - All requested features included in wireframes\n   - Additional improvements incorporated based on team feedback\n\n2. Navigation Layout\n   - Final navigation structure approved by stakeholders\n   - User flow optimized for improved usability\n   - Accessibility considerations addressed\n\n3. Development Timeline\n   - Development phase to commence next week\n   - Component specifications to be prepared in parallel\n   - Design handoff meeting scheduled\n\nACTION ITEMS\n• Component specifications preparation (Owner: Design Team, Due: December 20)\n• Development environment setup (Owner: Engineering Team, Due: December 19)\n• Design handoff meeting coordination (Owner: Project Manager, Due: December 19)\n\nAPPENDICES\nAppendix A: Design Mockups\nAppendix B: User Flow Diagrams\nAppendix C: Technical Requirements",
      
      '2': "From: sarah@company.com\nTo: team@company.com\nSubject: Meeting Follow-up - Q1 Deliverables\n\nHi everyone,\n\nFollowing up on our client meeting yesterday. Here are the main points discussed:\n\n• Timeline for Q1 deliverables\n• Budget adjustments for the mobile app\n• User testing schedule\n\nI'll send the updated timeline by Friday. The mobile app budget looks good with the current scope.\n\nPlease coordinate with the design team to align with the new timeline.\n\nBest regards,\nSarah",
      
      '3': "From: mike@acmecorp.com\nTo: you@company.com\nSubject: Client Feedback - Design Changes\n\nHi,\n\nThe changes look great! We really appreciate the attention to detail. A few minor adjustments:\n\n• Could we make the header slightly larger?\n• The color scheme is perfect\n• Maybe add one more call-to-action button\n\nPlease let me know when you have the updated mockups ready.\n\nThanks,\nMike\n\n---\nAcme Corp",
      
      '4': "💬 #team-standup • General\n\n**Daily standup - December 18th**\n\n:white_check_mark: **Jenny**: Finished the API integration, working on error handling today\n:white_check_mark: **Alex**: Completed the user authentication flow, starting on password reset\n:white_check_mark: **David**: Reviewing the code from yesterday, will start on the dashboard widgets\n\n:rocket: **You**: Great progress everyone! We're on track for the Friday demo. Any blockers to report?\n\n:calendar: **Next**: Continue with current tasks, demo prep for Friday",
      
      '5': "DESIGN REVIEW REPORT\n\nDocument ID: DR-2024-001\nReview Date: December 16, 2024\nReviewer: Laura Thompson\nApproval Status: Approved with Minor Revisions\n\nOBJECTIVE\nThis document summarizes the findings and recommendations from the design review session conducted on December 16, 2024, for the new dashboard interface.\n\nREVIEW PARTICIPANTS\n• Laura Thompson - Senior UX Designer\n• Tom Wilson - Product Manager\n• Design Team Representatives\n\nFEEDBACK SUMMARY\n\nPOSITIVE OBSERVATIONS\n1. User Flow Improvements\n   - Navigation flow significantly improved\n   - User journey streamlined and more intuitive\n   - Accessibility compliance enhanced\n\n2. Visual Design\n   - Color palette deemed professional and accessible\n   - Typography choices appropriate for target audience\n   - Overall aesthetic aligns with brand guidelines\n\nRECOMMENDATIONS FOR IMPROVEMENT\n1. User Experience Enhancements\n   - Implement micro-animations to improve user feedback\n   - Add progressive disclosure for complex features\n\n2. Mobile Optimization\n   - Adjust spacing and touch targets for mobile devices\n   - Optimize layout for smaller screen sizes\n   - Test accessibility on mobile platforms\n\nNEXT STEPS\n1. Incorporate approved feedback into final designs\n2. Prepare comprehensive development handoff package\n3. Schedule final stakeholder review meeting\n4. Begin development phase preparation\n\nAPPROVAL\nThis design review has been approved by all stakeholders with the understanding that minor revisions will be incorporated before final handoff to the development team.\n\nDocument prepared by: Laura Thompson\nDate: December 16, 2024",
      
      '6': "💬 #code-review • Development\n\n**Pull Request #42 - Refactoring user service**\n\n:white_check_mark: **Code Review Complete**\n\n:thumbsup: Great work on the refactoring! Much cleaner architecture\n:white_check_mark: The error handling is much more robust now\n:white_check_mark: Tests are comprehensive and well-written\n\n:bulb: **Minor suggestions:**\n• Consider extracting the validation logic into a separate utility\n• The logging could be more consistent\n\n:heavy_check_mark: **Approved!** Ready to merge.\n\n:rocket: Great job team!"
    };
    
    return placeholders[threadId] || "Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted.";
  };

  const { data: thread, isLoading, error } = useQuery<ThreadMetadata>({
    queryKey: ['thread', id],
    queryFn: MOCK_CONFIG.enabled 
      ? () => Promise.resolve(MOCK_CONFIG.getThreadData(id))
      : () => getJSON(`/threads/${id}`),
    retry: MOCK_CONFIG.enabled ? 0 : 3,
  });

  if (isLoading) {
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading thread...</p>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    logEvent('thread_load_failed', { threadId: id, error: error.message });
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Thread Not Found</h1>
          <p className="text-muted-foreground mb-4">
            Unable to load thread {id}. It may have been deleted or you don&apos;t have access.
          </p>
          <Link href="/inbox">
            <Button>Back to Inbox</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Content container - allows natural content flow */}
      <div className="mx-auto w-full max-w-5xl">
        {/* Header with fixed positioning */}
        <div className="px-6 pt-12 md:pt-16 lg:pt-24 pb-4">
          <div className="mb-8">
            <Link href="/inbox" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Inbox
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Message Type Icon - matching inbox style */}
              <MessageTypeIcon 
                type={thread?.message_type || 'doc'} 
                size="lg" 
              />
              <h1 className="text-2xl font-semibold text-foreground">
                {thread?.title || 'Untitled Thread'}
              </h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {thread?.created_at ? new Date(thread.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Unknown'}
            </div>
          </div>
        </div>

        {/* Editable Note Interface - content flows naturally */}
        <div className="px-6">
          <ConversationNote 
            placeholder="Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted."
            defaultValue={thread?.last_message?.content || getPlaceholderContent(id)}
            onContentChange={(content) => {
              console.log('Content changed:', content);
              // TODO: Implement autosave functionality
            }}
            onBold={(selectedText) => {
              console.log('Bold requested for:', selectedText);
              // TODO: Implement bold formatting
            }}
            onItalic={(selectedText) => {
              console.log('Italic requested for:', selectedText);
              // TODO: Implement italic formatting
            }}
            onAIRevise={(selectedText, feedback) => {
              console.log('AI revise requested:', selectedText, 'with feedback:', feedback);
              // TODO: Implement AI revision
            }}
            autoFocus={true}
          />
        </div>
      </div>
    </div>
  );
}
