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

function ModalSpecialize({ typeModal, action }, ref) {
  const openModal = useRef();
  const { id } = useParams();
 

  useImperativeHandle(ref, () => openModal, [openModal]);

  const formatData = (date) => {
    return moment(date[0]).format("YYYY-MM-DD");
  }

  const createSpecialize = async (formData) => {
    console.log(formData)
    await employeeApi.createSpecialize(formData)
        .then((response) => {
          openModal.current.setOpen(false);
          Alert(`Created complete`);
          action();
        })
        .catch((e) => {
          Alert(e, "bg-danger");
        });
  }

  const updateSpecialize = async (formData) => {
    await employeeApi.updateSpecialize(formData).then(response => {
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
      specialize: typeModal.data ? typeModal.data.specialize : "",
      usageTime: typeModal.data ? typeModal.data.usageTime : "",
      lastUsedTime: typeModal.data ? typeModal.data.lastUsedTime : "",
      note: typeModal.data ? typeModal.data.note : "",
      employeeId: typeModal.data && typeModal.data.id,
    },
    validationSchema: Yup.object({
      specialize: Yup.string().required(),
      usageTime: Yup.string().required(),
      lastUsedTime: Yup.string().required(),
      note: Yup.string().required(),
    }),
    onSubmit: (value) => {
      console.log(value)
      if (typeModal.type === "create Specialize employee") {
        createSpecialize({ ...value, employeeId: id });
      } else {
        updateSpecialize({ ...value, id: typeModal.data.id });
      }
    },
  });

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="specialize" sm={2}>
            Specialize
          </Label>
          <Col sm={10}>
            <Input
              id="specialize"
              specialize="specialize"
              placeholder="Enter specialize"
              type="text"
              value={validation.values.specialize}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, specialize: e.target.value }))}
              invalid={
                validation.touched.specialize &&  validation.errors.specialize
                  ? true
                  : false
              }
            
            >
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="usageTime" sm={2}>
          Usage Time
          </Label>
          <Col sm={10}>
            <Flatpickr
              className="form-control"
              placeholder="Choose usage time"
              value={validation.values.usageTime}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, usageTime: formatData(e) }))}
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="lastUsedTime" sm={2}>
          Last Used Time
          </Label>
          <Col sm={10}>
            <Flatpickr
              className="form-control"
              placeholder="Choose last used time"
              value={validation.values.lastUsedTime}
              onChange={(e) => validation.setValues((pre) => ({ ...pre, lastUsedTime: formatData(e) }))}
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

export default forwardRef(ModalSpecialize);
