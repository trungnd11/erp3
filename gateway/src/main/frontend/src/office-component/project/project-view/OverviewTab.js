import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

//import images
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import image4 from "../../../assets/images/small/img-4.jpg";
import image5 from "../../../assets/images/small/img-5.jpg";
import style from "./style.module.css";
import noavatar from "../../../assets/images/project/noavatar.png";

//SimpleBar
import SimpleBar from "simplebar-react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const OverviewTab = (props) => {
  const dataProject = props.dataProject;
  console.log(dataProject);
  const [status, setStatus] = useState(() => {
    return dataProject.status.sort((el1, el2) => el1.step - el2.step);
  });
  // console.log(status)

  // useEffect(() => {
  //   dataProject.status.sort((el1,el2) => el1.step < el2.step)
  //   console.log(dataProject)
  // }, []);
  return (
    <React.Fragment>
      <Row>
        <Col xl={9} lg={8}>
          <Card>
            <CardBody>
              <div className="text-muted">
                <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                <div className={style.html_parse}>
                  {ReactHtmlParser(dataProject.description)}
                </div>

                {/* <div>
                  <button
                    type="button"
                    className="btn btn-link link-success p-0 shadow-none"
                  >
                    Read more
                  </button>
                </div> */}

                <div className="pt-3 border-top border-top-dashed mt-4">
                  <Row>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Privacy :
                        </p>
                        <div
                          className={`${style.w_60} fs-12 badge badge-soft-primary d-flex align-items-center justify-content-center`}
                        >
                          {dataProject.privacy}
                        </div>
                      </div>
                    </Col>
                    {/* <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Team Leader :
                        </p>
                        <div
                          className={`fs-12 badge badge-soft-warning d-flex align-items-center`}
                        >
                          {dataProject.teamLead.fullName}
                        </div>
                      </div>
                    </Col> */}
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          DeadLine :
                        </p>
                        <h5 className="fs-15 mb-0">{dataProject.deadLine}</h5>
                      </div>
                    </Col>
                    {/* <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Priority :
                        </p>
                        <div className="badge bg-danger fs-12">High</div>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Status :
                        </p>
                        <div className="badge bg-warning fs-12">Inprogess</div>
                      </div>
                    </Col> */}
                  </Row>
                </div>

                <div className="pt-3 border-top border-top-dashed mt-4">
                  <Row>
                    {/* <Col lg={6} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          HashTag :
                        </p>
                        <div>
                          <div
                            className={`fs-12 badge badge-soft-primary d-flex align-items-center`}
                          >
                            {dataProject.privacy}
                          </div>
                          <div
                            className={`fs-12 badge badge-soft-primary d-flex align-items-center`}
                          >
                            {dataProject.privacy}
                          </div>
                        </div>
                      </div>
                    </Col> */}
                    {/* <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Priority :
                        </p>
                        <div className="badge bg-danger fs-12">High</div>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          Status :
                        </p>
                        <div className="badge bg-warning fs-12">Inprogess</div>
                      </div>
                    </Col> */}
                  </Row>
                </div>

                {/* <div className="pt-3 border-top border-top-dashed mt-4">
                  <h6 className="mb-3 fw-semibold text-uppercase">Resources</h6>
                  <Row className="g-3">
                    <Col xxl={4} lg={6}>
                      <div className="border rounded border-dashed p-2">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                                <i className="ri-folder-zip-line"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h5 className="fs-13 mb-1">
                              <Link
                                to="#"
                                className="text-body text-truncate d-block"
                              >
                                App pages.zip
                              </Link>
                            </h5>
                            <div>2.2MB</div>
                          </div>
                          <div className="flex-shrink-0 ms-2">
                            <div className="d-flex gap-1">
                              <button
                                type="button"
                                className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                              >
                                <i className="ri-download-2-line"></i>
                              </button>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="button"
                                  className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                                >
                                  <i className="ri-more-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                      Rename
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </li>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col xxl={4} lg={6}>
                      <div className="border rounded border-dashed p-2">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                                <i className="ri-file-ppt-2-line"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h5 className="fs-13 mb-1">
                              <Link
                                to="#"
                                className="text-body text-truncate d-block"
                              >
                                Velzon admin.ppt
                              </Link>
                            </h5>
                            <div>2.4MB</div>
                          </div>
                          <div className="flex-shrink-0 ms-2">
                            <div className="d-flex gap-1">
                              <button
                                type="button"
                                className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                              >
                                <i className="ri-download-2-line"></i>
                              </button>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="button"
                                  className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                                >
                                  <i className="ri-more-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                      Rename
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </li>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div> */}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} lg={4}>
          <Card>
            <CardBody>
              <h5 className="card-title mb-4">Tags</h5>
              <div className="d-flex flex-wrap gap-2 fs-16">
                {dataProject.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge fw-medium badge-soft-secondary"
                  >
                    #{tag.name}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Team Leader</h4>
            </CardHeader>

            <CardBody>
              <SimpleBar
                data-simplebar
                style={{ height: "50px" }}
                className="mx-n3 px-3"
              >
                <div className="vstack gap-3 p-1">
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs flex-shrink-0 me-3 d-flex align-items-center">
                      {dataProject.teamLead.avatarPic ? (
                        <img
                          src={dataProject.teamLead.avatarPic}
                          alt=""
                          className="img-fluid rounded-circle shadow"
                        />
                      ) : (
                        <div className={`avatar-xxs`}>
                          <div className="avatar-title rounded-circle bg-secondary">
                            ?
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fs-13 mb-0">
                        <Link to="#" className="text-body d-block">
                          {dataProject.teamLead.fullName}
                        </Link>
                      </h5>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="d-flex align-items-center gap-1">
                        <button type="button" className="btn btn-light btn-sm">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Members</h4>
              {/* <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-danger btn-sm shadow-none"
                  data-bs-toggle="modal"
                  data-bs-target="#inviteMembersModal"
                >
                  <i className="ri-share-line me-1 align-bottom"></i> Invite
                  Member
                </button>
              </div> */}
            </CardHeader>

            <CardBody>
              <SimpleBar
                data-simplebar
                style={{ height: "200px" }}
                className="mx-n3 px-3"
              >
                {dataProject.lstMember.map((member, index) => (
                  <div key={index} className="vstack gap-3 p-1">
                    <div className="d-flex align-items-center">
                      <div className="avatar-xs flex-shrink-0 me-3 d-flex align-items-center">
                        {member.avatarPic ? (
                          <img
                            src={member.avatarPic}
                            alt=""
                            className="img-fluid rounded-circle shadow"
                          />
                        ) : (
                          <div className={`avatar-xxs`}>
                            <div className="avatar-title rounded-circle bg-secondary">
                              ?
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="fs-13 mb-0">
                          <Link to="#" className="text-body d-block">
                            {member.fullName}
                          </Link>
                        </h5>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="d-flex align-items-center gap-1">
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </SimpleBar>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Status</h5>
            </CardHeader>
            <CardBody className={style.card_status_custom}>
              {status &&
                status.map((status, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`external-event fc-event ${style.status_custom}`}
                      style={{
                        cursor: "pointer",
                        background: status.color,
                      }}
                      key={"cat-" + index}
                    >
                      <strong>{status.name}</strong>
                    </div>
                  </React.Fragment>
                ))}
            </CardBody>
          </Card>
          {/* <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Status</h5>
            </CardHeader>
            <CardBody className={style.card_status_custom}>
              {listStatus &&
                listStatus.map((status, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`external-event fc-event ${style.status_custom}`}
                      style={{
                        cursor: "pointer",
                        background: status.bColor,
                      }}
                      key={"cat-" + index}
                      // onDrag={(event) => {
                      //   onDrag(event, category);
                      // }}
                    ></div>
                  </React.Fragment>
                ))}
            </CardBody>
          </Card> */}
          {/* <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Attachments</h4>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-info btn-sm shadow-none"
                >
                  <i className="ri-upload-2-fill me-1 align-bottom"></i> Upload
                </button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="vstack gap-2">
                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                          <i className="ri-folder-zip-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          App-pages.zip
                        </Link>
                      </h5>
                      <div>2.2MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                          <i className="ri-file-ppt-2-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          Velzon-admin.ppt
                        </Link>
                      </h5>
                      <div>2.4MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                          <i className="ri-folder-zip-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          Images.zip
                        </Link>
                      </h5>
                      <div>1.2MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
                          <i className="ri-image-2-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          bg-pattern.png
                        </Link>
                      </h5>
                      <div>1.1MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <button type="button" className="btn btn-success">
                    View more
                  </button>
                </div>
              </div>
            </CardBody>
          </Card> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OverviewTab;
