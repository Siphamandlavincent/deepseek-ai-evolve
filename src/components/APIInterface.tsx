
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Send, Key, Activity, Zap, AlertCircle } from 'lucide-react';

// Declare puter as a global variable
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string) => Promise<string>;
      };
    };
  }
}

export const APIInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPuterLoaded, setIsPuterLoaded] = useState(false);

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

  const handleGenerate = async () => {
    if (!prompt.trim() || !isPuterLoaded) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await window.puter.ai.chat(prompt);
      setResponse(result);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to generate response using GPT-4o. Please try again.');
      setResponse('Error: Unable to generate response using GPT-4o via Puter.js');
    } finally {
      setLoading(false);
    }
  };

  const codeExamples = {
    javascript: `// GPT-4o with Puter.js Example
// Load the Puter.js library
<script src="https://js.puter.com/v2/"></script>

// Generate text with GPT-4o
puter.ai.chat("Explain quantum computing")
  .then(response => {
    console.log(response);
    // Use the response in your app
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
    
    html: `<!DOCTYPE html>
<html>
<head>
    <title>GPT-4o with Puter.js</title>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat("What are the benefits of exercise?")
            .then(response => {
                puter.print(response);
                document.body.innerHTML += '<p>' + response + '</p>';
            });
    </script>
</body>
</html>`,
    
    react: `// React Component with GPT-4o
import { useState, useEffect } from 'react';

export default function GPTChat() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Puter.js
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    document.head.appendChild(script);
  }, []);

  const handleChat = async (prompt) => {
    setLoading(true);
    try {
      const result = await window.puter.ai.chat(prompt);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => handleChat("Hello GPT-4o!")}>
        Chat with GPT-4o
      </button>
      {loading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
}`
  };

  return (
    <div className="space-y-6">
      {/* API Status */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">GPT-4o API Status</CardTitle>
            <Badge className={`${isPuterLoaded ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
              <Activity className="w-3 h-3 mr-1" />
              {isPuterLoaded ? 'Online' : 'Loading...'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">GPT-4o</div>
              <div className="text-slate-400 text-sm">Model</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">Puter.js</div>
              <div className="text-slate-400 text-sm">API Layer</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">Free</div>
              <div className="text-slate-400 text-sm">No API Key</div>
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
              GPT-4o Playground
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              disabled={loading || !prompt.trim() || !isPuterLoaded}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating with GPT-4o...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate with GPT-4o
                </>
              )}
            </Button>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {!isPuterLoaded && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                Loading Puter.js library for GPT-4o integration...
              </div>
            )}

            {response && (
              <div className="space-y-2">
                <Label className="text-slate-300">GPT-4o Response</Label>
                <div className="bg-slate-700 border border-slate-600 rounded-md p-3 text-white text-sm whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Code className="w-5 h-5 mr-2 text-blue-400" />
              GPT-4o Code Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-700">
                <TabsTrigger value="javascript" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">JavaScript</TabsTrigger>
                <TabsTrigger value="html" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">HTML</TabsTrigger>
                <TabsTrigger value="react" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-600">React</TabsTrigger>
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

      {/* API Features */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">GPT-4o Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-400">FREE</Badge>
                  <code className="text-purple-400">puter.ai.chat()</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">No API key required - powered by Puter.js</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500/20 text-blue-400">ADVANCED</Badge>
                  <code className="text-purple-400">GPT-4o Model</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Latest OpenAI model with enhanced capabilities</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-500/20 text-purple-400">INTEGRATED</Badge>
                  <code className="text-purple-400">Learning Memory</code>
                </div>
                <p className="text-slate-400 text-sm mt-1">Conversation history and user feedback learning</p>
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
