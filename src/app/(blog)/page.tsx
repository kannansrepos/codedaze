import Banner from '@/components/pages/Banner';
import Footer from '@/components/pages/Footer';
import Languages from '@/components/pages/Languages';
import NewsLetter from '@/components/pages/NewsLetter';
import RecentPost from '@/components/pages/RecentPost';
import Connections from '@/components/pages/Connections';
import RecentVideos from '@/components/pages/RecentVideos';
import generate_Metadata from '@/lib/generateMetadata';

export async function generateMetadata() {
  return generate_Metadata({
    title:
      'Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud',
    description:
      'Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices.',
    url: 'https://codedaze.tech',
  });
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Banner />

        {/* Main Content Area with separate background to make content dominate */}
        <div className="relative bg-slate-950/50 backdrop-blur-md border-t border-white/5 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]">
          <Languages />
          <RecentPost />
          <RecentVideos />
          <Connections />
          <NewsLetter />
          <Footer />
        </div>
      </div>
    </div>
  );
}
