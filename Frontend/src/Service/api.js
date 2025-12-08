import axios from "axios";

const baseURL = "https://web-interaction-system.vercel.app/api";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// Add admin token on all admin requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers["x-admin-token"] = token;
  }
  return config;
});

export default instance;

// -------- AUTH ----------
export const addUser = async (userInfo) => {
  const res = await instance.post("/register", userInfo);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await instance.post("/login", userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await instance.post("/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await instance.get("/me");
  return res.data;
};

// -------- CHAT / USERS ----------
export const getAllUsersForChat = async () => {
  const res = await instance.get("/user");
  return res.data;
};

// -------- ADMIN ----------
export const deleteUserByEmail = async (email) => {
  const res = await instance.delete(`/admin/users?email=${email}`);
  return res.data;
};

// -------- SEARCH USERS ----------
export const searchUsersByEmail = async (query) => {
  const res = await instance.get(`/search-users?q=${query}`);
  return res.data;
};

// -------- PROFILE ✅ FIXED ----------
export const updateProfile = async (formData) => {
  /**
   * ✔ MUST be FormData
   * ✔ multer backend compatible
   * ✔ supports text-only or file upload
   */
  const res = await instance.put("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// -------- MESSAGES ----------
export const getConversation = async (otherUserId) => {
  const res = await instance.get(`/messages/${otherUserId}`);
  return res.data;
};

export const sendMessage = async ({ to, text }) => {
  const res = await instance.post("/messages", { to, text });
  return res.data;
};

export const editMessage = async (id, text) => {
  const res = await instance.put(`/messages/${id}`, { text });
  return res.data;
};

export const removeMessage = async (id) => {
  const res = await instance.delete(`/messages/${id}`);
  return res.data;
};

// -------- FEATURES ----------
export const getFeatures = async () => {
  const res = await instance.get("/features");
  return res.data;
};

export const createFeature = async (formData) => {
  const res = await instance.post("/features", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateFeatureById = async (id, formData) => {
  const res = await instance.put(`/features/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteFeatureById = async (id) => {
  const res = await instance.delete(`/features/${id}`);
  return res.data;
};

// -------- STEPS ----------
export const getSteps = async () => {
  const res = await instance.get("/steps");
  return res.data;
};

// -------- STRIPE ----------
export const createCheckoutSession = async () => {
  const res = await instance.post("/create-checkout-session");
  return res.data;
};
