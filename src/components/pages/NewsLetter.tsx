'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Rocket, Sparkles } from 'lucide-react';

const NewsLetter = () => {
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-3/4 xl:w-2/3 bg-white/[0.05] backdrop-blur-2xl text-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-8 md:p-14 rounded-[2.5rem] border border-white/20 flex flex-col items-center text-center gap-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="bg-primary/20 p-4 rounded-2xl"
        >
          <Rocket className="w-10 h-10 text-primary" />
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            🚀 Power Up Your <span className="text-primary">.NET</span> Engineering
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Join a community of forward-thinking developers. Get weekly deep-dives into cloud architecture and fullstack mastery.
          </p>
        </div>

        <motion.div
          className="w-full max-w-lg flex flex-col md:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative flex-grow group">
            <Input
              type="email"
              placeholder="Enter your professional email"
              className="w-full h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 px-6 text-lg"
            />
          </div>
          <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group whitespace-nowrap">
            Join Now
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 text-sm text-gray-500 bg-white/5 py-2 px-4 rounded-full"
        >
          <Sparkles className="w-4 h-4 text-primary/70" />
          <span>No spam. One-click unsubscribe. Pure engineering value.</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
