// Mock configuration for development without backend
export const MOCK_CONFIG = {
  // Set to true to enable mock mode (no backend required)
  enabled: process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || true, // Default to true for development
  
  // Mock data
  healthStatus: {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'healthy',
      redis: 'healthy',
      queue: 'healthy',
      auth: 'healthy'
    }
  },
  
  getThreadData: (id: string) => ({
    id,
    title: `Sample Thread ${id}`,
    participants: ['user@example.com', 'relay@assistant.com'],
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date().toISOString(),
    status: 'active' as const,
    message_count: Math.floor(Math.random() * 20) + 5,
    last_message: {
      content: 'This is a sample message from the conversation. The AI assistant is helping with your communication.',
      author: 'relay@assistant.com',
      timestamp: new Date().toISOString()
    }
  })
};
