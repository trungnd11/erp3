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

function ModalWorkingProcess({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
 

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createWorkingProcess = async (formData) => {
    console.log(formData)
    await employeeApi.createWorking(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateWorkingProcess = async (formData) => {
    await employeeApi.updateWorking(formData).then(response => {
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
      company: typeModal.data ? typeModal.data.company : "",
      finishDate: typeModal.data ? typeModal.data.finishDate : "",
      position: typeModal.data ? typeModal.data.position : "",
      salary: typeModal.data ? typeModal.data.salary : "",
      jobDescription: typeModal.data ? typeModal.data.jobDescription : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      company: Yup.string().required(),
      finishDate: Yup.string().required(),
      position: Yup.string().required(),
      salary: Yup.number().required(),
      jobDescription: Yup.string().required(),
    }),
    onSubmit: (value) => {
      console.log(value)
      if (typeModal.type === "create working process employee") {
        createWorkingProcess({ ...value, employeeId: id });
      } else {
        updateWorkingProcess({ ...value, id: typeModal.data.id });
      }
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="Company" sm={2}>
            Company
          </Label>
          <Col sm={10}>
            <Input
              id="Company"
              name="Company"
              placeholder="Enter Company"
              type="text"
              value={validation.values.company}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, company: e.target.value }))}
              invalid={
                validation.touched.company &&  validation.errors.company
                  ? true
                  : false
              }
            
            >
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="date" sm={2}>
          Finish date
          </Label>
          <Col sm={10}>
            <Flatpickr
              className="form-control"
              placeholder="Choose date"
              value={validation.values.finishDate}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, finishDate: formatData(e) }))}
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="Position" sm={2}>
            Position
          </Label>
          <Col sm={10}>
            <Input
              id="Position"
              name="Position"
              placeholder="Enter Position"
              type="text"
              value={validation.values.position}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, position: e.target.value }))}
              invalid={
                validation.touched.position && validation.errors.position
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Salary" sm={2}>
            Salary
          </Label>
          <Col sm={10}>
            <Input
              id="Salary"
              name="Salary"
              placeholder="Enter Salary"
              type="text"
              value={validation.values.salary}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, salary: e.target.value }))}
              invalid={
                validation.touched.salary && validation.errors.salary
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="Description" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id="Description"
              name="Description"
              placeholder="Enter Description"
              type="text"
              value={validation.values.jobDescription}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, jobDescription: e.target.value }))}
              invalid={
                validation.touched.jobDescription && validation.errors.jobDescription
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

export default forwardRef(ModalWorkingProcess);
