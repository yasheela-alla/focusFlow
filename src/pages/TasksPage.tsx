import React from "react";
import TaskLogger from "../components/tasks/TaskLogger";

const TasksPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <div className="max-w-4xl mx-auto">
        <TaskLogger />
      </div>
    </div>
  );
};

export default TasksPage;
