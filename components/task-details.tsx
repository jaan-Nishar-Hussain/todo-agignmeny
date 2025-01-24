"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Bell, CalendarIcon, Plus, RotateCcw, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input" // Import the Input component


interface TaskDetailsProps {
  open: boolean
  onClose: () => void
  taskTitle?: string
}

export function TaskDetails({ open, onClose, taskTitle }: TaskDetailsProps) {
  const [date, setDate] = useState<Date | undefined>() // State for due date
  const [steps, setSteps] = useState<string[]>([]) // State for steps
  const [reminder, setReminder] = useState<Date | undefined>() // State for reminder
  const [newStep, setNewStep] = useState("") // State for new step input

  // Handler for adding a step
  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep])
      setNewStep("") // Clear the input
    }
  }

  // Handler for setting a reminder
  const handleSetReminder = () => {
    const reminderDate = new Date() // Set reminder to current time (or customize as needed)
    setReminder(reminderDate)
    alert(`Reminder set for ${reminderDate.toLocaleString()}`)
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{taskTitle || "Task Details"}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Add Step Section */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a step"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
              />
              <Button onClick={handleAddStep}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {steps.length > 0 && (
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span>{step}</span>
                    <Button variant="ghost" size="icon" onClick={() => setSteps(steps.filter((_, i) => i !== index))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Set Reminder Section */}
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSetReminder}>
            <Bell className="h-4 w-4" />
            Set Reminder
          </Button>
          {reminder && (
            <div className="text-sm text-muted-foreground">
              Reminder set for: {reminder.toLocaleString()}
            </div>
          )}

          {/* Add Due Date Section */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <CalendarIcon className="h-4 w-4" />
              Add Due Date
            </Button>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            {date && (
              <div className="text-sm text-muted-foreground">
                Due date: {date.toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Repeat Section */}
          <Button variant="outline" className="w-full justify-start gap-2">
            <RotateCcw className="h-4 w-4" />
            Repeat
          </Button>

          {/* Delete Task Section */}
          <Button variant="destructive" className="w-full justify-start gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Task
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}