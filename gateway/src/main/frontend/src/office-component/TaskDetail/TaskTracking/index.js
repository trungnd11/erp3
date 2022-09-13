import React,{useEffect,useState} from "react";
import {
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import { Link } from "react-router-dom";
import Assignee from "../Assignee";
import FileAttachment from "../FileAttachment";
import api from "../../../api/listproject";

const assignees = [
  { avatar: avatar10, name: "Tonya Noble", title: "Full Stack Developer" },
  { avatar: avatar8, name: "Thomas Taylor", title: "UI/UX Designer" },
  { avatar: avatar2, name: "Nancy Martino", title: "Web Designer" },
];

const filesAttachment = [
  { type: "zip", name: "App page.zip", size: "2.2MB" },
  { type: "ppt", name: "Velzon admin.ppt", size: "2.4MB" },
  { type: "zip", name: "Images.zip", size: "1.2MB" },
]

const TaskTracking = (props) => {
  const taskData = props.taskData
  const [priority,setPriority] = useState('');
  const [status,setStatus] = useState();
  const [sprint,setSprint] = useState()

  useEffect(() => {
    api.getPriority()
    .then(res => {
      setPriority(checkPriority(taskData,res))
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    if(taskData.statusId !== null && taskData.statusId !== undefined) {
      api.getStatusById(taskData.statusId)
      .then(res => {
        setStatus(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, []);

  useEffect(() => {
    if(taskData.sprintId !== null && taskData.sprintId !== undefined) {
      api.getSprintById(taskData.sprintId)
      .then(res => {
        setSprint(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, []);
  // console.log(taskData)
  // console.log(sprint)
  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardBody>
          {/* <div className="mb-4">
            <select
              className="form-control"
              name="choices-single-default"
              data-choices
              data-choices-search-false
            >
              <option value="">Select Task board</option>
              <option value="Unassigned">Unassigned</option>
              <option value="To Do">To Do</option>
              <option value="Inprogress">Inprogress</option>
              <option defaultValue="In Reviews">In Reviews</option>
              <option value="Completed">Completed</option>
            </select>
          </div> */}
          <div className="table-card">
            <table className="table mb-0">
              <tbody>
                <tr>
                  <td className="fw-medium">Tasks No</td>
                  <td>{taskData.taskNo}</td>
                </tr>
                <tr>
                  <td className="fw-medium">Tasks Title</td>
                  <td>{taskData.taskName}</td>
                </tr>
                {/* <tr>
                  <td className="fw-medium">Project Name</td>
                  <td>Velzon - Admin Dashboard</td>
                </tr> */}
                <tr>
                  <td className="fw-medium">Priority</td>
                  <td>
                    <span className="badge badge-soft-danger">{priority}</span>
                  </td>
                </tr>
                <tr>
                  <td className="fw-medium">Status</td>
                  <td>
                    <span className="badge badge-soft-secondary">
                      {status ? status.name : 'No Status'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="fw-medium">Sprint</td>
                  <td>
                    <span className="badge badge-soft-secondary">
                      {sprint ? sprint.sprintName : 'No Sprint'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="fw-medium">Due Date</td>
                  <td>05 Jan, 2022</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex mb-3">
            <h6 className="card-title mb-0 flex-grow-1">Assigned To</h6>
            {/* <div className="flex-shrink-0">
              <button
                type="button"
                className="btn btn-soft-danger btn-sm shadow-none"
                data-bs-toggle="modal"
                data-bs-target="#inviteMembersModal"
              >
                <i className="ri-share-line me-1 align-bottom"></i> Assigned
                Member
              </button>
            </div> */}
          </div>
          <ul className="list-unstyled vstack gap-3 mb-0">
            {taskData.lstAssignee.map((assignee, index) => (
              <li key={index}>
                <Assignee  assignee = {assignee}/>
              </li>
            ) )}
          </ul>
        </div>
      </div>
      <Card>
        <CardBody>
          <h5 className="card-title mb-3">Attachments</h5>
          <div className="vstack gap-2">
            {taskData.files.map((file, index) => (
              <React.Fragment key={index}>
                <FileAttachment file = {file} />
              </React.Fragment>
            ))}
            {/* <div className="mt-2 text-center">
              <button type="button" className="btn btn-success">
                View more
              </button>
            </div> */}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

const checkPriority = (taskData,listPriority) => {
  const record = listPriority.find(el => el.id === taskData.priorityId)
  return record.name;
}

export default TaskTracking;
