'use client'

import React, { useState } from "react";
import ScheduleComponent from "@/app/components/ScheduleComponent";
import TodoComponent from "@/app/components/TodoComponent";
import ReadComponent from "@/app/components/ReadComponent";
import WatchComponent from "@/app/components/WatchComponent";
import VisitComponent from "@/app/components/VisitComponent";

export default function Schedule() {
  const [selectedCategory, setSelectedCategory] = useState('Meets');

  const renderSelectedCategory = () => {
    switch(selectedCategory) {
      case 'ToDo':
        return <TodoComponent />;
      case 'Meets':
        return <ScheduleComponent />;
      case 'Read':
        return <ReadComponent />;
      case 'Watch':
        return <WatchComponent />;
      case 'Visit':
        return <VisitComponent />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="flex space-x-4">
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCategory('ToDo')}>
        ToDo
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCategory('Meets')}>
        Meets
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCategory('Read')}>
        Read
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCategory('Watch')}>
        Watch
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCategory('Visit')}>
        Visit
      </button>
    </div>
    <div  className="text-dark font-bold text-xl">
      <p>Selected Category: {selectedCategory}</p>
    </div>
    {renderSelectedCategory()}
  </main>
  
  );
}
