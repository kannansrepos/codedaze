import Banner from '@/components/pages/Banner';
import Footer from '@/components/pages/Footer';
import Languages from '@/components/pages/Languages';
import NewsLetter from '@/components/pages/NewsLetter';
import RecentPost from '@/components/pages/RecentPost';
import Connections from '@/components/pages/Connections';
import RecentVideos from '@/components/pages/RecentVideos';
import generate_Metadata from '@/lib/generateMetadata';

export async function generateMetadata()
{
  return generate_Metadata({
    title:
      'Code Daze - Modern Web Development Tutorials & Best Practices for .NET, React, Angular & Cloud',
    description:
      'Welcome to Code Daze, Discover expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices.',
    url: 'https://codedaze.net',
  });
}

export default function Home()
{
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* Content */}
      <div className="relative">
        <Banner />

        {/* Main Content Area - Glassmorphism refined */}
        <div className="relative bg-slate-950/20 backdrop-blur-sm border-t border-white/5 shadow-2xl">
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
