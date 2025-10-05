// Analytics and telemetry stubs
// Currently just logs to console, ready for vendor integration

interface LogEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
  userId?: string;
}

export const logEvent = (event: string, properties?: Record<string, unknown>) => {
  const logData: LogEvent = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };

  // Console logging for development
  console.info('Analytics Event:', logData);

  // TODO: Integrate with analytics service (e.g., PostHog, Mixpanel, etc.)
  // Example:
  // if (typeof window !== 'undefined' && window.posthog) {
  //   window.posthog.capture(event, properties);
  // }
};

export const logError = (error: Error, context?: Record<string, unknown>) => {
  const logData = {
    event: 'error',
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    context,
    timestamp: new Date().toISOString(),
  };

  console.error('Error Logged:', logData);

  // TODO: Send to error tracking service (e.g., Sentry, Bugsnag, etc.)
  // Example:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context });
  // }
};

export const logPageView = (page: string, properties?: Record<string, unknown>) => {
  logEvent('page_view', {
    page,
    ...properties,
  });
};

export const logUserAction = (action: string, properties?: Record<string, unknown>) => {
  logEvent('user_action', {
    action,
    ...properties,
  });
};

// Common events for the application
export const logLoginSuccess = (method: string) => {
  logEvent('login_success', { method });
};

export const logOnboardingComplete = (stepsCompleted: string[]) => {
  logEvent('onboarding_complete', { stepsCompleted });
};

export const logSessionStart = (sessionType: 'guest' | 'authenticated') => {
  logEvent('session_start', { sessionType });
};

export const logApiCall = (endpoint: string, method: string, status: number, duration?: number) => {
  logEvent('api_call', {
    endpoint,
    method,
    status,
    duration,
  });
};
