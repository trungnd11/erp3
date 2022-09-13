import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  Row,
  UncontrolledDropdown,
  ModalBody,
  ModalHeader,
} from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import style from "./style.module.css";

function StatusTab(props) {
  const statusProject = props.statusProject
  console.log(statusProject)
  const [listStatus, setListStatus] = useState([
    { id: 0, title: "Todo", bColor: "#d7d8d8" },
    { id: 1, title: "Done", bColor: "#6acd96" },
    { id: 2, title: "No Status", bColor: "#f1e0e0" },
    { id: 3, title: "In Progress", bColor: "#e1da8d" },
  ]);
  return (
    <div className="team-list list-view-filter">
      {statusProject.map((item) => (
        <Card key={item.id} className="team-box" style={{marginBottom:'20px',borderRadius:'15px'}}>
          <CardBody className="px-4" style={{ background: "#d7d8d8",borderRadius:'15px' }}>
          {/* <CardBody className="px-4" style={{ background: item.bColor,borderRadius:'15px' }}> */}
            <Row className="align-items-center team-row">
              <Col lg={4}>
                <div className={style.title_custom_status}>
                  <i
                    className={`${style.title_custom_status_icon} mdi mdi-checkbox-blank-circle`}
                  ></i>
                  <strong>{item.name}</strong>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
export default StatusTab;
