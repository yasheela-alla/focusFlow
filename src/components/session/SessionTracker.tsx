import React, { useState, useEffect } from "react";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";

interface SessionTrackerProps {
  onSessionComplete?: (duration: number) => void;
  defaultDuration?: number; // in minutes
  isActive?: boolean;
}

const SessionTracker = ({
  onSessionComplete = () => {},
  defaultDuration = 60,
  isActive = false,
}: SessionTrackerProps) => {
  // State for timer
  const [isRunning, setIsRunning] = useState(isActive);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Admin");
  const [timeSpent, setTimeSpent] = useState(0); // in minutes
  const [description, setDescription] = useState("");

  // Categories
  const categories = [
    "Admin",
    "Finance",
    "App Building",
    "Meetings",
    "Content Creation",
    "Content Research",
    "Marketing",
    "Planning",
  ];

  // Effect to handle timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle start session
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  // Handle pause session
  const handlePause = () => {
    setIsPaused(true);
  };

  // Handle resume session
  const handleResume = () => {
    setIsPaused(false);
  };

  // Handle stop session
  const handleStop = () => {
    setIsRunning(false);
    onSessionComplete(Math.floor(seconds / 60)); // Convert to minutes for the callback
    setSeconds(0);
  };

  // Handle reset session
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
  };

  // Handle add task
  const handleAddTask = () => {
    console.log({
      title: taskTitle,
      category: selectedCategory,
      timeSpent,
      description,
    });
    // Reset form
    setTaskTitle("");
    setSelectedCategory("Admin");
    setTimeSpent(0);
    setDescription("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-6xl font-mono font-bold">
            {formatTime(seconds)}
          </div>

          <div className="w-full max-w-md flex justify-center space-x-3">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            ) : isPaused ? (
              <Button
                onClick={handleResume}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6"
                size="lg"
              >
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            )}

            {isRunning && (
              <Button
                onClick={handleStop}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
                size="lg"
              >
                <Square className="mr-2 h-4 w-4" />
                End Session
              </Button>
            )}

            {(isRunning || seconds > 0) && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4">Task Title</h2>
        <Input
          placeholder="What are you working on?"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="mb-4"
        />

        <h2 className="text-lg font-medium mb-2">Category</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`py-2 cursor-pointer ${selectedCategory === category ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <h2 className="text-lg font-medium mb-2">Time Spent</h2>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-sm text-gray-500">0 mins</span>
          <Slider
            value={[timeSpent]}
            max={60}
            step={1}
            onValueChange={(value) => setTimeSpent(value[0])}
            className="flex-1"
          />
          <span className="text-sm text-gray-500">1 hour max</span>
        </div>

        <h2 className="text-lg font-medium mb-2">Description (optional)</h2>
        <Textarea
          placeholder="Add any additional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
          rows={3}
        />

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default SessionTracker;
