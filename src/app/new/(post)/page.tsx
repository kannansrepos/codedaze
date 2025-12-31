'use client';

import { Card, CardContent } from '@/components/ui/card';
import TextEditor from './_components/TextEditor';
import { Sparkles } from 'lucide-react';

const AddNewPost = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Content Creation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Create Post with <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">AI Magic</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Generate professional blog posts in seconds using advanced AI
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <TextEditor />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddNewPost;
