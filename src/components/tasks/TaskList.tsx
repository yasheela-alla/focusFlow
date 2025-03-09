import React from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Clock, Tag, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Task {
  id: string;
  description: string;
  category: string;
  duration: number; // in minutes
  timestamp: Date;
}

interface TaskListProps {
  tasks?: Task[];
  onDeleteTask?: (id: string) => void;
}

const TaskList = ({
  tasks = [
    {
      id: "1",
      description: "Updated website content",
      category: "Content Creation",
      duration: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "2",
      description: "Reviewed quarterly budget",
      category: "Finance",
      duration: 90,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: "3",
      description: "Team meeting",
      category: "Admin",
      duration: 30,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ],
  onDeleteTask = () => {},
}: TaskListProps) => {
  // Function to format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  // Function to format timestamp as relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return "Less than an hour ago";
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }
  };

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      Admin: "bg-blue-100 text-blue-800",
      "Content Creation": "bg-purple-100 text-purple-800",
      Finance: "bg-green-100 text-green-800",
      Development: "bg-amber-100 text-amber-800",
      Marketing: "bg-pink-100 text-pink-800",
      "App Building": "bg-indigo-100 text-indigo-800",
      Meetings: "bg-red-100 text-red-800",
      "Content Research": "bg-violet-100 text-violet-800",
      Planning: "bg-teal-100 text-teal-800",
    };

    return categories[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-medium mb-6">Current Tasks</h3>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks added yet. Add a task to see it here.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 hover:bg-gray-50 transition-colors border border-gray-100 dark:border-gray-700 rounded-xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="font-medium text-lg">{task.description}</div>

                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatDuration(task.duration)}
                    </div>

                    <div className="flex items-center">
                      <Tag className="h-3.5 w-3.5 mr-1" />
                      <Badge
                        variant="outline"
                        className={`text-xs ${getCategoryColor(task.category)}`}
                      >
                        {task.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    {formatRelativeTime(task.timestamp)}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6 pt-2">
          <Separator className="mb-4" />
          <div className="text-sm text-gray-500 flex justify-between items-center">
            <span>Total tasks: {tasks.length}</span>
            <span>
              Total time:{" "}
              {formatDuration(
                tasks.reduce((acc, task) => acc + task.duration, 0),
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
