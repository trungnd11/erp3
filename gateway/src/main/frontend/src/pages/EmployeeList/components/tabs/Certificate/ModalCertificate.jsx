import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import employeeApi from "../../../../../api/employee/employeeApi";
import ModalCommon from "../../../../OrganizationalChart/components/modal/ModalCommon";
import { Alert } from "../../../../../Components/Common/Alert";
import { useParams } from "react-router-dom";

function ModalCertificate({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
  useImperativeHandle(ref, () => openModal, [openModal]);

  const createCertificate = async (formValue) => {
    await employeeApi
      .createCertificate(formValue)
      .then(response => {
        openModal.current.setOpen(false);
          Alert(`Created ${response.name} complete`);
          action();
      })
      .catch((e) => {
        Alert(e, "bg-danger");
      });
  };

  const updateCertificate = async (formValue) => {
    await employeeApi.updateCertificate(formValue).then(response => {
      openModal.current.setOpen(false);
      Alert(`Updated ${response.name} complete`);
      action();
    }).catch(e => {
      Alert(e, "bg-danger");
    })
  };

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
      yearCompleted: Yup.number().required(),
    }),
    onSubmit: (value) => {
      typeModal.type === "create certificate"
        ? createCertificate({ ...value, employeeId: id })
        : updateCertificate({ ...value, id: typeModal.data.id });
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="certificateName" sm={3}>
            Name Certificate
          </Label>
          <Col sm={9}>
            <Input
              id="certificateName"
              name="certificateName"
              placeholder="Enter Name Certificate"
              type="text"
              value={validation.values.name}
              onChange={(e) =>
                validation.setValues((pre) => ({
                  ...pre,
                  name: e.target.value,
                }))
              }
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="yearComplated" sm={3}>
            Year Completed
          </Label>
          <Col sm={9}>
            <Input
              id="yearCompleted"
              name="yearCompleted"
              placeholder="Enter year completed"
              type="number"
              value={validation.values.yearCompleted}
              onChange={(e) =>
                validation.setValues((pre) => ({
                  ...pre,
                  yearCompleted: e.target.value,
                }))
              }
              invalid={
                validation.touched.yearCompleted &&
                validation.errors.yearCompleted
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="degreeUnit" sm={3}>
            Degree Unit
          </Label>
          <Col sm={9}>
            <Input
              id="degreeUnit"
              name="degreeUnit"
              placeholder="Enter degree unit"
              type="text"
              value={validation.values.degreeUnit}
              onChange={(e) =>
                validation.setValues((pre) => ({
                  ...pre,
                  degreeUnit: e.target.value,
                }))
              }
              invalid={
                validation.touched.degreeUnit && validation.errors.degreeUnit
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="note" sm={3}>
            Note
          </Label>
          <Col sm={9}>
            <Input
              id="note"
              name="note"
              placeholder="Enter note"
              type="textarea"
              value={validation.values.note}
              onChange={(e) =>
                validation.setValues((pre) => ({
                  ...pre,
                  note: e.target.value,
                }))
              }
              invalid={
                validation.touched.note && validation.errors.note ? true : false
              }
            />
          </Col>
        </FormGroup>
      </div>
    );
  };
  return (
    <div>
      {" "}
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

export default forwardRef(ModalCertificate);
