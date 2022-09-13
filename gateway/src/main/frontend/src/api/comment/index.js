import axios from 'axios';

export const getCommentTask = (task, page, size, sort) => {
  return axios.get(`/hr/api/v1/comment?task=${task}&page=${page}&size=${size}&sort=${sort}`);
}

export const updateComment = (id ,data) => {
  return axios.put(`/hr/api/v1/comment/${id}`, data);
}

export const createComment = (taskId, data) => {
  return axios.post(`/hr/api/v1/comment?task=${taskId}`, data);
}

export const replyRootComment = (commentId, data) => {
  return axios.post(`/hr/api/v1/comment/${commentId}`, data);
}