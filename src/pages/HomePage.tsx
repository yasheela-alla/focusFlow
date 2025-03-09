import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import {
  Clock,
  CheckCircle,
  BarChart,
  Sun,
  Moon,
  Play,
  Pause,
  Square,
  ChevronUp,
  ChevronDown,
  CalendarIcon,
  Plus,
  Sparkles,
  Award,
} from "lucide-react";
import LoginButton from "../components/auth/LoginButton";
import UserMenu from "../components/auth/UserMenu";
import { useAuth } from "../context/AuthContext";
import FocusTimer from "../components/features/FocusTimer";
import AchievementsPanel from "../components/features/AchievementsPanel";
import AchievementBadge from "../components/features/AchievementBadge";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("current-session");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Admin");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [pieChartHover, setPieChartHover] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Categories with colors
  const [categories, setCategories] = useState([
    { name: "Admin", color: "bg-indigo-500" },
    { name: "Content Creation", color: "bg-green-500" },
    { name: "Finance", color: "bg-blue-500" },
    { name: "Content Research", color: "bg-pink-500" },
    { name: "App Building", color: "bg-purple-500" },
    { name: "Marketing", color: "bg-red-500" },
    { name: "Meetings", color: "bg-yellow-500" },
    { name: "Planning", color: "bg-teal-500" },
  ]);

  const completedTasks = [
    {
      id: "1",
      description: "sent email to james",
      category: "Admin",
      duration: 9,
    },
    {
      id: "2",
      description: "Filmed video for Bolt new app build",
      category: "Content Creation",
      duration: 23,
    },
  ];

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStartSession = () => {
    setIsRunning(true);
  };

  const handlePauseSession = () => {
    setIsRunning(false);
  };

  const handleEndSession = () => {
    setIsRunning(false);
    setSessionComplete(true);
  };

  const handleStartNewSession = () => {
    setSeconds(0);
    setSessionComplete(false);
    setTasks([]);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddTask = () => {
    if (!taskTitle) return;

    const newTask = {
      id: Date.now().toString(),
      description: taskTitle,
      category: selectedCategory,
      duration: hours * 60 + minutes,
      timestamp: new Date(),
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setHours(0);
    setMinutes(0);
  };

  // Generate pie chart segments
  const generatePieChartSegments = () => {
    const categoryData = [
      { name: "Finance", percentage: 25, color: "bg-blue-500" },
      { name: "Content Creation", percentage: 30, color: "bg-green-500" },
      { name: "Content Research", percentage: 20, color: "bg-pink-500" },
      { name: "Admin", percentage: 15, color: "bg-indigo-500" },
      { name: "Marketing", percentage: 10, color: "bg-red-500" },
    ];

    let cumulativePercentage = 0;
    return categoryData.map((category) => {
      const startAngle = cumulativePercentage;
      cumulativePercentage += category.percentage;
      const endAngle = cumulativePercentage;

      return {
        ...category,
        startAngle,
        endAngle,
        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(startAngle * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin(startAngle * 0.01 * Math.PI * 2)}%, ${50 + 50 * Math.cos(endAngle * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin(endAngle * 0.01 * Math.PI * 2)}%)`,
      };
    });
  };

  const pieChartSegments = generatePieChartSegments();

  // Get category color
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    return category ? category.color : "bg-gray-500";
  };

  // Get badge style for category
  const getBadgeStyle = (categoryName: string) => {
    const baseColor = getCategoryColor(categoryName).replace("bg-", "");
    return `bg-${baseColor.split("-")[0]}-100 text-${baseColor.split("-")[0]}-800 hover:bg-${baseColor.split("-")[0]}-200 border-0`;
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-3 pt-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen transition-colors duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full ${isDarkMode ? "bg-indigo-700" : "bg-indigo-100"} flex items-center justify-center transition-colors duration-300 relative overflow-hidden`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="5" />
              <path d="M12 9v3l2 1" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-indigo-300 opacity-30 animate-pulse"></div>
          </div>
          <span
            className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"} flex items-center`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 font-bold">
              Focus
            </span>
            <span className="ml-0.5">Flow</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LoginButton className="mr-2" />
          <UserMenu />
          <button
            onClick={handleToggleDarkMode}
            className={`p-1.5 rounded-full ${isDarkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors duration-300`}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div
          className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-full shadow-sm px-3 py-1 flex gap-4 transition-colors duration-300`}
        >
          <button
            onClick={() => setActiveTab("current-session")}
            className={`text-sm font-medium px-3 py-1 rounded-full ${activeTab === "current-session" ? (isDarkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600") : isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-500 hover:text-gray-700"} transition-colors duration-300`}
          >
            Current Session
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`text-sm font-medium px-3 py-1 rounded-full ${activeTab === "analytics" ? (isDarkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600") : isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-500 hover:text-gray-700"} transition-colors duration-300`}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === "current-session" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-auto">
          {!sessionComplete ? (
            /* Current Session View - Image 1 */
            <>
              <div>
                <FocusTimer
                  className={`shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} mb-4 transition-colors duration-300`}
                  onComplete={handleEndSession}
                />

                <Card
                  className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                >
                  <div className="space-y-3">
                    <div>
                      <h3
                        className={`text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Task Title
                      </h3>
                      <Input
                        placeholder="What are you working on?"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className={`${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3
                          className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Category
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-xs px-2 py-0 h-6 ${isDarkMode ? "text-indigo-300" : "text-indigo-600"} hover:bg-indigo-100 dark:hover:bg-indigo-900/30`}
                          onClick={() => {
                            const newCategory = prompt("Create a new category");
                            if (newCategory && newCategory.trim() !== "") {
                              const colors = [
                                "indigo",
                                "green",
                                "blue",
                                "pink",
                                "purple",
                                "red",
                                "yellow",
                                "teal",
                              ];
                              const color = `bg-${colors[Math.floor(Math.random() * colors.length)]}-500`;
                              setCategories([
                                ...categories,
                                { name: newCategory.trim(), color },
                              ]);
                              setSelectedCategory(newCategory.trim());
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Custom
                        </Button>
                      </div>
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        {categories.map((category) => (
                          <Badge
                            key={category.name}
                            variant={
                              selectedCategory === category.name
                                ? "default"
                                : "outline"
                            }
                            className={`py-1 cursor-pointer text-xs ${selectedCategory === category.name ? getBadgeStyle(category.name) : isDarkMode ? "hover:bg-gray-700" : ""}`}
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Time Spent
                      </h3>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <Input
                            type="number"
                            min="0"
                            value={hours}
                            onChange={(e) =>
                              setHours(parseInt(e.target.value) || 0)
                            }
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : ""
                            }
                          />
                        </div>
                        <div
                          className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          hours
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            value={minutes}
                            onChange={(e) =>
                              setMinutes(parseInt(e.target.value) || 0)
                            }
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : ""
                            }
                          />
                        </div>
                        <div
                          className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          mins
                        </div>
                      </div>
                      <div className="text-xs text-right mt-1 text-gray-400">
                        1 hour max
                      </div>
                    </div>

                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 mt-2"
                      onClick={handleAddTask}
                      disabled={!taskTitle}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </Button>
                  </div>
                </Card>
              </div>

              <div>
                <div className="flex gap-2 mb-4">
                  <Card
                    className={`p-3 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300 flex-1`}
                  >
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-indigo-600 mr-1" />
                      <div className="text-xs text-indigo-600">Total Time</div>
                    </div>
                    <div className="text-lg font-medium">
                      {Math.floor(seconds / 60)}m {seconds % 60}s
                    </div>
                  </Card>

                  <Card
                    className={`p-3 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300 flex-1`}
                  >
                    <div className="flex items-center mb-1">
                      <CheckCircle className="h-4 w-4 text-indigo-600 mr-1" />
                      <div className="text-xs text-indigo-600">
                        Tasks Completed
                      </div>
                    </div>
                    <div className="text-lg font-medium">{tasks.length}</div>
                  </Card>

                  <Card
                    className={`p-3 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300 flex-1`}
                  >
                    <div className="flex items-center mb-1">
                      <Award className="h-4 w-4 text-amber-500 mr-1" />
                      <div className="text-xs text-amber-500">Achievements</div>
                    </div>
                    <div className="text-lg font-medium truncate">
                      3 Unlocked
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card
                    className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                  >
                    <h3
                      className={`text-sm font-medium mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Current Tasks
                    </h3>

                    {tasks.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No tasks added yet. Add a task to see it here.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} pb-3`}
                          >
                            <div className="flex items-start gap-2">
                              <div className="mt-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className={
                                    isDarkMode
                                      ? "text-gray-200"
                                      : "text-gray-800"
                                  }
                                >
                                  {task.description}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-500 mr-2">
                                    {task.duration} mins
                                  </span>
                                  <Badge
                                    className={`${getBadgeStyle(task.category)} text-xs py-0 px-2 h-5`}
                                  >
                                    {task.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  <AchievementsPanel
                    className={`shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Session Complete View - Image 2 */
            <>
              <div>
                <Card
                  className={`p-6 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} mb-6 transition-colors duration-300`}
                >
                  <h2
                    className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Session Complete
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-indigo-800" : "bg-indigo-100"} flex items-center justify-center mb-2 transition-colors duration-300`}
                      >
                        <Clock
                          className={`h-6 w-6 ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}
                        />
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Duration
                      </div>
                      <div className="font-semibold">
                        {Math.floor(seconds / 60)}m {seconds % 60}s
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-green-800" : "bg-green-100"} flex items-center justify-center mb-2 transition-colors duration-300`}
                      >
                        <CheckCircle
                          className={`h-6 w-6 ${isDarkMode ? "text-green-300" : "text-green-600"}`}
                        />
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Completed Tasks
                      </div>
                      <div className="font-semibold">
                        {tasks.length} / {tasks.length}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`h-12 w-12 rounded-full ${isDarkMode ? "bg-purple-800" : "bg-purple-100"} flex items-center justify-center mb-2 transition-colors duration-300`}
                      >
                        <BarChart
                          className={`h-6 w-6 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                        />
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Top Category
                      </div>
                      <div className="font-semibold">
                        {tasks.length > 0 ? selectedCategory : "N/A"}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={handleStartNewSession}
                  >
                    Start New Session
                  </Button>
                </Card>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card
                    className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                  >
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                      <div className="text-xs text-indigo-600">Total Time</div>
                    </div>
                    <div className="text-xl font-medium">
                      {Math.floor(seconds / 60)}m {seconds % 60}s
                    </div>
                  </Card>

                  <Card
                    className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                  >
                    <div className="flex items-center mb-1">
                      <CheckCircle className="h-4 w-4 text-indigo-600 mr-2" />
                      <div className="text-xs text-indigo-600">
                        Tasks Completed
                      </div>
                    </div>
                    <div className="text-xl font-medium">
                      {tasks.length || 2}
                    </div>
                  </Card>

                  <Card
                    className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                  >
                    <div className="flex items-center mb-1">
                      <BarChart className="h-4 w-4 text-indigo-600 mr-2" />
                      <div className="text-xs text-indigo-600">
                        Top Category
                      </div>
                    </div>
                    <div className="text-xl font-medium">
                      {tasks.length > 0 ? selectedCategory : "Content Creation"}
                    </div>
                  </Card>
                </div>

                <Card
                  className={`p-6 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} transition-colors duration-300`}
                >
                  <h2
                    className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Session Tasks
                  </h2>

                  <div className="space-y-4">
                    {(tasks.length > 0 ? tasks : completedTasks).map((task) => (
                      <div
                        key={task.id}
                        className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} pb-4`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <div
                              className={
                                isDarkMode ? "text-gray-200" : "text-gray-800"
                              }
                            >
                              {task.description}
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500 mr-2">
                                {task.duration} mins
                              </span>
                              <Badge
                                className={`${getBadgeStyle(task.category)} text-xs`}
                              >
                                {task.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "analytics" && (
        /* Analytics View - Image 3 */
        <div className="space-y-6 flex-1 my-auto">
          <div className="flex justify-between items-center">
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" : "bg-white"} flex items-center gap-2`}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`w-auto p-0 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date || new Date());
                    setShowCalendar(false);
                  }}
                  initialFocus
                  className={isDarkMode ? "bg-gray-800 text-white" : ""}
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              className={
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  : ""
              }
            >
              {isDarkMode ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </Button>
          </div>

          <Card
            className={`p-6 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"} mb-6 transition-colors duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {format(date, "EEEE, MMMM d, yyyy")}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${isDarkMode ? "bg-indigo-800" : "bg-indigo-100"} flex items-center justify-center transition-colors duration-300`}
                >
                  <Clock
                    className={`h-5 w-5 ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Total Time
                  </div>
                  <div className="font-semibold">2h 32m</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${isDarkMode ? "bg-green-800" : "bg-green-100"} flex items-center justify-center transition-colors duration-300`}
                >
                  <CheckCircle
                    className={`h-5 w-5 ${isDarkMode ? "text-green-300" : "text-green-600"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Tasks Completed
                  </div>
                  <div className="font-semibold">8 / 12</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${isDarkMode ? "bg-purple-800" : "bg-purple-100"} flex items-center justify-center transition-colors duration-300`}
                >
                  <BarChart
                    className={`h-5 w-5 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Top Category
                  </div>
                  <div className="font-semibold">Content Creation</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card
                className={`p-4 shadow-sm ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-100 bg-white"} transition-colors duration-300`}
              >
                <h3
                  className={`text-sm font-medium mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Daily Category Distribution
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
                    {/* Interactive pie chart visualization */}
                    {pieChartSegments.map((segment, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 cursor-pointer transition-transform duration-300 hover:scale-105 ${pieChartHover === segment.name ? "z-10 transform scale-105" : ""}`}
                        style={{ clipPath: segment.clipPath }}
                        onMouseEnter={() => setPieChartHover(segment.name)}
                        onMouseLeave={() => setPieChartHover(null)}
                      >
                        <div className={`w-full h-full ${segment.color}`}></div>
                      </div>
                    ))}

                    {/* Hover indicator */}
                    {pieChartHover && (
                      <div className="absolute -right-4 top-1/4 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-20 animate-fadeIn">
                        <div className="font-medium">{pieChartHover}</div>
                        <div className="text-xs">
                          {
                            pieChartSegments.find(
                              (s) => s.name === pieChartHover,
                            )?.percentage
                          }
                          %
                        </div>
                      </div>
                    )}

                    {/* Center circle */}
                    <div
                      className={`w-24 h-24 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-white"} z-10 flex flex-col items-center justify-center transition-colors duration-300`}
                    >
                      <span className="text-lg font-bold">2h 32m</span>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  {pieChartSegments.map((segment, index) => (
                    <div
                      key={index}
                      className="flex items-center"
                      onMouseEnter={() => setPieChartHover(segment.name)}
                      onMouseLeave={() => setPieChartHover(null)}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${segment.color} mr-1`}
                      ></div>
                      <span
                        className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {segment.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <div>
                <h3
                  className={`text-sm font-medium mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Session 1 (1h 45m)
                </h3>

                <div
                  className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} pb-4 mb-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }
                      >
                        Created website mockups
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 mr-2">
                          45 mins
                        </span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0 text-xs">
                          Content Creation
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} pb-4 mb-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }
                      >
                        Sent invoices
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 mr-2">
                          30 mins
                        </span>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 text-xs">
                          Finance
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <h3
                  className={`text-sm font-medium mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Session 2 (0h 47m)
                </h3>

                <div
                  className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"} pb-4 mb-4`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }
                      >
                        Research competitors
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 mr-2">
                          25 mins
                        </span>
                        <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-0 text-xs">
                          Content Research
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HomePage;
