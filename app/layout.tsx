import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spacer } from '@/components/UI/spacer/spacer';
import AuthSessionProvider from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import AosInit from '../lib/aosInit';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WT-Blogs',
  description:
    'A perfect platform for WEB Developers to share and learn new info about Web technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <div className='flex min-h-[100vh] bg-white dark:bg-black flex-col'>
            <header>
              <Header />
            </header>
            <Spacer size={14} /> {/*Header size*/}
            <main className='flex-grow'>
              <AosInit>{children}</AosInit>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
