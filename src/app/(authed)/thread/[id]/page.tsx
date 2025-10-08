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
import Link from 'next/link';

interface ThreadMetadata {
  id: string;
  title: string;
  participants: string[];
  created_at: string;
  updated_at: string;
  status: 'active' | 'archived' | 'deleted';
  message_count: number;
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
      '1': "Sample conversation content:\n\nAlice: Hey team! I've finished the initial design mockups for the new dashboard. The wireframes include all the requested features and I've added some additional improvements based on our last discussion.\n\nBob: Great work Alice! The mockups look fantastic. I particularly like the new navigation layout. When do you think we can start the development phase?\n\nYou: Thanks Bob! I'm thinking we can start development next week. The designs are ready and I've already prepared the component specifications.",
      
      '2': "Meeting follow-up notes:\n\nSarah: Hi everyone, following up on our client meeting yesterday. The main points discussed were:\n- Timeline for Q1 deliverables\n- Budget adjustments for the mobile app\n- User testing schedule\n\nMike: Thanks Sarah. I'll send the updated timeline by Friday. The mobile app budget looks good with the current scope.\n\nYou: Perfect! I'll coordinate with the design team to align with the new timeline.",
      
      '3': "Client feedback summary:\n\nClient: The changes look great! We really appreciate the attention to detail. A few minor adjustments:\n- Could we make the header slightly larger?\n- The color scheme is perfect\n- Maybe add one more call-to-action button\n\nYou: Absolutely! Those are easy changes. I'll have the updated mockups ready by tomorrow morning.\n\nClient: Excellent, looking forward to seeing them!",
      
      '4': "Team standup notes:\n\nDaily standup - December 18th:\n\nJenny: Finished the API integration, working on error handling today\nAlex: Completed the user authentication flow, starting on password reset\nDavid: Reviewing the code from yesterday, will start on the dashboard widgets\n\nYou: Great progress everyone! We're on track for the Friday demo. Any blockers to report?",
      
      '5': "Design review feedback:\n\nDesign Review Session:\n\nLaura: The mockups look fantastic! The user flow is much cleaner now.\nTom: I love the new color palette. It's more professional and accessible.\n\nSuggestions:\n- Consider adding micro-animations for better UX\n- The mobile version needs some spacing adjustments\n- Overall, this is ready for development!\n\nYou: Thanks for the feedback! I'll incorporate these suggestions into the final designs.",
      
      '6': "Code review notes:\n\nPull Request #42 - Refactoring user service:\n\nCode Review:\n- Great work on the refactoring! Much cleaner architecture\n- The error handling is much more robust now\n- Tests are comprehensive and well-written\n\nMinor suggestions:\n- Consider extracting the validation logic into a separate utility\n- The logging could be more consistent\n\nApproved! Ready to merge."
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Content container with proper flex layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-5xl flex flex-col h-full">
          {/* Header with fixed height */}
          <div className="flex-none px-6 pt-12 md:pt-16 lg:pt-24 pb-4">
            <div className="mb-4">
              <Link href="/inbox" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Inbox
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-foreground">
                {thread?.title || 'Untitled Thread'}
              </h1>
              <div className="text-sm text-muted-foreground">
                {thread?.created_at ? new Date(thread.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'Unknown'}
              </div>
            </div>
          </div>

          {/* Editable Note Interface - takes remaining height */}
          <div className="flex-1 overflow-hidden px-6 pb-6">
            <ConversationNote 
              placeholder="Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted."
              defaultValue={thread?.last_message?.content || getPlaceholderContent(id)}
              onContentChange={(content) => {
                console.log('Content changed:', content);
                // TODO: Implement autosave functionality
              }}
              autoFocus={true}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
