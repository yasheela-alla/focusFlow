import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, ListChecks } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
  id: string;
  description: string;
  category: string;
  duration: number;
  timestamp: Date;
  notes?: string;
}

interface TaskLoggerProps {
  initialTasks?: Task[];
}

const TaskLogger = ({ initialTasks = [] }: TaskLoggerProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState("add");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = (taskData: {
    description: string;
    category: string;
    duration?: number;
    notes?: string;
  }) => {
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now().toString(),
        description: taskData.description,
        category: taskData.category,
        duration: taskData.duration || 0,
        timestamp: new Date(),
        notes: taskData.notes,
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setIsSubmitting(false);
      setActiveTab("list"); // Switch to list view after adding
    }, 500);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center">
          <ListChecks className="mr-2 h-5 w-5" />
          Task Logger
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="add" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </TabsTrigger>
            <TabsTrigger value="list">
              <ListChecks className="mr-2 h-4 w-4" />
              Recent Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="mt-0">
            <TaskForm onSubmit={handleAddTask} isSubmitting={isSubmitting} />

            {tasks.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("list")}
                  className="text-sm"
                >
                  View {tasks.length} Recent Tasks
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />

            <div className="mt-4 flex justify-center">
              <Button onClick={() => setActiveTab("add")} className="text-sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Task
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskLogger;
