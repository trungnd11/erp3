/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import MetaTags from 'react-meta-tags';
import { isEmpty } from "lodash";
//api 
import api from "../../api/groupuser";

//end api
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import SuccessModal from "../../Components/Common/SuccessModal";


import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import axios from "axios";
import { id } from "date-fns/locale";
import PaginateCustom from "../GroupUser/PaginateCustom";
import { fetchEmployeeBySearch } from "../../store/employee/employees";


const GroupUser = () => {
  const linkPath = useHistory();
  const linkToEmpList = () => {
    linkPath.push("/hrcenter-employee-profile/employee-list");
  }
  const empDispatch = useDispatch();
  const dataEmp = useSelector(state => state.employeeReducer);
  const [groupUser, setgroupUser] = useState([]);
  const [customerStatus, setcustomerStatus] = useState(null);
  const [customerModalStatus, setcustomerModalStatus] = useState(null);
  const [reset, setReset] = useState(false);
  const [itemSz, setItemSz] = useState(5);
  const [pageNumb, setPageNumb] = useState(1);
  const [currentPage, setCurPage] = useState(3)
  const [totalPg, setTotalPg] = useState(null);
  const [dataSelect, setDataSelect] = useState([]);
  const [txtGroupSearch, setTxtGroupSearch] = useState('');


  const groupUserListWithPage = async () => {
    try {
      const response = await api.getGroupUserWithPage((pageNumb - 1), itemSz);
      console.log(response);
      setgroupUser(response);
    } catch (error) {
      console.log(error)
    }
  };

  // Customber Column
  const columns = [
    {
      Header: "#",

    },
    {
      Header: 'Group',
    },
    {
      Header: "Description",
    },

    {
      Header: "Members",
    },

    {
      Header: "Action",
    },
  ];

  const handleBtnEnterSearch = async (txt) => {


    // empDispatch(fetchEmployeeBySearch({ page: 0, size: itemSz, keyTxtSearch: '', keyPosition: '', keyDepartment: '', keyGroup: txtGroupSearch.id }))


  };

  const handleCustomerClick = (data) => {
    // const dataEmpl = JSON.parse(data.membersId);
    // console.log(dataEmpl[0].name)
    // setTxtGroupSearch(data.membersId)
    // empDispatch(fetchEmployeeBySearch({ page: 0, size: itemSz, keyTxtSearch: '', keyPosition: '', keyDepartment: '', keyGroup: data.membersId }))
    // setCustomer({
    //   id: customer.id,
    //   name: customer.name,

    //   description: customer.description,

    //   status: customer.status

    // });


    // setIsEdit(true);
    // toggle();
  };

  useEffect(() => {
    groupUserListWithPage();
  }, [totalPg, itemSz, pageNumb])

  useEffect(() => {
    if (groupUser) {
      setTotalPg(groupUser.totalPages)
    }
  }, [groupUser])

  useEffect(() => {
    if (dataEmp) {
      console.log(dataEmp)
    }
  }, [dataEmp])


  document.title = "Management Group | Company name";

  return (
    <React.Fragment>
      <div className="page-content">


        <Container fluid>
          <BreadCrumb title="Group" pageTitle="Utilities" />

          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-bottom-dashed">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Group User</h5>
                      </div>
                    </div>

                    <div className="col-sm-auto">
                      <div className="ms-2 mr-3">
                        <button className="btn btn-soft-danger me-1"><i className="ri-delete-bin-2-line"></i></button>
                        <div className="vr">&nbsp;</div>
                        &nbsp;
                        <button
                          type=""
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={linkToEmpList}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add new Group
                        </button>

                      </div>
                    </div>

                  </Row>
                </CardHeader>

                <div className="card-body">

                  <div className="table-responsive table-card mt-3 mb-1" style={{ minHeight: '150px' }}>
                    <table className="table-hover table align-middle table-nowrap position-relative" id="customerTable">
                      <thead className="table-light">
                        <tr>
                          {columns.map(head => <th style={{ width: head.width }}
                            key={head.Header}>{head.Header}</th>)}
                        </tr>
                      </thead>

                      {groupUser.content && groupUser.content.length > 0 ? groupUser.content.map(data => (

                        <tbody key={data.id} className="list form-check-all">

                          <tr key={data.id} >
                            <th scope="row">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="checkAll"
                                  value={{ name: data.name, id: data.id }}

                                />
                              </div>
                            </th>

                            <td className="customer_name"
                              onClick={() => {

                              }}>
                              {data.name}
                            </td>

                            <td className="customer_name"
                              onClick={() => {

                              }}>
                              {data.description}
                            </td>

                            <td className="date"
                              onClick={() => {

                              }}>
                              {/* {data.membersId} */}
                            </td>

                            <td className="status"
                              onClick={() => {

                              }}>

                              <ul className="list-inline hstack gap-2 mb-0">
                                <li className="list-inline-item edit" title="Edit">
                                  <Link
                                    to="#"
                                    className="text-primary d-inline-block edit-item-btn"
                                    onClick={() => handleCustomerClick(data)}
                                  >

                                    <i className="ri-pencil-fill fs-16"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item" title="Remove">
                                  <Link
                                    to="#"
                                    className="text-danger d-inline-block remove-item-btn"

                                  >
                                    <i className="ri-delete-bin-5-fill fs-16"></i>
                                  </Link>
                                </li>
                              </ul>

                            </td>

                          </tr>

                        </tbody>
                      ))
                        :

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
                    {
                      groupUser.content && groupUser.content.length > 0 ?
                        <PaginateCustom
                          totalPg={totalPg} itemSz={itemSz}
                          setItemSz={setItemSz} pageNumb={pageNumb}
                          setPageNumb={setPageNumb} currentPage={currentPage}
                          setCurPage={setCurPage}
                        />
                        :
                        ''
                    }
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default GroupUser;
