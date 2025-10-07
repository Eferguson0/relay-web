'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore, getCompletionProgress } from '@/store/onboarding';
import { logEvent } from '@/lib/log';

export default function OnboardingPage() {
  const router = useRouter();
  const { steps, completeStep, isCompleted } = useOnboardingStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const currentStep = steps[currentStepIndex];
  const progress = useOnboardingStore(getCompletionProgress);

  const handleStepComplete = (stepId: string) => {
    completeStep(stepId);
    logEvent('onboarding_step_completed', { stepId });
    
    // Move to next step if not the last one
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleGoToInbox = () => {
    logEvent('onboarding_completed');
    router.push('/inbox');
  };

  const handleSkipStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Welcome to Relay</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-card text-card-foreground rounded-lg shadow border-4 border-red-500 p-12 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            {currentStep.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {currentStep.description}
          </p>

          {/* Step-specific content */}
          <div className="space-y-4">
            {currentStep.id === 'profile' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                />
              </div>
            )}
            
            {currentStep.id === 'email' && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  We&apos;ll help you connect your email to get started with Relay.
                </p>
              </div>
            )}
            
            {currentStep.id === 'slack' && (
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-input rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground">
                  <span className="mr-2">🔗</span>
                  Connect Slack Workspace
                </button>
                <p className="text-sm text-muted-foreground">
                  Connect your Slack workspace to enable Relay&apos;s communication features.
                </p>
              </div>
            )}
            
            {currentStep.id === 'style' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="style" className="mr-2" />
                    Professional and formal
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="style" className="mr-2" />
                    Friendly and casual
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="style" className="mr-2" />
                    Concise and direct
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleSkipStep}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {currentStep.required ? 'Skip for now' : 'Skip'}
            </button>
            
            <button
              onClick={() => handleStepComplete(currentStep.id)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {currentStep.required ? 'Complete' : 'Done'}
            </button>
          </div>
        </div>

        {/* Steps Overview */}
        <div className="bg-card text-card-foreground rounded-lg shadow border-4 border-blue-500 p-12">
          <h3 className="text-lg font-medium text-card-foreground mb-4">Setup Progress</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : index === currentStepIndex
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    step.completed ? 'text-green-800 dark:text-green-300' : 'text-card-foreground'
                  }`}>
                    {step.title}
                    {step.required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Button */}
        {isCompleted && (
          <div className="mt-6 text-center">
            <button
              onClick={handleGoToInbox}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              Go to Inbox
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
