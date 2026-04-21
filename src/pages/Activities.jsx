import { useFitness } from "../context/fitnesscontext";
import Activity from "../components/Activity";
import { Link } from "react-router-dom";

const Activities = () => {
  const { validActivities, loading } = useFitness();

  console.log("[ACTIVITIES PAGE] Loading:", loading, "Valid Activities:", validActivities.length);

  if (loading) {
    return (
      <div>
        <h1>Activities</h1>
        <p>Loading activities from API...</p>
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
