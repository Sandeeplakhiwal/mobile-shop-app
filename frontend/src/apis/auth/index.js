import axios from "axios";
import { server } from "../../redux/store";

export const loginApi = (formData) => {
  return axios.post(`${server}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const signUpApi = (formData) => {
  return axios.post(`${server}/register`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const logoutApi = () => {
  return axios.get(`${server}/logout`, {
    withCredentials: true,
  });
};

export const getMyProfile = () => {
  return axios.get(`${server}/me`, {
    withCredentials: true,
  });
};
