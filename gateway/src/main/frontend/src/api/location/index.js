/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const URL_LOCATION = "/hr/api/v1/location";

export default {
  getLocations() {
    return axios.get(URL_LOCATION);
  },
  getLocationsByName(data) {
    return axios.get(`${URL_LOCATION}/findName?name=${data}`);
  },
  createLocation(data) {
    return axios.post(URL_LOCATION, data);
  },
  updateLocation(data) {
    return axios.put(URL_LOCATION, data);
  },
  deleteLocation(id) {
    return axios.delete(`${URL_LOCATION}/${id}`);
  },
  // getLocationsByIdDepartment(id) {

  // },
};
