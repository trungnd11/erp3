import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from 'react-redux';
import { departments } from "../../../../store/organizational/organizational";
import { fetchDataEmployeebyId, fetchPosition,fetchNameUrbyDeparment, fetchNameHrbyDeparment, fetchUpdateEmployee } from '../../../../store/employee/employees';
import Select from 'react-select';
import { formatDate } from '@fullcalendar/react';
import employeeApi from '../../../../api/employee/employeeApi';
import apiLocation from "../../../../api/location";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function PersonalDetailTabs({id,dataEmp}) {
    const { departmentTree } = useSelector((state) => state.organizational);
    const data = useSelector(state => state.employeeReducer);
    const dispatch = useDispatch();
    

    //Var
    const [employee, setEmployee] = useState();
    const [selectedNamePosition, setNamePosition] = useState('');
    const [idPosition, setIdPosition] = useState('');
    const [selectedNameWplace, setNameWplace] = useState('');
    const [idWplace, setIdWplace] = useState('');
    const [selectedNameDepartment, setNameDepartment] = useState('');
    const [idDepartment, setIdDepartment] = useState(null);
    const [selectedNameHr, setNameHr] = useState('');
    const [idHr, setIdHr] = useState('');
    const [selectedNameUr, setNameUr] = useState('');
    const [idUr, setIdUr] = useState('');
    const [genderValue,  setGenderValue] = useState();
    const [maritalValue,  setMaritalValue] = useState();
    const [selectedWorkPlace, setWorkPlace] = useState([]);
    const [selectedNameWP, setNameWP] = useState('Unknown');
    const [idWP, setIdWP] = useState('');

    //handle
    const [modalAddNewWP, setmodalAddNewWP] = useState(false);
    function tog_AddNewWp() {
        setmodalAddNewWP(!modalAddNewWP);
    }

    const handleSelectPosition = (id, name) => {
        setNamePosition(name);
        setIdPosition(id);
    }

    const handleSelectDepartment = (id, name) => {
        setNameDepartment(name);
        setIdDepartment(id); 
        setIdHr(null);
        setIdUr(null);
        setNameHr(null);
        setNameUr(null);
    }

    const handleSelectHr = (id, name) => {
        setNameHr(name);
        setIdHr(id);
        setEmployee((emp) => ({
            ...emp, empHrID: {id: id , label: name }
        }));
    }

    const handleSelectUr = (id, name) => {
        setNameUr(name);
        setIdUr(id);
        setEmployee((emp) => ({
            ...emp, empUrID: {id: id , label: name }
        }));
    }

    const findLocationOption = async () => {
        const response = await apiLocation.getLocationsByName('');
        setWorkPlace(response);
        response.map((data) => {
            if(data.id === dataEmp.empWP){
                setIdWP(data.id)
                setNameWP(data.location)
                
            }
            return 1;
        })
    };

    const getDataEmployeeByID = async () => {
        
        if (dataEmp.empHrID) {
            const responseHr = await employeeApi.getNameByID(dataEmp.empHrID);
            setNameHr(responseHr.fullName)
        } else {
            setNameHr(null)
        }

        if (dataEmp.empUrID) {
            const responseUr = await employeeApi.getNameByID(dataEmp.empUrID);
            setNameUr(responseUr.fullName)
        } else {
            setNameUr(null)
        }

    };

    const handleUpdate = () => {
        console.log(employee)
        
        try {
            dispatch(fetchUpdateEmployee(employee));
            successnotify();
        } catch (e) {
            errornotify();
            console.log(e);
        }
    }

    useEffect(() => {
        if(idDepartment){
            // dispatch(fetchNameHrbyDeparment());
            dispatch(fetchNameUrbyDeparment(idDepartment));
            // findLocationOption();
        }
    }, [idDepartment])

    useEffect(() =>{
        if(dataEmp!=null){
            setEmployee(dataEmp);
            setIdDepartment(dataEmp.empDepartmentID);
            setNameDepartment(dataEmp.empDepartmentName);
            setIdPosition(dataEmp.empPositionID);
            setNamePosition(dataEmp.empPositionName);
            setIdHr(dataEmp.empHrID);
            setIdUr(dataEmp.empUrID);
            setGenderValue(dataEmp.gender);
            setMaritalValue(dataEmp.maritalStatus);
            setNameWP(dataEmp.empWP)
            findLocationOption();
            

            dispatch(fetchPosition());
            dispatch(departments());
            getDataEmployeeByID();
            dispatch(fetchNameHrbyDeparment());
            
        }
    }, [dataEmp])
    
    

    const successnotify = () => {
        toast("Employee was successfully update", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose : 1500 });
        setEmployee(employee)
        // empDispatch(fetchEmployee({page: 0, size: 10}));
    }
    
    const errornotify = () => {
        toast("Cannot update !", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose : 2000 });
        // empDispatch(fetchEmployee({page: 0, size: 10}));
    }

  return (
    <div>
            <Form>
                <Row>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="firstnameInput" className="form-label">1. Full name</Label>
                                <Input type="text" 
                                        className="form-control" id="firstnameInput" 
                                        onChange={(e) => {
                                            setEmployee((emp) => ({
                                            ...emp, fullName: e.target.value,
                                            
                                            }));
                                        }}
                                        placeholder="Enter your firstname" 
                                        value={employee ? employee.fullName : ''} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="lastnameInput" className="form-label">2. Birthday</Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "Y/m/d"
                                }}
                                placeholder="Select Birthday"
                                onChange={(e) => {
                                    setEmployee((emp) => ({
                                      ...emp, birthday: moment(e[0]).format("YYYY-MM-DD"),
                                    }));
                                    // setValueTime(e);
                                  }}
                                value={employee ? moment(employee.birthday).format("YYYY-MM-DD") : ''}  
                            />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Gender" className="form-label">3. Gender</Label>
                            <select value={genderValue || "Unknown"} className="form-control" data-trigger name="Gender-field" 
                                id="Gender-field" 
                                onChange={(e) =>{
                                    setEmployee((emp) => ({
                                        ...emp, gender: e.target.value,
                                    }));
                                    setGenderValue(e.target.value)
                                }}>
                                <option value="Unknown">Unknown</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                    </Col>
                            
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label htmlFor="phonenumberInput" className="form-label">4. Phone Number</Label>
                            <Input type="text" className="form-control"
                                id="phonenumberInput"
                                placeholder="Enter your phone number"
                                value={employee ? employee.phoneNumber : ''}
                                onChange={(e) => {
                                    setEmployee((emp) => ({
                                    ...emp, phoneNumber: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                            
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label htmlFor="emailInput" className="form-label">5. Email Address</Label>
                            <Input type="email" className="form-control" id="emailInput"
                                placeholder="Enter your email"
                                value={employee ? employee.email : ''}
                                 onChange={(e) => {
                                    setEmployee((emp) => ({
                                    ...emp, email: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <Label htmlFor="Position" className="form-label">6. Position</Label>
                                <Select
                                        onChange={(e) => {
                                            handleSelectPosition(e.value, e.label);
                                            setNamePosition(e.label);
                                            setEmployee((emp) => ({
                                                ...emp, empPositionID: e.value,
                                            }));
                                        }}
                                        options={data.dataPosition.map((item) => ({ label: item.name, value: item.id }))}
                                        value={{label: selectedNamePosition, value: idPosition}}
                                />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <Label htmlFor="Department" className="form-label">7. Department</Label>
                                <Select
                                        onChange={(e) => {
                                            handleSelectDepartment(e.value, e.label);
                                            setEmployee((emp) => ({
                                                ...emp, empDepartmentID: e.value,
                                            }));
                                        }}
                                        options={departmentTree.map((item) => ({ label: item.name, value: item.id }))}
                                        value={{label: selectedNameDepartment, value: idDepartment}}
                                />
                                
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <Label htmlFor="Hrname" className="form-label">8. Hr name</Label>
                                    <Select
                                        onChange={(e) => {
                                            handleSelectHr(e.value, e.label);
                                            // setNameHr(e.label);
                                            // setIdHr(e.value);
                                            // setEmployee((emp) => ({
                                            //     ...emp, empHrID: e.value,
                                            // }));
                                        }}
                                        options={data.dataHrbyDepartment.map((item) => ({ label: item.fullName, value: item.id }))}
                                        value={{label: selectedNameHr, value: idHr}}
                                    />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <Label htmlFor="Urname" className="form-label">9. Leader name</Label>
                                    <Select
                                        onChange={(e) => {
                                            handleSelectUr(e.value, e.label);
                                            setNameUr(e.label);
                                            setIdUr(e.value);
                                            setEmployee((emp) => ({
                                                ...emp, empUrID: e.value,
                                            }));
                                        }}
                                        options={data.dataUrbyDepartment.map((item) => ({ label: item.fullName, value: item.id }))}
                                        value={{label: selectedNameUr, value: idUr}}
                                    />
                        </div>
                    </Col>
                    <Col lg={12}>

                                     

                        <div className="mb-3">
                            <Label htmlFor="Descriptionjob" className="form-label">10. Description job</Label>
                            <Input type="text" className="form-control" id="Description job"
                                placeholder="Description job" value={employee ? employee.descJob : ''} 
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, descJob: e.target.value,
                                    }));
                                }}
                                />
                            
                        </div>
                    </Col>
                            
                    <Col lg={5}>
                        <div className="mb-3">
                            <Label htmlFor="NoCIC"
                                className="form-label">11. Number CIC</Label>
                            <Input type="text" className="form-control"
                                id="NoCIC" placeholder="No. CIC"
                                value={employee ? employee.numbID : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, numbID: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="CertificateP" className="form-label">12. Certificate place</Label>
                            <Input type="text" className="form-control" id="CertificateP"
                                placeholder="Certificate place" value={employee ? employee.idPlace : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, idPlace: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="mb-3">
                            <Label htmlFor="Cdate" className="form-label">
                                13. Certificate date
                            </Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "Y/m/d"
                                }}
                                placeholder="Select Certificate date"
                                onChange={(e) => {
                                    setEmployee((emp) => ({
                                      ...emp, idReleaseDate: moment(e[0]).format("YYYY-MM-DD"),
                                    }));
                                    // setValueTime(e);
                                  }}
                                value={employee ? moment(employee.idReleaseDate).format("YYYY-MM-DD") : ''}  
                            />
                        </div>
                    </Col>
                            
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Currentplace" className="form-label">15. Current place</Label>
                            <Input type="text" className="form-control" id="Currentplace"
                                placeholder="Enter Current place" value={employee ? employee.curretPlace : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, curretPlace: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Birthplace" className="form-label">16. Birth place</Label>
                            <Input type="text" className="form-control" id="birthplace"
                                placeholder="Enter birthplace" value={employee ? employee.birthPlace : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, birthPlace: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Place" className="form-label">17. Place (release ID)</Label>
                            <Input type="text" className="form-control" id="Place"
                                placeholder="Enter Place" value={employee ? employee.idReleasePlace : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, idReleasePlace: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Country" className="form-label">18. Country</Label>
                            <Input type="text" className="form-control" id="Country"
                                placeholder="Enter Country" value={employee ? employee.country : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, country: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Marital" className="form-label">19. Marital status</Label>
                            <select value={maritalValue || "Unknown"} className="form-control" data-trigger name="marital-field" id="marital-field" 
                                    onChange={(e) =>{
                                        setEmployee((emp) => ({
                                            ...emp, maritalStatus: e.target.value,
                                        }));
                                        setMaritalValue(e.target.value)
                                    }}>
                                <option value="Unknown">Unknown</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Insurance" className="form-label">20. Social insurance id</Label>
                            <Input type="text" className="form-control" id="Insurance"
                                placeholder="Enter Social Insurance Id" value={employee ? employee.socialInsuranceId : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, socialInsuranceId: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Tax" className="form-label">21. Tax code</Label>
                            <Input type="Tax" className="form-control" id="countryInput"
                                placeholder="Tax code" value={employee ? employee.taxCode : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, taxCode: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Bank" className="form-label">22. Bank account</Label>
                            <Input type="text" className="form-control" id="Bank"
                                placeholder="Enter Bank account" 
                                value={employee ? employee.bankAccount : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, bankAccount: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                <Label htmlFor="Work" className="form-label">23. Work place</Label>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="#" onClick={() => setmodalAddNewWP(!modalAddNewWP)} className="badge bg-light text-primary fs-12" >
                                        <i className="ri-add-fill align-bottom me-1"></i> Add new place
                                    </Link>
                                </div>
                            </div>  
                            <Select
                                        onChange={(e) => {
                                            // handleSelectUr(e.value, e.label);
                                            setNameWP(e.label);
                                            setIdWP(e.value);
                                            console.log(selectedWorkPlace);
                                            setEmployee((emp) => ({
                                                ...emp, empWP: e.value,
                                            }));
                                        }}
                                        options={selectedWorkPlace.map((item) => ({ label: item.location, value: item.id }))}
                                        value={{label: selectedNameWP, value: idWP}}
                            />
                            
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="homeMobile" className="form-label">24. Another phone</Label>
                            <Input type="text" className="form-control" id="homeMobile"
                                placeholder="Enter homeMobile" value={employee ? employee.homeMobile : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, homeMobile: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="mb-3">
                            <Label htmlFor="Religion" className="form-label">25. Religion</Label>
                            <Input type="text" className="form-control" id="Religion"
                                placeholder="Enter Religion" value={employee ? employee.religion : ''}
                                onChange= {(e) => {
                                    setEmployee((emp) => ({
                                        ...emp, religion: e.target.value,
                                    }));
                                }} />
                        </div>
                    </Col>
                    
                            
                    <Col lg={12}>
                        <div className="hstack gap-5 justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        </div>
                    </Col>
                </Row>
            </Form>

            <Modal isOpen={modalAddNewWP} toggle={() => { tog_AddNewWp(); }}  id="dRecordModal" centered >
                <div className="modal-header">
                    <span>Coming soon...</span>
                    <Button type="button" onClick={() => setmodalAddNewWP(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        
                    <FormGroup row>
                        <Label for="code-part" sm={2}>
                            Code
                        </Label>
                        <Col sm={10}>
                            <Input
                            id="code-part"
                            name="code"
                            placeholder="Enter part code"
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
                        <Label for="code-part" sm={2}>
                            Name
                        </Label>
                        <Col sm={10}>
                            <Input
                            id="name-part"
                            name="location"
                            placeholder="Enter part name"
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
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodalAddNewWP(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record" >Yes, add new  !</button>
                    </div>
                </ModalBody>
            </Modal>
            
    </div>
  )
}
