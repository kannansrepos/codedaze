'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Code2, Rocket } from 'lucide-react';

const Banner = () =>
{
  return (
    <div className="relative min-h-[600px] xl:min-h-[800px] w-full flex items-center justify-center overflow-hidden">
      {/* Refined Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative flex flex-col gap-12 w-full md:max-w-[90%] lg:max-w-[80%] items-center px-4 py-24">
        {/* Elegant Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-primary-foreground/80 text-xs font-semibold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>The Premium .NET Newsletter</span>
        </div>

        {/* Main Heading - Focused & Powerful */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <h1 className="font-black text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.9]">
            Master the Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              Modern .NET
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Elevate your engineering skills with weekly deep dives into architecture, performance, and cloud-native patterns.
          </p>
        </div>

        {/* Action Area - Refined Subscription */}
        <div className="w-full max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            <Input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 h-14 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            />
            <Button
              type="submit"
              className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started Free
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Rocket className="w-3 h-3" /> Saturday Edition</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="flex items-center gap-1.5"><Code2 className="w-3 h-3" /> Monday Tips</span>
          </div>
        </div>

        {/* Feature Grid - Clean & Minimalist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
          {[
            {
              icon: <Code2 className="w-5 h-5" />,
              title: "Architecture",
              desc: "Deep dives into clean code, DDD, and microservices patterns.",
              color: "text-blue-400"
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Performance",
              desc: "Techniques for building lightning-fast .NET applications.",
              color: "text-indigo-400"
            },
            {
              icon: <Rocket className="w-5 h-5" />,
              title: "Cloud Native",
              desc: "Master Azure, AWS, and modern DevOps for .NET.",
              color: "text-sky-400"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
              <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust/Social Proof - Subtle */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-primary flex items-center justify-center text-[10px] font-bold text-white">
              10K+
            </div>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
            Join <span className="text-slate-300">10,000+</span> engineers leveling up their craft
          </p>
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
