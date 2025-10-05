'use client';

import { useQuery } from '@tanstack/react-query';
import { getJSON } from '@/lib/api';
import { logEvent } from '@/lib/log';
import { MOCK_CONFIG } from '@/lib/mock';
import { Button, Card, CardContent, Badge, LoadingSpinner, PageContainer, Header } from '@/components';
import Link from 'next/link';

interface HealthStatus {
  status: string;
  timestamp: string;
  version?: string;
  services?: Record<string, string>;
}

export default function InboxPage() {
  const { data: healthStatus, isLoading, error } = useQuery<HealthStatus>({
    queryKey: ['health'],
    queryFn: MOCK_CONFIG.enabled 
      ? () => Promise.resolve(MOCK_CONFIG.healthStatus)
      : () => getJSON('/system/health'),
    retry: MOCK_CONFIG.enabled ? 0 : 3,
    refetchInterval: MOCK_CONFIG.enabled ? false : 30000,
  });

  if (isLoading) {
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading inbox...</p>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    logEvent('health_check_failed', { error: error.message });
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h1>
          <p className="text-gray-600 mb-4">
            Unable to connect to the backend service.
          </p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="7xl" padding="lg">
      <Card>
        <CardContent>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Drafts</h1>
            {MOCK_CONFIG.enabled && (
              <Badge variant="warning">Mock Mode</Badge>
            )}
          </div>

          {/* Health Status - Hidden in mock mode */}
          {!MOCK_CONFIG.enabled && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">System Status</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  healthStatus?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm font-medium text-gray-900">
                  {healthStatus?.status || 'Unknown'}
                </span>
                {healthStatus?.version && (
                  <span className="text-xs text-gray-500">
                    (v{healthStatus.version})
                  </span>
                )}
              </div>
              
              {healthStatus?.timestamp && (
                <p className="text-xs text-gray-500 mt-1">
                  Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
                </p>
              )}
              
              {healthStatus?.services && (
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(healthStatus.services).map(([service, status]) => (
                      <div key={service} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-xs text-gray-600 capitalize">
                          {service}: {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Conversations */}
          {MOCK_CONFIG.enabled ? (
            <div>
              <div className="space-y-3">
                {[
                  { id: '1', title: 'Project Discussion', lastMessage: 'Thanks for the update!', time: '2 min ago' },
                  { id: '2', title: 'Meeting Follow-up', lastMessage: 'I\'ll send the notes shortly', time: '1 hour ago' },
                  { id: '3', title: 'Client Feedback', lastMessage: 'The changes look great', time: '3 hours ago' },
                  { id: '4', title: 'Team Standup', lastMessage: 'Ready for the demo tomorrow', time: '1 day ago' }
                ].map((thread) => (
                  <Link key={thread.id} href={`/thread/${thread.id}`}>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{thread.title}</h3>
                        <p className="text-sm text-gray-500">{thread.lastMessage}</p>
                      </div>
                      <div className="text-xs text-gray-400">{thread.time}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button size="lg">
                  Start New Conversation
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Using mock data for development
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your inbox is ready
              </h2>
              <p className="text-gray-600 mb-6">
                Relay is connected and ready to help manage your communications.
              </p>
              
              <div className="space-y-3">
                <Button size="lg">
                  Start New Conversation
                </Button>
                <p className="text-sm text-gray-500">
                  Backend API is {healthStatus?.status === 'healthy' ? 'connected' : 'disconnected'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
