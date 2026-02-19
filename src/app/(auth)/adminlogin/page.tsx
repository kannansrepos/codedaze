/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ChevronRight, Fingerprint, Loader2 } from 'lucide-react';

const AdminLoginPage = () =>
{
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error)
    {
      toast.error('Identity verification failed');
      console.error('Login error:', result.error);
    } else
    {
      toast.success('Access granted to Neural Core');
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 lg:p-10">
      <div className="w-full max-w-[440px] relative">
        {/* Advanced Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative space-y-10">
          {/* Admin Header Section */}
          <div className="text-center space-y-5">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-500/[0.03] backdrop-blur-md border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] shadow-inner">
              <Shield className="w-3.5 h-3.5" />
              <span>Restricted Access Node</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                Control <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Center</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.1em] text-[11px] leading-relaxed max-w-[300px] mx-auto">
                Biometric handshake or multi-factor identity verification required
              </p>
            </div>
          </div>

          {/* Login Card - Ultra Glass */}
          <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/[0.08] p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group/card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center shadow-inner group-hover/card:scale-105 transition-transform duration-500">
                <Fingerprint className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Access Link</h2>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Identity Synchronization</p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-2 block">Terminal Account</label>
                <Input
                  className="w-full bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary/20 rounded-2xl h-16 px-8 transition-all shadow-inner text-sm font-medium"
                  type="email"
                  placeholder="admin@codedaze.tech"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-2 block">Coded Passphrase</label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary/20 rounded-2xl h-16 px-8 transition-all shadow-inner text-sm font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl shadow-[0_12px_40px_-5px_rgba(var(--primary),0.3)] hover:shadow-[0_15px_50px_-5px_rgba(var(--primary),0.4)] transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="uppercase text-xs tracking-[0.3em]">Authenticating...</span>
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.3em] font-black">
                    Decrypt & Authorize
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] transition-transform" />
              </Button>
            </form>
          </div>

          {/* Security & Footer */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Lock className="w-3 h-3" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] leading-loose">
                Encoded Session: Attempts Logged
              </p>
            </div>
            <div className="h-px w-20 bg-white/5 mx-auto" />
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest max-w-[240px] mx-auto leading-relaxed">
              Powered by CodeDaze Neural Engine v2.0
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

export default AdminLoginPage;
