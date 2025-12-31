'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Tag,
  FileCode,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface CronLog {
  timestamp: string;
  tech: string;
  topics: string[];
  files: string[];
  status: 'success' | 'failed' | 'partial';
  error: string | null;
}

const NextJobCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const next = new Date(now);
      const mins = now.getMinutes();
      // Calculate next 5-minute mark
      const nextMins = (Math.floor(mins / 5) + 1) * 5;
      next.setMinutes(nextMins, 0, 0);

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
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 text-blue-400">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">Next Run In:</span>
      </div>
      <div className="flex gap-2 font-mono text-lg font-black">
        <div className="flex gap-1 items-center">
          <span className="text-white">{timeLeft.m.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-gray-500 uppercase">m</span>
        </div>
        <span className="text-gray-600">:</span>
        <div className="flex gap-1 items-center">
          <span className="text-primary">{timeLeft.s.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-gray-500 uppercase">s</span>
        </div>
      </div>
    </div>
  );
};

export default function ActivityPage() {
  const [history, setHistory] = useState<CronLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/activity');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load activity history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]';
      case 'partial': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
      case 'failed': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'partial': return <Activity className="w-6 h-6 text-amber-500" />;
      case 'failed': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/10';
      case 'partial': return 'bg-amber-500/10';
      case 'failed': return 'bg-red-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              System Activity
            </h1>
            <p className="text-gray-400 mt-2">Monitoring AI Cron Job Executions</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <NextJobCountdown />
            <Button
              onClick={fetchHistory}
              disabled={isLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl gap-2 h-12 px-6"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <Card className="bg-white/5 border-white/10 text-center py-20">
            <CardContent>
              <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-xl font-medium">No activity history found yet.</p>
              <p className="text-gray-500 mt-2 text-sm">Cron jobs will appear here once they start running.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {history.map((log, index) => (
              <Card key={index} className="bg-white/5 border-white/10 overflow-hidden backdrop-blur-xl group hover:border-primary/30 transition-all">
                <div className={`h-1.5 w-full ${getStatusColor(log.status)}`} />
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getStatusBg(log.status)}`}>
                        {getStatusIcon(log.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-lg text-white">
                            {log.status === 'success' ? 'AI Auto-Generation' :
                             log.status === 'partial' ? 'Partial Generation' : 'Job Execution Failed'}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        {log.tech || 'SYSTEM'}
                      </div>
                    </div>
                  </div>

                  {log.status === 'success' && log.topics.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selected Topics</span>
                          <div className="space-y-1">
                            {log.topics.map((topic, i) => (
                              <p key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full" />
                                {topic}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Drafts Created</span>
                          <div className="space-y-1">
                            {log.files.map((file, i) => (
                              <p key={i} className="text-sm text-blue-400 flex items-center gap-2 bg-blue-500/5 px-2 py-1 rounded-md border border-blue-500/10">
                                <FileCode className="w-3 h-3" />
                                {file}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {log.status === 'failed' && (
                    <div className="mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                      <p className="text-sm text-red-400 font-mono">Error: {log.error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
