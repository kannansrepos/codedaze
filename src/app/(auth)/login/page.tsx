'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, Github, Sparkles, ChevronRight, User } from 'lucide-react';

const LoginPage = () =>
{
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const logos = {
    google: '/images/logos/google.svg',
    github: '/images/logos/github.svg',
  };

  const handleSignIn = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    });

    setLoading(true);

    if (result?.error)
    {
      toast.error('Identity verification failed.');
      console.error('Login error:', result.error);
    } else
    {
      toast.success('Welcome back to CodeDaze!');
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-30 animate-pulse transition-all duration-[10s]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-20 animate-pulse transition-all duration-[15s]" />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
              <Sparkles className="w-4 h-4" />
              <span>Join the Engineering Elite</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                Sign <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">In</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.15em] text-[11px] leading-relaxed max-w-[300px] mx-auto">
                Authenticate to access curated engineering insights and blueprints
              </p>
            </div>
          </div>

          {/* Login Card - Premium Glassmorphism */}
          <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/[0.08] p-10 lg:p-12 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />

            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white tracking-tight">Account Sync</h2>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Enter your credentials</p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-2 block">Email Protocol</label>
                <Input
                  className="w-full bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary/20 rounded-2xl h-16 px-8 transition-all shadow-inner text-sm font-medium"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3 relative">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] block">Security Key</label>
                  <a href="#" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white transition-all">Recover Pin</a>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary/20 rounded-2xl h-16 px-8 transition-all shadow-inner text-sm font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl shadow-[0_12px_40px_-5px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_50px_-5px_rgba(var(--primary),0.4)] transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      <span className="uppercase text-xs tracking-[0.3em]">Processing...</span>
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.3em] font-black">
                      Authorize Access
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
                </Button>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">or via external nodes</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => signIn('google')}
                  className="h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all font-black text-[10px] uppercase tracking-widest text-white flex items-center gap-3"
                >
                  <Image
                    src={logos.google}
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5 opacity-80"
                  />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => signIn('github')}
                  className="h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all font-black text-[10px] uppercase tracking-widest text-white flex items-center gap-3"
                >
                  <Image
                    src={logos.github}
                    alt="Github"
                    width={20}
                    height={20}
                    className="w-5 h-5 opacity-80 invert"
                  />
                  Github
                </Button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] max-w-[280px] mx-auto leading-relaxed">
              Secure Session Encrypted with CodeDaze Protocol v3.1
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;

const Loader2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
  </svg>
);
