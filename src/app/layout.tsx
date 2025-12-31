import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';

const roboto = Roboto({
  weight: ['400', '900'],
  subsets: ['latin'],
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
  metadataBase: new URL('https://codedaze.tech'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${roboto.className} antialiased bg-[#020617] text-gray-100 min-h-screen selection:bg-primary/30 selection:text-primary-foreground`}
      >
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
