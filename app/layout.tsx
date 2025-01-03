import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spacer } from '@/components/UI/spacer/spacer';
import AuthSessionProvider from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'facebook-domain-verification',
//   description: 's74sqo1gwaar8ywpumci3rx1vray8d',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <meta
          name='facebook-domain-verification'
          content='s74sqo1gwaar8ywpumci3rx1vray8d'
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <div className='flex min-h-[100vh] bg-white dark:bg-black flex-col'>
            <header>
              <Header />
            </header>
            <Spacer size={14} /> {/*Header size*/}
            <main className='flex-grow'>{children}</main>
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
