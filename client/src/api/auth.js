import axios from "axios";

export const register = async (userInfos) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/register`,
    userInfos
  );
};

export const login = async (userInfos) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/login`,
    userInfos
  );
};

export const logout = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);
};

export const updatePassword = async (userPasswords) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}user/password`,
    userPasswords
  );
};

export const current = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/me`);
};
