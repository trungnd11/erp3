/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const URL_EMPLOYEE_PART = '/hr/api/v1/employee';

const URL_EMPLOYEE_FAMILY = '/hr/api/v1/employee/family';

const URL_EMPLOYEE_EDUCATION = '/hr/api/v1/employee/education';

const URL_EMPLOYEE_CERTIFICATE = '/hr/api/v1/employee/certificate';

const URL_EMPLOYEE_TRAINING = '/hr/api/v1/employee/training';

const URL_EMPLOYEE_LANGUAGE = '/hr/api/v1/employee/language';

const URL_EMPLOYEE_PROJECT = '/hr/api/v1/employee/project';

const URL_EMPLOYEE_WORKPROCESS = '/hr/api/v1/employee/working';

const URL_EMPLOYEE_SPECIALIZE = '/hr/api/v1/employee/specialize';

const URL_LIST_EMPLOYEE = '/hr/api/v1/employee/all';

const URL_EMPLOYEE_IMPORT = '/hr/api/v1/employee/import-excel';

export default {
  // get all
  listEmployee() {
    return axios.get(URL_EMPLOYEE_PART);
  },

  //get list department
  getDepartment() {
    return axios.get(`/hr/api/v1/department`);
  },

  //get list position
  getAllPositon() {
    return axios.get('/hr/api/v1/position/list');
  },

  getListEmployee() {
    return axios.get(URL_LIST_EMPLOYEE);
  },

  getDataEmployee(page, size) {
    return axios.get(`${URL_EMPLOYEE_PART}/listEmployee?page=${page}&size=${size}`);
  },

  changePassword(username,data) {
    return axios.put(`${URL_EMPLOYEE_PART}/changePassword/${username}`, data);
  },

  changePassword2Default(username) {
    return axios.put(`${URL_EMPLOYEE_PART}/changePassword2Default/${username}`);
  },

  createNewEmployee(data) {
    return axios.post(`${URL_EMPLOYEE_PART}/saveEmployee`, data);
  },

  deleteEmployee(data) {
    return axios.delete(`${URL_EMPLOYEE_PART}/deleteEmp/${data}`);
  },

  getDataEmployeeByID(id) {
    return axios.get(`${URL_EMPLOYEE_PART}/empID/${id}`);
  },

  findEmployeeByKey(key) {
    const keyEncode = encodeURIComponent(key.trim());
    return axios.get(`/hr/api/v1/employee/searchv1?key=${keyEncode}`);
  },

  findEmpByTextSearch(page, size, keyTxtSearch, keyPosition, keyDepartment, keyGroup) {
    return axios.get(`/hr/api/v1/employee/textSearchv2?page=${page}&size=${size}&keyTxtSearch=${keyTxtSearch}&keyPosition=${keyPosition}&keyDepartment=${keyDepartment}&keyGroup=${keyGroup}`);
  },

  getNameByID(id) {
    return axios.get(`${URL_EMPLOYEE_PART}/empID/${id}`);
  },

  // 11 is Hr; 17 is Ur
  getDataNameHr() {
    return axios.get(`${URL_EMPLOYEE_PART}/empHrIDall/11`);
  },

  // 11 is Hr; 17 is Ur
  getDataNameUrByDepatmentId(id) {
    return axios.get(`${URL_EMPLOYEE_PART}/empHrID/${id}&17`);
  },

  updateDataEmployee(data) {
    return axios.put(`${URL_EMPLOYEE_PART}/updateEmployeeV1`, data);
  },

  // get list Family Members
  getEmployeeFamily(id) {
    return axios.get(`${URL_EMPLOYEE_FAMILY}/${id}`);
  },

  // create Family member
  createEmployeeFamily(data) {
    return axios.post(`${URL_EMPLOYEE_FAMILY}`, data);
  },

  // update Family member
  updateEmlpoyeeFamilyMember(data) {
    return axios.put(`${URL_EMPLOYEE_FAMILY}`, data);
  },

  // delete Family Member
  deleteEmployeeFamilyMember(id) {
    return axios.delete(`${URL_EMPLOYEE_FAMILY}/${id}`);
  },

  // get Employee Educations
  getEducaionsByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_EDUCATION}/${id}`);
  },

  // create Employee Education
  createEducation(data) {
    return axios.post(URL_EMPLOYEE_EDUCATION, data);
  },

  // edit Employee Education
  updateEducation(data) {
    return axios.put(URL_EMPLOYEE_EDUCATION, data);
  },

  // delete Employee Education
  deleteEducation(id) {
    return axios.delete(`${URL_EMPLOYEE_EDUCATION}/${id}`);
  },

  // get Employee Educations
  getCertificatesByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_CERTIFICATE}/${id}`);
  },

  // create Employee Education
  createCertificate(data) {
    return axios.post(URL_EMPLOYEE_CERTIFICATE, data);
  },

  // edit Employee Education
  updateCertificate(data) {
    return axios.put(URL_EMPLOYEE_CERTIFICATE, data);
  },

  // delete Employee Education
  deleteCertificate(id) {
    return axios.delete(`${URL_EMPLOYEE_CERTIFICATE}/${id}`);
  },

  // get Employee training
  getTrainingsByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_TRAINING}/${id}`);
  },

  // create Employee training
  createTraining(data) {
    return axios.post(URL_EMPLOYEE_TRAINING, data);
  },

  // edit Employee training
  updateTraining(data) {
    return axios.put(URL_EMPLOYEE_TRAINING, data);
  },

  // delete Employee training
  deleteTraining(id) {
    return axios.delete(`${URL_EMPLOYEE_TRAINING}/${id}`);
  },

  // get Employee language
  getLanguageByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_LANGUAGE}/${id}`);
  },

  // create Employee language
  createLanguage(data) {
    return axios.post(URL_EMPLOYEE_LANGUAGE, data);
  },

  // edit Employee language
  updateLanguage(data) {
    return axios.put(URL_EMPLOYEE_LANGUAGE, data);
  },

  // delete Employee language
  deleteLanguage(id) {
    return axios.delete(`${URL_EMPLOYEE_LANGUAGE}/${id}`);
  },

  // get Employee project
  getProjectsByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_PROJECT}/${id}`);
  },

  // create Employee project
  createProject(data) {
    return axios.post(URL_EMPLOYEE_PROJECT, data);
  },

  // edit Employee project
  updateProject(data) {
    return axios.put(URL_EMPLOYEE_PROJECT, data);
  },

  // delete Employee project
  deleteProject(id) {
    return axios.delete(`${URL_EMPLOYEE_PROJECT}/${id}`);
  },

  // get Employee project
  getWorkingByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_WORKPROCESS}/${id}`);
  },

  // create Employee project
  createWorking(data) {
    return axios.post(URL_EMPLOYEE_WORKPROCESS, data);
  },

  // edit Employee project
  updateWorking(data) {
    return axios.put(URL_EMPLOYEE_WORKPROCESS, data);
  },

  // delete Employee project
  deleteWorking(id) {
    return axios.delete(`${URL_EMPLOYEE_WORKPROCESS}/${id}`);
  },

  // get Employee project
  getSpecializeByEmployeeId(id) {
    return axios.get(`${URL_EMPLOYEE_SPECIALIZE}/${id}`);
  },

  // create Employee project
  createSpecialize(data) {
    return axios.post(URL_EMPLOYEE_SPECIALIZE, data);
  },

  // edit Employee project
  updateSpecialize(data) {
    return axios.put(URL_EMPLOYEE_SPECIALIZE, data);
  },

  // delete Employee project
  deleteSpecialize(id) {
    return axios.delete(`${URL_EMPLOYEE_SPECIALIZE}/${id}`);
  },

  // import Employee
  importEmployee(data) {
    return axios.post(URL_EMPLOYEE_IMPORT, data);
  },

  // get employees By Department
  getEmployeeByDepartment(id) {
    return axios.get(`${URL_EMPLOYEE_PART}/department/${id}`);
  },

  updateEmployeeForDepartment(employees, departmentId) {
    return axios.post(`${URL_EMPLOYEE_PART}/department/updateEmployee/${departmentId}`, employees);
  },

  deleteEmployeeForDepartment(employeeId) {
    return axios.delete(
      `${URL_EMPLOYEE_PART}/department/deleteEmployee/${employeeId}`
    );
  }
};
