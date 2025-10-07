'use client';

import { Suspense } from 'react';
import { PageContainer, AuthForm } from '@/components';

function AuthFormComponent() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <AuthForm />
      </div>
    </div>
  );
}

export default function EmailAuthPage() {
  return (
    <Suspense fallback={
      <PageContainer className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageContainer>
    }>
      <AuthFormComponent />
    </Suspense>
  );
}
