import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  TabContent,
  TabPane,
  UncontrolledCollapse,
} from "reactstrap";
import InputText from "../WorkflowInfo/InputText";
import Select from "react-select";
import "./styles.css";
import { PRIORITY, UNIT_TIME } from "../../../../utils/CONSTANTS";
import Dropzone, { useDropzone } from "react-dropzone";
import CommonModal from "../../../../Components/Modal";
import { useRef } from "react";
import SettingFlow from "./SettingFlow";
import { generate_UUID } from "../../../../utils/generate-unique";

const activeOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Not Active" },
];

const workTypes = [
  { value: "1", label: "Urgent and Important" },
  { value: "2", label: "Urgent and Not Important" },
];

const memberChangeTimeExecute = [
  { value: "NOT_ALLOW", label: "Not Allow" },
  { value: "MANAGER", label: "Manager" },
  { value: "MANAGER_AND_EXECUTOR", label: "Manager and executor" },
];

const caculateType = [
  { value: "USER_SELF_UPDATED_RATE", label: "User self updated rate" },
  { value: "WORKLOAD_COMPLETED_RATE", label: "Workload completed rate" },
  { value: "CHECKLIST_COMPLETED_RATE", label: "Check list completed rate" },
];

const GroupOptions = [
  {
    label: "UK",
    options: [
      { label: "London", value: "London" },
      { label: "Manchester", value: "Manchester" },
      { label: "Liverpool", value: "Liverpool" },
    ],
  },
  {
    label: "FR",
    options: [
      { label: "Paris", value: "Paris" },
      { label: "Lyon", value: "Lyon" },
      { label: "Marseille", value: "Marseille" },
    ],
  },
  {
    label: "DE",
    options: [
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
      { label: "Berlin", value: "Berlin" },
    ],
  },
  {
    label: "US",
    options: [
      { label: "New York", value: "New York" },
      { label: "Washington", value: "Washington" },
      { label: "Michigan", value: "Michigan" },
    ],
  },
  {
    label: "SP",
    options: [
      { label: "Madrid", value: "Madrid" },
      { label: "Barcelona", value: "Barcelona" },
      { label: "Malaga", value: "Malaga" },
    ],
  },
  {
    label: "CA",
    options: [
      { label: "Montreal", value: "Montreal" },
      { label: "Toronto", value: "Toronto" },
      { label: "Vancouver", value: "Vancouver" },
    ],
  },
];

const stageHolder = {
  name: "",
  executors: [],
  managers: [],
  expectedDuration: null,
  timeUnit: "",
  changeExecutionTime: "",
  caculateWorkResult: "",
  priority: "",
  workType: "",
  taskReceivers: [],
  watchers: [],
  blockList: [],
  descriptions: "",
  attachments: [],
};

/*
  stage={
    step1: {

    },
    step2: {

    }
  }
*/

