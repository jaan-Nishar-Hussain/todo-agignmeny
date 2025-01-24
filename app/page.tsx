"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TaskList } from "@/components/task-list"
import { TaskDetails } from "@/components/task-details"

export default function Home() {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string>()

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <TaskList />
      </main>
      <TaskDetails open={taskDetailsOpen} onClose={() => setTaskDetailsOpen(false)} taskTitle={selectedTask} />
    </div>
  )
}

