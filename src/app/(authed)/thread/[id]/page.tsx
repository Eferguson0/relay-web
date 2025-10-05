'use client';

import { useQuery } from '@tanstack/react-query';
import { getJSON } from '@/lib/api';
import { logEvent } from '@/lib/log';
import { MOCK_CONFIG } from '@/lib/mock';
import { Button, Card, CardContent, Badge, LoadingSpinner, PageContainer, Header } from '@/components';
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
  params: {
    id: string;
  };
}

export default function ThreadPage({ params }: ThreadPageProps) {
  const { id } = params;

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
          <p className="text-gray-600">Loading thread...</p>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    logEvent('thread_load_failed', { threadId: id, error: error.message });
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thread Not Found</h1>
          <p className="text-gray-600 mb-4">
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
    <PageContainer maxWidth="4xl" padding="lg">
      <Header 
        title={thread?.title || 'Untitled Thread'}
        badge={{
          text: thread?.status || 'unknown',
          variant: thread?.status === 'active' ? 'success' : 'default'
        }}
        actions={
          <Link href="/inbox" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            ← Back to Inbox
          </Link>
        }
      >
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Thread ID: {id}</span>
          <span>•</span>
          <span>{thread?.message_count || 0} messages</span>
          <span>•</span>
          <span>
            Created {thread?.created_at ? new Date(thread.created_at).toLocaleDateString() : 'Unknown'}
          </span>
        </div>
      </Header>

      {/* Thread Content */}
      <Card>
        <CardContent>
          {thread?.participants && thread.participants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Participants</h3>
              <div className="flex flex-wrap gap-2">
                {thread.participants.map((participant, index) => (
                  <Badge key={index} variant="default">
                    {participant}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {thread?.last_message && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Last Message</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 mb-2">{thread.last_message.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>by {thread.last_message.author}</span>
                  <span>
                    {new Date(thread.last_message.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for thread messages */}
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thread Messages
            </h2>
            <p className="text-gray-600 mb-6">
              This is where the conversation messages would be displayed.
            </p>
            
            <div className="space-y-3">
              <Button size="lg">
                Add Message
              </Button>
              <p className="text-sm text-gray-500">
                Thread metadata loaded successfully
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
