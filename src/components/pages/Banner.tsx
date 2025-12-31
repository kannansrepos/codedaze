'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MailIcon, Sparkles, Code2, Rocket } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative min-h-[600px] xl:min-h-[720px] w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col gap-8 w-full md:max-w-[90%] lg:max-w-[70%] items-center px-4 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Your Weekly Dose of .NET Excellence</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl text-white leading-tight">
            <span className="block mb-2">Power Up Your</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text animate-gradient">
              .NET Skills
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 max-w-3xl mx-auto">
            Fresh Tips Every <span className="text-blue-400">Saturday</span> & <span className="text-purple-400">Monday</span>
          </p>
        </div>

        {/* Email Subscription */}
        <div className="w-full max-w-md space-y-4 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <Button
              type="submit"
              className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <MailIcon className="w-4 h-4 mr-2" />
              Join Free
            </Button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Join <span className="font-semibold text-white">10,000+</span> developers getting weekly .NET insights
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Real-World Examples
            </h3>
            <p className="text-sm text-gray-400">
              Practical .NET content like MCP in .NET and high-performance import features
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Start Week Strong
            </h3>
            <p className="text-sm text-gray-400">
              Monday mornings bring fresh, actionable .NET tips to fuel your productivity
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Deep Dives & Architecture
            </h3>
            <p className="text-sm text-gray-400">
              Complex topics made accessible with clear guidance and code samples
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-6 mt-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-red-500 border-2 border-white"></div>
            </div>
            <span className="text-sm text-gray-300">Trusted by developers worldwide</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-300">4.9/5 rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Banner;
