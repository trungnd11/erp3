import React from "react";
import { Link } from "react-router-dom";

const Project = (cell) => {
  const id = getIdbyProjectName(cell.value, cell.data);
  return (
    <React.Fragment>
      <Link to={`/apps-kanban/${id}`} className="fw-medium link-primary">
        {cell.value}
      </Link>
    </React.Fragment>
  );
};

const CreateBy = (cell) => {
  return <React.Fragment>{cell.value.fullName}</React.Fragment>;
};

const TagComponent = (cell) => {
  // console.log(cell);
  return (
    <React.Fragment>
      <div className="d-flex flex-wrap">
        {cell.value.map((item, index) => (
          <span key = {index} className="badge badge-soft-primary m-1">#{item.name}</span>
        ))}
      </div>
    </React.Fragment>
  );
};

const DueDate = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const getIdbyProjectName = (name, data) => {
  const record = data.find((element) => element.project === name);
  return record.id;
};

export { Project, CreateBy, DueDate, TagComponent };
