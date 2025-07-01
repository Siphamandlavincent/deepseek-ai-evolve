
import { useState, useEffect } from 'react';

interface TrainingMetrics {
  totalConversations: number;
  positiveFeedback: number;
  negativeFeedback: number;
  knowledgeItems: number;
  learningRate: number;
  accuracyScore: number;
  lastUpdated: Date;
}

export const useTrainingMetrics = () => {
  const [metrics, setMetrics] = useState<TrainingMetrics>({
    totalConversations: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
    knowledgeItems: 0,
    learningRate: 0.001,
    accuracyScore: 85.2,
    lastUpdated: new Date()
  });

  const updateMetrics = () => {
    const conversations = JSON.parse(localStorage.getItem('ai_conversations') || '[]');
    const knowledge = JSON.parse(localStorage.getItem('ai_knowledge_base') || '[]');
    
    const positive = conversations.filter((c: any) => c.feedback === 'positive').length;
    const negative = conversations.filter((c: any) => c.feedback === 'negative').length;
    const total = conversations.length;
    
    const newAccuracy = total > 0 ? ((positive / total) * 100) : 85.2;
    const newLearningRate = Math.max(0.0001, 0.001 - (total * 0.000001));

    setMetrics({
      totalConversations: total,
      positiveFeedback: positive,
      negativeFeedback: negative,
      knowledgeItems: knowledge.length,
      learningRate: newLearningRate,
      accuracyScore: newAccuracy,
      lastUpdated: new Date()
    });
  };

  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return { metrics, updateMetrics };
};
