import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';

const roboto = Roboto({
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Code Daze - Modern Web Development Tutorials',
  description: 'Expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development. Level up your skills with modern web development best practices.',
  keywords: ['.NET', '.NET Core', 'Angular', 'React.js', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Docker', 'Microservices', 'Web Development', 'Tutorials'],
  authors: [{ name: 'Kannan' }],
  openGraph: {
    title: 'Code Daze - Modern Web Development Tutorials',
    description: 'Expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development.',
    url: 'https://codedaze.tech',
    siteName: 'Code Daze',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Daze - Modern Web Development Tutorials',
    description: 'Expert tutorials and guides on .NET, React, Angular, Node.js, and cloud development.',
    creator: '@KannansMca',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Code Daze',
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://codedaze.tech'),
};

export const viewport = {
  themeColor: '#020d41ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${roboto.className} antialiased bg-[#020617] text-gray-100 min-h-screen selection:bg-primary/30 selection:text-primary-foreground`}
      >
        {/* Global Animated Background */}
        <div className="fixed inset-0 -z-10 bg-[#020617]">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] opacity-30 animate-pulse" style={{ animationDuration: '10s' }}></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>

        <NextAuthProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <SpeedInsights />
        </NextAuthProvider>
      </body>
    </html>
  );
}
