import axios from "axios";

export const searchPosition = (key, page, rowPerPage) => {
  const keyEncode = encodeURIComponent(key.trim());
  return axios.get(`/hr/api/v1/position?key=${keyEncode}&size=${rowPerPage}&page=${page}&sort=createdDate,desc`);
}

export const createPosition = (data) => {
  return axios.post('/hr/api/v1/position', data);
}

export const getPosition = (id) => {
  return axios.get(`/hr/api/v1/position/${id}`);
}

export const updatePosition = (id, data) => {
  return axios.put(`/hr/api/v1/position/${id}`, data);
}