import axios from "axios";

export const sendAgentPost = async (form) => {
  console.log("Received formData in Agent Dashboard posts:", Object.fromEntries(form.entries()));
  console.log("FormData image:", form.getAll("images"));

  try {
    const response = await axios.post('/api/agent/create-house',
      form,
      { headers: { "Content-Type": "multipart/form-data" }}
    );
    const houseData = response.data

    console.log("House data sent successfully:", houseData);

    return houseData
  } catch (error) {
    let message = "Failed to create new listing";

    // Error variations depending on what the backend returns
    if (typeof error.response?.data?.message === "string") {
      message = error.response.data.message;
    } else if (typeof error.response?.data === "string") {
      message = error.response.data;
    } else if (typeof error.message === "string") {
      message = error.message;
    }
    console.error("House post error:", error.response?.data || error.message);

    throw new Error(message);
  }
};