import { Link } from "react-router-dom";
import { useFitness } from "../context/fitnesscontext";

const Stats = () => {
  const { validActivities, error } = useFitness();

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>{error}</p>
        <Link to="/activities">← Back to Activities</Link>
      </div>
    );
  }

  if (validActivities.length === 0) {
    return (
      <div>
        <p>No valid activities found</p>
        <Link to="/activities">← Back to Activities</Link>
      </div>
    );
  }

  // Calculate stats
  const totalActivities = validActivities.length;
  const totalSteps = validActivities.reduce(
    (sum, a) => sum + (Number(a.steps) || 0),
    0
  );
  const totalCalories = validActivities.reduce(
    (sum, a) => sum + (Number(a.caloriesburned) || 0),
    0
  );
  const totalMinutes = validActivities.reduce(
    (sum, a) => sum + (Number(a.workoutMinutes) || 0),
    0
  );
  const goalAchieved = validActivities.filter((a) => a.goalachived).length;
  const goalNotAchieved = validActivities.filter((a) => !a.goalachived).length;

  const avgSteps = (totalSteps / totalActivities).toFixed(2);
  const avgCalories = (totalCalories / totalActivities).toFixed(2);
  const avgMinutes = (totalMinutes / totalActivities).toFixed(2);
  const avgEfficiency =
    totalMinutes > 0 ? (totalCalories / totalMinutes).toFixed(2) : "N/A";

  return (
    <div>
      <h1>Fitness Statistics</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Overview</h2>
        <p>
          <strong>Total Activities:</strong> {totalActivities}
        </p>
        <p>
          <strong>Goal Achieved:</strong> {goalAchieved}
        </p>
        <p>
          <strong>Goal Not Achieved:</strong> {goalNotAchieved}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Totals</h2>
        <p>
          <strong>Total Steps:</strong> {totalSteps.toLocaleString()}
        </p>
        <p>
          <strong>Total Calories Burned:</strong> {totalCalories.toFixed(2)}
        </p>
        <p>
          <strong>Total Workout Minutes:</strong> {totalMinutes.toFixed(2)}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Averages</h2>
        <p>
          <strong>Average Steps:</strong> {avgSteps}
        </p>
        <p>
          <strong>Average Calories Burned:</strong> {avgCalories}
        </p>
        <p>
          <strong>Average Workout Minutes:</strong> {avgMinutes}
        </p>
        <p>
          <strong>Average Efficiency (Cal/Min):</strong> {avgEfficiency}
        </p>
      </div>

      <Link to="/activities">← Back to Activities</Link>
    </div>
  );
};

export default Stats;
