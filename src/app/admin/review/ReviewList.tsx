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
import { Eye, Check, X, Loader2, FileText, ChevronRight } from 'lucide-react';
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
        <div className="text-center py-24 bg-white/[0.02] backdrop-blur-xl rounded-[3rem] border border-dashed border-white/[0.1] shadow-2xl">
            <div className="mb-6 inline-flex p-6 rounded-3xl bg-primary/5">
                <FileText className="w-10 h-10 text-primary opacity-50" />
            </div>
            <p className="text-white text-2xl font-black tracking-tight">Your review queue is clear!</p>
            <p className="text-slate-500 mt-2 font-medium">Check back later for new AI-generated drafts.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="grid gap-3 w-full">
                {list.map(file => (
                    <div key={file} className="bg-white/[0.02] backdrop-blur-xl p-4 md:p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/[0.05] hover:border-primary/20 transition-all duration-300 group shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex-1 min-w-0 relative z-10">
                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">Filename</span>
                            <span className="text-white font-black block truncate text-lg group-hover:text-primary transition-colors tracking-tight">
                                {file.replace('.md', '').split('_').join(' ')}
                            </span>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Draft</span>
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{file}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto relative z-10">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchPreview(file)}
                                className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] hover:border-primary/30 flex-1 md:flex-none h-12 px-6 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                                disabled={loadingFile === file}
                            >
                                {loadingFile === file ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                                Preview
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleAction(file, 'approve')}
                                className="bg-primary hover:bg-primary/90 text-white shadow-xl flex-1 md:flex-none h-12 px-6 rounded-2xl font-black transition-all active:scale-95 text-xs uppercase tracking-widest"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Approve
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAction(file, 'reject')}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 flex-1 md:flex-none h-12 px-6 rounded-2xl transition-all active:scale-95 font-black text-xs uppercase tracking-widest"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0b] text-white border-white/[0.05] shadow-3xl rounded-[2.5rem] p-0">
                    <DialogHeader className="sticky top-0 bg-[#0a0a0b]/90 backdrop-blur-md z-10 p-8 border-b border-white/[0.05]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <DialogTitle className="text-3xl font-black text-white tracking-tight">
                                    Review Draft
                                </DialogTitle>
                                <DialogDescription className="text-slate-500 font-medium mt-1">
                                    Quality check for <span className="text-primary">{selectedFile}</span>
                                </DialogDescription>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button
                                    size="sm"
                                    onClick={() => handleAction(selectedFile || '', 'approve')}
                                    className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-2xl shadow-2xl transition-all active:scale-95 text-xs uppercase tracking-widest flex-1 md:flex-none"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Publish Article
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="bg-white/[0.03] border-white/[0.05] text-white font-black px-6 h-12 rounded-2xl hover:bg-white/[0.05] text-xs uppercase tracking-widest flex-1 md:flex-none"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Close
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-8 md:p-12 overflow-y-auto">
                        <div className="prose prose-invert prose-blue max-w-none article-preview">
                            {previewContent && (
                                <Markdown
                                    options={{
                                        overrides: {
                                            pre: {
                                                component: ({ children }) => (
                                                    <pre className="p-6 rounded-2xl bg-black border border-white/[0.05] overflow-x-auto shadow-inner my-8 text-sm leading-relaxed">
                                                        {children}
                                                    </pre>
                                                )
                                            },
                                            h1: { component: ({ children }) => <h1 className="text-4xl font-black text-white mb-8 mt-4 tracking-tight leading-none">{children}</h1> },
                                            h2: { component: ({ children }) => <h2 className="text-2xl font-black text-white mb-6 mt-12 tracking-tight border-b border-white/[0.05] pb-4">{children}</h2> },
                                            p: { component: ({ children }) => <p className="text-slate-400 font-medium text-lg leading-relaxed mb-6">{children}</p> },
                                            ul: { component: ({ children }) => <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-400 font-medium">{children}</ul> },
                                            li: { component: ({ children }) => <li className="leading-relaxed">{children}</li> },
                                            strong: { component: ({ children }) => <strong className="text-white font-black">{children}</strong> }
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
