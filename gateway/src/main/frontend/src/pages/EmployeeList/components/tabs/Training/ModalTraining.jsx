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

function ModalTraining({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
 

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createTraining = async (formData) => {
    console.log(formData)
    await employeeApi.createTraining(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateTraining = async (formData) => {
    await employeeApi.updateTraining(formData).then(response => {
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
      yearCompleted: typeModal.data ? typeModal.data.yearCompleted : "",
      degreeUnit: typeModal.data ? typeModal.data.degreeUnit : "",
      note: typeModal.data ? typeModal.data.note : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      yearCompleted: Yup.string().required(),
      degreeUnit: Yup.string().required(),
      note: Yup.string().required(),
    }),
    onSubmit: (value) => {
      console.log(value)
      if (typeModal.type === "create training employee") {
        createTraining({ ...value, employeeId: id });
      } else {
        updateTraining({ ...value, id: typeModal.data.id });
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
          <Label for="date" sm={2}>
          Year Completed
          </Label>
          <Col sm={10}>
            <Flatpickr
              className="form-control"
              placeholder="Choose date"
              value={validation.values.yearCompleted}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, yearCompleted: formatData(e) }))}
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="DegreeUnit" sm={2}>
            Degree Unit
          </Label>
          <Col sm={10}>
            <Input
              id="DegreeUnit"
              name="DegreeUnit"
              placeholder="Enter Degree unit"
              type="text"
              value={validation.values.degreeUnit}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, degreeUnit: e.target.value }))}
              invalid={
                validation.touched.degreeUnit && validation.errors.degreeUnit
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

export default forwardRef(ModalTraining);
