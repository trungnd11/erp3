import axios from 'axios';

export const getTeamData = (departmentId) => {

  return axios.get(`/hr/api/v1/team?department=${departmentId}`);
}

export const getDepartmentInfo = (departmentId) => {
  return axios.get(`/hr/api/v1/department/${departmentId}`);
}

export const createTeam = (departmentId, data) => {
  return axios.post(`/hr/api/v1/team?department=${departmentId}`, data)
}

export const getEmployeeDepartment = (department) => {
  return axios.get(`/hr/api/v1/employee/department/${department}`)
}

export const updateMember = (teamId, data) => {
  return axios.put(`/hr/api/v1/team/${teamId}/member`, data);
}

export const setLeader = (teamId, memberId) => {
  return axios.put(`/hr/api/v1/team/${teamId}/leader?member=${memberId}`);
}