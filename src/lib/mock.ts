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
  
  getThreadData: (id: string) => {
    const threadContent: Record<string, string> = {
      '1': "Hi Team,\n\nI wanted to share an update on the dashboard redesign project. The initial mockups are now complete and include all the features we discussed in our last meeting.\n\nThe new design features:\n- Streamlined navigation layout\n- Improved data visualization components\n- Enhanced user experience flow\n- Mobile-responsive design\n\nI'm planning to start development next week. The component specifications are ready, and I believe we can meet our Q1 timeline.\n\nLet me know if you have any questions or feedback on the designs.\n\nBest regards,\nAlice",
      
      '2': "Hi Everyone,\n\nFollowing up on yesterday's client meeting. Here are the key decisions and action items:\n\nTimeline Updates:\n- Q1 deliverables confirmed for March 15th\n- Mobile app development starts February 1st\n- User testing scheduled for mid-February\n\nBudget Adjustments:\n- Additional $15k approved for enhanced UI components\n- Mobile app budget remains within scope\n\nNext Steps:\n- I'll send the updated project timeline by Friday\n- Design team will coordinate with development schedule\n- Client review meeting scheduled for next Tuesday\n\nPlease let me know if you need any clarification on these items.\n\nThanks,\nSarah",
      
      '3': "Hi,\n\nThank you for the feedback on the latest designs. I'm pleased to hear that you're happy with the overall direction and attention to detail.\n\nI'll implement the requested changes:\n- Increase header size by 20%\n- Add additional call-to-action button in the hero section\n- Maintain the current color scheme as requested\n\nI'll have the revised mockups ready for your review by tomorrow morning. The changes are straightforward and won't impact our development timeline.\n\nLooking forward to your thoughts on the updated designs.\n\nBest,\nDesign Team",
      
      '4': "Hi Team,\n\nHere's today's standup update:\n\nJenny: Completed API integration yesterday, focusing on error handling today\nAlex: Finished user authentication flow, starting password reset functionality\nDavid: Code review from yesterday completed, beginning dashboard widgets\n\nStatus: On track for Friday demo. No major blockers reported.\n\nQuestions for the team:\n- Any dependencies I should be aware of?\n- Need help with anything specific?\n\nLet's keep the momentum going!\n\nThanks,\nTeam Lead",
      
      '5': "Hi Design Team,\n\nGreat session today! Here's the summary of our design review:\n\nPositive Feedback:\n- User flow is significantly cleaner\n- Color palette is more professional and accessible\n- Overall direction is solid\n\nRecommendations:\n- Add subtle micro-animations for better UX\n- Adjust mobile spacing for better readability\n- Consider progressive disclosure for complex features\n\nStatus: Designs are approved for development with these minor adjustments.\n\nI'll incorporate the feedback and have final designs ready by end of week.\n\nThanks for the great work!\n\nLaura",
      
      '6': "Hi Team,\n\nCode review completed for PR #42 (User Service Refactoring).\n\nExcellent work! The refactoring has resulted in:\n- Much cleaner architecture\n- Robust error handling\n- Comprehensive test coverage\n\nMinor suggestions for improvement:\n- Consider extracting validation logic to separate utility\n- Standardize logging format across the service\n\nStatus: Approved and ready to merge.\n\nGreat job on this refactoring - it will make future development much easier.\n\nThanks,\nCode Review Team"
    };

    const threadTitles: Record<string, string> = {
      '1': 'Project Discussion',
      '2': 'Meeting Follow-up', 
      '3': 'Client Feedback',
      '4': 'Team Standup',
      '5': 'Design Review',
      '6': 'Code Review'
    };

    return {
      id,
      title: threadTitles[id] || `Sample Thread ${id}`,
      participants: ['user@example.com', 'relay@assistant.com'],
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updated_at: new Date().toISOString(),
      status: 'active' as const,
      message_count: Math.floor(Math.random() * 20) + 5,
      last_message: {
        content: threadContent[id] || 'This is a sample message from the conversation. The AI assistant is helping with your communication.',
        author: 'relay@assistant.com',
        timestamp: new Date().toISOString()
      }
    };
  }
};
