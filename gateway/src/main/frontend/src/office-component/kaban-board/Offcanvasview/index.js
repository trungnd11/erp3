import React from "react";
import MetaTags from "react-meta-tags";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import TaskDetail from "../../TaskDetail";
import style from "./style.module.css"

const Offcanvasview = (props) => {
  const openView = props.openView;
  const closeView = props.closeView;
  const taskData = props.taskData
  return (
    <Offcanvas
      isOpen={openView}
      direction="end"
      scrollable={true}
      toggle={closeView}
      style={{width:'70%'}}
      className={`${style.background_canvas} border-bottom`}
    >
      <OffcanvasHeader toggle={closeView} className={style.header_canvas}>
        Task Detail
      </OffcanvasHeader>
      <OffcanvasBody className={style.body_canvas_custom}>
        <TaskDetail taskData = {taskData}/>
      </OffcanvasBody>
      {/* <div className="offcanvas-foorter border p-3 text-center">
        <Link to="#" className="link-success">
          View All Acitivity{" "}
          <i className="ri-arrow-right-s-line align-middle ms-1"></i>
        </Link>
      </div> */}
    </Offcanvas>
  );
};

export default Offcanvasview;
