
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Conversation {
  id: string;
  user_message: string;
  ai_response: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative';
  learned_knowledge?: string;
}

export const useConversationMemory = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>([]);

  const saveConversation = async (userMessage: string, aiResponse: string, learnedKnowledge?: string) => {
    const conversation = {
      id: Date.now().toString(),
      user_message: userMessage,
      ai_response: aiResponse,
      timestamp: new Date(),
      learned_knowledge: learnedKnowledge
    };

    // Store in local state
    setConversations(prev => [...prev, conversation]);

    // Store in localStorage as backup
    const stored = localStorage.getItem('ai_conversations') || '[]';
    const existing = JSON.parse(stored);
    existing.push(conversation);
    localStorage.setItem('ai_conversations', JSON.stringify(existing));

    if (learnedKnowledge) {
      const newKnowledge = [...knowledgeBase, learnedKnowledge];
      setKnowledgeBase(newKnowledge);
      localStorage.setItem('ai_knowledge_base', JSON.stringify(newKnowledge));
    }
  };

  const addFeedback = (conversationId: string, feedback: 'positive' | 'negative') => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId ? { ...conv, feedback } : conv
      )
    );

    // Update localStorage
    const stored = localStorage.getItem('ai_conversations') || '[]';
    const existing = JSON.parse(stored);
    const updated = existing.map((conv: any) => 
      conv.id === conversationId ? { ...conv, feedback } : conv
    );
    localStorage.setItem('ai_conversations', JSON.stringify(updated));
  };

  const getContextualPrompt = (currentMessage: string) => {
    const recentConversations = conversations.slice(-5);
    const relevantKnowledge = knowledgeBase.slice(-10);
    
    let contextPrompt = `Previous context:\n`;
    
    if (recentConversations.length > 0) {
      contextPrompt += `Recent conversations:\n`;
      recentConversations.forEach(conv => {
        contextPrompt += `User: ${conv.user_message}\nAI: ${conv.ai_response}\n\n`;
      });
    }

    if (relevantKnowledge.length > 0) {
      contextPrompt += `Learned knowledge:\n${relevantKnowledge.join('\n')}\n\n`;
    }

    contextPrompt += `Current message: ${currentMessage}`;
    return contextPrompt;
  };

  useEffect(() => {
    // Load from localStorage on mount
    const storedConversations = localStorage.getItem('ai_conversations');
    const storedKnowledge = localStorage.getItem('ai_knowledge_base');
    
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
    
    if (storedKnowledge) {
      setKnowledgeBase(JSON.parse(storedKnowledge));
    }
  }, []);

  return {
    conversations,
    knowledgeBase,
    saveConversation,
    addFeedback,
    getContextualPrompt
  };
};
