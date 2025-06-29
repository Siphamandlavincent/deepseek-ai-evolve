
import React, { useState } from 'react';
import { ModelConfig } from '@/components/ModelConfig';
import { TrainingDashboard } from '@/components/TrainingDashboard';
import { APIInterface } from '@/components/APIInterface';
import { UpgradeManager } from '@/components/UpgradeManager';
import { ChatInterface } from '@/components/ChatInterface';
import { Navigation } from '@/components/Navigation';
import { Brain, Cpu, Code, ArrowUp, MessageSquare } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('model');

  const tabs = [
    { id: 'model', label: 'Model Config', icon: Brain },
    { id: 'training', label: 'Training', icon: Cpu },
    { id: 'api', label: 'API Interface', icon: Code },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'upgrade', label: 'Upgrades', icon: ArrowUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DeepSeek AI</h1>
                <p className="text-slate-400 text-sm">Advanced AI Training Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <span className="text-green-400 text-sm font-medium">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'model' && <ModelConfig />}
        {activeTab === 'training' && <TrainingDashboard />}
        {activeTab === 'api' && <APIInterface />}
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'upgrade' && <UpgradeManager />}
      </div>
    </div>
  );
};

export default Index;
