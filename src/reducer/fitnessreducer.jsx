const fitnessreducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "SET_VALID_ACTIVITIES":
      return {
        ...state,
        validActivities: state.activities.filter((activity) => {
          const steps = Number(activity.steps) || 0;
          const caloriesburned = Number(activity.caloriesburned) || 0;
          const workoutMinutes = Number(activity.workoutMinutes) || 0;
          const goalachived = activity.goalachived;

          return (
            steps > 0 &&
            caloriesburned > 0 &&
            workoutMinutes > 0 &&
            typeof goalachived === "boolean"
          );
        }),
      };

    case "TOGGLE_GOAL_ACHIEVED":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (activity.id === action.payload && typeof activity.goalachived === "boolean") {
            const steps = Number(activity.steps) || 0;
            // Business logic: if steps >= 8000, must be true
            const newGoal = steps >= 8000 ? true : !activity.goalachived;
            return { ...activity, goalachived: newGoal };
          }
          return activity;
        }),
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default fitnessreducer;
