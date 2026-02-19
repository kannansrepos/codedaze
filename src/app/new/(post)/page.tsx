'use client';

import { Card, CardContent } from '@/components/ui/card';
import TextEditor from './_components/TextEditor';
import { Sparkles } from 'lucide-react';

const AddNewPost = () =>
{
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.1] text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Content Engine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            Create with <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">AI Magic</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Generate professional technical articles and architectures in seconds using advanced engineering-trained AI models.
          </p>
        </div>

        {/* Main Card - Premium Glassmorphism */}
        <div className="bg-white/[0.01] backdrop-blur-2xl border border-white/[0.05] rounded-[3rem] shadow-3xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

          <div className="p-8 md:p-12">
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
