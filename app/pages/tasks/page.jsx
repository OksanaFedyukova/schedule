'use client'

import React from "react";
import TasksList from "@/app/components/Tasks/TasksList"

export default function Tasks() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TasksList/>

    </main>
    
  );
}
