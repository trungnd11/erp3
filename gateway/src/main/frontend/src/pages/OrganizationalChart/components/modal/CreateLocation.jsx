/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import ModalCommon from "./ModalCommon";
import "../../style/createLocation.scss";
import apiLocation from "../../../../api/location";
import { Alert } from "../../alert";

function CreateLocation(prop, ref) {
  const openModal = useRef();

  const handleSaveLocation = async (newLocation, resetForm) => {
    await apiLocation
      .createLocation(newLocation)
      .then((data) => {
        openModal.current.setOpen(false);
        resetForm();
        Alert(`Created ${data.location}`, "bg-success", "text-white");
      })
      .catch((err) => {
        Alert(err, "bg-danger", "text-white");
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
      location: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required(),
      location: Yup.string().required(),
    }),
    onSubmit: (value, { resetForm }) => {
      handleSaveLocation(value, () => resetForm());
    },
  });

  useImperativeHandle(ref, () => openModal, [openModal]);

  const CreateBody = () => {
    return (
      <>
        <FormGroup row>
          <Label for="code-part" sm={2}>
            Code
          </Label>
          <Col sm={10}>
            <Input
              id="code-part"
              name="code"
              placeholder="Enter part code"
              type="text"
              value={validation.values.code}
              onChange={validation.handleChange}
              invalid={
                validation.touched.code && validation.errors.code
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="code-part" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name-part"
              name="location"
              placeholder="Enter part name"
              type="text"
              value={validation.values.location}
              onChange={validation.handleChange}
              invalid={
                validation.touched.location && validation.errors.location
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
      </>
    );
  };

  return (
    <div>
      <ModalCommon
        ref={openModal}
        title="create location"
        size="md"
        styles="location-style"
        validation={validation.handleSubmit}
      >
        {CreateBody()}
      </ModalCommon>
    </div>
  );
}

export default forwardRef(CreateLocation);
