import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Label, Row, Input } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { showErrorNotice } from "../../../utils/toastify";

function SelectNewTask(props) {
  const valueSelect = props.valueSelect;
  const openModalNewTask = props.openModalNewTask
  const dataSubmit = props.dataSubmit
  const [valueOption, setValueOption] = useState([]);
  //   console.log(valueSelect);

  useEffect(() => {
    const tmpArr = [];
    valueSelect.forEach((element) => {
      const tmp = {
        value: element.name,
        label: element.name,
      };
      tmpArr.push(tmp);
    });
    setValueOption(tmpArr);
  }, [valueSelect]);

  const [selectStatus, setSelectStatus] = useState(null);
  function handleSelectStatus(event) {
    console.log(event)
    setSelectStatus(event);
  }

  const [newStatus, setNewStatus] = useState("");
  const changeValueNewTask = (e) => {
    setNewStatus(e.target.value);
  };

  const onAddNewTask = () => {
    if(selectStatus !== null) {
      if(newStatus !== null && newStatus !== '') {
        dataSubmit(selectStatus,newStatus)
      }
      else {
        showErrorNotice("Name task must not Empty !")
      }
    }
    else {
      showErrorNotice("Please select status for create task !")
    }
  }

  return (
    <>
      <div className="mb-3">
        <Label className="form-label">Please select status create task</Label>
        <Select
          isClearable={true}
          value={selectStatus}
          onChange={(e) => {
            handleSelectStatus(e);
          }}
          options={valueOption}
        />
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <Label htmlFor="iconInput" className="form-label">
          Please fill new task name here :
        </Label>
        <div className="form-icon" style={{ height: "38px" }}>
          <Input
            type="email"
            value={newStatus}
            className="form-control form-control-icon"
            id="iconInput"
            placeholder="Name Task"
            onChange={(e) => {
              changeValueNewTask(e);
            }}
            style={{ height: "100%" }}
          />
          <i className="ri-history-line"></i>
        </div>
      </div>
      <div className="hstack gap-2 justify-content-center">
        <Link
          to="#"
          className="btn btn-link link-success fw-medium shadow-none"
          onClick={() => {
            openModalNewTask();
          }}
        >
          <i className="ri-close-line me-1 align-middle"></i> Close
        </Link>
        <Link to="#" onClick={onAddNewTask}  className="btn btn-success">
          Completed
        </Link>
      </div>
    </>
  );
}
export default SelectNewTask;
