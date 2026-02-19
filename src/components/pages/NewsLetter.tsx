'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Rocket, Sparkles } from 'lucide-react';

const NewsLetter = () =>
{
  return (
    <div className="flex items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[85%] xl:w-[75%] bg-white/[0.02] backdrop-blur-xl p-10 md:p-20 rounded-[3rem] border border-white/[0.05] flex flex-col items-center text-center gap-10 relative z-10 overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="space-y-6 max-w-3xl relative">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <Rocket className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Engineering</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Join 10,000+ developers receiving our weekly deep-dives into cloud architecture, performance, and modern .NET.
          </p>
        </div>

        <motion.div
          className="w-full max-w-xl flex flex-col sm:flex-row gap-3 p-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Input
            type="email"
            placeholder="jason@company.com"
            className="flex-1 h-14 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-6"
          />
          <Button className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group">
            Free Subscribe
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>

        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-white/[0.02] py-3 px-8 rounded-full border border-white/[0.05]">
          <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-primary" /> No Spam</span>
          <span className="w-1 h-1 rounded-full bg-slate-800" />
          <span>One-Click Unsubscribe</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
