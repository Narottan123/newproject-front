import axiosInstance from "../../services/axiosInstance";

export const addCommentAPI = (postId, data) =>
  axiosInstance.post(`/comments/${postId}`, data);

export const getCommentsAPI = (postId) =>
  axiosInstance.get(`/comments/${postId}`);
