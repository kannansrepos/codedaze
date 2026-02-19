/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ChevronRight } from 'lucide-react';

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
      toast.error('Invalid credentials');
      console.error('Login error:', result.error);
    } else
    {
      toast.success('Signed in successfully!');
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Subtle Ambient Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative space-y-8">
          {/* Admin Badge */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/5 backdrop-blur-sm border border-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Access Only</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">
              Control <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Center</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Secure authentication required for engineers</p>
          </div>

          {/* Login Card - Premium Glassmorphism */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] p-8 md:p-10 shadow-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-white tracking-tight">Identity Access</h2>
                <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Verification required</p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Terminal</label>
                <Input
                  className="w-full bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary rounded-2xl h-14 px-6 transition-all"
                  type="email"
                  placeholder="admin@codedaze.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Pass-key</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border-white/[0.05] text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary rounded-2xl h-14 px-6 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.3)] group transition-all"
              >
                {loading ? 'Authenticating...' : (
                  <span className="flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em]">
                    Initialize Access
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] max-w-[280px] mx-auto leading-loose">
              Security Protocol: Unauthorized access attempts are encrypted and logged for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
