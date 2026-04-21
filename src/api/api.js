import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    console.log("[API] Requesting token...");
    const tokenRes = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set,
    });

    console.log("[API] Token response:", tokenRes.data);
    return tokenRes.data;

  } catch (error) {
    console.error("[API] Token error:", error.response?.data || error.message);
    console.error("[API] Token status:", error.response?.status);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    console.log("[API] Fetching dataset from:", dataUrl);
    const dataRes = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[API] Dataset response:", dataRes.data);
    
    return (
      dataRes.data?.data ||
      dataRes.data?.orders ||
      dataRes.data
    );

  } catch (error) {
    console.error("[API] Dataset error:", error.response?.data || error.message);
    console.error("[API] Dataset status:", error.response?.status);
    throw error;
  }
};