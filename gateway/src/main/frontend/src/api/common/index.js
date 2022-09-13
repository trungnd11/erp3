import axios from "axios"

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file',file)
    return axios.post(`/hr/api/common/files/project`,formData)
}