import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from 'react-select';
import employeeApi from '../../api/employee/employeeApi';
import { useDispatch, useSelector } from 'react-redux';
import { departments } from "../../store/organizational/organizational";
import { fetchPosition, fetchEmployee, fetchNameHrbyDeparment, fetchNameUrbyDeparment, resetList } from '../../store/employee/employees';
import avatar1 from '../../assets/images/users/user-dummy-img.jpg';
import moment from 'moment';
import deparmentApi from '../../api/department/index'
import { Alert } from '../OrganizationalChart/alert';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

//api 
import api from "../../api/groupuser";

import * as Yup from "yup";

import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

export default function ModalGroup( { isOpen, toggle, setIsOpen, listEmp} ) {
    const [dataGroup, setDataGroup] = useState();

    const [modal_positionTop, setmodal_positionTop] = useState(false);
    
    function tog_positionTop() {
        setmodal_positionTop(!modal_positionTop);
        setIsOpen(false);

    }

      const customermocalstatus = [
        {
          options: [
            { label: "title", value: "title" },
            { label: "Active", value: "Active" },
            { label: "Block", value: "Block" },
          ],
        },
      ];

    const handleAddNewGroup = async () => {

            console.log(dataGroup)
            // const response = await api.createGroupuser(dataGroup);
            await api.createGroupuser(dataGroup).then(({ dataGroup }) => {
                  const newEmployee = dataGroup;
                  console.log('success')
                    // successnotify();
                    // setIsOpen(false);
                    
            })
                .catch((e) => {
                // errornotify();
                console.log(e);
                });
            
    }

    const successnotify = () => {
        toast("New employee was successfully create", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose : 2000 });
    }
    
    const errornotify = () => {
        toast("Cannot create !", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose : 2000 });
       
    }


    //useEfFect
    useEffect(() => {
        if(isOpen){
            // dispatch(fetchNameHrbyDeparment());
            // dispatch(departments());
            // dispatch(fetchPosition());
            const memId = listEmp.map(e => e.id).toString();
            setDataGroup((data) => ({
              ...data,
              membersId: memId,
            }));
        }else{
            // setDataEmp(null);
            // setImg(null)
            // setIdDepartment(null);
            setDataGroup(null)
        }
        // dispatch(resetList())
      }, [isOpen]);

  return (
    <div>
    <Modal id="topmodal" name="topmodal" isOpen={modal_positionTop} toggle={() => { tog_positionTop(); }} >
                <ModalHeader>
                    Modal Heading
                    <Button type="button" className="btn-close" onClick={() => { setmodal_positionTop(false); }} aria-label="Close"> </Button>
                </ModalHeader>
                
    </Modal>

    <Modal size="lg" isOpen={isOpen} toggle={toggle} centered >
                    <div className="modal-header bg-light p-3">
                    <i className="mdi mdi-account-plus"> <b>  Add New Group</b> </i> 
                        {/* <Button type="button" onClick={() => { setmodal_list(false); }} className="btn-close" aria-label="Close" >
                        </Button> */}
                    </div>
                    <form>
                        <ModalBody>
                        <Row>
                          <Col md={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="customername-field"
                              className="form-label"
                            >
                              Name of Group
                            </Label>
                            <Input
                              name="name"
                              id="customername-field"
                              className="form-control"
                              placeholder="Enter Name"
                              type="text"
                              onChange={(e)=> {
                                setDataGroup((data) => ({
                                  ...data,
                                  name: e.target.value,
                                }));
                              }}
                              
                            />
                            {/* {validation.touched.name && validation.errors.name ? (
                              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                            ) : null} */}
                          </div>

                          <div className="mb-3">
                            <Label
                              htmlFor="Description-field"
                              className="form-label"
                            >
                              Description
                            </Label>
                            <Input
                              name="description"
                              type="text"
                              id="description-field"
                              placeholder="Enter description"
                              onChange={(e)=> {
                                setDataGroup((data) => ({
                                  ...data,
                                  description: e.target.value,
                                }));
                              }}
                            />
                            {/* {validation.touched.name && validation.errors.name ? (
                              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                            ) : null} */}
                          </div>

                          

                          

                          <div>
                            <Label htmlFor="status-field" className="form-label">
                              Status
                            </Label>

                            <Input
                              name="status"
                              type="select"
                              className="form-select"
                              id="status-field"
                              // onChange={validation.handleChange}
                              disabled
                            >
                              {customermocalstatus.map((item, key) => (
                                <React.Fragment key={key}>
                                  {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                                </React.Fragment>
                              ))}
                            </Input>

                          </div>
                          </Col>

                          <Col md={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="members-field"
                                className="form-label"
                              >
                                Members
                              </Label>
                              <div className="">
                                <textarea style={{height: '200px'}} id="members-field" name="members" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" 
                                  value={listEmp.map(e => ' ' + e.name + ' ')} 
                                  disabled />
                                <button className="btn btn-sm btn-outline-primary shadow-none" type="button" id="button-addon2" onClick={() => setIsOpen(false)} >Add more</button>
                              </div>
                              
                              {/* {validation.touched.name && validation.errors.name ? (
                                <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                              ) : null} */}
                            </div>
                          </Col>
                        </Row>
                            
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                {/* <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button> */}
                                <button type="button" className="btn btn-success" id="add-btn" onClick={handleAddNewGroup}>Add</button>
                                <button type="button" className="btn btn-soft-danger" onClick={() => setIsOpen(false)} >Close</button>
                                {/* <Button color="primary" onClick={() => tog_positionTop()}>Top Modal</Button> */}
                                {/* <Button color="light" className="w-xs" onClick={successnotify}>Success</Button> */}
                            </div>
                        </ModalFooter>
                    </form>
                </Modal></div>
  )
}

// export default function AddInfoModal({ isOpen, setIsOpen, resetModal }) {

