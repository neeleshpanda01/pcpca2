// services/api.js
import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const fetchActivities = async () => {
  try {
    const tokenRes = await axios.post(`${BASE_URL}/public/token`, {
      studentId: "E0223028",
      set: "setB",
      password: "147036",
    });

    const token = tokenRes.data.token;
    const dataUrl = tokenRes.data.dataUrl;

    const activitiesRes = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const activitiesData = activitiesRes.data.data?.activities;

    if (!Array.isArray(activitiesData)) {
      throw new Error("Invalid activities data format");
    }

    return activitiesData;
  } catch (error) {
    throw error;
  }
};
