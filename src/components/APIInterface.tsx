
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Send, Key, Activity, Zap } from 'lucide-react';

export const APIInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(`Generated response for: "${prompt}"\n\nThis is a simulated response from the DeepSeek AI model. In a real implementation, this would connect to the actual API endpoint and return the model's generated text based on your prompt.`);
      setLoading(false);
    }, 2000);
  };

  const codeExamples = {
    python: `# DeepSeek API Example
from deepseek import DeepSeekAPI

api = DeepSeekAPI("your_api_key_here")

# Generate text completion
response = api.generate(
    prompt="Explain quantum computing",
    max_tokens=150,
    temperature=0.7
)

print(response['choices'][0]['text'])`,
    
    javascript: `// DeepSeek API Example
const DeepSeekAPI = require('deepseek-api');

const api = new DeepSeekAPI('your_api_key_here');

// Generate text completion
const response = await api.generate({
  prompt: 'Explain quantum computing',
  max_tokens: 150,
  temperature: 0.7
});

console.log(response.choices[0].text);`,
    
    curl: `curl -X POST "https://api.deepseek.ai/v1/generate" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum computing",
    "max_tokens": 150,
    "temperature": 0.7
  }'`
  };

  return (
    <div className="space-y-6">
      {/* API Status */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">API Status</CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">245ms</div>
              <div className="text-slate-400 text-sm">Avg Response</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">1.2M</div>
              <div className="text-slate-400 text-sm">Requests Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Playground */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              API Playground
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">API Key</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Prompt</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                rows={4}
                className="bg-slate-700 border-slate-600 text-white resize-none"
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>

            {response && (
              <div className="space-y-2">
                <Label className="text-slate-300">Response</Label>
                <div className="bg-slate-700 border border-slate-600 rounded-md p-3 text-white text-sm whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Documentation */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Code className="w-5 h-5 mr-2 text-blue-400" />
              Code Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-700">
                <TabsTrigger value="python" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">Python</TabsTrigger>
                <TabsTrigger value="javascript" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">JavaScript</TabsTrigger>
                <TabsTrigger value="curl" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">cURL</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-slate-300">
                      <code>{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoints */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Available Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                  <code className="text-purple-400">/v1/generate</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Generate text completions</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                  <code className="text-purple-400">/v1/fine_tune</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Submit fine-tuning jobs</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500/20 text-blue-400">GET</Badge>
                  <code className="text-purple-400">/v1/status</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Check training status</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-400">POST</Badge>
                  <code className="text-purple-400">/v1/upgrade</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Request model upgrades</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
