import { Routes, Route, Navigate } from "react-router-dom";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import FilterActivities from "./pages/FilterActivities";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/activities" replace />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/:id" element={<ActivityDetail />} />
      <Route path="/filter" element={<FilterActivities />} />
    </Routes>
  );
}

export default App;
