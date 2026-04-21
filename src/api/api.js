import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set,
    });
    return data;
  } catch (err) {
    console.error("[API] Token error response:", err.response?.data);
    console.error("[API] Token error status:", err.response?.status);
    throw err;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (err) {
    console.error("[API] Dataset error response:", err.response?.data);
    console.error("[API] Dataset error status:", err.response?.status);
    throw err;
  }
};
