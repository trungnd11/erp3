import axios from "axios";
import moment from "moment";

const URL_PROJECT = '/hr/api/project'
const URL_STATUS = '/hr/api/status'
const URL_PRIPRITY = '/hr/api/priority/all'
const URL_TAG = '/hr/api/hashTag/all'
const URL_KANBAN = '/hr/api/task/backLog'
const URL_SPRINT = '/hr/api/sprint'
const URL_TASK_TYPE = '/hr/api/taskType'
const URL_PRIORITY = '/hr/api/priority'
const URL_TASK = '/hr/api/task'

export default {
    /* get All list project */
    getAllListProject(page = 0,pageSize = 100) {
        return axios.get(`${URL_PROJECT}/all?page=${page}&size=${pageSize}`);
    },
    getProjectById(id) {
        return axios.get(`${URL_PROJECT}/detail/${id}`);
    },
    /* Create new project */
    createNewProject(data) {
        return axios.post(`${URL_PROJECT}/create`,data)
    },
    /* get status of project by id */
    getStatusProjectById(id) {
        return axios.get(`${URL_STATUS}/all/${id}`);
    },
    /* get priority of project*/
    getAllPriority() {
        return axios.get(`${URL_PRIPRITY}`);
    },
     /* get all Tag */
    getAllTagProject() {
        return axios.get(`${URL_TAG}`);
    },
    /* Update data of Project */
    updateProject(data) {
        return axios.put(`${URL_PROJECT}/update`,data)
    },
    /* delete project */
    deleteProject(id) {
        return axios.delete(`${URL_PROJECT}/delete/${id}`)
    },
    /* delete status of project */
    deleteStatus(id) {
        return axios.delete(`${URL_STATUS}/delete/${id}`)
    },
    /* filter project by name and deadLine */
    filterProject(name,deadLine,page = 0,pageSize = 100) {
        let startDay = null;
        let endDay = null;
        if(name === '' ) {
            name = null
        }
        if(deadLine !== null) {
            startDay = moment(deadLine[0]).format("YYYY-MM-DD");
            endDay = moment(deadLine[1]).format("YYYY-MM-DD");
        }

        if(startDay === endDay) {
            endDay = null;
        }

        return axios.get(`${URL_PROJECT}/all`,{
            params: {
                projectName:name,
                startDay:startDay,
                endDay:endDay,
                page:page,
                size:pageSize
            }
        })
    },
    /* Kanban Data */
    getDataKanbanBoard(idProject) {
        return axios.get(`${URL_KANBAN}/${idProject}`);
    },
    /* Create new Sprint */
    createNewSprint(projectId,sprint) {
        return axios.post(`${URL_SPRINT}/create/${projectId}`,sprint)
    },
    /* Delete sprint */
    deleteSprint(id) {
        return axios.delete(`${URL_SPRINT}/delete/${id}`)
    },
    /* Update Sprint */
    updateSprint(projectId,body) {
        return axios.put(`${URL_SPRINT}/update/${projectId}`,body)
    },
    /* get all type task */
    getTaskType() {
        return axios.get(`${URL_TASK_TYPE}/all`);
    },
    /* get all priority */
    getPriority() {
        return axios.get(`${URL_PRIORITY}/all`);
    },
    /* create new task */
    createNewTask(projectId,status,sprint,data) {
        let url = `/hr/api/task/create?projectId=${projectId}`
        if(status !== undefined && status !== null) {
            url += `&statusId=${status.id}`
        }
        if(sprint !== undefined && sprint !== null) {
            url += `&sprintId=${sprint.id}`
        }
        return axios.post(`${url}`,data)
    },
    /* get task by id */
    getTaskByid(id) {
        return axios.get(`${URL_TASK}/${id}`);
    },
    /* update task */
    updateTask(status,sprint,data) {
        let url = `/hr/api/task/update?`
        if(sprint !== undefined && sprint !== null) {
            url += `sprintId=${sprint.id}`
        }
        if(status !== undefined && status !== null) {
            url += `&statusId=${status.id}`
        }
        return axios.put(`${url}`,data)
    },
    changeStatusTask(taskId,statusId) {
        return axios.put(`${URL_TASK}/${taskId}?statusId=${statusId}`)
    },
    /* Delete Task */
    deleteTask(id) {
        return axios.delete(`${URL_TASK}/delete/${id}`)
    },
    /* get status by id */
    getStatusById(id) {
        return axios.get(`${URL_STATUS}/${id}`)
    },
    getSprintById(id) {
        return axios.get(`${URL_SPRINT}/${id}`)
    }
}