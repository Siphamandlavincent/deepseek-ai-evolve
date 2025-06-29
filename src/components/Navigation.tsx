
import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-slate-400 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
