'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { startGuestSession } from '@/lib/session';
import { logEvent } from '@/lib/log';
import { Button, Input, PageContainer } from '@/components';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/onboarding';
  const mode = searchParams.get('mode');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Implement real email authentication
      console.log('Email login:', email);
      logEvent('login_attempt', { email, mode });
      
      // For now, just redirect to onboarding
      router.push(nextPath);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    startGuestSession();
    logEvent('guest_session_started');
    router.push(nextPath);
  };

  return (
    <PageContainer maxWidth="md" padding="lg" className="flex items-center justify-center">
      <div className="w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signup' 
              ? 'Create your Relay account' 
              : 'Welcome back to Relay'
            }
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing in...' : (mode === 'signup' ? 'Create Account' : 'Continue')}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or</span>
          </div>
        </div>

        <Button
          onClick={handleGuestContinue}
          variant="outline"
          className="w-full"
        >
          Continue as guest
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Log in
                </a>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <a href="/login?mode=signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </PageContainer>
    }>
      <LoginForm />
    </Suspense>
  );
}
