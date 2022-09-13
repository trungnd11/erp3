import React,{useState,useEffect} from "react";
import style from "./List.module.css";
import slack from "../../../assets/images/brands/slack.png";
import classnames from "classnames";
import OverviewTab from "../project-view/OverviewTab";
import DocumentsTab from "../project-view/DocumentsTab";
import ActivitiesTab from "../project-view/ActivitiesTab";
import TeamTab from "../project-view/TeamTab";
import StatusTab from "../project-view/StatusTab";

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
import noavatar from "../../../assets/images/project/noavatar.png"
import { formatDate } from "../../../utils/date";

function Modalviewproject(props) {
    const modalProject = props.modalProject;
    const closedView = props.closedView;
    const dataProject = props.dataProject
    console.log(dataProject)
    // useEffect(() => {
    //     console.log(modalProject)
    // }, [modalProject]);
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Modal
      size="xl"
      // fullscreen='xl'
      isOpen={modalProject}
      scrollable={true}
      toggle={closedView}
    >
      <ModalHeader className={style.header_modal_over_view}>
        <Row>
          <Col lg={12}>
            <Card className={`${style.header_card_custom} mt-n4 mx-n4`}>
              <div className="bg-soft-warning">
                <CardBody className="pb-0 px-4">
                  <Row className="mb-3">
                    <div className="col-md">
                      <Row className="align-items-center g-3">
                        <div className="col-md-auto">
                          <div className="avatar-md">
                            <div className="avatar-title bg-white rounded-circle">
                              <img src={dataProject.thumnailImage ? dataProject.thumnailImage.downloadUri : noavatar} alt="" className="avatar-xs" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          <div>
                            <h4 className="fw-bold">
                              {dataProject.projectName}
                            </h4>
                            <div className="hstack gap-3 flex-wrap">
                              {/* <div>
                                <i className="ri-building-line align-bottom me-1"></i>{" "}
                                Themesbrand
                              </div>
                              <div className="vr"></div> */}
                              <div>
                                Create Date :
                                <span className="fw-medium"> {formatDate(dataProject.createdDate)}</span>
                              </div>
                              <div className="vr"></div>
                              <div>
                                Create By :
                                <span className="fw-medium"> {dataProject.createdBy}</span>
                              </div>
                              {/* <div className="vr"></div>
                              <div className="badge rounded-pill bg-info fs-12">
                                New
                              </div>
                              <div className="badge rounded-pill bg-danger fs-12">
                                High
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </Row>
                    </div>
                    {/* <div className="col-md-auto">
                      <div className="hstack gap-1 flex-wrap">
                        <button
                          type="button"
                          className="btn py-0 fs-16 favourite-btn shadow-none active"
                        >
                          <i className="ri-star-fill"></i>
                        </button>
                        <button
                          type="button"
                          className="btn py-0 fs-16 text-body shadow-none"
                        >
                          <i className="ri-share-line"></i>
                        </button>
                        <button
                          type="button"
                          className="btn py-0 fs-16 text-body shadow-none"
                        >
                          <i className="ri-flag-line"></i>
                        </button>
                      </div>
                    </div> */}
                  </Row>

                  <Nav
                    className="nav-tabs-custom border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1");
                        }}
                        href="#"
                      >
                        Overview
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2");
                        }}
                        href="#"
                      >
                        Documents
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3");
                        }}
                        href="#"
                      >
                        Activities
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("4");
                        }}
                        href="#"
                      >
                        Team
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "5" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("5");
                        }}
                        href="#"
                      >
                        Status
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </CardBody>
              </div>
            </Card>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody className={style.conten_modal_custom}>
        <Row>
          <Col lg={12}>
            <TabContent activeTab={activeTab} className="text-muted">
              <TabPane tabId="1">
                <OverviewTab dataProject={dataProject} />
              </TabPane>
              {/* <TabPane tabId="2">
                <DocumentsTab />
              </TabPane>
              <TabPane tabId="3">
                <ActivitiesTab />
              </TabPane>
              <TabPane tabId="4">
                <TeamTab />
              </TabPane>
              <TabPane tabId="5">
                <StatusTab statusProject={dataProject.status}/>
              </TabPane> */}
            </TabContent>
          </Col>
        </Row>
      </ModalBody>
      <div className={`${style.footer_modal_overview} modal-footer`}>
        <Button
          onClick={closedView}
          color="danger"
          className="btn btn-primary "
        >
          <i className="ri-close-line me-1 align-middle" />
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
export default Modalviewproject;
