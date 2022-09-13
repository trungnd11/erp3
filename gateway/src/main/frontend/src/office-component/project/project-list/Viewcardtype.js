import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  Label,
  CardHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import FeatherIcon from "feather-icons-react";
import slack from "../../../assets/images/brands/slack.png";
import noavatar from "../../../assets/images/project/noavatar.png";
import style from "./view.module.css";

const Viewcardtype = (props) => {
  // console.log(props)
  const editBoardRecord = props.editBoardRecord;
  const listData = props.listData;
  const openModalView = props.openModalView;
  const deleteBoardRecord = props.deleteBoardRecord;
  const history = useHistory();
  console.log(listData);
  const gotoKanbanBoard = (projectId) => {
    history.push(`/apps-kanban/${projectId}`);
  };
  return (
    <React.Fragment>
      {listData.length !== 0 ? (
        listData.map((item, index) => (
          <React.Fragment key={index}>
            <Col xxl={3} sm={6} className="project-card">
              <Card className={`${style.card_border} card-height-100`}>
                <CardBody>
                  <div className="d-flex flex-column h-100">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        {/* <p className="text-muted mb-4">Updated 3hrs ago</p> */}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="d-flex gap-1 align-items-center">
                          <UncontrolledDropdown direction="start">
                            <DropdownToggle
                              tag="button"
                              className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none shadow-none fs-15"
                            >
                              <FeatherIcon
                                icon="more-horizontal"
                                className="icon-sm"
                              />
                            </DropdownToggle>

                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem
                                onClick={() => {
                                  openModalView(index);
                                }}
                              >
                                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                View
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  editBoardRecord(index);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Edit
                              </DropdownItem>
                              <div className="dropdown-divider"></div>
                              <DropdownItem
                                onClick={() => {
                                  deleteBoardRecord(item.id);
                                }}
                              >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Remove
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span
                            className={
                              "avatar-title rounded p-2 bg-soft-warning"
                            }
                          >
                            <img
                              src={
                                item.thumnailImage
                                  ? item.thumnailImage.downloadUri
                                  : noavatar
                              }
                              alt=""
                              className="img-fluid p-1"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5
                          className="mb-1 fs-15"
                          onClick={() => {
                            gotoKanbanBoard(item.id);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {item.projectName}
                        </h5>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-muted" style={{ margin: "unset" }}>
                        Tags :
                      </p>
                      <div className="mb-1 mt-1">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="m-1 fs-12 badge badge-soft-primary"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                      <div className="d-flex mb-2">
                        <div className="flex-grow-1">
                          <div>Tasks : </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <i className="ri-list-check align-bottom me-1 text-muted"></i>{" "}
                            {item.totalTaskComplete} / {item.totalTask}
                          </div>
                        </div>
                      </div>
                      {item.totalTask !== 0 && (
                        <div className="progress progress-sm animated-progess bg-soft-success">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            aria-valuenow="71"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                              width: `${Math.round(
                                (item.totalTaskComplete * 100) / item.totalTask
                              )}%`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardBody>
                <div className="card-footer bg-transparent border-top-dashed py-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <div className="avatar-group">
                        {item.lstMember.map((member, key) => (
                          <React.Fragment key={key}>
                            <Link
                              to="#"
                              className="avatar-group-item shadow"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-placement="top"
                              title={member.fullName}
                            >
                              <div className="avatar-xxs">
                                {member.avatarPic ? (
                                  <img
                                    src={member.avatarPic}
                                    alt=""
                                    className="rounded-circle img-fluid"
                                  />
                                ) : (
                                  <div className="avatar-title rounded-circle bg-secondary">
                                    ?
                                  </div>
                                )}
                              </div>
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-muted">
                        <i className="ri-calendar-event-fill me-1 align-bottom"></i>{" "}
                        {item.deadLine}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </React.Fragment>
        ))
      ) : (
        <div className={style.nodata_custom}>
          <span>No Data</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Viewcardtype;
