import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import MetaTags from "react-meta-tags";
import Flatpickr from "react-flatpickr";
import { fetchDataEmployeebyId, fetchUpdateEmployee, resetList } from "../../store/employee/employees";
import { getEmployee, updatePermission } from "../../api/account";

//import images
import progileBg from "../../assets/images/profile-bg.jpg";
import avatar1 from "../../assets/images/users/user-dummy-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//import tabs
import PersonalDetailTabs from "./components/tabs/PersonalDetailTabs";
import Family from "./components/tabs/Family";
import Certificate from "./components/tabs/Certificate";
import Education from "./components/tabs/Education";
import WorkingProcess from "./components/tabs/WorkingProcess";
import Training from "./components/tabs/Training";
import Language from "./components/tabs/Language";
import Project from "./components/tabs/ProjectExp";
import Specialize from "./components/tabs/Specialize";
import { toast } from "react-toastify";
import ModalChangePassword from "./ModalChangePassword";


const Profiles = () => {

  const [modal_updateImg, setmodal_updateImg] = useState(false);
    function tog_updateImg() {
        setmodal_updateImg(!modal_updateImg);
        setImg(data.dataEmployeebyId.avatarPic)
    }
  const { id } = useParams();
  const [dataEmp, setDataEmp] = useState();
  // console.log(' This is ID emp  ' + idLink);
  const history = useHistory();
  const data = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [img, setImg] = useState([]);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const goBack = (e) => {
    history.push("/hrcenter-employee-profile/employee-list");
    dispatch(resetList())
  };

  const [modalChangePw, setmodalChangePw] = useState(false);
    function tog_ChangNewPw() {
        setmodalChangePw(!modalChangePw);
    }

  const handleUploadImg = (e) => {
    setmodal_updateImg(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    if(file){
        
        // setImg(URL.createObjectURL(file));
        // setDataEmp((data) => ({
        //     ...data,
        //     avatarPic: URL.createObjectURL(file),
        // }));
        
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log(reader.result)
            setImg(reader.result);
            // setDataEmp((data) => ({
            // ...data,
            // avatarPic: reader.result,
            // }));
        };

    }
  }
  const handleUpdateImg = (e) => {

      const employeeRes = {
        ...dataEmp, avatarPic: img,
      };

      try {
          dispatch(fetchUpdateEmployee(employeeRes));
          setmodal_updateImg(false)
          successnotify();
      } catch (e) {
          errornotify();
          setmodal_updateImg(false)
          console.log(e);
      }
  }

  const successnotify = () => {
    toast("Employee was successfully updateImg", 
    { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose : 2000 });
    
}

const errornotify = () => {
    toast("Cannot updateImg !", 
    { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose : 2000 });
}

  useEffect(() => {
    if(id){
      dispatch(fetchDataEmployeebyId(id));
      
    }
        
  }, []);

  useEffect(() => {
    setImg(data.dataEmployeebyId.avatarPic)
    setDataEmp(data.dataEmployeebyId);
    console.log(data.dataEmployeebyId);
  }, [data]);

  document.title = "Profile Settings | Employee";
  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={progileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div>
                </div>
              </div>
              <div className="overlay-content-left">
                <div className="p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    {/* <Label htmlFor="link" href=
                                            className="profile-photo-edit btn btn-light">
                                            <i className=" ri-logout-circle-line"></i> Go back
                                        </Label> */}
                    <Button
                      size="sm"
                      color="light"
                      className="btn-label btn-animation"
                      onClick={goBack}
                    >
                      <i className="ri-logout-circle-line label-icon align-middle fs-16 me-2"></i>
                      Return
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {data.loading ?  
          <div>
            <div className='position-absolute start-50 d-flex align-items-center mt-2 border-top-0' >
              
              <Spinner className='mx-1' color="primary" type="grow" > Loading... </Spinner>

              <Spinner className='mx-1' color="secondary" type="grow" > Loading... </Spinner>

              <Spinner className='mx-1' color="success" type="grow" > Loading... </Spinner>
              
              <Spinner className='mx-1' color="info" type="grow" > Loading... </Spinner>

              <Spinner className='mx-1' color="warning" type="grow" > Loading... </Spinner>

              <Spinner className='mx-1' color="danger" type="grow" > Loading... </Spinner>

              <Spinner className='mx-1' color="dark" type="grow" > Loading... </Spinner>

              
          </div> 
          <div className='position-absolute d-flex start-50 align-items-center mt-5 border-top-0' style={{ transform: 'translateX(+150%)' }}>
            No Data !
          </div>
          </div>
          :
          <Row>
            <Col xxl={3}>
              <div data-aos="fade-right" data-aos-duration="250">
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={img || avatar1}
                        className="rounded-circle avatar-xl shadow"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                      <input id="profile-img-file-input" type="file" onChange={handleUploadImg} accept="image/*"  className="profile-img-file-input" />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">
                      {data.dataEmployeebyId.fullName}
                    </h5>
                    <p className="text-muted mb-0">
                      {"Code: " + data.dataEmployeebyId.employeeNumb }
                    </p>
                    <p className="text-muted mb-0">
                      {"Position: " + data.dataEmployeebyId.empPositionName }
                    </p>
                    {/* <p className="text-muted mb-0">
                      {"User name: " + (data.dataEmployeebyId.account ? data.dataEmployeebyId.account.username : 'no data') }
                    </p> */}
                  </div>
                </CardBody>
              </Card>
              </div>

              <div data-aos="fade-right" data-aos-duration="350">
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">User Login</h5>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to="#"
                        className="badge bg-light text-primary fs-12"
                        onClick={() => setmodalChangePw(!modalChangePw)}
                      >
                        <i className="ri-add-fill align-bottom me-1"></i> Change password
                      </Link>
                    </div>
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                        <i className="ri-instagram-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="email"
                      className="form-control"
                      id="gitUsername"
                      placeholder="Username"
                      value={" " + (data.dataEmployeebyId.account ? data.dataEmployeebyId.account.username : 'no data')}
                      disabled
                    />
                  </div>
                  {/* <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-global-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="websiteInput"
                      placeholder="www.example.com"
                      defaultValue="www.ancaotech.com"
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-success">
                        <i className="ri-dribbble-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="dribbleName"
                      placeholder="Username"
                      defaultValue="www.ancaotech.com"
                    />
                  </div>
                  <div className="d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-danger">
                        <i className="ri-pinterest-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="pinterestName"
                      placeholder="Username"
                      defaultValue="www.ancaotech.com"
                    />
                  </div> */}
                </CardBody>
              </Card>
              </div>
            </Col>

            <Col xxl={9}>
              <div data-aos="fade-right" data-aos-duration="650">
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded  card-header-tabs border-bottom-0"
                    role="tablist"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                        type="button"
                      >
                        <i className="ri-number-1"></i>. Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button"
                      >
                        <i className="ri-number-2"></i>.
                        Family
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          tabChange("3");
                        }}
                        type="button"
                      >
                        <i className="ri-number-3"></i>.
                        Certificate
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => {
                          tabChange("4");
                        }}
                        type="button"
                      >
                        <i className="ri-number-4"></i>.
                        Education
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "5" })}
                        onClick={() => {
                          tabChange("5");
                        }}
                        type="button"
                      >
                        <i className="ri-number-5"></i>.
                        Working process
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "6" })}
                        onClick={() => {
                          tabChange("6");
                        }}
                        type="button"
                      >
                        <i className="ri-number-6"></i>.
                        Training
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "7" })}
                        onClick={() => {
                          tabChange("7");
                        }}
                        type="button"
                      >
                        <i className="ri-number-7"></i>.
                        Language
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "8" })}
                        onClick={() => {
                          tabChange("8");
                        }}
                        type="button"
                      >
                        <i className="ri-number-8"></i>.
                        Project
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "9" })}
                        onClick={() => {
                          tabChange("9");
                        }}
                        type="button"
                      >
                        <i className="ri-number-9"></i>.
                        Specialize
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <PersonalDetailTabs id={id} dataEmp={dataEmp} />
                    </TabPane>

                    <TabPane tabId="2">
                      {activeTab === "2" && <Family id={id} />}
                    </TabPane>

                    <TabPane tabId="3">
                      {activeTab === "3" && <Certificate id={id} />}
                    </TabPane>

                    <TabPane tabId="4">
                      {activeTab === "4" && <Education id={id} />}
                    </TabPane>

                    <TabPane tabId="5">
                      {activeTab === "5" && <WorkingProcess id={id} />}
                    </TabPane>

                    <TabPane tabId="6">
                      {activeTab === "6" && <Training id={id} />}
                    </TabPane>

                    <TabPane tabId="7">
                      {activeTab === "7" && <Language id={id} />}
                    </TabPane>

                    <TabPane tabId="8">
                      {activeTab === "8" && <Project id={id} />}
                    </TabPane>

                    <TabPane tabId="9">
                      {activeTab === "9" && <Specialize id={id} />}
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
              </div>
              
            </Col>
          </Row>
          }
        </Container>
      </div>
              <Modal isOpen={modal_updateImg} toggle={() => { tog_updateImg(); }}  id="updateImgRecordModal" centered >
                        <div className="modal-header">
                            <Button type="button" onClick={() => setmodal_updateImg(false)} className="btn-close" aria-label="Close"> </Button>
                        </div>
                        <ModalBody>
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/hzomhqxz.json" trigger="loop"
                                    colors="primary:#ffbe0b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <p className="text-muted mx-4 mb-0">Update Image ...</p> 
                                    <h4>Are you Sure ?</h4>
                                    {/* <p className="text-muted mx-4 mb-0">Remove {nameQuick} ?!</p> */}
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button type="button" className="btn w-sm btn-light" 
                                    onClick={() => {
                                    setmodal_updateImg(false)
                                    setImg(data.dataEmployeebyId.avatarPic)
                                    }
                                  }>Close</button>
                                <button type="button" className="btn w-sm btn-danger " id="updateImg-record" onClick={handleUpdateImg}>Yes, updateImg  !</button>
                            </div>
                        </ModalBody>
              </Modal>

              <ModalChangePassword modalChangePw={modalChangePw} setmodalChangePw={setmodalChangePw} dataUser={data.dataEmployeebyId.account} />

              {/* <Modal isOpen={modalChangePw} toggle={() => { tog_ChangNewPw(); }}  id="dRecordModal" centered >
                <div className="modal-header">
                    <h4><b>Change password user</b></h4>
                    <Button type="button" onClick={() => setmodalChangePw(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2">
                        
                    <FormGroup row>
                        <Label for="code-part" sm={4}>
                            New password
                        </Label>
                        <Col sm={8}>
                            <Input
                            id="code-part"
                            name="code"
                            placeholder="Enter New password"
                            type="text"
                            //   value={validation.values.code}
                            //   onChange={validation.handleChange}
                            //   invalid={
                            //     validation.touched.code && validation.errors.code
                            //       ? true
                            //       : false
                            //   }
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="code-part" sm={4}>
                            Confirm password
                        </Label>
                        <Col sm={8}>
                            <Input
                            id="name-part"
                            name="location"
                            placeholder="Enter Confirm New password"
                            type="text"
                            //   value={validation.values.location}
                            //   onChange={validation.handleChange}
                            //   invalid={
                            //     validation.touched.location && validation.errors.location
                            //       ? true
                            //       : false
                            //   }
                            />
                        </Col>
                    </FormGroup>
                    </div>

                    <div className="d-flex gap-2 justify-content-between mt-4 mb-2">
                        
                          <div>
                          <button type="button" className="btn btn-sm w-sm btn-info " id="delete-record" >Default password</button>
                        </div>
                         
                          <div>
                               <button type="button" className="btn btn-sm w-sm btn-success " id="delete-record" >Confirm</button>
                               &nbsp;
                               <button type="button" className="btn btn-sm w-sm btn-light" onClick={() => setmodalChangePw(false)}>Close</button> 
                          </div> 

                    </div>
                </ModalBody>
            </Modal> */}

    </React.Fragment>
  );
};

export default Profiles;
