'use client';

import { useQuery } from '@tanstack/react-query';
import { getJSON } from '@/lib/api';
import { logEvent } from '@/lib/log';
import { MOCK_CONFIG } from '@/lib/mock';
import { Button, LoadingSpinner, PageContainer, GroupedInbox } from '@/components';

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
          <p className="text-muted-foreground">Loading inbox...</p>
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Connection Error</h1>
          <p className="text-muted-foreground mb-4">
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
    <div className="min-h-screen bg-background relative">
      {/* Decorative gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 overflow-hidden blur-3xl z-0"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 aspect-[2/1] w-[80vw] max-w-4xl -translate-x-1/2 bg-gradient-to-tr from-gray-600 to-gray-800 opacity-40"
        ></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-[1]">
        <PageContainer maxWidth="7xl" padding="lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Drafts</h1>
        <Button size="lg" className="!bg-foreground !backdrop-blur-xl !border !border-white hover:!bg-foreground/80 transition-all duration-300 shadow-xl !text-background font-medium">
          New Draft
        </Button>
      </div>

          {/* Health Status - Hidden in mock mode */}
          {!MOCK_CONFIG.enabled && (
            <div className="bg-muted rounded-lg p-4 mb-6">
              <h2 className="text-lg font-medium text-foreground mb-2">System Status</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  healthStatus?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm font-medium text-foreground">
                  {healthStatus?.status || 'Unknown'}
                </span>
                {healthStatus?.version && (
                  <span className="text-xs text-muted-foreground">
                    (v{healthStatus.version})
                  </span>
                )}
              </div>
              
              {healthStatus?.timestamp && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last checked: {new Date(healthStatus.timestamp).toLocaleString()}
                </p>
              )}
              
              {healthStatus?.services && (
                <div className="mt-3">
                  <h3 className="text-sm font-medium text-foreground mb-2">Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(healthStatus.services).map(([service, status]) => (
                      <div key={service} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">
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
              <GroupedInbox 
                className="py-3"
                conversations={[
                  { id: '1', title: 'Project Discussion', lastMessage: 'Thanks for the update!', time: '2 min ago', href: '/thread/1', date: 'Today' },
                  { id: '2', title: 'Meeting Follow-up', lastMessage: 'I\'ll send the notes shortly', time: '1 hour ago', href: '/thread/2', date: 'Today' },
                  { id: '3', title: 'Client Feedback', lastMessage: 'The changes look great', time: '3 hours ago', href: '/thread/3', date: 'Today' },
                  { id: '4', title: 'Team Standup', lastMessage: 'Ready for the demo tomorrow', time: '1 day ago', href: '/thread/4', date: 'Yesterday' },
                  { id: '5', title: 'Design Review', lastMessage: 'The mockups look fantastic', time: '2 days ago', href: '/thread/5', date: 'December 15, 2024' },
                  { id: '6', title: 'Code Review', lastMessage: 'Great work on the refactoring', time: '3 days ago', href: '/thread/6', date: 'December 14, 2024' }
                ]}
              />
            </div>
          ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📧</div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Your inbox is ready
                </h2>
                <p className="text-muted-foreground mb-6">
                  Relay is connected and ready to help manage your communications.
                </p>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Backend API is {healthStatus?.status === 'healthy' ? 'connected' : 'disconnected'}
                  </p>
                </div>
              </div>
            )}
        </PageContainer>
      </div>
    </div>
  );
}
