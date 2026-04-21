import { useParams, Link } from "react-router-dom";
import { useFitness } from "../context/fitnesscontext";

const ActivityDetail = () => {
  const { id } = useParams();
  const { validActivities } = useFitness();

  // Find activity by id
  const activity = validActivities.find((a) => String(a.id) === String(id));

  // Handle invalid id
  if (!activity) {
    return (
      <div>
        <h1>Activity not found</h1>
        <Link to="/activities">Back to Activities</Link>
      </div>
    );
  }

  // Calculate efficiency score dynamically, handle division by zero
  const workoutMinutes = Number(activity.workoutMinutes) || 0;
  const caloriesburned = Number(activity.caloriesburned) || 0;
  const efficiencyScore =
    workoutMinutes > 0 ? (caloriesburned / workoutMinutes).toFixed(2) : "N/A";

  return (
    <div>
      <Link to="/activities">Back to Activities</Link>

      <h1>{activity.name || "Unknown"}</h1>
      <p>Date: {activity.date || "No Date"}</p>
      <p>steps: {activity.steps}</p>
      <p>caloriesburned: {activity.caloriesburned}</p>
      <p>workoutMinutes: {activity.workoutMinutes}</p>
      <p>goalachived: {String(activity.goalachived)}</p>

      <p>
        <strong>Efficiency Score:</strong> {efficiencyScore} (calories/minute)
      </p>
    </div>
  );
};

export default ActivityDetail;
