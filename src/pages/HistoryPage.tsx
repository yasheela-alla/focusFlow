import React from "react";
import HistoryView from "../components/history/HistoryView";

const HistoryPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Session History</h1>
      <div className="max-w-5xl mx-auto">
        <HistoryView />
      </div>
    </div>
  );
};

export default HistoryPage;
