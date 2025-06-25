'use client';
import Script from 'next/script';
import Banner from './components/banner';
import Connections from './components/Connections';
import Footer from './components/Footer';
import Languages from './components/languages';
import NewsLetter from './components/NewsLetter';
import RecentPost from './components/RecentPost';
import RecentVideos from './components/RecentVideos';
export default function Home() {
  return (
    <>
      <div>
        <Script
          src="https://assets.mailerlite.com/js/universal.js"
          strategy="afterInteractive"
        />

        {/* Initialize MailerLite */}
        <Script id="mailerlite-init" strategy="afterInteractive">
          {`
            window.ml = window.ml || function() {
              (window.ml.q = window.ml.q || []).push(arguments);
            };
            ml('account', '1619211');
          `}
        </Script>

        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-2 mb-5">
          <div
            className="senja-embed"
            data-id="d3aebb3a-5fb2-4f6f-9eb7-0ab7dff49f75"
            data-lazyload="false"
          ></div>
          <Script
            src="https://static.senja.io/dist/platform.js"
            async
            type="text/javascript"
          ></Script>
        </div> */}
        <div
          className="col-md-8"
          dangerouslySetInnerHTML={{
            __html: `
                <script async src="https://assets.mailerlite.com/js/universal.js" data-form="c7a77916-5181-11f0-89d8-53de9ab0fedf">
                 (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
    .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', '1619211');
                </script>
          `,
          }}
        />
      </div>
      <div className="h-full min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <div className="bottom-0 left-0 right-0 top-0 h-screen bg-[linear-gradient(to_right,#2a42ba2a_1px,transparent_1px),linear-gradient(to_bottom,#2a42ba2a_0.5px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#2A42BA_100%,transparent_110%)] "></div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#111827_50%,#2A42BA_100%)]   lg:py-12 xl:py-24">
          <Banner />
          <Languages />
          <RecentPost />
          <RecentVideos />
          <Connections />
          <NewsLetter />
          <Footer />
        </div>
      </div>
    </>
  );
}
