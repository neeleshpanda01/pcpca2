import { useFitness } from "../context/fitnesscontext";
import Activity from "../components/Activity";
import { Link } from "react-router-dom";

const Activities = () => {
  const { validActivities, error } = useFitness();

  console.log("[ACTIVITIES PAGE] Error:", error, "Valid Activities:", validActivities.length);

  if (error) {
    return (
      <div>
        <h1>Activities</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
        <p>Could not load activities from API. Please check console for details.</p>
      </div>
    );
  }

  if (validActivities.length === 0) {
    return (
      <div>
        <h1>Activities</h1>
        <p>No valid activities found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Activities ({validActivities.length})</h1>
      <Link to="/filter">Filter Activities by Steps</Link>
      {validActivities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default Activities;
