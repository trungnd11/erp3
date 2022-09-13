import moment from 'moment';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, Row } from 'reactstrap';

import userImg from "../../assets/images/users/user-dummy-img.jpg";

export default function ModalQuickView({setIsOpen, isOpen , dataEmpQuick, setmodalDelete, modalDelete}) {

    console.log(dataEmpQuick);
    const linkPath = useHistory();
    function tog_delete() {
        setmodalDelete(!modalDelete);
    }

    function  tog_quick() {
        setIsOpen(!isOpen);
    }

    const linkToProfiles = (id) => {
        linkPath.push(`/hrcenter-employee-profile/employee-list/profiles/${dataEmpQuick.id}`);
    }

  return (
      <>
      
    <div>
        <Modal isOpen={isOpen} toggle={() => { tog_quick(); }} style={{width:'350px'}}  id="QuickRecordModalv1" modalClassName='flip' centered >
                                    <Card style={{boxShadow:'none'}}>
                                        <CardHeader>
                                            <button onClick={() => { tog_quick(); }} type="button" className="btn-close float-end fs-11" aria-label="Close"></button>
                                            <h6 className="card-title mb-0">Company Name</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="d-flex align-items-center" style={{boxShadow: 'none !important'}}>

                                                <div className="flex-shrink-0">
                                                    <img src={dataEmpQuick.avatarPic || userImg} alt="" className="avatar-lg rounded-circle" />
                                                </div>

                                                <div className="flex-grow-1 ms-2">
                                                                
                                                        <Row className="align-items-start">
                                                            <Col sm={1}>
                                                                
                                                            </Col>
                                                            <Col >
                                                            
                                                                <h4><span className="badge badge-outline-primary">{dataEmpQuick.fullName}</span></h4>
                                                                <p className="h6 text-muted mb-0">Code: {dataEmpQuick.employeeNumb}</p>
                                                                <p className="h6 text-muted mb-0">Birthday: {moment(dataEmpQuick.birthday,"YYYY-MM-DD").format("YYYY/MM/DD")}</p>
                                                                <p className="h6 text-muted mb-0">Phone: {dataEmpQuick.phoneNumber}</p>
                                                            </Col>
                                                            <Col sm={1}>
                                                            </Col>
                                                        </Row>
                                                </div>

                                               

                                            </div>

                                            <div className="d-flex align-items-center mt-1" style={{boxShadow: 'none !important'}}>

                                                <div className="flex-grow-1 ms-2">
                                                                
                                                        <Row className="align-items-start">
                                                            <Col className="border border-dashed">
                                                            
                                                                <p className="h7 text-muted mb-0">Department: {dataEmpQuick.empDepartmentName}</p>
                                                                <p className="h7 text-muted mb-0">Position: {dataEmpQuick.empPositionName}</p>
                                                                <p className="h7 text-muted mb-0">Current Place: {dataEmpQuick.curretPlace}</p>

                                                            </Col>
                                                            <Col className="border border-dashed">
                                                            
                                                                <p className="h7 text-muted mb-0">Gender: {dataEmpQuick.gender}</p>
                                                                <p className="h7 text-muted mb-0">Marital: {dataEmpQuick.maritalStatus}</p>
                                                                <p className="h7 text-muted mb-0">Country: {dataEmpQuick.country}</p>

                                                            </Col>
                                                        </Row>
                                                </div>

                                               

                                            </div>
                                            

                                            

                                        </CardBody>


                                        <div style={{display:'flex', justifyContent:'space-around', boxShadow:'none'}} >

                                            <Button color="danger" onClick={() => tog_delete()} 
                                                className="btn-icon"> <i className="ri-delete-bin-5-line" /> 
                                            </Button>

                                            <Button type='button' style={{width: '80%'}} onClick={() => linkToProfiles(dataEmpQuick.id)}  color="primary" className="btn-label right btn btn-primary"> 
                                                <i className="bx bx-link-external label-icon align-middle fs-16 ms-2"></i> See Profile 
                                            </Button>
                                        </div>
                                    </Card>
                                
        </Modal>
    </div>

    </>
  )
}
