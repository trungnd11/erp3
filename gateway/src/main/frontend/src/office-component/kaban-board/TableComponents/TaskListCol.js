import React from "react";
import { Link } from "react-router-dom";

const OrdersId = (cell) => {
  const taskId = getIdTask(cell.data,cell.value);
  return (
    <React.Fragment>
      <Link to={`/tasks-detail/${taskId}`} className="fw-medium link-primary">
        {cell.value}
      </Link>
    </React.Fragment>
  );
};

const Project = (cell) => {
  return (
    <React.Fragment>
      <Link to="/apps-projects-overview" className="fw-medium link-primary">
        {cell.value}
      </Link>
    </React.Fragment>
  );
};

const Tasks = (cell) => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <div className="flex-grow-1 tasks_name">{cell.value}</div>
        <div className="flex-shrink-0 ms-4">
          <ul className="list-inline tasks-list-menu mb-0">
            <li className="list-inline-item">
              <Link to="/apps-tasks-details">
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#">
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
              </Link>
            </li>
            <li className="list-inline-item">
              <a
                className="remove-item-btn"
                data-bs-toggle="modal"
                href="#deleteOrder"
              >
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const CreateBy = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const AssignedTo = (cell) => {
  return (
    <React.Fragment>
      <div className="avatar-group">
        {cell.value.map((item, index) => (
          <Link
            key={index}
            to="#"
            className="avatar-group-item shadow"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="top"
            title="Alexis"
          >
            <img src={item.img} alt="" className="rounded-circle avatar-xxs" />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

const DueDate = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      <span className="badge badge-soft-secondary text-uppercase">
        {cell.value}
      </span>
    </React.Fragment>
  );
};

const Priority = (cell) => {
  return (
    <React.Fragment>
      {cell.value === "Medium" ? (
        <span className="badge bg-warning text-uppercase">{cell.value}</span>
      ) : cell.value === "High" ? (
        <span className="badge bg-danger text-uppercase">{cell.value}</span>
      ) : cell.value === "Low" ? (
        <span className="badge bg-success text-uppercase">{cell.value}</span>
      ) : null}
    </React.Fragment>
  );
};

const HashTag = (cell) => {
  return (
    <React.Fragment>
      <div className="d-flex flex-wrap">
        {cell.value.map((item,index) => (
          <span key = {index} className="badge badge-soft-primary m-1">{item.tag}</span>
        ))}
      </div>
    </React.Fragment>
  );
};

const getIdTask = (data,value) => {
  const record = data.find(el => el.taskId === value)
  return record.id;
}

export {
  OrdersId,
  Project,
  Tasks,
  CreateBy,
  AssignedTo,
  DueDate,
  Status,
  Priority,
  HashTag,
};
