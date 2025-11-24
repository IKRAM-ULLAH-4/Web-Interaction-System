import axios from "axios";

const baseURL = "https://backend-ezzm.onrender.com/api";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;

// Auth & users
export const addUser = async (userInfo) => {
  const response = await instance.post("/register", userInfo);
  return response.data;
};

export const loginUser = async (userData) => {
  try {
    const response = await instance.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Dlta  error" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await instance.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Not authenticated" };
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get("/u");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

// Profile: update profile (multipart FormData)
export const updateProfile = async ({ fullName, avatarFile }) => {
  try {
    const form = new FormData();
    if (fullName) form.append("fullName", fullName);
    if (avatarFile) form.append("avatar", avatarFile);
    const response = await instance.put("/profile", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

// Messages API
export const getConversation = async (otherUserId) => {
  try {
    const response = await instance.get(`/messages/${otherUserId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch conversation" };
  }
};

export const sendMessage = async ({ to, text }) => {
  try {
    const response = await instance.post("/messages", { to, text });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send message" };
  }
};

export const editMessage = async (id, text) => {
  try {
    const response = await instance.put(`/messages/${id}`, { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to edit message" };
  }
};

export const removeMessage = async (id) => {
  try {
    const response = await instance.delete(`/messages/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete message" };
  }
};

// Other endpoints (features/steps)
export const getFeatures = async () => {
  try {
    const response = await instance.get("/features");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server error" };
  }
};

export const getSteps = async () => {
  try {
    const response = await instance.get("/steps");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch steps" };
  }
};

// Stripe: Create checkout session (ADDED)
export const createCheckoutSession = async () => {
  try {
    const response = await instance.post("/create-checkout-session");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to start payment" };
  }
};
