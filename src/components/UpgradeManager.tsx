
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, ArrowUp, Shield, Zap, Cpu, AlertTriangle } from 'lucide-react';

export const UpgradeManager = () => {
  const [currentVersion] = useState('1.2.0');
  const [latestVersion] = useState('1.3.0');
  const [upgradeProgress, setUpgradeProgress] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState('');

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    const steps = [
      'Connecting to upgrade server...',
      'Verifying upgrade package...',
      'Downloading upgrade files...',
      'Applying security patches...',
      'Updating model architecture...',
      'Restarting services...',
      'Upgrade completed!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setUpgradeStep(steps[i]);
      setUpgradeProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setTimeout(() => {
      setIsUpgrading(false);
      setUpgradeProgress(0);
      setUpgradeStep('');
    }, 2000);
  };

  const availableUpgrades = [
    {
      component: 'Core Architecture',
      current: '1.2.0',
      available: '1.3.0',
      status: 'available',
      description: 'Enhanced attention mechanisms and improved training stability',
      icon: Cpu,
      priority: 'high'
    },
    {
      component: 'Security Module',
      current: '1.1.5',
      available: '1.2.0',
      status: 'available',
      description: 'Critical security patches and authentication improvements',
      icon: Shield,
      priority: 'critical'
    },
    {
      component: 'Performance Optimizer',
      current: '2.0.1',
      available: '2.1.0',
      status: 'available',
      description: 'Faster inference and reduced memory footprint',
      icon: Zap,
      priority: 'medium'
    }
  ];

  const recentUpgrades = [
    {
      version: '1.2.0',
      date: '2024-06-15',
      status: 'completed',
      changes: ['Knowledge graph integration', 'Enhanced training callbacks', 'API v1.2 release']
    },
    {
      version: '1.1.8',
      date: '2024-06-01',
      status: 'completed',
      changes: ['Bug fixes', 'Performance improvements', 'Documentation updates']
    },
    {
      version: '1.1.5',
      date: '2024-05-20',
      status: 'completed',
      changes: ['Security patches', 'Memory optimization', 'Training stability improvements']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Version Overview */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">System Version</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <div className="text-3xl font-bold text-white mb-2">{currentVersion}</div>
              <div className="text-blue-400 text-sm">Current Version</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="text-3xl font-bold text-white mb-2">{latestVersion}</div>
              <div className="text-green-400 text-sm">Latest Available</div>
            </div>
            <div className="flex items-center justify-center">
              <Button 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
              >
                {isUpgrading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Upgrading...
                  </div>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Upgrade System
                  </>
                )}
              </Button>
            </div>
          </div>

          {isUpgrading && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">{upgradeStep}</span>
                <span className="text-slate-300 text-sm">{upgradeProgress.toFixed(0)}%</span>
              </div>
              <Progress value={upgradeProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Upgrades */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Available Upgrades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableUpgrades.map((upgrade, index) => {
              const Icon = upgrade.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      upgrade.priority === 'critical' 
                        ? 'bg-red-500/20 border border-red-500/30' 
                        : upgrade.priority === 'high'
                        ? 'bg-orange-500/20 border border-orange-500/30'
                        : 'bg-blue-500/20 border border-blue-500/30'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        upgrade.priority === 'critical' 
                          ? 'text-red-400' 
                          : upgrade.priority === 'high'
                          ? 'text-orange-400'
                          : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-medium">{upgrade.component}</h3>
                        <Badge variant={
                          upgrade.priority === 'critical' ? 'destructive' :
                          upgrade.priority === 'high' ? 'default' : 'secondary'
                        }>
                          {upgrade.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{upgrade.description}</p>
                      <div className="text-xs text-slate-500">
                        {upgrade.current} → {upgrade.available}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade History */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Recent Upgrades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUpgrades.map((upgrade, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg">
                <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Version {upgrade.version}</h3>
                    <span className="text-slate-400 text-sm">{upgrade.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {upgrade.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="text-slate-400 text-sm">
                        • {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Core System</span>
                <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">API Services</span>
                <Badge className="bg-green-500/20 text-green-400">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Training Pipeline</span>
                <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Security Status</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Updates Available
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Performance</span>
                <Badge className="bg-green-500/20 text-green-400">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Storage</span>
                <Badge className="bg-green-500/20 text-green-400">78% Used</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
