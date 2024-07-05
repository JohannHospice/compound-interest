import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Snowballed',
  description: 'An interest calculator for snowballing your investments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col transition-all'>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
