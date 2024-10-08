import Navbar from '@/components/Navbar';
import Provider from '@/components/ui/Provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flight Booking System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
        {/* <main> */}
        <main className='h-screen flex flex-auto justify-center items-center'>
          <Navbar />
          {children}
        </main>
        <Toaster />
        </Provider>
        
      </body>
      
    </html>
  );
}
