/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const GroupUserUrl = "/hr/api/v1/groupuser";

export default {
getGroupUser() {
   return axios.get(GroupUserUrl)
},
getGroupUserWithPage(page, size) {
  return axios.get(`${GroupUserUrl}/grp?page=${page}&size=${size}`)
},
createGroupuser(data) {
  return axios.post(GroupUserUrl, data);
},
updateGroupuser(data) {
  return axios.put(GroupUserUrl, data);
},
deleteGroupuser(partId) {
  return axios.delete(`${GroupUserUrl}/${partId}`);
},
// updateManagerPart(data) {
//   return axios.put(`${GroupUserUrl}/updateManager`, data);
// },
};