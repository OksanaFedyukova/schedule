// app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const commonLinks = [
    { url: '/', label: 'Home' },
    { url: '/pages/schedule', label: 'Schedule' },
    { url: '/pages/tasks', label: 'Tasks' }
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar links={commonLinks} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
