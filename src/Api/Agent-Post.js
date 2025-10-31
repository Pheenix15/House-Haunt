import axios from "axios";

export const sendAgentPost = async (formData) => {
  console.log("Received formData in registerHaunter:", formData);

  try {
    const response = await axios.post('/api/agent/houses',
      formData,
      { headers: { "Content-Type": "application/json" }}
    );
    const houseData = response.data

    console.log("Sending:", JSON.stringify(formData));


    console.log("House data sent successfully:", houseData);

    return houseData
  } catch (error) {
    console.error("House post error:", error.response?.data || error.message);
  }
};