function Step() {
  const [tabValue, setTabValue] = useState("2");
  const [active, setActive] = useState();
  const [scope, setScope] = useState();
  const [unitTime, setUnitTime] = useState(UNIT_TIME[0]);
  const [workManager, setWorkManager] = useState();
  const [watchers, setWatchers] = useState();
  const [stage, setStage] = useState({});
  const [priority, setPrioroty] = useState(PRIORITY[2]);
  const [workType, setWorkType] = useState();
  const [changeTime, setChangeTime] = useState(memberChangeTimeExecute[0]);
  const [caculate, setCaculate] = useState();

  const handleChangeActive = (option) => {
    setActive(option);
  };

  const handleChangeUnitTime = (option) => {
    setUnitTime(option);
  };

  const handleChangeScope = (option) => {
    setScope(option);
  };

  const handlChangeWorkManager = (option) => {
    setWorkManager(option);
  };

  const handleChangeWatchers = (option) => {
    setWatchers(option);
  };

  const handleNextClick = (val) => {
    setTabValue(val);
  };

  const handleChangePriority = (option) => {
    setPrioroty(option);
  };

  const handleChangeWorkType = (option) => {
    setWorkType(option);
  };

  const handleChangeExecuteTime = (option) => {
    setChangeTime(option);
  };

  const handleChangeCaculateType = (option) => {
    setCaculate(option);
  };

  const handleAddStageClick = () => {
    // const newStage = {...stageHolder, step: stage.length+1, uid: generate_UUID()};
    // stage.push(newStage);
    // setStage([...stage]);
    const key = generate_UUID();
    stage[key] = { ...stageHolder };
    setStage({ ...stage });
  };

  const updateStage = (key, data) => {
    stage[key] = data;
    setStage({ ...stage });
  };

  return (
    <Card>
      <CardBody>
        <div className="ui steps">
          <div className="active step">
            <i className="bx bx-task icon"></i>
            <div className="content">
              <div className="title">Workflow infomation</div>
              <div className="description">Input the workflow information</div>
            </div>
          </div>
          <div className="step">
            <i className="ri-settings-3-line icon"></i>
            <div className="content">
              <div className="title">Setting</div>
              <div className="description">Setting period in workflow</div>
            </div>
          </div>
          <div className="disabled step">
            <i className="ri-save-3-line icon"></i>
            <div className="content">
              <div className="title">Preview and Save</div>
            </div>
          </div>
        </div>

        <TabContent activeTab={tabValue} className="text-muted">
          <TabPane tabId="1" id="pill-justified-home-1">
            <Card>
              <div className="accordion accordion-flush">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button bg-transparent shadow-none"
                      type="button"
                      id="flush-infomation"
                    >
                      <span className="text-uppercase fs-12 fw-medium text-danger">
                        Workflow Information
                      </span>
                    </button>
                  </h2>
                  <UncontrolledCollapse defaultOpen toggler="#flush-infomation">
                    <div
                      id="flush-collapseBrands"
                      className="accordion-collapse collapse show"
                      aria-labelledby="flush-infomation"
                    >
                      <div className="accordion-body text-body pt-0">
                        <div className="row align-items-center">
                          <div className="col ">
                            <Label
                              htmlFor="code"
                              className="form-label"
                            >
                              Code
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="code"
                            />
                          </div>
                          <div className="col">
                            <Label
                              htmlFor="active"
                              className="form-label "
                            >
                              Active
                            </Label>
                            <Select
                              value={active}
                              onChange={handleChangeActive}
                              options={activeOptions}
                            />
                          </div>
                        </div>
                        <div className="gap-2 mt-3">
                          <Label
                            htmlFor="workflow"
                            className="form-label mb-0"
                          >
                            Workflow's name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="workflow"
                            placeholder="Workflow's name"
                          />
                        </div>
                        <div className="gap-2 mt-3">
                          <div className="gap-2 mt-3">
                            <Label
                              htmlFor="group"
                              className="form-label mb-0"
                            >
                              Group
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="group"
                            />
                          </div>

                          <div className="gap-2 mt-3">
                            <Label
                              htmlFor="scope"
                              className="form-label mb-0"
                            >
                              Scope
                            </Label>
                            <Select
                              value={scope}
                              isMulti
                              onChange={handleChangeScope}
                              options={GroupOptions}
                            />
                          </div>

                          <div className="gap-2 mt-3">
                            <Label
                              htmlFor="scope"
                              className="form-label mb-0"
                            >
                              Work manager generated by workflow
                            </Label>
                            <Select
                              value={workManager}
                              isMulti
                              onChange={handlChangeWorkManager}
                              options={GroupOptions}
                            />
                          </div>

                          <div className="gap-2 mt-3"></div>
                          <div className="form-check mb-3">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="changeManager"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="changeManager"
                            >
                              Allow change manager when create task
                            </Label>
                          </div>
                          <div>
                            <div className="gap-2 mt-3">
                              <Label
                                htmlFor="scope"
                                className="form-label text-muted mb-0"
                              >
                                Watchers
                              </Label>
                              <Select
                                value={watchers}
                                isMulti
                                onChange={handleChangeWatchers}
                                options={GroupOptions}
                              />
                            </div>

                            <div className="gap-2 mt-3">
                              <Label htmlFor="descs" className="form-label">
                                Descriptions
                              </Label>
                              <textarea
                                className="form-control"
                                id="descs"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </UncontrolledCollapse>
                </div>
              </div>
            </Card>
            <Card>
              <div className="accordion accordion-flush">
                <div className="accordion-item">
                  <h2 className="accordion-header text-danger">
                    <button
                      className="accordion-button bg-transparent shadow-none"
                      type="button"
                      id="flush-permission"
                    >
                      <span className="text-uppercase fs-12 fw-medium text-danger">
                        Optional permission
                      </span>
                    </button>
                  </h2>
                  <UncontrolledCollapse toggler="#flush-permission">
                    <div
                      id="flush-collapseBrands"
                      className="accordion-collapse collapse show"
                      aria-labelledby="flush-permission"
                    >
                      <div className="accordion-body text-body pt-0">
                        <div className="form-check mb-3">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="changeManager"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="changeManager"
                          >
                            Cho phep nguoi thuc hien, nguoi theo doi cac cong
                            viec con trong quy trinh xem cong viec cha
                          </Label>
                        </div>
                        <div className="form-check mb-3">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="changeManager"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="changeManager"
                          >
                            Cho phep nguoi thuc hien xem cheo cong viec cua nhau
                          </Label>
                        </div>
                        <div className="form-check mb-3">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="changeManager"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="changeManager"
                          >
                            Tu dong tao cong viec du kien
                          </Label>
                        </div>
                      </div>
                    </div>
                  </UncontrolledCollapse>
                </div>
              </div>
            </Card>
            <div className="step-footer d-flex">
              {/* <div className="d-flex flex-grow-1">
                <Button>Previous</Button>
              </div> */}
              <div
                className="d-flex flex-grow-1 justify-content-end"
                style={{ marginRight: "2.5rem" }}
              >
                <Button
                  color="success"
                  onClick={() => {
                    handleNextClick("2");
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabPane>

          {/* Setting flow */}
          <TabPane tabId="2" id="pill-justified-profile-1">
            <div
              className="d-flex"
              style={{ minHeight: "60vh", overflow: "auto", maxWidth: "100%" }}
            >
              <div
                className="d-flex flex-column justify-content-center align-items-center text-primary"
                style={{minWidth: "15rem" }}
              >
                <div onClick={handleAddStageClick} style={{cursor: 'pointer'}} className="d-flex flex-column justify-content-center align-items-center text-primary">
                  <i className="ri-add-line" style={{ fontSize: "2rem" }}></i>
                  <span className="fs-20">Add Stage</span>
                </div>
              </div>
              {Object.entries(stage).map(([key, item]) => (
                <SettingFlow
                  key={key}
                  data={item}
                  code={key}
                  update={updateStage}
                />
              ))}
              <div
                className="p-3"
                style={{ minWidth: "15rem", backgroundColor: "#c1fbda" }}
              >
                <div>
                  <span className="fs-16">Done</span>
                </div>
              </div>
              <div
                className="p-3"
                style={{ minWidth: "15rem", backgroundColor: "#ffd3d3" }}
              >
                <div>
                  <span className="fs-16">Failed</span>
                </div>
              </div>
            </div>
            <div className="step-footer d-flex mt-3">
              <div className="d-flex flex-grow-1">
                <Button
                  color="info"
                  onClick={() => {
                    handleNextClick("1");
                  }}
                >
                  Previous
                </Button>
              </div>
              <div
                className="d-flex flex-grow-1 justify-content-end"
                style={{ marginRight: "2.5rem" }}
              >
                <Button
                  color="success"
                  onClick={() => {
                    handleNextClick("3");
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="3" id="pill-justified-messages-1"></TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
}

export default Step;
