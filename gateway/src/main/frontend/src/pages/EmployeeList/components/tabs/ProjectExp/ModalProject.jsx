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

function ModalProject({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
 

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createProject = async (formData) => {
    console.log(formData)
    await employeeApi.createProject(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateProject = async (formData) => {
    await employeeApi.updateProject(formData).then(response => {
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
      description: typeModal.data ? typeModal.data.description : "",
      startYear: typeModal.data ? typeModal.data.startYear : "",
      projectTime: typeModal.data ? typeModal.data.projectTime : "",
      numberPeople: typeModal.data ? typeModal.data.numberPeople : "",
      position: typeModal.data ? typeModal.data.position : "",
      jobDescription: typeModal.data ? typeModal.data.jobDescription : "",
      technologyUsed: typeModal.data ? typeModal.data.technologyUsed : "",
      implementationCompany: typeModal.data ? typeModal.data.customer : "",
      customer: typeModal.data ? typeModal.data.numberPeople : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      startYear: Yup.string().required(),
      projectTime: Yup.string().required(),
      numberPeople: Yup.string().required(),
      position: Yup.string().required(),
      jobDescription: Yup.string().required(),
      technologyUsed: Yup.string().required(),
      implementationCompany: Yup.string().required(),
      customer: Yup.string().required(),
    }),
    onSubmit: (value) => {
      console.log(value)
      if (typeModal.type === "create Project employee") {
        createProject({ ...value, employeeId: id });
      } else {
        updateProject({ ...value, id: typeModal.data.id });
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
          <Label for="description" sm={2}>
          Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              placeholder="Enter description"
              type="text"
              value={validation.values.description}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, description: e.target.value }))}
              invalid={
                validation.touched.description && validation.errors.description
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startYear" sm={2}>
          Start Year
          </Label>
          <Col sm={10}>
            <Input
              id="startYear"
              name="startYear"
              placeholder="Enter start year"
              type="text"
              value={validation.values.startYear}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, startYear: e.target.value }))}
              invalid={
                validation.touched.startYear && validation.errors.startYear
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="projectTime" sm={2}>
          Project Time
          </Label>
          <Col sm={10}>
            <Input
              id="projectTime"
              name="projectTime"
              placeholder="Enter projectTime"
              type="text"
              value={validation.values.projectTime}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, projectTime: e.target.value }))}
              invalid={
                validation.touched.projectTime && validation.errors.projectTime
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="numberPeople" sm={2}>
          Number People
          </Label>
          <Col sm={10}>
            <Input
              id="numberPeople"
              name="numberPeople"
              placeholder="Enter numberPeople"
              type="text"
              value={validation.values.numberPeople}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, numberPeople: e.target.value }))}
              invalid={
                validation.touched.numberPeople && validation.errors.numberPeople
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="position" sm={2}>
          Position
          </Label>
          <Col sm={10}>
            <Input
              id="position"
              name="position"
              placeholder="Enter position"
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
          <Label for="jobDescription" sm={2}>
          Job Description
          </Label>
          <Col sm={10}>
            <Input
              id="jobDescription"
              name="jobDescription"
              placeholder="Enter job description"
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
        <FormGroup row>
          <Label for="technologyUsed" sm={2}>
          Technology Used
          </Label>
          <Col sm={10}>
            <Input
              id="technologyUsed"
              name="technologyUsed"
              placeholder="Enter technology used"
              type="text"
              value={validation.values.technologyUsed}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, technologyUsed: e.target.value }))}
              invalid={
                validation.touched.technologyUsed && validation.errors.technologyUsed
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="implementationCompany" sm={2}>
          Implementation Company
          </Label>
          <Col sm={10}>
            <Input
              id="implementationCompany"
              name="implementationCompany"
              placeholder="Enter implementation company"
              type="text"
              value={validation.values.implementationCompany}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, implementationCompany: e.target.value }))}
              invalid={
                validation.touched.implementationCompany && validation.errors.implementationCompany
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="customer" sm={2}>
          Customer
          </Label>
          <Col sm={10}>
            <Input
              id="customer"
              name="customer"
              placeholder="Enter customer"
              type="text"
              value={validation.values.customer}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, customer: e.target.value }))}
              invalid={
                validation.touched.customer && validation.errors.customer
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

export default forwardRef(ModalProject);
