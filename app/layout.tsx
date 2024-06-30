'use client'

import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import './globals.css'
import { AuthContextProvider } from '@/app/context/AuthContext'

const inter = Inter({ subsets: ["latin"] });
interface Props {
  children: React.ReactElement
}

const RootLayout: React.FC<Props> = ({ children }) : React.ReactElement => {
  const commonLinks = [
    { url: "/", label: "Home" },
    { url: "/pages/schedule", label: "Schedule" },
    { url: "/pages/tasks", label: "Tasks" },
    
  ];

  return (
    <>
    <html lang="en">
    <body>
    <AuthContextProvider>

          <div className={inter.className}>
            <Navbar links={commonLinks} />
            {children}
          </div>
          </AuthContextProvider>

        </body>
      </html>
    </>
  );
};

export default RootLayout;
