'use client';

import { useEffect, useState } from 'react';
import
{
  CheckCircle2,
  XCircle,
  Clock,
  Tag,
  FileCode,
  Calendar,
  RefreshCw,
  Terminal,
  Cpu,
  History,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface CronLog
{
  timestamp: string;
  tech: string;
  topics: string[];
  files: string[];
  status: 'success' | 'failed' | 'partial';
  error: string | null;
}

const NextJobCountdown = () =>
{
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() =>
  {
    const getCronInterval = () =>
    {
      const schedule = process.env.NEXT_PUBLIC_CRON_SCHEDULE || '*/5 * * * *';
      try
      {
        const parts = schedule.split(' ');
        if (parts[0].startsWith('*/'))
        {
          const mins = parseInt(parts[0].replace('*/', ''));
          return isNaN(mins) ? 5 : mins;
        }
        if (parts[0] === '*')
        {
          return 1;
        }
      } catch (e)
      {
        console.error('Failed to parse NEXT_PUBLIC_CRON_SCHEDULE:', e);
      }
      return 1;
    };

    const intervalMinutes = getCronInterval();

    const calculateTime = () =>
    {
      const now = new Date();
      const next = new Date(now);

      if (intervalMinutes === 1)
      {
        next.setSeconds(0, 0);
        if (next <= now)
        {
          next.setMinutes(next.getMinutes() + 1);
        }
      } else
      {
        const mins = now.getMinutes();
        const nextMins = (Math.floor(mins / intervalMinutes) + 1) * intervalMinutes;
        next.setMinutes(nextMins, 0, 0);
      }

      const diff = next.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ d, h, m, s });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] px-6 py-3 rounded-2xl backdrop-blur-xl shadow-2xl group transition-all hover:border-primary/30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-primary animate-pulse" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Pipeline Sync</span>
      </div>
      <div className="flex gap-3 font-mono text-xl font-black min-w-[100px] justify-center">
        <div className="flex gap-1 items-end">
          <span className="text-white leading-none">{timeLeft.m.toString().padStart(2, '0')}</span>
          <span className="text-[9px] text-slate-600 uppercase mb-0.5">m</span>
        </div>
        <span className="text-slate-700 animate-pulse">:</span>
        <div className="flex gap-1 items-end">
          <span className="text-primary leading-none">{timeLeft.s.toString().padStart(2, '0')}</span>
          <span className="text-[9px] text-slate-600 uppercase mb-0.5">s</span>
        </div>
      </div>
    </div>
  );
};

export default function ActivityPage()
{
  const [history, setHistory] = useState<CronLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () =>
  {
    setIsLoading(true);
    try
    {
      const res = await fetch('/api/admin/activity');
      if (res.ok)
      {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error)
    {
      console.error(error);
      toast.error('Failed to load activity history');
    } finally
    {
      setIsLoading(false);
    }
  };

  useEffect(() =>
  {
    fetchHistory();
  }, []);

  const getStatusColor = (status: string) =>
  {
    switch (status)
    {
      case 'success': return 'bg-emerald-500';
      case 'partial': return 'bg-amber-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusIcon = (status: string) =>
  {
    switch (status)
    {
      case 'success': return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case 'partial': return <AlertCircle className="w-6 h-6 text-amber-500" />;
      case 'failed': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <Clock className="w-6 h-6 text-slate-500" />;
    }
  };

  const getStatusText = (status: string) =>
  {
    switch (status)
    {
      case 'success': return 'Neural Core: Success';
      case 'partial': return 'Neural Core: Partial';
      case 'failed': return 'Core Malfunction';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16 px-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.1] text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engine Monitoring System</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                System <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Activity Log</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed">
                Real-time diagnostics of the AI-powered content pipeline and automated generation cycles.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <NextJobCountdown />
            <Button
              onClick={fetchHistory}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 flex items-center gap-3"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Node
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <RefreshCw className="w-16 h-16 text-primary animate-spin" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 blur-2xl animate-pulse" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Contacting System Registry...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-dashed border-white/[0.1] rounded-[3rem] text-center py-32 shadow-3xl">
            <History className="w-16 h-16 text-slate-700 mx-auto mb-8 opacity-50" />
            <p className="text-white text-3xl font-black tracking-tight mb-2">Registry Empty</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No execution history recorded in the last 24 cycles.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {history.map((log, index) => (
              <div key={index} className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] overflow-hidden group hover:border-white/[0.1] transition-all duration-500 shadow-3xl relative">
                <div className={`h-2 w-full ${getStatusColor(log.status)} opacity-80`} />

                <div className="p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] shadow-inner group-hover:scale-105 transition-transform duration-500`}>
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-black text-2xl text-white tracking-tight leading-none">
                            {getStatusText(log.status)}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-5 py-2.5 rounded-xl bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 group-hover:bg-primary/10 transition-colors">
                        <Terminal className="w-4 h-4" />
                        Stack: {log.tech || 'SYSTEM'}
                      </div>
                    </div>
                  </div>

                  {log.status !== 'failed' && (log.topics.length > 0 || log.files.length > 0) && (
                    <div className="mt-10 pt-10 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Tag className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Inputs</span>
                        </div>
                        <div className="space-y-3">
                          {log.topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-300 group/item">
                              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full group-hover/item:bg-primary group-hover/item:scale-125 transition-all" />
                              <span className="font-bold text-sm tracking-tight">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <FileCode className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Compiled Manifests</span>
                        </div>
                        <div className="space-y-3">
                          {log.files.map((file, i) => (
                            <div key={i} className="flex items-center gap-3 text-primary bg-primary/[0.03] px-4 py-3 rounded-2xl border border-primary/5 group/file hover:bg-primary/[0.06] transition-all">
                              <FileCode className="w-4 h-4 opacity-50 group-hover/file:rotate-6 transition-transform" />
                              <span className="font-mono text-[11px] font-bold">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {log.status === 'failed' && (
                    <div className="mt-8 p-6 rounded-[1.5rem] bg-red-500/[0.03] border border-red-500/10 flex gap-4 items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Diagnostic Report</p>
                        <p className="text-sm text-red-400 font-mono italic leading-relaxed">{log.error}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
