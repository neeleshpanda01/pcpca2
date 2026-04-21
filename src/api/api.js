import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getDataFromServer = async () => {
  try {
    const tokenRes = await axios.post(`${BASE_URL}/public/token`, {
      studentId: "E0223028", 
      set: "setB",                        
      password: "147036"
    });

    const { token, dataUrl } = tokenRes.data;

    console.log("TOKEN:", token);
    console.log("DATA URL:", dataUrl);

    const dataRes = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("DATA:", dataRes.data);

    return (
      dataRes.data?.data?.orders ||
      dataRes.data?.orders ||
      dataRes.data
    );

  } catch (error) {
    console.error("API ERROR:", error.response?.data || error);
    throw error;
  }
};