import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react'
import { FormFeedback, Input, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Form from '../../../Components/FormBuilder/form';
import Modal from '../../../Components/Modal';

import axios from "axios";

//api 
import api from "../../api/groupuser";

import * as Yup from "yup";

export default function ModalAddNewGroup() {

    const [customer, setCustomer] = useState([]);
    const [reset,setReset] = useState(false);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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
     
     resetForm();
     validation.resetForm(); 
     toggle();
    },
  });

  const handleSubmit = async (values) =>{
    const response = await api.createGroupuser(values);
    setReset(true);
    console.log(response) ;

  }

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const customermocalstatus = [
    {
      options: [
        { label: "title", value: "title" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  return (
    <div>
        
        <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      {!!isEdit ? "Edit GroupUser" : "Add GroupUser"}
                    </ModalHeader>
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      
                      
                      return false;
                    }}>
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
  )
}
