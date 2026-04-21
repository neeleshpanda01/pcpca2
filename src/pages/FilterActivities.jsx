import { useState } from "react";
import { useFitness } from "../context/fitnesscontext";
import { Link } from "react-router-dom";
import Activity from "../components/Activity";

const FilterActivities = () => {
  const { validActivities } = useFitness();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [filtered, setFiltered] = useState(null);

  const handleFilter = () => {
    // Empty input validation
    if (inputValue.trim() === "") {
      setError("Please enter a steps value");
      setFiltered(null);
      return;
    }

    // Invalid input validation
    const minSteps = Number(inputValue);
    if (isNaN(minSteps) || minSteps < 0) {
      setError("Invalid input. Please enter a positive number");
      setFiltered(null);
      return;
    }

    // Filter valid activities dynamically
    const results = validActivities.filter((activity) => {
      const steps = Number(activity.steps) || 0;
      return steps >= minSteps;
    });

    setError("");
    setFiltered(results);
  };

  return (
    <div>
      <h1>Filter Activities by Steps</h1>
      <Link to="/activities">Back to Activities</Link>

      <div>
        <input
          type="text"
          placeholder="Enter minimum steps"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filtered !== null && (
        <div>
          <p>Results: {filtered.length} activities found</p>
          {filtered.length === 0 ? (
            <p>No activities match the filter criteria.</p>
          ) : (
            filtered.map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FilterActivities;
