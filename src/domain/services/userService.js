import {axiosInstance} from './axiosInstance';

export const fetchAllUsers = (page = 0, limit = 5) => {
  return axiosInstance.get(`users?_page=${page}&_limit=${limit}`);
};

export const fetchUser = (id) => {
  return axiosInstance.get(`users/${id}`);
};
