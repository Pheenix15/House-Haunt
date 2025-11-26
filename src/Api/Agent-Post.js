import axios from "axios";

export const sendAgentPost = async (form) => {
  console.log("Received formData in Agent Dashboard posts:", Object.fromEntries(form.entries()));
  console.log("FormData image:", form.get("image"));

  try {
    const response = await axios.post('/api/agent/create-house',
      form,
      // { headers: { "Content-Type": "multipart/form-data", }}
    );
    const houseData = response.data



    console.log("House data sent successfully:", houseData);

    return houseData
  } catch (error) {
    console.error("House post error:", error.response?.data || error.message);
  }
};

