
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, Square, Activity, Clock, Zap, Database, Brain, TrendingUp } from 'lucide-react';
import { useTrainingMetrics } from '@/hooks/useTrainingMetrics';

export const TrainingDashboard = () => {
  const [isLearning, setIsLearning] = useState(true);
  const { metrics } = useTrainingMetrics();
  const [learningData, setLearningData] = useState([
    { conversation: 0, accuracy: 85.2, knowledge: 0 },
    { conversation: 5, accuracy: 87.1, knowledge: 2 },
    { conversation: 10, accuracy: 89.3, knowledge: 5 },
    { conversation: 15, accuracy: 91.8, knowledge: 8 },
    { conversation: 20, accuracy: 93.4, knowledge: 12 }
  ]);

  useEffect(() => {
    if (metrics.totalConversations > 0) {
      setLearningData(prev => {
        const newData = [...prev];
        if (newData.length > 20) newData.shift();
        newData.push({
          conversation: metrics.totalConversations,
          accuracy: metrics.accuracyScore,
          knowledge: metrics.knowledgeItems
        });
        return newData;
      });
    }
  }, [metrics]);

  const learningProgress = Math.min((metrics.totalConversations / 100) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Learning Control */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Adaptive Learning System
            </CardTitle>
            <Badge variant={isLearning ? "default" : "secondary"} className={isLearning ? "bg-green-500" : "bg-slate-600"}>
              {isLearning ? "Learning Active" : "Learning Paused"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsLearning(!isLearning)}
              className={`${isLearning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isLearning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isLearning ? 'Pause' : 'Resume'} Learning
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Square className="w-4 h-4 mr-2" />
              Reset Memory
            </Button>
            <div className="flex-1 ml-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Learning Progress</span>
                <span className="text-slate-300 text-sm">{metrics.totalConversations} conversations</span>
              </div>
              <Progress value={learningProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300 text-sm">Accuracy Score</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{metrics.accuracyScore.toFixed(1)}%</div>
            <div className="text-purple-400 text-sm">Based on user feedback</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 text-sm">Total Conversations</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{metrics.totalConversations}</div>
            <div className="text-blue-400 text-sm">Learning interactions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 text-sm">Knowledge Items</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{metrics.knowledgeItems}</div>
            <div className="text-green-400 text-sm">Learned facts stored</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-slate-300 text-sm">Learning Rate</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{metrics.learningRate.toFixed(4)}</div>
            <div className="text-orange-400 text-sm">Adaptive rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress Chart */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Learning Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={learningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="conversation" 
                  stroke="#9CA3AF"
                  label={{ value: 'Conversations', position: 'insideBottom', offset: -5 }}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="Accuracy %"
                />
                <Line 
                  type="monotone" 
                  dataKey="knowledge" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                  name="Knowledge Items"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">User Feedback Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Positive Feedback</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${metrics.totalConversations > 0 ? (metrics.positiveFeedback / metrics.totalConversations) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-white text-sm">{metrics.positiveFeedback}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Negative Feedback</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${metrics.totalConversations > 0 ? (metrics.negativeFeedback / metrics.totalConversations) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-white text-sm">{metrics.negativeFeedback}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Learning Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Memory Retention:</span>
                <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Contextual Learning:</span>
                <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Feedback Processing:</span>
                <Badge className="bg-purple-500/20 text-purple-400">Real-time</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Knowledge Base:</span>
                <span className="text-white">{metrics.knowledgeItems} items</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
