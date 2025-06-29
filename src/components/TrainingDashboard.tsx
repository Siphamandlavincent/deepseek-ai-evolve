
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, Square, Activity, Clock, Zap, Database } from 'lucide-react';

export const TrainingDashboard = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [currentStep, setCurrentStep] = useState(12750);
  const [totalSteps] = useState(500000);
  const [loss, setLoss] = useState(2.4);
  const [trainingData, setTrainingData] = useState([
    { step: 0, loss: 4.2, perplexity: 67 },
    { step: 2500, loss: 3.8, perplexity: 45 },
    { step: 5000, loss: 3.4, perplexity: 30 },
    { step: 7500, loss: 3.0, perplexity: 20 },
    { step: 10000, loss: 2.6, perplexity: 13 },
    { step: 12500, loss: 2.4, perplexity: 11 }
  ]);

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setCurrentStep(prev => Math.min(prev + 10, totalSteps));
        setLoss(prev => Math.max(prev - 0.001, 1.2));
        
        if (Math.random() < 0.3) {
          setTrainingData(prev => {
            const newData = [...prev];
            if (newData.length > 20) newData.shift();
            newData.push({
              step: currentStep,
              loss: loss,
              perplexity: Math.exp(loss)
            });
            return newData;
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTraining, currentStep, loss]);

  const progress = (currentStep / totalSteps) * 100;
  const eta = Math.round((totalSteps - currentStep) / 100);

  return (
    <div className="space-y-6">
      {/* Training Controls */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Training Control</CardTitle>
            <Badge variant={isTraining ? "default" : "secondary"} className={isTraining ? "bg-green-500" : "bg-slate-600"}>
              {isTraining ? "Training" : "Stopped"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsTraining(!isTraining)}
              className={`${isTraining ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isTraining ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isTraining ? 'Pause' : 'Start'} Training
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
            <div className="flex-1 ml-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm">Progress</span>
                <span className="text-slate-300 text-sm">{currentStep.toLocaleString()} / {totalSteps.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300 text-sm">Current Loss</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{loss.toFixed(3)}</div>
            <div className="text-purple-400 text-sm">↓ 0.01 from last checkpoint</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 text-sm">Learning Rate</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">6e-5</div>
            <div className="text-blue-400 text-sm">Cosine decay schedule</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 text-sm">Batch Size</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">128</div>
            <div className="text-green-400 text-sm">8 × 16 accumulation</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-slate-300 text-sm">ETA</span>
            </div>
            <div className="text-3xl font-bold text-white mt-2">{eta}h</div>
            <div className="text-orange-400 text-sm">At current rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Training Chart */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="step" 
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `${value/1000}K`}
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
                  dataKey="loss" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="Training Loss"
                />
                <Line 
                  type="monotone" 
                  dataKey="perplexity" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                  name="Perplexity"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Training Configuration */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Current Training Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Dataset:</span>
                <span className="text-white">deepseek/pretrain_data</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Optimizer:</span>
                <span className="text-white">AdamW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Mixed Precision:</span>
                <Badge className="bg-green-500/20 text-green-400">FP16</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Gradient Clipping:</span>
                <span className="text-white">1.0</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Save Interval:</span>
                <span className="text-white">10,000 steps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Logging Interval:</span>
                <span className="text-white">100 steps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Optimizations:</span>
                <Badge className="bg-purple-500/20 text-purple-400">DeepSeek Enhanced</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Knowledge Graph:</span>
                <Badge className="bg-blue-500/20 text-blue-400">Enabled</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
