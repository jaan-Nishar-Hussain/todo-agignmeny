"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, RotateCcw, Calendar, Star, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"

interface Task {
  id: string
  title: string
  completed: boolean
  important: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Buy groceries", completed: false, important: false },
    { id: "2", title: "Finish project report", completed: false, important: true },
    { id: "3", title: "Call the bank", completed: false, important: false },
    { id: "4", title: "Schedule dentist appointment", completed: false, important: false },
    { id: "5", title: "Plan weekend trip", completed: false, important: false },
    { id: "6", title: "Read a book", completed: true, important: false },
    { id: "7", title: "Clean the house", completed: true, important: false },
    { id: "8", title: "Prepare presentation", completed: true, important: false },
    { id: "9", title: "Update blog", completed: true, important: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        {
          id: Date.now().toString(),
          title: newTask,
          completed: false,
          important: false,
        },
        ...tasks,
      ])
      setNewTask("")
    }
  }

  const toggleComplete = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleImportant = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, important: !task.important } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }

  return (
    <div className="flex">
      <Sidebar tasks={tasks} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-6 space-y-4 rounded-lg bg-muted/50 p-4">
          <h2 className="text-lg font-semibold">Add A Task</h2>
          <div className="flex gap-2">
            <div className="flex-1 space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-1 gap-2">
              <Input
                placeholder="Add a task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={() => toggleComplete(task.id)}
                onToggleImportant={() => toggleImportant(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}

          <h3 className="mt-8 font-semibold">Completed</h3>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={() => toggleComplete(task.id)}
                onToggleImportant={() => toggleImportant(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

function TaskItem({
  task,
  onComplete,
  onToggleImportant,
  onDelete,
}: {
  task: Task
  onComplete: () => void
  onToggleImportant: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-3">
      <Checkbox checked={task.completed} onCheckedChange={onComplete} />
      <span
        className={cn("flex-1", {
          "line-through text-muted-foreground": task.completed,
        })}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleImportant}
        className={cn({
          "text-yellow-500": task.important,
        })}
      >
        <Star className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}

