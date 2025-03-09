import React from "react";
import TimeAnalysis from "../components/dashboard/TimeAnalysis";

const AnalyticsPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="max-w-5xl mx-auto">
        <TimeAnalysis />
      </div>
    </div>
  );
};

export default AnalyticsPage;
