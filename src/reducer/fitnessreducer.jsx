const fitnessreducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      };

    case "SET_VALID_ACTIVITIES":
      const filtered = state.activities.filter((activity) => {
        const steps = Number(activity.steps) || 0;
        const caloriesburned = Number(activity.caloriesburned) || 0;
        const workoutMinutes = Number(activity.workoutMinutes) || 0;
        const goalachived = activity.goalachived;

        const isValid = (
          steps > 0 &&
          caloriesburned > 0 &&
          workoutMinutes > 0 &&
          typeof goalachived === "boolean"
        );

        if (!isValid) {
          console.log("[FILTER] Activity rejected:", activity);
          console.log("[FILTER] Steps:", steps, "Calories:", caloriesburned, "Minutes:", workoutMinutes, "Goal:", goalachived, "Type:", typeof goalachived);
        }

        return isValid;
      });
      
      console.log("[FILTER] Total activities:", state.activities.length);
      console.log("[FILTER] Valid activities:", filtered.length);
      
      return {
        ...state,
        validActivities: filtered,
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

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default fitnessreducer;
