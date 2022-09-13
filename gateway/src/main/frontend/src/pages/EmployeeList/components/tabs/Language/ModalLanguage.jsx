import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from 'moment';
import employeeApi from "../../../../../api/employee/employeeApi";
import ModalCommon from "../../../../OrganizationalChart/components/modal/ModalCommon";
import { useParams } from "react-router-dom";
import { Alert } from "../../../../../Components/Common/Alert";

function ModalLanguage({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
 

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createLanguage = async (formData) => {
    console.log(formData)
    await employeeApi.createLanguage(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateLanguage = async (formData) => {
    await employeeApi.updateLanguage(formData).then(response => {
      openModal.current.setOpen(false);
      Alert(`Updated complete`);
      action();
    }).catch(e => {
      Alert(e, "bg-danger");
    })
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: typeModal.data ? typeModal.data.name : "",
      useListen: typeModal.data ? typeModal.data.useListen : "",
      useRead: typeModal.data ? typeModal.data.useRead : "",
      understand: typeModal.data ? typeModal.data.understand : "",
      useWrite: typeModal.data ? typeModal.data.useWrite : "",
      note: typeModal.data ? typeModal.data.note : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      useListen: Yup.string().required(),
      useRead: Yup.string().required(),
      understand: Yup.string().required(),
      useWrite: Yup.string().required(),
      note: Yup.string().required(),
    }),
    onSubmit: (value) => {
      console.log(value)
      if (typeModal.type === "create Language employee") {
        createLanguage({ ...value, employeeId: id });
      } else {
        updateLanguage({ ...value, id: typeModal.data.id });
      }
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="Name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="Name"
              name="Name"
              placeholder="Enter name"
              type="text"
              value={validation.values.name}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, name: e.target.value }))}
              invalid={
                validation.touched.name &&  validation.errors.name
                  ? true
                  : false
              }
            
            >
            </Input>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="Listen" sm={2}>
          Listen
          </Label>
          <Col sm={10}>
            <Input
              id="Listen"
              name="Listen"
              placeholder="Enter Listen"
              type="text"
              value={validation.values.useListen}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, useListen: e.target.value }))}
              invalid={
                validation.touched.useListen && validation.errors.useListen
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Read" sm={2}>
          Read
          </Label>
          <Col sm={10}>
            <Input
              id="Read"
              name="Read"
              placeholder="Enter Read"
              type="text"
              value={validation.values.useRead}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, useRead: e.target.value }))}
              invalid={
                validation.touched.useRead && validation.errors.useRead
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Write" sm={2}>
          Write
          </Label>
          <Col sm={10}>
            <Input
              id="Write"
              name="Write"
              placeholder="Enter Write"
              type="text"
              value={validation.values.useWrite}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, useWrite: e.target.value }))}
              invalid={
                validation.touched.useWrite && validation.errors.useWrite
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="Understand" sm={2}>
          Understand
          </Label>
          <Col sm={10}>
            <Input
              id="understand"
              name="Understand"
              placeholder="Enter Understand"
              type="text"
              value={validation.values.understand}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, understand: e.target.value }))}
              invalid={
                validation.touched.understand && validation.errors.understand
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Note" sm={2}>
            Note
          </Label>
          <Col sm={10}>
            <Input
              id="Note"
              name="Note"
              placeholder="Enter Note"
              type="text"
              value={validation.values.note}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, note: e.target.value }))}
              invalid={
                validation.touched.note && validation.errors.note
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
       
      </div>
    );
  };

  return (
    <div>
      <ModalCommon
        title={typeModal.type}
        ref={openModal}
        validation={validation.handleSubmit}
        resetForm={validation.resetForm}
      >
        {CreateBody()}
      </ModalCommon>
    </div>
  );
}

export default forwardRef(ModalLanguage);
