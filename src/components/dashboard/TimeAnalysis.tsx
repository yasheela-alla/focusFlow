import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
} from "lucide-react";

interface TimeAnalysisProps {
  data?: {
    categories: Array<{
      name: string;
      hours: number;
      percentage: number;
      color: string;
    }>;
    dailyData?: Array<{
      date: string;
      hours: number;
    }>;
    weeklyData?: Array<{
      week: string;
      hours: number;
    }>;
    monthlyData?: Array<{
      month: string;
      hours: number;
    }>;
  };
}

const TimeAnalysis = ({
  data = {
    categories: [
      { name: "Work", hours: 28, percentage: 40, color: "bg-blue-500" },
      { name: "Admin", hours: 14, percentage: 20, color: "bg-purple-500" },
      {
        name: "Content Creation",
        hours: 10.5,
        percentage: 15,
        color: "bg-green-500",
      },
      { name: "Finance", hours: 7, percentage: 10, color: "bg-yellow-500" },
      { name: "Learning", hours: 7, percentage: 10, color: "bg-pink-500" },
      { name: "Other", hours: 3.5, percentage: 5, color: "bg-gray-500" },
    ],
    dailyData: [
      { date: "2023-06-01", hours: 6.5 },
      { date: "2023-06-02", hours: 7.2 },
      { date: "2023-06-03", hours: 4.8 },
      { date: "2023-06-04", hours: 5.5 },
      { date: "2023-06-05", hours: 8.1 },
      { date: "2023-06-06", hours: 7.3 },
      { date: "2023-06-07", hours: 6.9 },
    ],
    weeklyData: [
      { week: "Week 1", hours: 38.5 },
      { week: "Week 2", hours: 42.1 },
      { week: "Week 3", hours: 35.7 },
      { week: "Week 4", hours: 40.2 },
    ],
    monthlyData: [
      { month: "January", hours: 160 },
      { month: "February", hours: 145 },
      { month: "March", hours: 170 },
      { month: "April", hours: 155 },
      { month: "May", hours: 165 },
      { month: "June", hours: 150 },
    ],
  },
}: TimeAnalysisProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState("7days");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Sort categories based on current sort order
  const sortedCategories = [...data.categories].sort((a, b) => {
    return sortOrder === "desc" ? b.hours - a.hours : a.hours - b.hours;
  });

  // Calculate total hours
  const totalHours = data.categories.reduce(
    (sum, category) => sum + category.hours,
    0,
  );

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              Time Analysis
            </CardTitle>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="distribution" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="distribution">
                Category Distribution
              </TabsTrigger>
              <TabsTrigger value="trends">Time Trends</TabsTrigger>
              <TabsTrigger value="breakdown">Detailed Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="distribution" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Pie chart visualization (simplified with colored blocks) */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden flex flex-wrap">
                    {data.categories.map((category, index) => {
                      // This is a simplified visualization - in a real app you'd use a proper chart library
                      const rotation =
                        index > 0
                          ? data.categories
                              .slice(0, index)
                              .reduce((sum, cat) => sum + cat.percentage, 0)
                          : 0;

                      return (
                        <div
                          key={category.name}
                          className={`absolute ${category.color}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + category.percentage / 2) * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin((rotation + category.percentage / 2) * 0.01 * Math.PI * 2)}%, ${50 + 50 * Math.cos((rotation + category.percentage) * 0.01 * Math.PI * 2)}% ${50 - 50 * Math.sin((rotation + category.percentage) * 0.01 * Math.PI * 2)}%)`,
                          }}
                        />
                      );
                    })}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-800 rounded-full w-32 h-32 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{totalHours}</span>
                        <span className="text-sm text-gray-500">
                          Total Hours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category legend */}
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Categories</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                      }
                      className="text-xs flex items-center"
                    >
                      Sort by hours{" "}
                      {sortOrder === "desc" ? (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      ) : (
                        <ChevronUp className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {sortedCategories.map((category) => (
                      <div key={category.name} className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {category.hours}h ({category.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${category.color}`}
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="h-[400px]">
              <div className="flex flex-col space-y-6">
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="View by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>

                {/* Simplified bar chart visualization */}
                <div className="flex-1 flex items-end space-x-2">
                  {data.dailyData?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t-md"
                        style={{ height: `${(item.hours / 10) * 300}px` }}
                      />
                      <div className="text-xs mt-2 text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Detailed Time Breakdown</h3>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-3 w-3" />
                  Filter
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tasks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedCategories.map((category) => (
                      <tr key={category.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                            />
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.hours}h
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {Math.round(category.hours * 1.5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeAnalysis;
