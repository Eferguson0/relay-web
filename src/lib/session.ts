import Cookies from 'js-cookie';
import { supabase } from './supabase';

// Cookie management helpers
export const getSessionCookie = (): string | undefined => {
  return Cookies.get('relay_session');
};

export const getTokenCookie = (): string | undefined => {
  return Cookies.get('relay_token');
};

export const setSessionCookie = (sessionId: string): void => {
  Cookies.set('relay_session', sessionId, { 
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
};

export const setTokenCookie = (token: string): void => {
  Cookies.set('relay_token', token, { 
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
};

export const clearSession = (): void => {
  Cookies.remove('relay_session');
  Cookies.remove('relay_token');
};

// Supabase session management
export const getSupabaseSession = async () => {
  const { session, error } = await supabase.auth.getSession();
  return { session, error };
};

export const hasValidSupabaseSession = async (): Promise<boolean> => {
  const { session } = await supabase.auth.getSession();
  return !!session?.access_token;
};

// Guest session management
export const startGuestSession = (): void => {
  const sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const placeholderToken = `guest_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  setSessionCookie(sessionId);
  setTokenCookie(placeholderToken);
};

// Check if user has valid session
export const hasValidSession = (): boolean => {
  return !!getSessionCookie();
};

// Navigation helpers
export const redirectToLogin = (nextPath?: string): string => {
  const loginUrl = '/login';
  return nextPath ? `${loginUrl}?next=${encodeURIComponent(nextPath)}` : loginUrl;
};

export const redirectToOnboarding = (): string => {
  return '/onboarding';
};

export const redirectToInbox = (): string => {
  return '/inbox';
};
