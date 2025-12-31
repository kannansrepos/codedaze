'use client';
import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, Loader2, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReviewList({ files }: { files: string[] }) {
    const [list, setList] = useState(files);
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [loadingFile, setLoadingFile] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleAction = async (filename: string, action: 'approve' | 'reject') => {
        try {
            const res = await fetch('/api/admin/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename, action })
            });
            if (res.ok) {
                setList(list.filter(f => f !== filename));
                toast.success(`Post ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
                if (isPreviewOpen) setIsPreviewOpen(false);
            } else {
                toast.error(`Failed to ${action} post`);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const fetchPreview = async (filename: string) => {
        setLoadingFile(filename);
        setSelectedFile(filename);
        try {
            const res = await fetch(`/api/admin/action?filename=${filename}`);
            const data = await res.json();
            if (res.ok) {
                setPreviewContent(data.content);
                setIsPreviewOpen(true);
            } else {
                toast.error('Failed to load preview');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching preview');
        } finally {
            setLoadingFile(null);
        }
    };

    if (list.length === 0) return (
        <div className="text-center py-24 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <div className="mb-4 inline-flex p-4 rounded-full bg-blue-500/10">
                <FileText className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
            <p className="text-gray-400 text-xl font-medium">Your review queue is clear!</p>
            <p className="text-gray-500 mt-2">Check back later for new AI-generated drafts.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="grid gap-4 w-full">
                {list.map(file => (
                    <div key={file} className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-white/20 hover:border-blue-500 transition-all group shadow-xl">
                        <div className="flex-1 min-w-0">
                            <span className="text-white font-bold block truncate text-lg group-hover:text-blue-400 transition-colors">{file}</span>
                            <span className="text-xs text-blue-400/60 font-medium uppercase tracking-widest">Auto-generated Draft</span>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchPreview(file)}
                                className="bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700 hover:border-blue-400 flex-1 md:flex-none h-11 px-6 rounded-xl transition-all shadow-xl active:scale-95 border-2 font-bold"
                                disabled={loadingFile === file}
                            >
                                {loadingFile === file ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                <span className="text-sm">Preview</span>
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleAction(file, 'approve')}
                                className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] flex-1 md:flex-none h-11 px-6 rounded-xl font-black transition-all active:scale-95 scale-105 md:scale-100"
                            >
                                <Check className="w-5 h-5 mr-2" />
                                <span className="text-sm uppercase tracking-wider">Approve</span>
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAction(file, 'reject')}
                                className="bg-red-600 hover:bg-red-500 text-white border-2 border-red-500 shadow-[0_4px_20px_rgba(220,38,38,0.4)] flex-1 md:flex-none h-11 px-6 rounded-xl transition-all active:scale-95 font-black"
                            >
                                <X className="w-5 h-5 mr-2" />
                                <span className="text-sm uppercase tracking-wider">Reject</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0b] text-white border-white/10 shadow-2xl">
                    <DialogHeader className="sticky top-0 bg-[#0a0a0b] z-10 pb-4 border-b border-white/10 mb-4">
                        <div className="flex justify-between items-center">
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Draft Preview
                            </DialogTitle>
                            <div className="flex gap-3">
                                <Button
                                    size="sm"
                                    onClick={() => handleAction(selectedFile || '', 'approve')}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Approve & Publish
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl px-4 transition-all"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Close
                                </Button>
                            </div>
                        </div>
                        <DialogDescription className="text-gray-400 mt-2">
                            Review the AI-generated content before publishing to your blog.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="prose prose-invert prose-blue max-w-none px-2 pb-8">
                        {previewContent && (
                            <Markdown
                                options={{
                                    overrides: {
                                        pre: {
                                            component: ({ children }) => (
                                                <div className="relative group">
                                                    <pre className="p-4 rounded-xl bg-black/50 border border-white/5 overflow-x-auto shadow-inner">
                                                        {children}
                                                    </pre>
                                                </div>
                                            )
                                        },
                                        h1: { component: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1> },
                                        h2: { component: ({children}) => <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2> },
                                        p: { component: ({children}) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p> },
                                    }
                                }}
                            >
                                {previewContent}
                            </Markdown>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
