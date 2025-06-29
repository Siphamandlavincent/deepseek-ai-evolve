
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings, Layers, Zap, Database } from 'lucide-react';

export const ModelConfig = () => {
  const [config, setConfig] = useState({
    vocabSize: 128000,
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    intermediateSize: 16384,
    maxPositionEmbeddings: 8192,
    hiddenAct: 'gelu',
    architecture: 'GPTNeoX'
  });

  const architectures = ['GPTNeoX', 'Transformer-XL', 'PaLM', 'LLaMA'];
  const activations = ['gelu', 'relu', 'swish', 'geglu'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Overview */}
        <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-white">Model Architecture Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.numLayers}</div>
                <div className="text-slate-400 text-sm">Layers</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.numHeads}</div>
                <div className="text-slate-400 text-sm">Attention Heads</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(config.vocabSize / 1000).toFixed(0)}K</div>
                <div className="text-slate-400 text-sm">Vocab Size</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                <Settings className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{config.hiddenSize}</div>
                <div className="text-slate-400 text-sm">Hidden Size</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Parameters */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Core Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Architecture</Label>
                <Select value={config.architecture} onValueChange={(value) => setConfig({...config, architecture: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {architectures.map((arch) => (
                      <SelectItem key={arch} value={arch} className="text-white hover:bg-slate-600">
                        {arch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Activation Function</Label>
                <Select value={config.hiddenAct} onValueChange={(value) => setConfig({...config, hiddenAct: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {activations.map((act) => (
                      <SelectItem key={act} value={act} className="text-white hover:bg-slate-600">
                        {act}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Number of Layers: {config.numLayers}</Label>
                <Slider
                  value={[config.numLayers]}
                  onValueChange={([value]) => setConfig({...config, numLayers: value})}
                  max={64}
                  min={8}
                  step={4}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-300">Attention Heads: {config.numHeads}</Label>
                <Slider
                  value={[config.numHeads]}
                  onValueChange={([value]) => setConfig({...config, numHeads: value})}
                  max={64}
                  min={8}
                  step={4}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Vocab Size</Label>
                <Input
                  type="number"
                  value={config.vocabSize}
                  onChange={(e) => setConfig({...config, vocabSize: parseInt(e.target.value)})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Hidden Size</Label>
                <Input
                  type="number"
                  value={config.hiddenSize}
                  onChange={(e) => setConfig({...config, hiddenSize: parseInt(e.target.value)})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Advanced</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Intermediate Size</Label>
              <Input
                type="number"
                value={config.intermediateSize}
                onChange={(e) => setConfig({...config, intermediateSize: parseInt(e.target.value)})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Max Position Embeddings</Label>
              <Input
                type="number"
                value={config.maxPositionEmbeddings}
                onChange={(e) => setConfig({...config, maxPositionEmbeddings: parseInt(e.target.value)})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="pt-4 space-y-2">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                Optimized Attention
              </Badge>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Knowledge Graph
              </Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                Enhanced Training
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Save Configuration
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Initialize Model
        </Button>
      </div>
    </div>
  );
};
