import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import TasksPage from "./pages/TasksPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <div className="min-h-screen">
      <main className="flex-1 min-h-screen">
        <Suspense fallback={<p className="p-6">Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/session" element={<SessionPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
            </Routes>
            {/* Tempo routes will be loaded by the platform */}
          </>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
