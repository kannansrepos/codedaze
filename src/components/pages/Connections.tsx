import SocialLinks from '../posts/SocialLinks';
import { CheckCircle2, Users } from 'lucide-react';


const Connections = () =>
{
  const benefits = [
    ".NET Insights",
    "Architecture Deep Dives",
    "Real-world Coding Tips"
  ];

  return (
    <div className="w-full py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Join the Community</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Let’s <span className="text-primary">Connect</span> & Collaborate
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Join me across social channels where I share expert takeaways for modern software engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex items-center gap-3 transition-colors hover:bg-white/[0.04]"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-white font-bold text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="w-full pt-4">
              <div className="inline-block p-6 bg-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/[0.05]">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
