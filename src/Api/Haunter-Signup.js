import axios from "axios";

export const registerHaunter = async (formData) => {
  const API = import.meta.env.VITE_API_URL
  console.log("Received formData in registerHaunter:", formData);

  try {
    const response = await axios.post(`${API}/api/auth/register`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data

    console.log("Sending:", JSON.stringify(formData));

    // Optional: Save returned user info or token if provided
    // if (data?.token) localStorage.setItem("token", data.token);
    // if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Signup successful:", data);

    return data
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
  }
};



// export const registerHaunter = async (userData) => {
//   try {
//     const response = await fetch("https://house-haunt-flask.onrender.com/api/haunter/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });
//     return await response.json();

//   } catch (error) {
//     console.error("Registration failed:", error);
//   }
// };