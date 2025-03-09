import React, { useState } from "react";
import { cn } from "../lib/utils";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import SessionTracker from "./session/SessionTracker";
import TaskLogger from "./tasks/TaskLogger";
import TimeAnalysis from "./dashboard/TimeAnalysis";
import HistoryView from "./history/HistoryView";
import SettingsPanel from "./settings/SettingsPanel";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would also update the document class for dark mode
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle settings click
  const handleSettingsClick = () => {
    setShowSettings(true);
    setActiveView("settings");
  };

  // Handle session completion
  const handleSessionComplete = (duration: number) => {
    console.log(`Session completed: ${duration} minutes`);
    // In a real app, you would prompt to log tasks
    setActiveView("tasks");
  };

  // Render the appropriate view based on activeView state
  const renderView = () => {
    switch (activeView) {
      case "session":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Session Tracker</h1>
            <SessionTracker onSessionComplete={handleSessionComplete} />
          </div>
        );
      case "tasks":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Task Logger</h1>
            <TaskLogger />
          </div>
        );
      case "analysis":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Time Analysis</h1>
            <TimeAnalysis />
          </div>
        );
      case "history":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Session History</h1>
            <HistoryView />
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <SettingsPanel />
          </div>
        );
      default:
        // Dashboard view - shows a combination of components
        return (
          <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SessionTracker onSessionComplete={handleSessionComplete} />
              <TaskLogger />
            </div>

            <div className="mt-8">
              <TimeAnalysis />
            </div>

            <div className="mt-8">
              <HistoryView />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("min-h-screen bg-gray-100", isDarkMode && "dark")}>
      <div className="dark:bg-gray-900 dark:text-white">
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          onSettingsClick={handleSettingsClick}
        />
        <div className="flex">
          <Sidebar
            activePage={activeView}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            onLogout={() => console.log("Logout clicked")}
          />
          <main className="flex-1 min-h-[calc(100vh-64px)]">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
