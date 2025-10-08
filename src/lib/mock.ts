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
      '1': "PROJECT DISCUSSION SUMMARY\n\nDocument Version: 1.0\nDate: December 18, 2024\nAuthor: Project Team\nStatus: Approved\n\nEXECUTIVE SUMMARY\nThis document provides a comprehensive overview of the project discussion held on December 18, 2024, including key decisions, action items, and next steps for the dashboard development initiative.\n\nKEY DECISIONS\n1. Dashboard Mockups\n   - Initial design mockups completed and approved\n   - All requested features included in wireframes\n   - Additional improvements incorporated based on team feedback\n\n2. Navigation Layout\n   - Final navigation structure approved by stakeholders\n   - User flow optimized for improved usability\n   - Accessibility considerations addressed\n\n3. Development Timeline\n   - Development phase to commence next week\n   - Component specifications to be prepared in parallel\n   - Design handoff meeting scheduled\n\nACTION ITEMS\n• Component specifications preparation (Owner: Design Team, Due: December 20)\n• Development environment setup (Owner: Engineering Team, Due: December 19)\n• Design handoff meeting coordination (Owner: Project Manager, Due: December 19)\n\nAPPENDICES\nAppendix A: Design Mockups\nAppendix B: User Flow Diagrams\nAppendix C: Technical Requirements",
      
      '2': "From: sarah@company.com\nTo: team@company.com\nSubject: Meeting Follow-up - Q1 Deliverables\n\nHi everyone,\n\nFollowing up on our client meeting yesterday. Here are the main points discussed:\n\n• Timeline for Q1 deliverables\n• Budget adjustments for the mobile app\n• User testing schedule\n\nI'll send the updated timeline by Friday. The mobile app budget looks good with the current scope.\n\nPlease coordinate with the design team to align with the new timeline.\n\nBest regards,\nSarah",
      
      '3': "From: mike@acmecorp.com\nTo: you@company.com\nSubject: Client Feedback - Design Changes\n\nHi,\n\nThe changes look great! We really appreciate the attention to detail. A few minor adjustments:\n\n• Could we make the header slightly larger?\n• The color scheme is perfect\n• Maybe add one more call-to-action button\n\nPlease let me know when you have the updated mockups ready.\n\nThanks,\nMike\n\n---\nAcme Corp",
      
      '4': "💬 #team-standup • General\n\n**Daily standup - December 18th**\n\n:white_check_mark: **Jenny**: Finished the API integration, working on error handling today\n:white_check_mark: **Alex**: Completed the user authentication flow, starting on password reset\n:white_check_mark: **David**: Reviewing the code from yesterday, will start on the dashboard widgets\n\n:rocket: **You**: Great progress everyone! We're on track for the Friday demo. Any blockers to report?\n\n:calendar: **Next**: Continue with current tasks, demo prep for Friday",
      
      '5': "DESIGN REVIEW REPORT\n\nDocument ID: DR-2024-001\nReview Date: December 16, 2024\nReviewer: Laura Thompson\nApproval Status: Approved with Minor Revisions\n\nOBJECTIVE\nThis document summarizes the findings and recommendations from the design review session conducted on December 16, 2024, for the new dashboard interface.\n\nREVIEW PARTICIPANTS\n• Laura Thompson - Senior UX Designer\n• Tom Wilson - Product Manager\n• Design Team Representatives\n\nFEEDBACK SUMMARY\n\nPOSITIVE OBSERVATIONS\n1. User Flow Improvements\n   - Navigation flow significantly improved\n   - User journey streamlined and more intuitive\n   - Accessibility compliance enhanced\n\n2. Visual Design\n   - Color palette deemed professional and accessible\n   - Typography choices appropriate for target audience\n   - Overall aesthetic aligns with brand guidelines\n\nRECOMMENDATIONS FOR IMPROVEMENT\n1. User Experience Enhancements\n   - Implement micro-animations to improve user feedback\n   - Add progressive disclosure for complex features\n\n2. Mobile Optimization\n   - Adjust spacing and touch targets for mobile devices\n   - Optimize layout for smaller screen sizes\n   - Test accessibility on mobile platforms\n\nNEXT STEPS\n1. Incorporate approved feedback into final designs\n2. Prepare comprehensive development handoff package\n3. Schedule final stakeholder review meeting\n4. Begin development phase preparation\n\nAPPROVAL\nThis design review has been approved by all stakeholders with the understanding that minor revisions will be incorporated before final handoff to the development team.\n\nDocument prepared by: Laura Thompson\nDate: December 16, 2024",
      
      '6': "💬 #code-review • Development\n\n**Pull Request #42 - Refactoring user service**\n\n:white_check_mark: **Code Review Complete**\n\n:thumbsup: Great work on the refactoring! Much cleaner architecture\n:white_check_mark: The error handling is much more robust now\n:white_check_mark: Tests are comprehensive and well-written\n\n:bulb: **Minor suggestions:**\n• Consider extracting the validation logic into a separate utility\n• The logging could be more consistent\n\n:heavy_check_mark: **Approved!** Ready to merge.\n\n:rocket: Great job team!"
    };

    const threadTitles: Record<string, string> = {
      '1': 'Project Discussion',
      '2': 'Meeting Follow-up', 
      '3': 'Client Feedback',
      '4': 'Team Standup',
      '5': 'Design Review',
      '6': 'Code Review'
    };

    const threadMessageTypes: Record<string, 'doc' | 'email' | 'slack'> = {
      '1': 'doc',
      '2': 'email', 
      '3': 'email',
      '4': 'slack',
      '5': 'doc',
      '6': 'slack'
    };

    return {
      id,
      title: threadTitles[id] || `Sample Thread ${id}`,
      participants: ['user@example.com', 'relay@assistant.com'],
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updated_at: new Date().toISOString(),
      status: 'active' as const,
      message_count: Math.floor(Math.random() * 20) + 5,
      message_type: threadMessageTypes[id] || 'doc',
      last_message: {
        content: threadContent[id] || 'This is a sample message from the conversation. The AI assistant is helping with your communication.',
        author: 'relay@assistant.com',
        timestamp: new Date().toISOString()
      }
    };
  }
};
