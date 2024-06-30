import React from "react";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'schedule',
  description: 'schedule App - manage your time'
}

 

const Home: React.FC = () => {
 

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to the Home Page</h1>
      </main>
  );
};


export default Home;
