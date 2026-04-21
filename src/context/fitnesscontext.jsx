import { createContext, useContext, useReducer, useEffect } from "react";
import fitnessreducer from "../reducer/fitnessreducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
  activities: [],
  validActivities: [],
  loading: false,
  error: null,
};

export const fitnesscontext = createContext();

export const FitnessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fitnessreducer, initialState);

  // Fetch activities from server
  useEffect(() => {
    const fetchActivities = async () => {
      console.log("[FETCH] Starting to fetch activities...");
      try {
        // Step 1: Get Token
        console.log("[TOKEN] Requesting token...");
        const tokenRes = await getToken(
          "E0223028",
          "147036",
          "setB"
        );
        console.log("[TOKEN] Received:", tokenRes);

        // Step 2: Fetch dataset
        console.log("[DATASET] Fetching dataset from:", tokenRes.dataUrl);
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log("[DATASET] Received activities:", activities);

        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("[ERROR] Fetch failed:", err.message);
        console.error("[ERROR] Full error:", err);
        const errorMsg = err.response?.data?.message || err.message || "Unknown error";
        dispatch({ type: "SET_ERROR", payload: `API Error: ${errorMsg}` });
      }
    };

    fetchActivities();
  }, []);

  // Filter valid activities automatically
  useEffect(() => {
    dispatch({ type: "SET_VALID_ACTIVITIES" });
  }, [state.activities]);

  const toggleGoalAchieved = (id) =>
    dispatch({ type: "TOGGLE_GOAL_ACHIEVED", payload: id });

  return (
    <fitnesscontext.Provider
      value={{
        activities: state.activities,
        validActivities: state.validActivities,
        loading: state.loading,
        error: state.error,
        toggleGoalAchieved,
      }}
    >
      {children}
    </fitnesscontext.Provider>
  );
};

export const useFitness = () => useContext(fitnesscontext);
