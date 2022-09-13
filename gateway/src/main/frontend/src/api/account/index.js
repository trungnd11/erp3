import axios from 'axios';

export const getUserActive = (key, page, size, sort) => {
  const eKey= encodeURIComponent(key);
  return axios.get(`/hr/api/v1/user/active?key=${eKey}&page=${page}&size=${size}&sort=${sort}`);
}

export const getUserNotActive = (key, page, size, sort) => {
  const eKey= encodeURIComponent(key);
  return axios.get(`/hr/api/v1/user/not-active?key=${eKey}&page=${page}&size=${size}&sort=${sort}`);
}

export const getUserBlock = (key, page, size, sort) => {
  const eKey= encodeURIComponent(key);
  return axios.get(`/hr/api/v1/user/blocked?key=${eKey}&page=${page}&size=${size}&sort=${sort}`);
}

export const getEmployee = (id) => {
  return axios.get(`/hr/api/v1/employee/${id}`);
}

export const updatePermission = (data) => {
  return axios.put('/hr/api/v1/employee/permission', data);
}

export const updateRole = (roleId, data) => {
  return axios.put(`/auth/api/v1/role/${roleId}`, data);
}

export const changeActiveStatus = (username) => {
  return axios.put(`/auth/api/v1/account/active/${username}`)
}