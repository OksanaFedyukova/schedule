import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const commonLinks = [
    { url: '/', label: 'Home' },
    { url: '/pages/schedule', label: 'Schedule' },
    { url: '/pages/tasks', label: 'Tasks' }
  ];

  return (
    <>
      <Head>
        <title>Your Page Title</title>
      </Head>
      <div className={inter.className}>
        <Navbar links={commonLinks} />
        {children}
      </div>
    </>
  );
};

export default RootLayout;
