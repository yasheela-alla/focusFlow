import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  Tag,
  Trash2,
  Eye,
} from "lucide-react";

interface Session {
  id: string;
  date: Date;
  duration: number; // in minutes
  tasks: Task[];
}

interface Task {
  id: string;
  description: string;
  category: string;
  duration: number; // in minutes
  timestamp: Date;
}

interface HistoryViewProps {
  sessions?: Session[];
  onDeleteSession?: (id: string) => void;
  onViewSessionDetails?: (id: string) => void;
}

const HistoryView = ({
  sessions = [
    {
      id: "1",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      duration: 120,
      tasks: [
        {
          id: "1-1",
          description: "Updated website content",
          category: "Content Creation",
          duration: 45,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
          id: "1-2",
          description: "Reviewed quarterly budget",
          category: "Finance",
          duration: 75,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      ],
    },
    {
      id: "2",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      duration: 90,
      tasks: [
        {
          id: "2-1",
          description: "Team meeting",
          category: "Admin",
          duration: 60,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        },
        {
          id: "2-2",
          description: "Email correspondence",
          category: "Admin",
          duration: 30,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        },
      ],
    },
    {
      id: "3",
      date: new Date(Date.now() - 1000 * 60 * 60 * 72),
      duration: 180,
      tasks: [
        {
          id: "3-1",
          description: "Project planning",
          category: "Development",
          duration: 120,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        },
        {
          id: "3-2",
          description: "Client call",
          category: "Marketing",
          duration: 60,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        },
      ],
    },
  ],
  onDeleteSession = () => {},
  onViewSessionDetails = () => {},
}: HistoryViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      Admin: "bg-blue-100 text-blue-800",
      "Content Creation": "bg-purple-100 text-purple-800",
      Finance: "bg-green-100 text-green-800",
      Development: "bg-amber-100 text-amber-800",
      Marketing: "bg-pink-100 text-pink-800",
    };

    return categories[category] || "bg-gray-100 text-gray-800";
  };

  // Filter sessions based on search term, category, and date range
  const filteredSessions = sessions.filter((session) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      session.tasks.some(
        (task) =>
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    // Category filter
    const matchesCategory =
      categoryFilter === "all" ||
      session.tasks.some((task) => task.category === categoryFilter);

    // Date range filter (simplified for demo)
    let matchesDateRange = true;
    const now = new Date();
    const sessionDate = new Date(session.date);

    if (dateRange === "today") {
      matchesDateRange = sessionDate.toDateString() === now.toDateString();
    } else if (dateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDateRange = sessionDate >= weekAgo;
    } else if (dateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDateRange = sessionDate >= monthAgo;
    }

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  // Calculate total time spent
  const totalTimeSpent = filteredSessions.reduce(
    (total, session) => total + session.duration,
    0,
  );

  // Get all unique categories from all tasks
  const allCategories = Array.from(
    new Set(
      sessions.flatMap((session) => session.tasks).map((task) => task.category),
    ),
  );

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Session History</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks or categories..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  No sessions found matching your filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:w-64 bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
                        <div>
                          <div className="text-lg font-medium">
                            {formatDate(session.date)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(session.date)}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">
                            {formatDuration(session.duration)}
                          </span>
                        </div>
                      </div>

                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {Array.from(
                              new Set(
                                session.tasks.map((task) => task.category),
                              ),
                            ).map((category) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className={getCategoryColor(category)}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-500">
                              Tasks ({session.tasks.length})
                            </h4>
                            <ul className="mt-1 space-y-1">
                              {session.tasks.slice(0, 2).map((task) => (
                                <li
                                  key={task.id}
                                  className="text-sm flex items-start"
                                >
                                  <span className="mr-2">•</span>
                                  <span>{task.description}</span>
                                </li>
                              ))}
                              {session.tasks.length > 2 && (
                                <li className="text-sm text-gray-500">
                                  +{session.tasks.length - 2} more tasks
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onDeleteSession(session.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedSession(session)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Session Details - {formatDate(session.date)}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">Time</h4>
                                    <p className="text-gray-500">
                                      {formatTime(session.date)} (
                                      {formatDuration(session.duration)})
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    {Array.from(
                                      new Set(
                                        session.tasks.map(
                                          (task) => task.category,
                                        ),
                                      ),
                                    ).map((category) => (
                                      <Badge
                                        key={category}
                                        variant="outline"
                                        className={getCategoryColor(category)}
                                      >
                                        {category}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                <div>
                                  <h4 className="font-medium mb-2">Tasks</h4>
                                  <div className="space-y-3">
                                    {session.tasks.map((task) => (
                                      <div
                                        key={task.id}
                                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                                      >
                                        <div className="flex justify-between">
                                          <div className="font-medium">
                                            {task.description}
                                          </div>
                                          <Badge
                                            variant="outline"
                                            className={getCategoryColor(
                                              task.category,
                                            )}
                                          >
                                            {task.category}
                                          </Badge>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          Duration:{" "}
                                          {formatDuration(task.duration)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredSessions.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500">Total Sessions:</span>
                    <span className="ml-2 font-medium">
                      {filteredSessions.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Time:</span>
                    <span className="ml-2 font-medium">
                      {formatDuration(totalTimeSpent)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="calendar"
            className="h-[500px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Calendar view is not implemented in this demo.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HistoryView;
