import { API_BASE } from "./api";

export const uploadKyc = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE}/kyc/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res.data);
    } catch (err) {
        console.error("KYC Upload Failed:", err);
      }
    };
