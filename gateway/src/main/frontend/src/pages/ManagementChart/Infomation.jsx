import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useHistory } from 'react-router-dom';
import user from "../../assets/images/users/avatar-2.jpg";
import "./components/styles/infomation.scss";

export default function Infomation({ isClose, info }) {
  const linkProfile = useHistory();
  return (
    <Col md={6}>
      <div className="wapper-infomation employee-info">
        <Row>
          <Col md={3}>
            <div className="avatar">
              <img src={info ? info.data.avatarPic ? info.data.avatarPic : user : user} alt=""></img>
            </div>
          </Col>
          <Col md={9}>
            <div className="infomation">
              <h3>INFORMATION AND FUNCTIONS FOR EMPLOYEE</h3>
              <p>
                Name: <span>{ info && info.data.fullName }</span>
              </p>
              <p>
                Position: <span>{ info && info.data.empPositionName }</span>
              </p>
              <p>
                Phone Number: <span>{ info && info.data.phoneNumber }</span>
              </p>
              <p>
                Email: <span>{ info && info.data.email }</span>
              </p>
              <i className="ri-close-fill" onClick={isClose}></i>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}>
            <div className="function">
              <p>
                <i className="bx bx-disc"></i>Empoloyee Target
              </p>
              <p>
                <i className="bx bx-disc"></i>Work of Employee
              </p>
              <p>
                <i className="bx bx-disc"></i>Create Evaluate
              </p>
              <p>
                <i className="bx bx-disc"></i>Create Evaluate 360 degrees
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="function">
              <p onClick={() => linkProfile.push(`/hrcenter-employee-profile/employee-list/profiles/${info.data.id}`)}>
                <i className="bx bx-disc"></i>Employee Profile
              </p>
              <p>
                <i className="bx bx-disc"></i>Create Holiday Schedule
              </p>
              <p>
                <i className="bx bx-disc"></i>Add Scheduled Working Hours
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
