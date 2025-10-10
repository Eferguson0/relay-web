'use client';

import { useState } from 'react';
import DraftTypeSelector, { DraftType } from './DraftTypeSelector';
import DraftField from './DraftField';
import NewDraftButton from './NewDraftButton';

interface DraftComposerProps {
  onSubmit?: (data: { type: DraftType; context: string; instructions: string }) => void;
}

export default function DraftComposer({ onSubmit }: DraftComposerProps) {
  const [draftType, setDraftType] = useState<DraftType>('doc');
  const [context, setContext] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ type: draftType, context, instructions });
  };

  return (
    <div className="space-y-6 flex flex-col">
      {/* Draft Type Selector */}
      <DraftTypeSelector 
        value={draftType}
        onChange={setDraftType}
      />

      {/* Fields Container */}
      <div className="space-y-6">
        {/* Context Field - Larger */}
        <DraftField
          label="Context"
          rows={14}
          placeholder="Paste conversations, meeting notes, transcripts, message drafts, or a brief summary to provide context for the message to be drafted."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />

        {/* Instructions Field - Smaller */}
        <DraftField
          label="Instructions"
          rows={2}
          placeholder="E.g., summarize the key points, create an action plan, ask for clarification..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      {/* Draft Button */}
      <div className="flex justify-center pt-2">
        <NewDraftButton 
          onClick={handleSubmit}
          disabled={!context.trim() && !instructions.trim()}
        >
          Draft
        </NewDraftButton>
      </div>
    </div>
  );
}

