import fs from 'fs/promises';
import path from 'path';
import ReviewList from './ReviewList';
import { LayoutDashboard, FileText, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ReviewPage()
{
    const draftsDir = path.join(process.cwd(), 'posts', 'auto-drafts');
    let files: string[] = [];
    try
    {
        await fs.mkdir(draftsDir, { recursive: true });
        const allFiles = await fs.readdir(draftsDir);
        files = allFiles.filter(f => f.endsWith('.md')).sort().reverse();
    } catch (e)
    {
        console.error('Failed to read drafts directory', e);
    }

    return (
        <div className="min-h-screen pt-28 pb-12 selection:bg-primary/30">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.1] text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Content Quality Control</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                        Draft <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Review Queue</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Review and manage your auto-generated AI blog posts. Approved posts are moved to the production directory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                        <div className="relative flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Revisions</p>
                                <h3 className="text-5xl font-black text-white">{files.length}</h3>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] p-8 rounded-[2rem] shadow-2xl flex items-center gap-6 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <LayoutDashboard className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-black text-sm mb-1">Instant Deployment</h4>
                            <p className="text-xs text-slate-500 font-medium italic leading-relaxed">Approved posts are synced to your main blog directory instantly on confirmation.</p>
                        </div>
                    </div>
                </div>

                <main className="relative">
                    <div className="relative">
                        <ReviewList files={files} />
                    </div>
                </main>
            </div>
        </div>
    );
}
