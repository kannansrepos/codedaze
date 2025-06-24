'use client';
import Banner from './components/banner';
import Connections from './components/Connections';
import Footer from './components/Footer';
import Languages from './components/languages';
import NewsLetter from './components/NewsLetter';
import RecentPost from './components/RecentPost';
import RecentVideos from './components/RecentVideos';
export default function Home() {
  return (
    <div className="h-full min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <div className="bottom-0 left-0 right-0 top-0 h-screen bg-[linear-gradient(to_right,#2a42ba2a_1px,transparent_1px),linear-gradient(to_bottom,#2a42ba2a_0.5px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#2A42BA_100%,transparent_110%)] "></div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#111827_40%,#8142EF_100%)]   lg:py-12 xl:py-24">
        <Banner />
        <Languages />
        <RecentPost />
        <RecentVideos />
        <Connections />
        <NewsLetter />
        <Footer />
      </div>
    </div>
  );
}
