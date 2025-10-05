import { create } from 'zustand';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
}

interface OnboardingState {
  steps: OnboardingStep[];
  currentStepIndex: number;
  isCompleted: boolean;
  
  // Actions
  completeStep: (stepId: string) => void;
  resetOnboarding: () => void;
  setCurrentStep: (index: number) => void;
}

const initialSteps: OnboardingStep[] = [
  {
    id: 'profile',
    title: 'Complete Profile',
    description: 'Add your name and basic information',
    required: true,
    completed: false,
  },
  {
    id: 'email',
    title: 'Email Setup',
    description: 'Connect your email account',
    required: true,
    completed: false,
  },
  {
    id: 'slack',
    title: 'Slack Integration',
    description: 'Connect your Slack workspace',
    required: true,
    completed: false,
  },
  {
    id: 'style',
    title: 'Communication Style',
    description: 'Set your preferences for how Relay should communicate',
    required: false,
    completed: false,
  },
];

export const useOnboardingStore = create<OnboardingState>((set) => ({
  steps: initialSteps,
  currentStepIndex: 0,
  isCompleted: false,

  completeStep: (stepId: string) => {
    set((state) => {
      const updatedSteps = state.steps.map((step) =>
        step.id === stepId ? { ...step, completed: true } : step
      );
      
      const requiredSteps = updatedSteps.filter(step => step.required);
      const completedRequiredSteps = requiredSteps.filter(step => step.completed);
      const isCompleted = completedRequiredSteps.length === requiredSteps.length;
      
      return {
        steps: updatedSteps,
        isCompleted,
      };
    });
  },

  resetOnboarding: () => {
    set({
      steps: initialSteps.map(step => ({ ...step, completed: false })),
      currentStepIndex: 0,
      isCompleted: false,
    });
  },

  setCurrentStep: (index: number) => {
    set({ currentStepIndex: index });
  },
}));

// Selectors
export const getRequiredSteps = (state: OnboardingState) => 
  state.steps.filter(step => step.required);

export const getCompletedRequiredSteps = (state: OnboardingState) => 
  state.steps.filter(step => step.required && step.completed);

export const getCompletionProgress = (state: OnboardingState) => {
  const requiredSteps = getRequiredSteps(state);
  const completedRequiredSteps = getCompletedRequiredSteps(state);
  return requiredSteps.length > 0 ? completedRequiredSteps.length / requiredSteps.length : 0;
};
