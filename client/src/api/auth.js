import axios from "axios";

export const register = async (userInfos) => {
  return await axios.post("/api/user/register", userInfos);
};

export const login = async (userInfos) => {
  return await axios.post("/api/user/login", userInfos);
};

export const logout = async () => {
  return await axios.get("/api/user/login");
};

export const updatePassword = async (userPasswords) => {
  return await axios.put("/api/user/password", userPasswords);
};

export const currentUser = async () => {
  return await axios.get("/api/user/me");
};
