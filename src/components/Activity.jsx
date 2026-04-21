import { Link } from "react-router-dom";
import { useFitness } from "../context/fitnesscontext";

const Activity = ({ activity }) => {
  const { toggleGoalAchieved } = useFitness();

  return (
    <div>
      <h3>
        <Link to={`/activities/${activity.id}`}>
          {activity.name || "Unknown"}
        </Link>
      </h3>
      <p>Date: {activity.date || "No Date"}</p>
      <p>steps: {activity.steps}</p>
      <p>caloriesburned: {activity.caloriesburned}</p>
      <p>workoutMinutes: {activity.workoutMinutes}</p>
      <p>goalachived: {String(activity.goalachived)}</p>

      <button onClick={() => toggleGoalAchieved(activity.id)}>
        {activity.goalachived ? "Goal Achieved" : "Mark as Achieved"}
      </button>
    </div>
  );
};

export default Activity;
