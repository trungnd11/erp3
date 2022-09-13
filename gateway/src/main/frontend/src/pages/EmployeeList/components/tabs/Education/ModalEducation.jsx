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

function ModalEducation({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();

  useImperativeHandle(ref, () => openModal, [openModal]);

  const createEducation = async (formData) => {
    await employeeApi.createEducation(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateEducation = async (formData) => {
    await employeeApi.updateEducation(formData).then(response => {
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
      degree: typeModal.data ? typeModal.data.degree : "",
      course: typeModal.data ? typeModal.data.course : "",
      schoolName: typeModal.data ? typeModal.data.schoolName : "",
      faculty: typeModal.data ? typeModal.data.faculty : "",
      specialized: typeModal.data ? typeModal.data.specialized : "",
      classification: typeModal.data ? typeModal.data.classification : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      degree: Yup.string().required(),
      course: Yup.string().required(),
      schoolName: Yup.string().required(),
      faculty: Yup.string().required(),
      specialized: Yup.string().required(),
      classification: Yup.string().required(),
    }),
    onSubmit: (value) => {
      if (typeModal.type === "create education employee") {
        createEducation({ ...value, employeeId: id });
      } else {
        updateEducation({ ...value, id: typeModal.data.id });
      }
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="degree" sm={2}>
            Degree
          </Label>
          <Col sm={10}>
            <Input
              id="degree"
              name="degree"
              placeholder="Enter degree"
              type="select"
              value={validation.values.degree}
              onChange={validation.handleChange}
              invalid={
                validation.touched.degree &&
                validation.errors.degree
                  ? true
                  : false
              }
            >
              <option value="">Choose Degree</option>
              <option value="High school diploma">High school diploma</option>
              <option value="Intermediate degree">Intermediate degree</option>
              <option value="The degree of associate">The degree of associate</option>
              <option value="College degree">College degree</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="course" sm={2}>
            Course
          </Label>
          <Col sm={10}>
            <Input
              id="course"
              name="course"
              placeholder="Enter Course"
              type="text"
              value={validation.values.course}
              onChange={(e) => validation.setValues(pre => ({ ...pre, course: e.target.value }))}
              invalid={
                validation.touched.course && validation.errors.course
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="schoolName" sm={2}>
            School Name
          </Label>
          <Col sm={10}>
            <Input
              id="schoolName"
              name="schoolName"
              placeholder="Enter school name"
              type="text"
              value={validation.values.schoolName}
              onChange={validation.handleChange}
              invalid={
                validation.touched.schoolName && validation.errors.schoolName
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="faculty" sm={2}>
            Faculty
          </Label>
          <Col sm={10}>
            <Input
              id="faculty"
              name="faculty"
              placeholder="Enter faculty"
              type="text"
              value={validation.values.faculty}
              onChange={validation.handleChange}
              invalid={
                validation.touched.faculty && validation.errors.faculty
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="specialized" sm={2}>
            Specialized
          </Label>
          <Col sm={10}>
            <Input
              id="specialized"
              name="specialized"
              placeholder="Enter specialized"
              type="text"
              value={validation.values.specialized}
              onChange={(e) => validation.setValues(pre => ({ ...pre, specialized: e.target.value }))}
              invalid={
                validation.touched.specialized && validation.errors.specialized
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="classification" sm={2}>
            Classification
          </Label>
          <Col sm={10}>
            <Input
              id="classification"
              name="classification"
              placeholder="Enter classification"
              type="text"
              value={validation.values.classification}
              onChange={validation.handleChange}
              invalid={
                validation.touched.classification && validation.errors.classification
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

export default forwardRef(ModalEducation);
