import axios from "axios";

export const API_BASE = "https://house-haunt-flask.onrender.com";

export const testConnection = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/ping`);
    console.log("Flask Connected:", res.data);
  } catch (err) {
    console.error("Backend not reachable:", err);
  }
};