'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signUp } from '@/lib/supabase';
import { Button, Input } from '@/components';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isSignUp = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Check your email for the confirmation link!');
          // Don't redirect immediately for signup - user needs to confirm email
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          // Successfully signed in, redirect to onboarding
          router.push('/onboarding');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-sm p-8 space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? 'Sign up to get started with Relay' 
            : 'Sign in to your Relay account'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-sm border border-red-200">
            {error}
          </div>
        )}

        {message && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-sm border border-green-200">
            {message}
          </div>
        )}

        <Button 
          type="submit" 
          size="lg" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <Button
            variant="ghost"
            className="p-0 h-auto ml-1"
            onClick={() => router.push(isSignUp ? '/auth' : '/auth?mode=signup')}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </Button>
        </p>
      </div>
    </div>
  );
}
