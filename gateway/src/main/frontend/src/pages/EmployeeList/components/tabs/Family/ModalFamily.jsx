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

function ModalFamily({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createMembersFamily = async (formData) => {
    await employeeApi.createEmployeeFamily(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created ${response.fullName} complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateMembersFamily = async (formData) => {
    await employeeApi.updateEmlpoyeeFamilyMember(formData).then(response => {
      openModal.current.setOpen(false);
      Alert(`Updated ${response.fullName} complete`);
      action();
    }).catch(e => {
      Alert(e, "bg-danger");
    })
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: typeModal.data ? typeModal.data.fullName : "",
      relationship: typeModal.data ? typeModal.data.relationship : "",
      phone: typeModal.data ? typeModal.data.phone : "",
      address: typeModal.data ? typeModal.data.address : "",
      job: typeModal.data ? typeModal.data.job : "",
      birthday: typeModal.data ? typeModal.data.birthday : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required(),
      relationship: Yup.string().required(),
    }),
    onSubmit: (value) => {
      if (typeModal.type === "create member family") {
        createMembersFamily({ ...value, employeeId: id });
      } else {
        updateMembersFamily({ ...value, id: typeModal.data.id });
      }
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="fullname" sm={2}>
            Full Name
          </Label>
          <Col sm={10}>
            <Input
              id="fullname"
              name="fullname"
              placeholder="Enter full name"
              type="text"
              value={validation.values.fullName}
              onChange={(e) => validation.setValues(pre => ({ ...pre, fullName: e.target.value }))}
              invalid={
                validation.touched.fullName && validation.errors.fullName
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="relationship" sm={2}>
            Relationship
          </Label>
          <Col sm={10}>
            <Input
              id="relationship"
              name="relationship"
              placeholder="Enter relationship"
              type="select"
              value={validation.values.relationship}
              onChange={validation.handleChange}
              invalid={
                validation.touched.relationship &&
                validation.errors.relationship
                  ? true
                  : false
              }
            >
              <option value="">Choose Relationship</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="daughter">Daughter</option>
              <option value="son">Son</option>
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="address" sm={2}>
            Address
          </Label>
          <Col sm={10}>
            <Input
              id="address"
              name="address"
              placeholder="Enter Address"
              type="text"
              value={validation.values.address}
              onChange={validation.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phone-numbers" sm={2}>
            Phone No.
          </Label>
          <Col sm={10}>
            <Input
              id="phone-numbers"
              name="phone-numbers"
              placeholder="Enter phone numbers"
              type="number"
              value={validation.values.phone}
              onChange={(e) => validation.setValues(pre => ({ ...pre, phone: e.target.value }))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="job" sm={2}>
            Job
          </Label>
          <Col sm={10}>
            <Input
              id="job"
              name="job"
              placeholder="Enter Job"
              type="text"
              value={validation.values.job}
              onChange={validation.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="birthday" sm={2}>
            Birthday
          </Label>
          <Col sm={10}>
            <Flatpickr
              className="form-control"
              placeholder="Choose date"
              value={validation.values.birthday}
              onChange={e => validation.setValues(pre => ({ ...pre, birthday: formatData(e) }))}
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

export default forwardRef(ModalFamily);
