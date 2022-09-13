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
  FormFeedback
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import MetaTags from 'react-meta-tags';
import { isEmpty } from "lodash";
//api 
import api from "../../../api/groupuser";

//end api
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import SuccessModal from "../../../Components/Common/SuccessModal";


import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import axios from "axios";
import { id } from "date-fns/locale";


const GroupUser4Dat = () => {
  const [groupUser, setgroupUser] = useState([]);
  const [customerStatus, setcustomerStatus] = useState(null);
  const [customerModalStatus, setcustomerModalStatus] = useState(null);
  const [reset,setReset] = useState(false);
  const groupUserList = async () => {
    try {
      const response = await api.getGroupUser();
      console.log(response);
      setgroupUser(response);
    } catch (error) {
      console.log('fail to')
    }
  };
  const deletegroupuser = async () => {
    try {
      const response = await api.deleteGroupuser(customer.id);
      
      console.log(response)
    } catch (error) {
      console.log('delete error...')
      
    }
    
  };
  const updateCustomer = async () => {
    try {
      const response = await api.updateGroupuser();
      setReset(true);
      console.log(response)
    } catch (error) {
      console.log('update erorr')
      
    }
  }
 
  useEffect(() => {
   
    groupUserList();

  },[reset])

 

  function handlecustomerStatus(customerStatus) {
    setcustomerStatus(customerStatus);
  }

  function handlemodalcustomerStatus(customerModalStatus) {
    setcustomerModalStatus(customerModalStatus);
  }

  const dispatch = useDispatch();

  const { customers } = useSelector((state) => ({
    customers: state.Ecommerce.customers,
  }));

  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const customerstatus = [
    {
      options: [
        { label: "title", value: "title" },
        { label: "All", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  const customermocalstatus = [
    {
      options: [
        { label: "title", value: "title" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  // Delete Data
  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
    
  };

  const handleSubmit = async (values) =>{
    const response = await api.createGroupuser(values);
    setReset(true);
    console.log(response) ;

  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (customer && customer.name) || '',

      description: (customer && customer.description) || '',
     
      status: (customer && customer.status) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Customer Name"),
    
      description: Yup.string().required("Please Enter Your description"),

      status: Yup.string().required("Please Enter Your Status")
    }),
    onSubmit: (values,{ resetForm }) => {
     console.log({ values })
     handleSubmit(values);
     handleDeleteCustomer(values);
     resetForm();
     validation.resetForm(); 
     toggle();
    },
  });

  // Delete Data
  const handleDeleteCustomer = () => {
    deletegroupuser(customer.id)
    // if (customer.id) {
    //   deletegroupuser(customer.id)
    // }
    setReset(true);
    toggle();
  };
 

  // Update Data
  const handleCustomerClick = useCallback((arg) => {
    const customer = arg;
    
    setCustomer({
      id: customer.id,
      name: customer.name,
    
      description: customer.description,
    
      status: customer.status
      
    });
    

    setIsEdit(true);
    toggle();
  }, [toggle]);
  

  // Get Data
  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  
  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);


  useEffect(() => {
    setCustomer(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomer(customers);
      setIsEdit(false);
    }
  }, [customers]);

  // Add Data
  const handleCustomerClicks = () => {
    setCustomer("");
    setIsEdit(false);
    toggle();
  };
   

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: '',
        accessor: 'id',
        hiddenColumns: true,
        Cell: (cell) => {
          return <input type="hidden" value={cell.value} />;
        }
      },
      {
        Header: "Customer",
        accessor: "name",
        filterable: false,
      },
    
      {
        Header: "describe",
        accessor: "description",
        filterable: false,
      },
     
     
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit" title="Edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => { const customerData = cellProps.row.original; handleCustomerClick(customerData); }}
                >

                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Remove">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => { const customerData = cellProps.row.original; onClickDelete(customerData); }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleCustomerClick]
  );

  document.title = "Customers | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCustomer}
          onCloseClick={() => setDeleteModal(false)}
          
        />
       
        <Container fluid>
          <BreadCrumb title="Customers" pageTitle="Ecommerce" />

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
                      <div>
                        <button className="btn btn-soft-danger me-1"
                        
                        ><i className="ri-delete-bin-2-line"></i></button>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => { setIsEdit(false); toggle(); }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add new
                          Group 
                        </button>{" "}
                        <button type="button" className="btn btn-info">
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Import
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="border-bottom-dashed border-bottom">
                  <form 
                   onSubmit={(e) => {
                     e.preventDefault();
                     validation.handleSubmit();
                    
                     return false;
                   }}
                  >
                    <Row className="g-3">
                      <Col xl={6}>
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search /"
                            placeholder="Search for name, describe,..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>

                  
                    </Row>
                  </form>
                </CardBody>
                <div className="card-body">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={groupUser}
                      isGlobalFilter={false}
                      isAddUserList={false}
                      customPageSize={10}
                      className="custom-header-css"
                      handleCustomerClick={handleCustomerClicks}
                    />
                  </div>

                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      {!!isEdit ? "Edit GroupUser" : "Add GroupUser"}
                    </ModalHeader>
                    <Form 
                        onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                      
                      
                      return false;
                    }}
                    >
                      <ModalBody>
                        <input type="hidden" id="id-field" />

                        <div
                          className="mb-3"
                          id="modal-id"
                          style={{ display: "none" }}
                        >
                          <Label htmlFor="id-field1" className="form-label">
                            ID
                          </Label>
                          <Input
                            type="text"
                            id="id-field1"
                            className="form-control"
                            placeholder="ID"
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            GroupUser
                          </Label>
                          <Input
                            name="name"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Name"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={
                              validation.touched.name && validation.errors.name ? true : false
                            }
                          />
                          {validation.touched.name && validation.errors.name ? (
                            <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                          ) : null}
                        </div>

            

                        <div className="mb-3">
                          <Label htmlFor="describe-field" className="form-label">
                          Describe
                          </Label>
                          <textarea rows="2" cols="62"
                            name="description"
                            type="text"
                            id="describe-field"
                            placeholder="Enter describe no."
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.description || ""}
                            invalid={
                              validation.touched.description && validation.errors.description ? true : false
                            }
                          />
                          {validation.touched.description && validation.errors.description ? (
                            <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                          ) : null}

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
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              validation.values.status || ""
                            }
                          >
                            {customermocalstatus.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                              </React.Fragment>
                            ))}
                          </Input>
                          {validation.touched.status &&
                            validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false); }}> Close </button>

                          <button type="submit" className="btn btn-success"> {!!isEdit ? "Update" : "Add GroupUser"} </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GroupUser4Dat;
