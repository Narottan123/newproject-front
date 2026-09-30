import axiosInstance from "../../services/axiosInstance";

export const createPostAPI = (data) => axiosInstance.post("/posts", data);

export const getPostsAPI = () => axiosInstance.get("/posts");

export const getSinglePostAPI = (id) => axiosInstance.get(`/posts/${id}`);

export const updatePostAPI = (id, data) =>
  axiosInstance.put(`/posts/${id}`, data);

export const deletePostAPI = (id) => axiosInstance.delete(`/posts/${id}`);
