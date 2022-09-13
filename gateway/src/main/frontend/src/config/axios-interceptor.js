import axios from "axios";
import { Storage } from "../utils/storage-utils";

const TIMEOUT = 1 * 60 * 1000;

axios.defaults.timeout = TIMEOUT;
axios.defaults.headers.post["Content-Type"] = "application/json";

const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = (config) => {
    const token = Storage.local.get('authenticationToken') || Storage.session.get('authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (error) => {
    console.log(error)
    const status = error.status || (error.response ? error.response.status : 0);
    if (status === 401 || error.includes('401')) {
      onUnauthenticated();
    }
    if (status === 403) {
      window.location.href = '/ancao/403';
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;