"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, ListTodo, Star, Clock, UserSquare2, Plus, Menu, Sun, Moon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface NavItem {
  icon: React.ElementType
  label: string
  isActive?: boolean
}

const initialNavItems: NavItem[] = [
  { icon: ListTodo, label: "All Tasks", isActive: true },
  { icon: Clock, label: "Today" },
  { icon: Star, label: "Important" },
  { icon: Calendar, label: "Planned" },
  { icon: UserSquare2, label: "Assigned to me" },
]

interface Task {
  id: string
  title: string
  completed: boolean
  important: boolean
  createdAt: Date
}

interface SidebarProps {
  tasks: Task[]
  setFilteredTasks: (tasks: Task[]) => void
}

export function Sidebar({ tasks, setFilteredTasks }: SidebarProps) {
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems)
  const [isAddingList, setIsAddingList] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [isNightMode, setIsNightMode] = useState(false) // State for night/day mode

  const handleNavItemClick = (label: string) => {
    const updatedNavItems = navItems.map((item) => ({
      ...item,
      isActive: item.label === label,
    }))
    setNavItems(updatedNavItems)

    const today = new Date().toDateString()
    switch (label) {
      case "All Tasks":
        setFilteredTasks(tasks)
        break
      case "Today":
        setFilteredTasks(
          tasks.filter(
            (task) =>
              !task.completed &&
              new Date(task.createdAt).toDateString() === today
          )
        )
        break
      case "Important":
        setFilteredTasks(tasks.filter((task) => task.important))
        break
      case "Planned":
        // Add logic for planned tasks
        break
      case "Assigned to me":
        // Add logic for assigned tasks
        break
      default:
        setFilteredTasks(tasks)
        break
    }
  }

  const addNewList = () => {
    if (newListName.trim()) {
      const newItem: NavItem = { icon: ListTodo, label: newListName }
      setNavItems([...navItems, newItem])
      setNewListName("")
      setIsAddingList(false)
    }
  }

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode) // Toggle night/day mode
  }

  if (!tasks) {
    return null
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length

  return (
    <div className={isNightMode ? "dark" : ""}> {/* Apply dark mode class */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent
            navItems={navItems}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            isAddingList={isAddingList}
            newListName={newListName}
            setNewListName={setNewListName}
            addNewList={addNewList}
            setIsAddingList={setIsAddingList}
            handleNavItemClick={handleNavItemClick}
            isNightMode={isNightMode}
            toggleNightMode={toggleNightMode}
          />
        </SheetContent>
        <div className="hidden h-screen w-72 flex-col border-r bg-background p-4 md:flex">
          <SidebarContent
            navItems={navItems}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            isAddingList={isAddingList}
            newListName={newListName}
            setNewListName={setNewListName}
            addNewList={addNewList}
            setIsAddingList={setIsAddingList}
            handleNavItemClick={handleNavItemClick}
            isNightMode={isNightMode}
            toggleNightMode={toggleNightMode}
          />
        </div>
      </Sheet>
    </div>
  )
}

interface SidebarContentProps {
  navItems: NavItem[]
  completedTasks: number
  totalTasks: number
  isAddingList: boolean
  newListName: string
  setNewListName: (name: string) => void
  addNewList: () => void
  setIsAddingList: (isAdding: boolean) => void
  handleNavItemClick: (label: string) => void
  isNightMode: boolean
  toggleNightMode: () => void
}

function SidebarContent({
  navItems,
  completedTasks,
  totalTasks,
  isAddingList,
  newListName,
  setNewListName,
  addNewList,
  setIsAddingList,
  handleNavItemClick,
  isNightMode,
  toggleNightMode,
}: SidebarContentProps) {
  const progress = (completedTasks / totalTasks) * 100

  return (
    <>
      <div className="flex items-center gap-3 px-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Hey, ABCD</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleNightMode}>
          {isNightMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.isActive ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavItemClick(item.label)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      {isAddingList ? (
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button onClick={addNewList}>Add</Button>
          <Button variant="ghost" onClick={() => setIsAddingList(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="mt-4 w-full justify-start gap-2"
          onClick={() => setIsAddingList(true)}
        >
          <Plus className="h-5 w-5" />
          Add list
        </Button>
      )}

      <div className="mt-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Today Tasks</h3>
            <span className="text-sm text-muted-foreground">{totalTasks}</span>
          </div>
          <div className="relative h-32 w-32 mx-auto">
            <Progress value={progress} className="h-32 w-32 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedTasks}</div>
                <div className="text-xs text-muted-foreground">Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}