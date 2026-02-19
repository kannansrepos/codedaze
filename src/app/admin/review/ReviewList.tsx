'use client';
import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, Loader2, FileText, ChevronRight, Newspaper, Globe, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReviewList({ files }: { files: string[] })
{
    const [list, setList] = useState(files);
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [loadingFile, setLoadingFile] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleAction = async (filename: string, action: 'approve' | 'reject') =>
    {
        try
        {
            const res = await fetch('/api/admin/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename, action })
            });
            if (res.ok)
            {
                setList(list.filter(f => f !== filename));
                toast.success(`Post ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
                if (isPreviewOpen) setIsPreviewOpen(false);
            } else
            {
                toast.error(`Failed to ${action} post`);
            }
        } catch (error)
        {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const fetchPreview = async (filename: string) =>
    {
        setLoadingFile(filename);
        setSelectedFile(filename);
        try
        {
            const res = await fetch(`/api/admin/action?filename=${filename}`);
            const data = await res.json();
            if (res.ok)
            {
                setPreviewContent(data.content);
                setIsPreviewOpen(true);
            } else
            {
                toast.error('Failed to load preview');
            }
        } catch (error)
        {
            console.error(error);
            toast.error('Error fetching preview');
        } finally
        {
            setLoadingFile(null);
        }
    };

    if (list.length === 0) return (
        <div className="text-center py-32 bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] border border-dashed border-white/[0.08] shadow-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/[0.01] group-hover:bg-primary/[0.02] transition-colors" />
            <div className="relative z-10 space-y-8">
                <div className="inline-flex p-8 rounded-[2rem] bg-primary/5 border border-primary/10 shadow-inner">
                    <Check className="w-12 h-12 text-primary opacity-40" />
                </div>
                <div className="space-y-2">
                    <p className="text-white text-3xl font-black tracking-tighter">Review Pipeline Clear</p>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.3em]">System Standby: Awaiting New Drafts</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="grid gap-4 w-full">
                {list.map(file => (
                    <div key={file} className="bg-white/[0.02] backdrop-blur-3xl p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-white/[0.05] hover:border-primary/20 transition-all duration-500 group shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Newspaper className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Draft Pipeline</span>
                            </div>
                            <h3 className="text-white font-black block truncate text-2xl group-hover:text-primary transition-colors tracking-tighter leading-none mb-4">
                                {file.replace('.md', '').split('_').join(' ')}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-sm">Revision Pending</span>
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">{file}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto relative z-10">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchPreview(file)}
                                className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05] hover:border-primary/30 h-14 px-8 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl group/eye"
                                disabled={loadingFile === file}
                            >
                                {loadingFile === file ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4 mr-2 group-hover/eye:scale-110 transition-transform" />}
                                Preview
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleAction(file, 'approve')}
                                className="bg-primary hover:bg-primary/90 text-white shadow-[0_10px_30px_rgba(var(--primary),0.3)] h-14 px-8 rounded-2xl font-black transition-all active:scale-95 text-xs uppercase tracking-[0.2em] group/approve"
                            >
                                <Check className="w-5 h-5 mr-2 group-hover/approve:scale-110 transition-transform" />
                                Approve
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAction(file, 'reject')}
                                className="bg-red-500/10 hover:bg-red-500 text-white border border-red-500/20 hover:border-red-600 h-14 px-8 rounded-2xl transition-all active:scale-95 font-black text-xs uppercase tracking-[0.2em] group/reject"
                            >
                                <Trash2 className="w-5 h-5 mr-2 group-hover/reject:scale-110 transition-transform" />
                                Reject
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-slate-950/95 backdrop-blur-3xl text-white border-white/[0.08] shadow-3xl rounded-[3rem] p-0 overflow-hidden">
                    <DialogHeader className="sticky top-0 bg-slate-950/80 backdrop-blur-3xl z-30 p-10 border-b border-white/[0.05]">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-primary animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Staging Environment</span>
                                </div>
                                <DialogTitle className="text-4xl font-black text-white tracking-tighter leading-none">
                                    Content Validation
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                                    Identifier: <span className="text-primary">{selectedFile}</span>
                                </DialogDescription>
                            </div>
                            <div className="flex gap-4 w-full lg:w-auto">
                                <Button
                                    size="sm"
                                    onClick={() => handleAction(selectedFile || '', 'approve')}
                                    className="bg-primary hover:bg-primary/90 text-white font-black px-10 h-14 rounded-2xl shadow-[0_10px_30px_rgba(var(--primary),0.3)] transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] flex-1 lg:flex-none"
                                >
                                    <Check className="w-5 h-5 mr-3" />
                                    Publish to Production
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] text-white font-black px-8 h-14 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all flex-1 lg:flex-none"
                                >
                                    <X className="w-5 h-5 mr-3" />
                                    Erase Preview
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-10 lg:p-16 h-full relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
                        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-white prose-pre:bg-black prose-pre:border prose-pre:border-white/[0.05] prose-pre:rounded-3xl">
                            {previewContent && (
                                <Markdown
                                    options={{
                                        overrides: {
                                            pre: {
                                                component: ({ children }) => (
                                                    <div className="relative group/code my-10">
                                                        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover/code:opacity-100 transition-opacity duration-700 -z-10" />
                                                        <pre className="p-8 rounded-[2rem] bg-black/80 border border-white/[0.05] overflow-x-auto shadow-2xl text-sm leading-relaxed backdrop-blur-sm">
                                                            {children}
                                                        </pre>
                                                    </div>
                                                )
                                            },
                                            h1: { component: ({ children }) => <h1 className="text-5xl font-black text-white mb-10 tracking-tighter leading-none border-l-8 border-primary pl-8">{children}</h1> },
                                            h2: { component: ({ children }) => <h2 className="text-3xl font-black text-white mb-8 mt-16 tracking-tighter flex items-center gap-4">{children}</h2> },
                                            p: { component: ({ children }) => <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">{children}</p> },
                                            ul: { component: ({ children }) => <ul className="list-none space-y-4 mb-10">{children}</ul> },
                                            li: {
                                                component: ({ children }) => (
                                                    <li className="flex items-start gap-4 text-slate-400 font-medium text-lg">
                                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                        {children}
                                                    </li>
                                                )
                                            },
                                            strong: { component: ({ children }) => <strong className="text-white font-black underline decoration-primary/30 underline-offset-4">{children}</strong> }
                                        }
                                    }}
                                >
                                    {previewContent}
                                </Markdown>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
