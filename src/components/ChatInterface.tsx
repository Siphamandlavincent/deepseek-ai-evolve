
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, AlertCircle, Brain } from 'lucide-react';
import { useConversationMemory } from '@/hooks/useConversationMemory';
import { FeedbackButtons } from '@/components/FeedbackButtons';

// Declare puter as a global variable
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string) => Promise<string>;
      };
      print: (message: string) => void;
    };
  }
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m DeepSeek AI with advanced learning capabilities powered by GPT-4o. I can remember our conversations, learn from your feedback, and continuously improve. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPuterLoaded, setIsPuterLoaded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { saveConversation, addFeedback, getContextualPrompt } = useConversationMemory();

  // Load Puter.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.onload = () => {
      setIsPuterLoaded(true);
    };
    script.onerror = () => {
      setError('Failed to load Puter.js. Please check your internet connection.');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isPuterLoaded) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Get contextual prompt with conversation history
      const contextualPrompt = getContextualPrompt(currentInput);
      
      // Use puter.ai.chat() for GPT-4o text generation
      const response = await window.puter.ai.chat(contextualPrompt);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Extract potential knowledge from the conversation
      let learnedKnowledge = '';
      if (currentInput.includes('remember') || currentInput.includes('important')) {
        learnedKnowledge = `User mentioned: ${currentInput}`;
      }
      
      // Save conversation to memory
      await saveConversation(currentInput, response, learnedKnowledge);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to get AI response from GPT-4o.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble connecting to the GPT-4o service right now. Please try again in a moment.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
    addFeedback(messageId, feedback);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl h-[600px] flex flex-col">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="w-5 h-5 text-purple-400" />
                <Brain className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
              </div>
              Chat with GPT-4o Learning AI
            </div>
            <div className="flex items-center gap-2">
              {!isPuterLoaded && (
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Loading Puter.js...
                </div>
              )}
              {error && (
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Connection Error
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700/50 text-slate-200 border border-slate-600/50'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {message.sender === 'ai' && (
                      <FeedbackButtons
                        messageId={message.id}
                        onFeedback={handleFeedback}
                        currentFeedback={message.feedback}
                      />
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t border-slate-700/50 p-4">
            {error && (
              <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            {!isPuterLoaded && (
              <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                Loading Puter.js library for GPT-4o integration...
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 min-h-[60px] max-h-[120px] bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 resize-none"
                disabled={!isPuterLoaded}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !isPuterLoaded}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
