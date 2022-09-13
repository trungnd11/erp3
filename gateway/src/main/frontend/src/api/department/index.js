/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const URL_PART = "/hr/api/v1/department";

export default {
  getDepartment() {
    return axios.get(URL_PART);
  },

  getDepartmentCurrent() {
    return axios.get(`${URL_PART}/current`);
  },

  getDepartmentById(id) {
    return axios.get(`${URL_PART}/${id}`);
  },

  createDepartment(data) {
    return axios.post(URL_PART, data);
  },

  updateDepartment(data) {
    return axios.put(URL_PART, data);
  },

  deleteDepartment(partId) {
    return axios.delete(`${URL_PART}/${partId}`);
  },

  updateParentDepartment(data) {
    return axios.put(`${URL_PART}/updatePosition`, data);
  },

  updateManagerPart(data) {
    return axios.put(`${URL_PART}/updateManager`, data);
  },

  getLocationsByIdDepartment(id) {
    return axios.get(`${URL_PART}/${id}`);
  },

  deleteLocationByDepartment(data) {
    return axios.delete(`${URL_PART}/deletelocation`, { data });
  },

  findDepartmentByName(name) {
    return axios.get(`${URL_PART}/searchName?name=${name}`);
  },

  importDepartment(data) {
    return axios.post(`${URL_PART}/import-excel`, data);
  },
};
