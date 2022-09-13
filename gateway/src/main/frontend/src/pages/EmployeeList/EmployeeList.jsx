/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Container, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Row, Spinner } from 'reactstrap';
import MetaTags from "react-meta-tags";
import BreadCrumb from '../../Components/Common/BreadCrumb';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
import moment from 'moment';

//Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images
import userImg from "../../assets/images/users/user-dummy-img.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import employeeApi from '../../api/employee/employeeApi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, addEmployee, fetchPosition, fetchEmployeeBySearch } from '../../store/employee/employees';
import { departments } from "../../store/organizational/organizational";
import ModalAddNewEmployee from './ModalAddNewEmployee';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { toast } from 'react-toastify';
import styled from "styled-components";
import PaginateCustom from './PaginateCustom';
import ModalAddNewGroup from './ModalAddNewGroup';
import ModalQuickView from './ModalQuickView';
import api from "../../api/groupuser";

const SelectStyle = styled(Select)`width: 165px;`

const EmployeeList = () => {

    const empDispatch = useDispatch();
    const dataEmp = useSelector(state => state.employeeReducer);
    const { departmentTree } = useSelector((state) => state.organizational);
    const linkPath = useHistory();
    const [modalAddNewEmp, setmodalAddNewEmp] = useState(false);
    const [modalAddNewGroup, setmodalAddNewGroup] = useState(false);
    const [imgQuick, setImgQuick] = useState(null);
    const [nameQuick, setNameQuick] = useState(null);
    const [quickId, setQuickId] = useState(null);
    const [quickCode, setQuickCode] = useState(null)
    const [quickBirthday, setQuickBirthday] = useState(null)
    const [quickPhone, setQuickPhone] = useState(null)
    const [listEmpID, setListEmpID] = useState([]);
    const [listEmpName, setListEmpName] = useState([]);
    const [itemSz, setItemSz] = useState(10);
    const [pageNumb, setPageNumb] = useState(1);
    const [txtSearch, setTxtSearch] = useState('');
    const [txtGroupSearch, setTxtGroupSearch] = useState({ id: '', name: 'by Group' });
    const [selectDepart2Search, setSelectDepart2Search] = useState({ id: '', name: 'by Department' });
    const [selectPosition2Search, setSelectPosition2Search] = useState({ id: '', name: 'by Position' });

    const [totalPg, setTotalPg] = useState(dataEmp.dataEmployeesBySearch.totalPages);
    const [currentPage, setCurPage] = useState(3);
    console.log(listEmpID);
    const togList = () => {
        setmodalAddNewEmp(!modalAddNewEmp);
        // empDispatch(fetchPosition());
    }
    const togListGroup = () => {
        setmodalAddNewGroup(!modalAddNewGroup);
        // empDispatch(fetchPosition());
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const [modal_deleteGrp, setmodal_deleteGrp] = useState(false);
    function tog_deleteGrp() {
        setmodal_deleteGrp(!modal_deleteGrp);
    }

    const [modal_quick, setmodal_quick] = useState(false);
    const [dataQuick, setDataQuick] = useState([]);
    function tog_quick() {
        setmodal_quick(!modal_quick);
    }

    const [groupUser, setgroupUser] = useState([]);
    const groupUserList = async () => {
        try {
            const response = await api.getGroupUser();
            console.log(response);
            setgroupUser(response);
        } catch (error) {
            console.log('fail to')
        }
    };

    const columns = [
        {
            Header: " ",
            width: "5%",
        },
        {
            Header: "Avatar",
            width: "5%",
        },
        {
            Header: "Code",
            width: "10%",
        },
        {
            Header: "Full Name",
            width: "20%",
        },
        {
            Header: "Gender",
            width: "10%",
        },

        {
            Header: "Email",
            width: "15%",
        },
        {
            Header: "Position",
            width: "10%",
        },
        {
            Header: "Department",
            width: "10%",
        },
        {
            Header: "Status",
            width: "10%",
        },
    ];

    const linkToProfiles = (id) => {
        linkPath.push(`/hrcenter-employee-profile/employee-list/profiles/${id}`);
    }

    const handleDelete1Emp = async () => {
        await employeeApi.deleteEmployee(quickId).then(() => {
            // console.log('success');
            successnotify();
            setmodal_delete(false);
            setQuickId(null)
            setNameQuick(null)
            setmodal_quick(false)
            setQuickCode(null)
            setQuickBirthday(null)
            setQuickPhone(null)

        }).catch((e) => {
            errornotify();
            // console.log(e);
        });
    }
    const successnotify = () => {
        toast("Employee was successfully delete",
            { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose: 2000 });
        setPageNumb(1)
    }

    const errornotify = () => {
        toast("Cannot delete !",
            { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose: 2000 });
    }


    const handleClearFilter = () => {
        document.getElementById('inputSearch').value = '';
        setTxtGroupSearch({ id: '', name: 'by Group' });
        setSelectDepart2Search({ id: '', name: 'by Department' });
        setSelectPosition2Search({ id: '', name: 'by Position' });


    }

    const handleBtnEnterSearch = async (txt) => {
        // console.log(selectDepart2Search);
        if (txt) {
            empDispatch(fetchEmployeeBySearch({ page: 0, size: itemSz, keyTxtSearch: txt, keyPosition: selectPosition2Search.id, keyDepartment: selectDepart2Search.id, keyGroup: txtGroupSearch.id }))
        } else {
            if (!txtGroupSearch) {
                empDispatch(fetchEmployeeBySearch({ page: 0, size: itemSz, keyTxtSearch: '', keyPosition: selectPosition2Search.id, keyDepartment: selectDepart2Search.id, keyGroup: '' }))
            } else {
                empDispatch(fetchEmployeeBySearch({ page: 0, size: itemSz, keyTxtSearch: '', keyPosition: selectPosition2Search.id, keyDepartment: selectDepart2Search.id, keyGroup: txtGroupSearch.id }))
            }

        }

    };

    const [showAlertDel, setShowAlertDel] = useState(false);

    // Dùng useEffect---------------------------------------------------------------------------------
    useEffect(() => {
        // const timeOut = setTimeout(()=> {
        empDispatch(fetchEmployeeBySearch({
            page: (pageNumb - 1),
            size: itemSz,
            keyTxtSearch: '',
            keyPosition: selectPosition2Search.id,
            keyDepartment: selectDepart2Search.id,
            keyGroup: txtGroupSearch.id
        }))
        empDispatch(departments());
        empDispatch(fetchPosition());
        groupUserList();
        // }, 250)
        // return ()=> {
        //   clearTimeout(timeOut)
        // }


    }, [pageNumb, itemSz, txtGroupSearch, selectPosition2Search, selectDepart2Search]);

    // useEffect(()=> {
    //     empDispatch(departments());
    //     empDispatch(fetchPosition());
    // }, [])

    useEffect(() => {
        setTotalPg(dataEmp.dataEmployeesBySearch.totalPages)
    }, [dataEmp])
    console.log(dataEmp)

    document.title = "Employee list | Company Name";
    return (
        <>
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Employee List" pageTitle="Tables" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    {/* <Row className="g-4 mb-0">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1" >
                                                    <div className="ribbon ribbon-primary round-shape">Employee</div>
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <Button color="success" className="add-btn" onClick={() => togList()} id="create-btn">
                                                        <i className="ri-add-line align-bottom me-1"></i> Add new employee
                                                    </Button>
                                                </div>
                                                
                                            </Col>
                                        </Row> */}
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="ms-2 mr-3" >
                                                    <Button color="soft-danger" onClick={() => tog_deleteGrp()} title="Delete employee(s)"><i className="ri-delete-bin-2-line"></i></Button>

                                                    &nbsp;
                                                    <div className="vr"></div>

                                                    &nbsp;

                                                    <Button color="success" className="btn-label" onClick={() => togList()} id="create-btn">
                                                        <i className="las la-user-plus label-icon align-middle fs-16 me-2"></i>
                                                        Add new employee
                                                    </Button>

                                                    &nbsp;

                                                    <Button color="warning" className="btn-label" onClick={() => togListGroup()} id="create-btn">
                                                        <i className="las la-holly-berry label-icon align-middle fs-16 me-2"></i>
                                                        Add new Group
                                                    </Button>

                                                </div>

                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">

                                                    <div className="ms-2 mr-3">
                                                        <Button color="info" className="btn-icon btn-animation btn" title="info" onClick={handleClearFilter}> <i className="bx bx-refresh-alt" /> </Button>
                                                    </div>


                                                    <div className="ms-2 mr-3" >
                                                        <SelectStyle
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setSelectPosition2Search({ name: e.label, id: e.value })
                                                                } else {
                                                                    setSelectPosition2Search({ name: '', id: '' })
                                                                }

                                                            }}
                                                            placeholder="by Position"
                                                            options={dataEmp.dataPosition.map((item) => ({ label: item.name, value: item.id }))}
                                                            // onMenuOpen={() => console.log('firstáddddddddddddddddddđ')}  
                                                            isClearable={true}
                                                            value={{ label: selectPosition2Search.name, value: selectPosition2Search.id }}
                                                        />
                                                    </div>

                                                    <div className="ms-2 mr-3">
                                                        <SelectStyle
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setSelectDepart2Search({ name: e.label, id: e.value })
                                                                } else {
                                                                    setSelectDepart2Search({ name: '', id: '' })
                                                                }

                                                            }}
                                                            placeholder="by Department"
                                                            options={departmentTree.map((item) => ({ label: item.name, value: item.id }))}
                                                            isClearable={true}
                                                            value={{ label: selectDepart2Search.name, value: selectDepart2Search.id }}

                                                        />
                                                    </div>

                                                    <div className="ms-2 mr-3">
                                                        <SelectStyle
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setTxtGroupSearch({ name: e.label, id: e.id })

                                                                } else {
                                                                    setTxtGroupSearch({ name: '', id: '' })
                                                                }
                                                            }}
                                                            placeholder="by Group"
                                                            options={groupUser.map((item) => ({ label: item.name, value: item.name, id: item.membersId }))}
                                                            isClearable={true}
                                                            value={{ label: txtGroupSearch.name, value: txtGroupSearch.name, id: txtGroupSearch.id }}
                                                        />
                                                    </div>

                                                    <div className="search-box ms-2 mr-3" >
                                                        <div className="form-icon">
                                                            <Input type="text" className="form-control form-control-icon" id="inputSearch" placeholder="Search employee"

                                                                onKeyPress={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        handleBtnEnterSearch(e.target.value)
                                                                        // e.target.value = '';

                                                                    }
                                                                }


                                                                } />
                                                            <i className="bx bx-send"></i>

                                                        </div>


                                                    </div>
                                                    <div className="ms-2 mr-3">
                                                        <Button color="primary" className="btn-icon btn-animation btn" title="Search" onClick={() => handleBtnEnterSearch(document.getElementById('inputSearch').value)}> <i className="bx bx-search-alt" /> </Button>
                                                    </div>

                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1" style={{ minHeight: '150px' }}>
                                            <table className="table-hover table align-middle table-nowrap position-relative" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        {columns.map(head => <th style={{ width: head.width }}
                                                            key={head.Header}>{head.Header}</th>)}
                                                    </tr>
                                                </thead>

                                                {dataEmp.loading
                                                    ?
                                                    <tbody>
                                                        <tr>
                                                            <td className='border-0'>
                                                                <div className='position-absolute start-50 mt-4 border-top-0  align-items-center' style={{ transform: 'translateX(-50%)' }}>


                                                                    THERE IS NO RESULT.


                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                    :
                                                    dataEmp.dataEmployeesBySearch.content && dataEmp.dataEmployeesBySearch.content.length > 0
                                                        ?
                                                        dataEmp.dataEmployeesBySearch.content.map(data => (


                                                            <tbody key={data.id} className="list form-check-all">

                                                                <tr key={data.id} >
                                                                    <th scope="row">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" name="checkAll"
                                                                                value={{ name: data.fullName, id: data.id }}
                                                                                onChange={(e) => {
                                                                                    if (e.target.checked) {
                                                                                        setListEmpID([...listEmpID, { id: data.id, name: data.fullName, ava: data.avatarPic }])

                                                                                    } else {
                                                                                        const rs = listEmpID.filter(item => item.id !== data.id)


                                                                                        setListEmpID(rs);
                                                                                    }

                                                                                }
                                                                                } />
                                                                        </div>
                                                                    </th>
                                                                    <td className="customer_name"><img src={data.avatarPic || userImg}
                                                                        className="avatar-sm rounded-circle shadow border border-3 border-light"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}
                                                                        alt="user-profile" />
                                                                    </td>

                                                                    <td className="employeeNumb"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>{data.employeeNumb}
                                                                    </td>

                                                                    <td className="fullName"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>{data.fullName}
                                                                    </td>

                                                                    <td className="gender"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>{data.gender ? data.gender : 'Unknown'}
                                                                    </td>

                                                                    <td className="email"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>{data.email ? data.email : 'Unknown'}
                                                                    </td>

                                                                    <td className="Position"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>
                                                                        {/* {data.birthday ? moment(data.birthday,"YYYY-MM-DD").format("YYYY/MM/DD") : 'Unknown'} */}

                                                                        {data.empPositionName ? data.empPositionName : 'Unknown'}
                                                                    </td>

                                                                    <td className="Department"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}>
                                                                        {/* {data.birthday ? moment(data.birthday,"YYYY-MM-DD").format("YYYY/MM/DD") : 'Unknown'} */}

                                                                        {data.empDepartmentName ? data.empDepartmentName : 'Unknown'}
                                                                    </td>

                                                                    <td className="status"
                                                                        onClick={() => {
                                                                            tog_quick();
                                                                            setQuickId(data.id);
                                                                            setDataQuick(data);
                                                                        }}><span className="badge badge-soft-success text-uppercase">Active</span>
                                                                    </td>

                                                                </tr>

                                                            </tbody>
                                                        ))
                                                        :
                                                        // <tbody>
                                                        //     <tr>
                                                        //     <td className='border-0'>
                                                        //     <div className='position-absolute start-50 d-flex align-items-center mt-5 border-top-0' style={{ transform: 'translateX(-50%)' }}>

                                                        //     <Spinner color="primary" type="grow" > Loading... </Spinner>

                                                        //     <Spinner className='mx-1' color="secondary" type="grow" > Loading... </Spinner>

                                                        //     <Spinner className='mx-1' color="success" type="grow" > Loading... </Spinner>
                                                        //     <Spinner className='mx-1' color="info" type="grow" > Loading... </Spinner>

                                                        //     <Spinner className='mx-1' color="warning" type="grow" > Loading... </Spinner>

                                                        //     <Spinner className='mx-1' color="danger" type="grow" > Loading... </Spinner>

                                                        //     <Spinner color="dark" type="grow" > Loading... </Spinner>

                                                        //     </div> 
                                                        //     </td>
                                                        // </tr>
                                                        // </tbody>
                                                        <tbody>
                                                            <tr>
                                                                <td className='border-0'>
                                                                    <div className='position-absolute start-50 mt-4 border-top-0  align-items-center' style={{ transform: 'translateX(-50%)' }}>


                                                                        THERE IS NO RESULT.


                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>

                                                }

                                            </table>
                                        </div>
                                        {
                                            dataEmp.dataEmployeesBySearch.content && dataEmp.dataEmployeesBySearch.content.length > 0 ?
                                                <PaginateCustom
                                                    totalPg={totalPg} dataEmp={dataEmp} itemSz={itemSz}
                                                    setItemSz={setItemSz} pageNumb={pageNumb}
                                                    setPageNumb={setPageNumb} currentPage={currentPage}
                                                    setCurPage={setCurPage}
                                                />
                                                :
                                                ''
                                        }

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>


            <ModalAddNewEmployee setPNumb={setPageNumb} isOpen={modalAddNewEmp} setIsOpen={setmodalAddNewEmp} toggle={() => { togList(); }} />

            <ModalAddNewGroup listEmpName={listEmpName} listEmp={listEmpID} isOpen={modalAddNewGroup} setIsOpen={setmodalAddNewGroup} toggle={() => { togListGroup(); }} />


            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#ffbe0b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <p className="text-muted mx-4 mb-0">Removing {nameQuick} ...</p>
                            <h4>Are you Sure ?</h4>
                            {/* <p className="text-muted mx-4 mb-0">Remove {nameQuick} ?!</p> */}
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={handleDelete1Emp}>Yes, Delete {nameQuick} !</button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modal_deleteGrp} toggle={() => { tog_deleteGrp(); }} id="deleteRecordModalGrp" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_deleteGrp(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#ffbe0b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <p className="text-muted mx-4 mb-0">Removing many ...</p>
                            <h4>On testing...</h4>
                            {/* <p className="text-muted mx-4 mb-0">Remove {nameQuick} ?!</p> */}
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_deleteGrp(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record" >Yes, Delete  !</button>
                    </div>
                </ModalBody>
            </Modal>


            <ModalQuickView modalDelete={modal_delete} setmodalDelete={setmodal_delete} dataEmpQuick={dataQuick} setIsOpen={setmodal_quick} isOpen={modal_quick} style={{ width: '350px' }} />

        </>
    );
};

export default EmployeeList;
