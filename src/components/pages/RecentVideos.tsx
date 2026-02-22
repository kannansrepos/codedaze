'use client';

import { Youtube, ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const RecentVideos = () =>
{
  const [isPlaying, setIsPlaying] = useState(false);
  const video = {
    id: 'mM5icOG7sxI',
    title: 'Build an AI App with Semantic Kernel in C# | Step-by-Step Tutorial',
    thumbnail: 'https://i.ytimg.com/vi/mM5icOG7sxI/maxresdefault.jpg',
  };

  return (
    <section className="w-full py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[3rem] p-8 md:p-16 shadow-2xl relative z-10 overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col gap-12 items-center">
            {/* Header - Refined & Focused */}
            <div className="text-center space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Youtube className="w-3.5 h-3.5" />
                <span>Premium Video Tutorials</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Watch & <span className="text-red-500/90">Code</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed leading-7">
                Visual guides on cloud architecture, .NET performance, and modern engineering practices.
              </p>
            </div>

            {/* Video Player Container - Cinematic Frame */}
            <div className="w-full max-w-[960px] aspect-video relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 via-white/5 to-primary/10 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              <div className="relative h-full w-full bg-black rounded-[1.5rem] overflow-hidden border border-white/10 shadow-3xl">
                {!isPlaying ? (
                  <div
                    className="relative w-full h-full cursor-pointer group/player"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover grayscale-[0.2] group-hover/player:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 960px) 100vw, 960px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/player:bg-black/10 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-600/50 group-hover/player:scale-110 transition-transform duration-500">
                        <Play className="w-8 h-8 fill-current translate-x-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>
            </div>

            {/* Action - Clean & Impactful */}
            <a
              href="https://youtube.com/@CodeDaze"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white font-black bg-red-600/90 hover:bg-red-600 px-10 py-5 rounded-2xl transition-all hover:scale-[1.02] shadow-2xl shadow-red-600/20 text-sm uppercase tracking-widest"
            >
              <Youtube className="w-5 h-5" />
              Join the Channel
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentVideos;
