import React from "react";
import SessionTracker from "../components/session/SessionTracker";
import TaskList from "../components/tasks/TaskList";

const SessionPage = () => {
  const handleSessionComplete = (duration: number) => {
    console.log(`Session completed: ${duration} minutes`);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Current Session</h1>
        <div className="flex space-x-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-4 py-2 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500">Total Time</div>
            <div className="text-xl font-semibold">0h 0m</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-4 py-2 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500">Tasks Completed</div>
            <div className="text-xl font-semibold">0</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm px-4 py-2 border border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500">Top Category</div>
            <div className="text-xl font-semibold">N/A</div>
          </div>
        </div>
      </div>

      <SessionTracker onSessionComplete={handleSessionComplete} />

      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default SessionPage;
