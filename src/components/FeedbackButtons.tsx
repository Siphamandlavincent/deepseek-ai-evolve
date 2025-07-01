
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackButtonsProps {
  messageId: string;
  onFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  currentFeedback?: 'positive' | 'negative';
}

export const FeedbackButtons = ({ messageId, onFeedback, currentFeedback }: FeedbackButtonsProps) => {
  return (
    <div className="flex gap-1 mt-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFeedback(messageId, 'positive')}
        className={`h-6 w-6 p-0 hover:bg-green-500/20 ${
          currentFeedback === 'positive' ? 'bg-green-500/30 text-green-400' : 'text-slate-400'
        }`}
      >
        <ThumbsUp className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFeedback(messageId, 'negative')}
        className={`h-6 w-6 p-0 hover:bg-red-500/20 ${
          currentFeedback === 'negative' ? 'bg-red-500/30 text-red-400' : 'text-slate-400'
        }`}
      >
        <ThumbsDown className="w-3 h-3" />
      </Button>
    </div>
  );
};
