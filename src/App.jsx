import { Routes, Route } from "react-router-dom";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import FilterActivities from "./pages/FilterActivities";

function App() {
  return (
    <Routes>
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/:id" element={<ActivityDetail />} />
      <Route path="/filter" element={<FilterActivities />} />
    </Routes>
  );
}

export default App;
