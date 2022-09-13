/* eslint-disable no-debugger */
import React, { useImperativeHandle, useRef, useState } from 'react';
import { forwardRef } from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import AsyncSelect from "react-select/async";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import ModalCommon from './ModalCommon';
import apiEmployee from "../../../../api/employee/employeeApi";
import { Alert } from '../../alert';
import { useFormik } from 'formik';
import * as Yup from "yup";

const AsyncSelectStyle = styled(AsyncSelect)`
  .css-1s2u09g-control {
    border-color: ${(prop) => prop.isValid && "red !important"};
  }
`;

function ModalAddTeamPart(prop, ref) {
  const openModal = useRef();
  const [searchEmployee, setSearchEmployee] = useState("");
  const { id } = useParams();

  const findManagerOption = async () => {
    const response = await apiEmployee.findEmployeeByKey(searchEmployee);
    return response.map((item) => ({
      ...item,
      label: `${item.employeeNumb} - ${item.fullName}`,
      value: item.id,
    }));
  };

  const handleInputManagerChange = (e) => {
    setSearchEmployee(e);
  };

  const handleChangeEmployees = (e) => {
    validation.setValues(pre => ({ ...pre, listEmployee: e }));
  }

  const updateDepartmentForEmployee = async (employees, action) => {
    try {
      const responese = await apiEmployee.updateEmployeeForDepartment(employees, id);
      action();
      Alert(`Update complete ${responese.length} employee `, "bg-success", "text-white");
      prop.resetTable();
    } catch (error) {
      Alert(error, "bg-danger", "text-white");
    }
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      listEmployee: ''
    },
    validationSchema: Yup.object({
      listEmployee: Yup.array().min(1).required(),
    }),
    onSubmit: (value, { resetForm }) => {
      updateDepartmentForEmployee(value.listEmployee, () =>
        openModal.current.closeModal(() => resetForm()))
    }
  });

  useImperativeHandle(ref, () => openModal, [openModal]);

  const CreateBody = () => {
    return (
      <div>
        <FormGroup row>
          <Label for="fullname" sm={2}>
            Employees
          </Label>
          <Col sm={10}>
            <AsyncSelectStyle
              isMulti
              name="listEmployee"
              placeholder="Enter Name or Id..."
              cacheOptions
              loadOptions={findManagerOption}
              defaultOptions
              onInputChange={handleInputManagerChange}
              onChange={handleChangeEmployees}
              isValid={
                validation.touched.listEmployee &&
                validation.errors.listEmployee
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
        title={`Add member to Part`}
        ref={openModal}
        validation={validation.handleSubmit}
        resetForm={validation.resetForm}
      >
      {CreateBody()}
      </ModalCommon>
    </div>
  )
}

export default forwardRef(ModalAddTeamPart);
