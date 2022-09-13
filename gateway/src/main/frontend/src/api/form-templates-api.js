import axios from "axios";

export const getFormTemplate = (key, page, size, sort) => {
  const enKey = encodeURIComponent(key);
  return axios.get(`/hr/api/v1/form-data?key=${enKey}&page=${page}&size=${size}&sort=${sort}`);
}

export const createFormTemplate = (data) => {
  return axios.post('/hr/api/v1/form-data', data);
}

export const getFormTemplateById = (id) => {
  return axios.get(`/hr/api/v1/form-data/${id}`);
}

export const updateFormTemplate = (id, data) => {
  return axios.put(`/hr/api/v1/form-data/${id}`, data);
}

export const searchEmployee = (key) => {
  const keyword = encodeURIComponent(key);
  return axios.get(`/hr/api/v1/employee/search?key=${keyword}`);
}