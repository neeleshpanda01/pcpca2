import { Routes, Route, Navigate } from "react-router-dom";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import FilterActivities from "./pages/FilterActivities";
import Stats from "./pages/Stats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/activities" replace />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/:id" element={<ActivityDetail />} />
      <Route path="/filter" element={<FilterActivities />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;
