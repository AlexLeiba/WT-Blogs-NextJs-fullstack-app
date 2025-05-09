import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Spacer } from '@/components/UI/spacer/spacer';
import AuthSessionProvider from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import AosInit from '../lib/aosInit';
import Header from '@/components/Navigations/Header';
import Footer from '@/components/Navigations/Footer';

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
          <div className='flex h-screen bg-white dark:bg-black flex-col text-black dark:text-white '>
            <header>
              <Header />
            </header>
            <Spacer size={14} /> {/*Header size*/}
            <main className='flex flex-grow'>
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
