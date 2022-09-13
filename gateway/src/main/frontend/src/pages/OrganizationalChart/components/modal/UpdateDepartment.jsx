/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import AsyncSelect, { loadOptions } from "react-select/async";
import styled from "styled-components";
import ModalCommon from "./ModalCommon";
import apiEmployee from "../../../../api/employee/employeeApi";
import apiDepartment from "../../../../api/department";
import apiLocation from "../../../../api/location";
import "../../style/updateDepartment.scss";
import { Alert } from "../../alert";
import {
  departments,
  showDetailPart,
} from "../../../../store/organizational/organizational";
import { useDispatch } from "react-redux";
import CreateLocation from "./CreateLocation";

const Textarea = styled.textarea`
  border-color: ${(prop) => prop.isvalid && "red"};
`;

const AsyncSelectStyle = styled(AsyncSelect)`
  .css-1s2u09g-control {
    border-color: ${(prop) => prop.isValid && "red !important"};
  }
`;

function UpdateDepartment(prop, ref) {
  const { info } = prop;
  const openModal = useRef();
  const openLocation = useRef();
  const dispatch = useDispatch();
  const [searchManager, setSearchManager] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleUpdateDepartment = async (val, action) => {
    try {
      const responseNewPart = await apiDepartment.updateDepartment(val);
      action();
      Alert(`Updated ${responseNewPart.name}`, "bg-success", "text-white");
      dispatch(departments());
    } catch (error) {
      Alert(error, "bg-danger", "text-white");
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      parentCode: info && {
        ...info,
        value: info.parent.id,
        label: info.parent.name,
      },
      managerCode: info && {
        ...info,
        value: info.manager.id,
        label: info.manager.fullName,
      },
      code: info && info.code,
      name: info && info.name,
      locationsId:
        info &&
        info.locations.map((item) => ({
          ...item,
          value: item.id,
          label: item.location,
        })),
      budget: info && info.budget,
      descriptions: info && info.descriptions,
    },
    validationSchema: Yup.object({
      parentCode: Yup.object().required(),
      managerCode: Yup.object().required(),
      code: Yup.string().required(),
      name: Yup.string().required(),
    }),
    onSubmit: (value, { resetForm }) => {
      const resValue = {
        id: info.id,
        parentCode: value.parentCode.parent.id,
        managerCode: value.managerCode.manager.id,
        code: value.code,
        name: value.name,
        locationsId: value.locationsId.map((item) => item.id),
        budget: value.budget,
        descriptions: value.descriptions,
      };
      handleUpdateDepartment(resValue, () =>
        openModal.current.closeModal(() => resetForm())
      );
    },
  });

  const handleInputManagerChange = (e) => {
    setSearchManager(e);
  };

  const handleSelectParentChange = (e) => {
    validation.setValues((pre) => ({ ...pre, parentCode: e }));
  };

  const handleSelectManagerChange = (e) => {
    validation.setValues((pre) => ({ ...pre, managerCode: e }));
  };

  const handleSelectLocationChange = (e) => {
    validation.setValues((pre) => ({
      ...pre,
      locationsId: e.map((item) => ({
        ...item,
        value: item.id,
        label: item.location,
      })),
    }));
  };

  const handleInputPartChange = (val) => {
    setSearchDepartment(val);
  };

  const handleInputLocationChange = (val) => {
    setSearchLocation(val);
  };
  

  const findManagerOption = async () => {
    const response = await apiEmployee.findEmployeeByKey(searchManager);
    return response.map((item) => ({
      ...item,
      label: `${item.employeeNumb} - ${item.fullName}`,
      value: item.id,
    }));
  };

  const findDepartmentOption = async () => {
    const response = await apiDepartment.findDepartmentByName(searchDepartment);
    const { data } = response;
    return data.map((item) => ({
      ...item,
      label: `${item.code} - ${item.name}`,
      value: item.id,
    }));
  };

  const findLocationOption = async () => {
    const response = await apiLocation.getLocationsByName(searchLocation);
    return response.map((item) => ({
      ...item,
      label: `${item.code} - ${item.location}`,
      value: item.id,
    }));
  };

  const openCreateLocation = () => {
    openLocation.current.current.setOpen(true);
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal,
    }),
    [openModal]
  );

  const CreateBodyUpdate = () => {
    return (
      <div className="create-department">
        <FormGroup row>
          <Label className="required" for="parent-part" sm={2}>
            Dependent
          </Label>
          <Col sm={10}>
            <AsyncSelectStyle
              name="parentCode"
              onChange={handleSelectParentChange}
              placeholder="Enter Name or Id..."
              cacheOptions
              defaultOptions
              loadOptions={findDepartmentOption}
              onInputChange={handleInputPartChange}
              defaultValue={validation.values.parentCode}
              isValid={
                validation.touched.parentCode && validation.errors.parentCode
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="required" for="manager" sm={2}>
            Manager
          </Label>
          <Col sm={10}>
            <AsyncSelectStyle
              name="managerCode"
              onChange={handleSelectManagerChange}
              placeholder="Enter Name or Id..."
              cacheOptions
              defaultOptions
              loadOptions={findManagerOption}
              onInputChange={handleInputManagerChange}
              defaultValue={validation.values.managerCode}
              isValid={
                validation.touched.managerCode && validation.errors.managerCode
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="required" for="code-part" sm={2}>
            Part Code
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
                validation.touched.code && validation.errors.code ? true : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="required" for="name-part" sm={2}>
            Part Name
          </Label>
          <Col sm={10}>
            <Input
              id="name-part"
              name="name"
              placeholder="Enter part name"
              type="text"
              value={validation.values.name}
              onChange={validation.handleChange}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="budget" sm={2}>
            Budget
          </Label>
          <Col sm={10}>
            <Input
              id="budget"
              name="budget"
              placeholder="Choose budget"
              type="text"
              value={validation.values.budget && validation.values.budget.toLocaleString()}
              onChange={validation.handleChange}
              invalid={
                validation.touched.budget && validation.errors.budget
                  ? true
                  : false
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="location" sm={2}>
            Locations
          </Label>
          <Col sm={10}>
            <div className="choose-locations">
              <AsyncSelectStyle
                name="locationsId"
                onChange={handleSelectLocationChange}
                placeholder="Enter Location Name..."
                cacheOptions
                loadOptions={findLocationOption}
                defaultOptions
                defaultValue={validation.values.locationsId}
                onInputChange={handleInputLocationChange}
                onMenuOpen={findLocationOption}  
                isMulti
                isValid={
                  validation.touched.locationsId &&
                  validation.errors.locationsId
                    ? true
                    : false
                }
              />
              <i className="ri-add-circle-line" onClick={openCreateLocation} />
            </div>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="descriptions" sm={2}>
            Descriptions
          </Label>
          <Col sm={10}>
            <Textarea
              className={`form-control ${
                validation.touched.descriptions &&
                validation.errors.descriptions &&
                "is-invalid"
              }`}
              id="descriptions"
              name="descriptions"
              placeholder="Enter Description"
              type="text"
              value={validation.values.descriptions}
              onChange={validation.handleChange}
            />
          </Col>
        </FormGroup>
      </div>
    );
  };

  return (
    <div>
      <ModalCommon
        ref={openModal}
        title="update department"
        validation={validation.handleSubmit}
        resetForm={validation.resetForm}
      >
        {CreateBodyUpdate()}
      </ModalCommon>
      <CreateLocation ref={openLocation} />
    </div>
  );
}

export default forwardRef(UpdateDepartment);
