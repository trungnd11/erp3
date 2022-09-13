import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from 'react-select';
import employeeApi from '../../api/employee/employeeApi';
import { useDispatch, useSelector } from 'react-redux';
import { departments } from "../../store/organizational/organizational";
import { fetchPosition, fetchEmployee, fetchNameHrbyDeparment, fetchNameUrbyDeparment, resetList } from '../../store/employee/employees';
import avatar1 from '../../assets/images/users/user-dummy-img.jpg';
import moment from 'moment';
import deparmentApi from '../../api/department/index';
import apiLocation from "../../api/location";
import { Alert } from '../OrganizationalChart/alert';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from "yup";
import styled from 'styled-components';
// import AsyncSelect from "react-select/async";

const SelectStyle = styled(Select)`
  .css-1s2u09g-control {
    border-color: ${(prop) => prop.isValid && "red !important"};
  }
`;

export default function ModalAddNewEmployee( { isOpen, toggle, setIsOpen, setPNumb } ) {
    const empDispatch = useDispatch();
    const { departmentTree } = useSelector((state) => state.organizational);
    const data = useSelector(state => state.employeeReducer);
    const dispatch = useDispatch();
    const [dataEmp, setDataEmp] = useState(null);
    const [selectedNamePosition, setNamePosition] = useState(null);
    const [idPosition, setIdPosition] = useState(null);
    const [selectedNameHr, setNameHr] = useState(null);
    const [idHr, setIdHr] = useState(null);
    const [selectedNameUr, setNameUr] = useState(null);
    const [idUr, setIdUr] = useState(null);
    // const [nameWP, setNameWP] = useState(null);
    // const [idWP, setIdWP] = useState(null);

    const [selectedNameDepartment, setNameDepartment] = useState(null);
    const [idDepartment, setIdDepartment] = useState(null);
    const [img, setImg] = useState(null);
    const [modal_positionTop, setmodal_positionTop] = useState(false);
    const [selectedWorkPlace, setWorkPlace] = useState([]);
    
    function tog_positionTop() {
        setmodal_positionTop(!modal_positionTop);
        setIsOpen(false);
        setDataEmp(null);

    }
    // const findLocationOption = async () => {
    //     const response = await apiLocation.getLocationsByName('');
    //     setWorkPlace(response);
    // };
    

    // handle
    // const listLocation = async (id) => {
    //     console.log(id)
    //     await deparmentApi.getDepartmentById(id).then(({ data }) => setLocationName(data.locations));

    // };
    const handleUploadImg = (e) => {
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
                console.log(reader.result)
                setImg(reader.result);
                setDataEmp((data) => ({
                ...data,
                avatarPic: reader.result,
            }));
            };

        }
    }

    const handleSelectGender = (e) => {
        validation.setValues((pre) => ({ ...pre, gender: e }));
    }; 

    const handleSelectBirthday = (e) => {
        validation.setValues((pre) => ({ ...pre, birthday: e }));
    }; 
        
    const handleSelectDepartment = (id, name) => {
        setNameDepartment(name);
        setIdDepartment(id); 
        console.log(id + ' ' + name);
        // dispatch(fetchNameHrbyDeparment(id));
        dispatch(fetchNameUrbyDeparment(id));
        validation.setValues((pre) => ({ ...pre, empDepartmentID: id }));
    }

    const handleSelectPosition = (id, name) => {
        setNamePosition(name);
        setIdPosition(id);
        console.log(id + ' ' + name);
        validation.setValues((pre) => ({ ...pre, empPositionID: id }));
    }

    const handleSelectHr = (id, name) => {
        setNameHr(name);
        setIdHr(id);
        console.log(id + ' ' + name);
        validation.setValues((pre) => ({ ...pre, empHrID: id }));
    }

    const handleSelectUr = (id, name) => {
        setNameUr(name);
        setIdUr(id);
        console.log(id + ' ' + name);
        validation.setValues((pre) => ({ ...pre, empUrID: id }));
    }

    // const handleAddNewEmp = async () => {
    //     console.log(dataEmp)
    //         await employeeApi.createNewEmployee(dataEmp).then(({ data }) => {
    //               const newEmployee = data;
    //               console.log('success')
    //                 successnotify();
    //                 setIsOpen(false);
    //                 setDataEmp(null);
    //                 setIdDepartment(null);
    //                 setPNumb(1);
    //         })
    //             .catch((e) => {
    //             errornotify();
    //             console.log(e);
    //             });
            
    // }

    const successnotify = () => {
        toast("New employee was successfully create", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose : 2000 });
        empDispatch(fetchEmployee({page: 0, size: 10}));
    }
    
    const errornotify = () => {
        toast("Cannot create !", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose : 2000 });
    }


    // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      descJob: '',
      gender: '',
      empPositionID: '',
      empDepartmentID: '',
      empUrID: '',
      empHrID: '',
      birthday: '',
    },

    validationSchema: Yup.object({
        fullName: Yup.string().required(),
        phoneNumber: Yup.string().required(),
        email: Yup.string().required(),
        descJob: Yup.string().required(),
        empPositionID:  Yup.string().required(),
        empDepartmentID:  Yup.string().required(),
        // empUrID: Yup.string().required(),
        // empHrID: Yup.string().required(),
        // birthday: Yup.string().required(),

    }),

    onSubmit: (values,{ resetForm }) => {
     console.log({ values })
     employeeApi.createNewEmployee(values)
     .then(({ data }) => {
        const newEmployee = data;
        console.log('success')
          successnotify();
          setIsOpen(false);
          setDataEmp(null);
          setIdDepartment(null);
          setPNumb(1);
        })

    .catch((e) => {
            errornotify();
            console.log(e);
    });

    //  handleAddNewEmp();
    // //  handleDeleteCustomer(values);
     resetForm();
     validation.resetForm(); 
     toggle();
    },
  });

    //useEfFect
    useEffect(() => {
        if(isOpen){
            dispatch(fetchNameHrbyDeparment());
            // dispatch(departments());
            // dispatch(fetchPosition());
            // findLocationOption();
        }else{
            setDataEmp(null);
            setImg(null)
            setIdDepartment(null);
        }
        dispatch(resetList())
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
                    <i className="mdi mdi-account-plus"> <b>  Add New Employee</b> </i> 
                        {/* <Button type="button" onClick={() => { setmodal_list(false); }} className="btn-close" aria-label="Close" >
                        </Button> */}
                    </div>
                    <Form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}>
                    
                        <ModalBody>

                            <Row>
                                <Col md={6}>
                                
                                <div className="mb-3">
                                    <label htmlFor="name-field" className="form-label">Full name</label>
                                    <Input type="text" 
                                            id="name-field" 
                                            className="form-control" 
                                            placeholder="Enter Full name"
                                            name='fullName'
                                            value={validation.values.fullName}
                                        
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.fullName && validation.errors.fullName ? true : false
                                            }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Gender-field" className="form-label">Gender</label>
                                    <select className="form-control" data-trigger name="gender"  
                                        
                                        onChange={(e) => {handleSelectGender(e.target.value)}}
                                    >
                                        
                                        <option value="Unknown">Unknown</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
        
                                <div className="mb-3">
                                    <label htmlFor="date-field" className="form-label">Birthday</label>
                                    <Flatpickr
                                        name='birthday'
                                        className="form-control"
                                        options={{
                                            dateFormat: "Y/m/d",
                                            defaultDate: "1999/12/31",
                                            
                                        }}
                                        placeholder="Select birthday..."
                                        onChange={(e) => {handleSelectBirthday(moment(e[0]).format("YYYY-MM-DD"))}}
                                        // defaultValue= {moment().format("YYYY-MM-DD")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone-field" className="form-label">Phone</label>
                                    
                                    <Input type="text" 
                                            className="form-control" 
                                            placeholder="Enter phone"
                                            name='phoneNumber'
                                            value={validation.values.phoneNumber}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.phoneNumber && validation.errors.phoneNumber ? true : false
                                            }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-field" className="form-label">Email</label>
                                    
                                    <Input type="text" 
                                            className="form-control" 
                                            placeholder="Enter email"
                                            name='email'
                                            value={validation.values.email}
                                        
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.email && validation.errors.email ? true : false
                                            }
                                    />

                                </div>

                                <div className="profile-user position-relative d-inline-block mx-auto  mb-3">
                                    <label htmlFor="ava-field" className="form-label">Avatar</label>
                                    <br />
                                    <img src={img || avatar1} className="rounded avatar-md shadow" alt="user-profile" />
                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <Input id="profile-img-file-input" type="file" onChange={handleUploadImg} accept="image/*"  className="profile-img-file-input" />
                                        <Label htmlFor="profile-img-file-input" className="p-0 avatar-xs">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-camera-fill"></i>
                                            </span>
                                        </Label>
                                    </div>
                                </div>
                                </Col>
                            
                                <Col md={6}>
                                    <div className="mb-3">
                                    <label htmlFor="empPositionID-field" className="form-label">Position</label>
                                    <SelectStyle
                                            name='empPositionID'
                                            
                                            onChange={(e) => {handleSelectPosition(e.value, e.label);}}
                                            
                                            options={data.dataPosition.map((item) => ({ label: item.name, value: item.id }))}

                                            isValid={
                                                validation.touched.empPositionID &&
                                                validation.errors.empPositionID
                                                  ? true
                                                  : false
                                              }
                                    />
                                    </div>
                                

                                <div className="mb-3">
                                    <label htmlFor="desc-field" className="form-label">Description job</label>
                                    
                                    <Input type="text" 
                                            className="form-control" 
                                            placeholder="Enter descJob"
                                            name='descJob'
                                            value={validation.values.descJob}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.descJob && validation.errors.descJob ? true : false
                                            }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="empDepartmentID" className="form-label">Department</label>
                                        
                                        {/* <SelectStyle

                                            name='empDepartmentID'
                                            
                                            onChange={(e) => {handleSelectDepartment(e.value, e.label);}}
                                            
                                            options={departmentTree.map((item) => ({ label: item.name, value: item.id }))}
                                            isValid={
                                                validation.touched.empDepartmentID &&
                                                validation.errors.true
                                                  ? true
                                                  : false
                                            }
                                        /> */}
                                         <SelectStyle
                                            name='empDepartmentID'
                                            
                                            onChange={(e) => {handleSelectDepartment(e.value, e.label);}}
                                            
                                            options={departmentTree.map((item) => ({ label: item.name, value: item.id }))}

                                            isValid={
                                                validation.touched.empDepartmentID &&
                                                validation.errors.empDepartmentID
                                                  ? true
                                                  : false
                                              }
                                        />
                                </div>

                                {/* <div className="mb-3">
                                    <label htmlFor="wrk-field" className="form-label">Work Address</label>
                                        <Input type="text" id="phone-field" className="form-control" placeholder="Enter Work Address"  
                                            onChange={(e) => {
                                                setDataEmp((data) => ({
                                                ...data,
                                                employeeWorkplace: e.target.value,
                                                }));
                                                
                                            }}
                                            
                                        /> 
                                        <Select
                                        onChange={(e) => {
                                            handleSelectUr(e.value, e.label);
                                            setNameWP(e.label);
                                            setIdWP(e.value);
                                            // setEmployee((emp) => ({
                                            //     ...emp, empUrID: e.value,
                                            // }));
                                        }}
                                        options={selectedWorkPlace.map((item) => ({ label: item.location, value: item.id }))}
                                        value={{label: nameWP, value: idWP}}
                                        />
                                    
                                </div> */}

                                <div className="mb-3">
                                    <label htmlFor="Ur-field" className="form-label">Leader Name</label>
                                        
                                        <SelectStyle
                                            name='empUrID'
                                            
                                            onChange={(e) => {handleSelectUr(e.value, e.label);}}
                                            
                                            options={data.dataUrbyDepartment.map((item) => ({ label: item.fullName, value: item.id }))}

                                            isValid={
                                                validation.touched.empUrID &&
                                                validation.errors.empUrID
                                                  ? true
                                                  : false
                                              }
                                        />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Hr-field" className="form-label">Hr Name</label>
                                        <SelectStyle
                                            name='empHrID'
                                            
                                            onChange={(e) => {handleSelectHr(e.value, e.label);}}
                                            
                                            options={data.dataHrbyDepartment.map((item) => ({ label: item.fullName, value: item.id }))}

                                            isValid={
                                                validation.touched.empHrID &&
                                                validation.errors.empHrID
                                                  ? true
                                                  : false
                                              }
                                        />
                                </div>
                                </Col>
                            </Row>
                            
                        </ModalBody>
                        <ModalFooter>
                            <div className="hstack gap-2 justify-content-end">
                                {/* <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button> */}
                                <button type="submit" className="btn btn-success" id="add-btn" >Add</button>
                                <button type="button" className="btn btn-soft-danger" onClick={() => setIsOpen(false)} >Close</button>
                                {/* <Button color="primary" onClick={() => tog_positionTop()}>Top Modal</Button> */}
                                {/* <Button color="light" className="w-xs" onClick={successnotify}>Success</Button> */}
                            </div>
                        </ModalFooter>
                    </Form>
                </Modal></div>
  )
}

// export default function AddInfoModal({ isOpen, setIsOpen, resetModal }) {

