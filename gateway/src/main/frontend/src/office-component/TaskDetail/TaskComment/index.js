import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import Comment from "./Comment";
import CustomEditor from '../../../Components/Editor';
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_KEY } from "../../../store/auth/authentication/authentication";
import { Storage } from "../../../utils/storage-utils";
import { createComment } from "../../../api/comment";
import { showErrorNotice, showSuccessNotice } from '../../../utils/toastify';
import { concatComment } from "../../../store/comment";
import { set } from "date-fns";

const TaskComments = (props) => {
  const taskData = props.taskData
  // console.log(taskData)
  const [activeTab, setActiveTab] = useState("1");
  const account = useSelector(state => state.authentication.account) || Storage.local.get(ACCOUNT_KEY);
  const dispatch = useDispatch();
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();

  const id  = taskData.id;

  const handleClickPostComment = () => {
    const { data, setData } = editorRef.current;
    if (data.length === 0) {
      return;
    }
    
    const payload = { content: data, user: account.username }
    setLoading(true);
    createComment(id, payload).then(response => {
      const data = response.data;
      dispatch(concatComment({ comments: data}))
      setLoading(false);
      setData('');
      showSuccessNotice("Create comment successfully!")
    }).catch(ex => {
      console.log(ex)
      setLoading(false);
      showErrorNotice("Create comment error!");
    })
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div>
            <Nav
              className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggleTab("1");
                  }}
                >
                  Comments (5)
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  href="#"
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggleTab("2");
                  }}
                >
                  Attachments File (4)
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    toggleTab("3");
                  }}
                >
                  Time Entries (9 hrs 13 min)
                </NavLink>
              </NavItem> */}
            </Nav>
          </div>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h5 className="card-title">Comments</h5>
                <Comment taskData={taskData}/>
              <form className="mt-4">
                <Row className="g-3">
                  <Col lg={12}>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Leave a Comments
                    </label>
                    <CustomEditor ref={editorRef} />
                  </Col>
                  <Col xs={12} className="text-end">
                    <button
                      type="button"
                      className="btn btn-ghost-secondary btn-icon waves-effect me-1 shadow-none"
                    >
                      <i className="ri-attachment-line fs-16"></i>
                    </button>
                    <Button className="btn btn-success" onClick={handleClickPostComment}>
                      Post Comments
                    </Button>
                  </Col>
                </Row>
              </form>
            </TabPane>
            <TabPane tabId="2">
              <div className="table-responsive table-card">
                <Table className="table-borderless align-middle mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">File Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Size</th>
                      <th scope="col">Upload Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                              <i className="ri-file-zip-fill"></i>
                            </div>
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <h6 className="fs-15 mb-0">
                              <Link to="#">App pages.zip</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>Zip File</td>
                      <td>2.22 MB</td>
                      <td>21 Dec, 2021</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            href="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ri-equalizer-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu-end"
                            style={{
                              position: "absolute",
                              inset: "0px 0px auto auto",
                              margin: "0px",
                              transform: "translate(0px, 23px)",
                            }}
                          >
                            <li>
                              <DropdownItem>
                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                View
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                Download
                              </DropdownItem>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                              <i className="ri-file-pdf-fill"></i>
                            </div>
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <h6 className="fs-15 mb-0">
                              <Link to="#">Velzon admin.ppt</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>PPT File</td>
                      <td>2.24 MB</td>
                      <td>25 Dec, 2021</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            href="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ri-equalizer-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu-end"
                            style={{
                              position: "absolute",
                              inset: "0px 0px auto auto",
                              margin: "0px",
                              transform: "translate(0px, 23px)",
                            }}
                          >
                            <li>
                              <DropdownItem>
                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                View
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                Download
                              </DropdownItem>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-soft-info text-info rounded fs-20">
                              <i className="ri-folder-line"></i>
                            </div>
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <h6 className="fs-15 mb-0">
                              <Link to="#">Images.zip</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>ZIP File</td>
                      <td>1.02 MB</td>
                      <td>28 Dec, 2021</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            href="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ri-equalizer-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu-end"
                            style={{
                              position: "absolute",
                              inset: "0px 0px auto auto",
                              margin: "0px",
                              transform: "translate(0px, 23px)",
                            }}
                          >
                            <li>
                              <DropdownItem>
                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                View
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                Download
                              </DropdownItem>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                              <i className="ri-image-2-fill"></i>
                            </div>
                          </div>
                          <div className="ms-3 flex-grow-1">
                            <h6 className="fs-15 mb-0">
                              <Link to="#">Bg-pattern.png</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>PNG File</td>
                      <td>879 KB</td>
                      <td>02 Nov 2021</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            href="#"
                            className="btn btn-light btn-icon"
                          >
                            <i className="ri-equalizer-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu-end"
                            style={{
                              position: "absolute",
                              inset: "0px 0px auto auto",
                              margin: "0px",
                              transform: "translate(0px, 23px)",
                            }}
                          >
                            <li>
                              <DropdownItem>
                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                View
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                Download
                              </DropdownItem>
                            </li>
                            <li className="dropdown-divider"></li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <h6 className="card-title mb-4 pb-2">Time Entries</h6>
              <div className="table-responsive table-card">
                <table className="table align-middle mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">Member</th>
                      <th scope="col">Date</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Timer Idle</th>
                      <th scope="col">Tasks Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={avatar8}
                            alt=""
                            className="rounded-circle avatar-xxs"
                          />
                          <div className="flex-grow-1 ms-2">
                            <Link to="/pages-profile" className="fw-medium">
                              Thomas Taylor
                            </Link>
                          </div>
                        </div>
                      </th>
                      <td>02 Jan, 2022</td>
                      <td>3 hrs 12 min</td>
                      <td>05 min</td>
                      <td>Apps Pages</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={avatar10}
                            alt=""
                            className="rounded-circle avatar-xxs"
                          />
                          <div className="flex-grow-1 ms-2">
                            <Link to="/pages-profile" className="fw-medium">
                              Tonya Noble
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>28 Dec, 2021</td>
                      <td>1 hrs 35 min</td>
                      <td>-</td>
                      <td>Profile Page Design</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={avatar10}
                            alt=""
                            className="rounded-circle avatar-xxs"
                          />
                          <div className="flex-grow-1 ms-2">
                            <Link to="/pages-profile" className="fw-medium">
                              Tonya Noble
                            </Link>
                          </div>
                        </div>
                      </th>
                      <td>27 Dec, 2021</td>
                      <td>4 hrs 26 min</td>
                      <td>03 min</td>
                      <td>Ecommerce Dashboard</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TaskComments;
