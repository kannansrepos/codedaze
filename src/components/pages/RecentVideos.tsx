import { Youtube, ExternalLink } from 'lucide-react';

const RecentVideos = () => {
  const video = {
    src: 'https://www.youtube.com/embed/mM5icOG7sxI',
    title: 'Build an AI App with Semantic Kernel in C# | Step-by-Step Tutorial',
  };
  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="bg-[#111827]/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative z-10">
          <div className="flex flex-col gap-10 items-center">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
                <Youtube className="w-4 h-4" />
                <span>Latest Content</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white capitalize">
                Mastering <span className="text-red-500">.NET</span> on YouTube
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                Visual tutorials on scaling architecture, AI integration, and fullstack performance.
              </p>
            </div>

            {/* Video Player Container */}
            <div className="w-full max-w-[900px] aspect-video relative group">
              {/* Cinematic Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative h-full w-full bg-black rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Call to Action */}
            <a
              href="https://youtube.com/@CodeDaze"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white font-bold bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-red-600/20"
            >
              <Youtube className="w-5 h-5" />
              Subscribe for More
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentVideos;
