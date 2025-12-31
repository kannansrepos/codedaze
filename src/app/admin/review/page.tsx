import fs from 'fs/promises';
import path from 'path';
import ReviewList from './ReviewList';
import { LayoutDashboard, FileText, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ReviewPage() {
  const draftsDir = path.join(process.cwd(), 'posts', 'auto-drafts');
  let files: string[] = [];
  try {
      await fs.mkdir(draftsDir, { recursive: true });
      const allFiles = await fs.readdir(draftsDir);
      files = allFiles.filter(f => f.endsWith('.md')).sort().reverse();
  } catch (e) {
      console.error('Failed to read drafts directory', e);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-12 text-white selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Content Quality Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Review <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Draft Posts</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Review and manage your auto-generated AI blog posts. Approved posts are moved to the posts folder.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-xl bg-blue-500/10">
                        <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">{files.length}</h3>
                        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Pending Drafts</p>
                    </div>
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="p-2 rounded-xl bg-purple-500/10">
                    <LayoutDashboard className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm text-gray-400 italic">Approved posts are synced to your main blog directory instantly.</p>
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
