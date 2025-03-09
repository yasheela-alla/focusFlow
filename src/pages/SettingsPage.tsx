import React from "react";
import SettingsPanel from "../components/settings/SettingsPanel";

const SettingsPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="max-w-4xl mx-auto">
        <SettingsPanel />
      </div>
    </div>
  );
};

export default SettingsPage;
