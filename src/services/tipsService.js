import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api";

export const getAllTips = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tips`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tips:", error);
    throw error;
  }
};

export const getTipBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tips/${slug}`, {
      title: "hello",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tip:", error);
    throw error;
  }
};
