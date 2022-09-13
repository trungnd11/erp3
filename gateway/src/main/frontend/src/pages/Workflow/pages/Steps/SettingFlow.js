/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Dropzone from "react-dropzone";
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import Select from "react-select";
import classnames from "classnames";
import CommonModal from "../../../../Components/Modal";
import { PRIORITY, UNIT_TIME } from "../../../../utils/CONSTANTS";
import Chip from "./Chip";
import NewActionModal from "./NewActionModal";
import SendMailModal from "./SendMailModal";
import { use } from "echarts";
import { Link } from "react-router-dom";
import ActionTranferModal from "./ActionTranferModal";
import "./styles.scss";

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

function SettingFlow(props) {
  const { data, code, update } = props;

  const modalRef = useRef();
  const actionModal = useRef();
  const mailModal = useRef();
  const tranferModal = useRef();

  const [selectedFiles, setselectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [unitTime, setUnitTime] = useState(UNIT_TIME[0]);
  const [tabValue, setTabValue] = useState("1");

  const [normalAction, setNormalAction] = useState([]);
  /*
    {
      group: "Ten hanh dong"
      actions: [
        {}
      ]
    }
  */
  const [conditionTranfer, setConditionTranfer] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleChangeExecutors = (option) => {
    const updatedData = { ...data, executors: option };
    update(code, updatedData);
  };

  const handleChangeManagers = (option) => {
    const updatedData = { ...data, managers: option };
    update(code, updatedData);
  };

  const handleChangeDuration = (e) => {
    const updatedData = { ...data, expectedDuration: e.target.value };
    update(code, updatedData);
  };

  const handleChangeUnitTime = (option) => {
    const updatedData = { ...data, timeUnit: option };
    update(code, updatedData);
  };

  const handleChangeWatchers = (option) => {
    const updatedData = { ...data, watchers: option };
    update(code, updatedData);
  };

  const handleChangeBlockList = (option) => {
    const updatedData = { ...data, blockList: option };
    update(code, updatedData);
  };

  const handleChangeWorkType = (option) => {
    const updatedData = { ...data, workType: option };
    update(code, updatedData);
  };

  const handleChangeExecuteTime = (option) => {
    const updatedData = { ...data, changeExecutionTime: option };
    update(code, updatedData);
  };

  const handleChangeCaculateType = (option) => {
    const updatedData = { ...data, caculateWorkResult: option };
    update(code, updatedData);
  };

  const handleChangePriority = (option) => {
    const updatedData = { ...data, prioroty: option };
    update(code, updatedData);
  };

  const handleChangeTaskReceiver = (option) => {
    const updatedData = { ...data, taskReceivers: option };
    update(code, updatedData);
  };

  const onChangeStageName = (e) => {
    const updatedData = { ...data, name: e.target.value };
    update(code, updatedData);
  };

  const handleChangeDescriptions = (e) => {
    const updatedData = { ...data, descriptions: e.target.value };
    update(code, updatedData);
  };

  console.log(conditionTranfer);
  return (
    <React.Fragment>
      <div
        style={{
          minWidth: "18rem",
          border: "1px solid #d4d4d4",
          borderRadius: 5,
          position: "relative",
        }}
      >
        {/* <i
          className="ri-settings-3-line icon fs-20"
          style={{ cursor: "pointer", position: "absolute" }}
          onClick={() => {
            modalRef.current.setOpen(true);
            // actionModal.current.openModal();
          }}
        ></i> */}
        <div className="d-flex flex-row-reverse">
          <UncontrolledDropdown direction="down" style={{ marginRight: 10 }}>
            <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
              <i className="ri-more-fill fs-14"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  modalRef.current.setOpen(true);
                }}
              >
                Setting
              </DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CommonModal ref={modalRef} title="Setting stage">
          <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
            <NavItem>
              <NavLink
                className={classnames(
                  { active: tabValue === "1" },
                  "fw-semibold"
                )}
                onClick={() => {
                  setTabValue("1");
                }}
                href="#"
              >
                Action
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: tabValue === "2" },
                  "fw-semibold"
                )}
                onClick={() => {
                  setTabValue("2");
                }}
                href="#"
              >
                Transition Conditions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: tabValue === "3" },
                  "fw-semibold"
                )}
                onClick={() => {
                  setTabValue("3");
                }}
                href="#"
              >
                Send Email
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: tabValue === "4" },
                  "fw-semibold"
                )}
                onClick={() => {
                  setTabValue("4");
                }}
                href="#"
              >
                Digital Sign
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={tabValue} className="text-muted">
            <TabPane tabId="1" id="nav-border-justified-home">
              <div className="mt-3">
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={() => {
                    modalRef.current.setOpen(false);
                    actionModal.current.openModal();
                  }}
                >
                  <li className="bx bx-plus"></li>
                  Add Action
                </a>
              </div>
              {normalAction.length > 0 && (
                <div className="table-responsive mt-4 mt-xl-0">
                  <Table className="table-hover table-striped align-middle table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Executors</th>
                        <th scope="col" style={{ width: "12%" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalAction.map((item, index) => (
                        <tr key={index}>
                          <td className="fw-medium">{index + 1}</td>
                          <td>{item.name}</td>
                          <td> executors</td>
                          <td>
                            <div className="hstack gap-3 flex-wrap">
                              <Link to="#" className="link-success fs-15">
                                <i className="ri-edit-2-line"></i>
                              </Link>
                              <Link to="#" className="link-danger fs-15">
                                <i className="ri-delete-bin-line"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </TabPane>
            <TabPane tabId="2" id="nav-border-justified-profile">
              <div className="mt-3">
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={() => {
                    modalRef.current.setOpen(false);
                    tranferModal.current.openModal();
                  }}
                >
                  <li className="bx bx-plus"></li>
                  Add Transition Conditions
                </a>
                <div className="gap-2 mt-3">
                  {conditionTranfer.map((item, index) => (
                    <div key={index} className="">
                      <Card>
                        <div className="text-capitalize fw-medium">{item.group}</div>
                        <CardBody>
                          {item.actions.map((el, idx) => (
                            <div key={index} className="d-flex mb-2">
                              <div>
                                <span>{el.field.label}</span>
                                <span>{el.comparison.label}</span>
                                <span>{el.result.text}</span>
                              </div>
                              <div
                                id="arrowAnim"
                                style={{
                                  position: "relative",
                                  width: "6.25rem",
                                  top: -2,
                                }}
                              >
                                <div className="arrow">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                              </div>
                              <div>
                                <span>{el.tranferStage.label}</span>
                              </div>
                            </div>
                          ))}
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3" id="nav-border-justified-profile">
              <div className="mt-3">
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={() => {
                    modalRef.current.setOpen(false);
                    mailModal.current.openModal();
                  }}
                >
                  <li className="bx bx-plus"></li>
                  Add Email Action
                </a>
              </div>
            </TabPane>
          </TabContent>
          <div className="mt-3">
            <Label className="form-label text-muted">Attachment</Label>
            <Dropzone
              noClick
              onDrop={(acceptedFiles) => {
                handleAcceptedFiles(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps, open }) => (
                <div
                  className="dropzone dz-clickable"
                  style={{ minHeight: "100px" }}
                >
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ fontSize: "2rem" }}
                    >
                      <i
                        className="display-4 text-muted ri-upload-cloud-2-fill mr-1"
                        style={{ fontSize: "2rem" }}
                      />
                      <span style={{ fontSize: "1rem" }}>
                        Drop files to attach, or{" "}
                        <span
                          className="text-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={open}
                        >
                          browser
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {selectedFiles.map((item, index) => (
                <Chip key={index} label={item.name} />
              ))}
            </div>
          </div>
        </CommonModal>

        {/*Modal setting normal action */}
        <NewActionModal
          ref={actionModal}
          callback={() => {
            modalRef.current.setOpen(true);
          }}
          actions={normalAction}
          setActions={setNormalAction}
        />

        <ActionTranferModal
          ref={tranferModal}
          callback={() => {
            modalRef.current.setOpen(true);
          }}
          actions={normalAction}
          conditionTranfer={conditionTranfer}
          setConditionTranfer={setConditionTranfer}
        />

        <SendMailModal
          ref={mailModal}
          callback={() => {
            modalRef.current.setOpen(true);
          }}
        />
        <div className="accordion-body text-body pt-0">
          <div className="gap-2">
            <div>
              <Label htmlFor="active" className="form-label text-muted mb-1">
                Stage's name
              </Label>
              <Input
                value={data.name}
                type="text"
                className="form-control"
                id="stage"
                onChange={onChangeStageName}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="active" className="form-label text-muted mb-1">
                Executor
              </Label>
              <Select
                value={data.executors}
                onChange={handleChangeExecutors}
                options={activeOptions}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="code" className="form-label text-muted mb-0">
                Manager
              </Label>
              <Select
                value={data.managers}
                onChange={handleChangeManagers}
                options={activeOptions}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="group" className="form-label text-muted mb-0">
                Expected Duration
              </Label>
              <div className="d-flex align-items-center">
                <Input
                  value={data.expectedDuration}
                  type="text"
                  className="form-control"
                  id="group"
                  style={{ marginRight: 5 }}
                  onChange={handleChangeDuration}
                />
                {unitTime.label}
              </div>
            </div>

            <div className="gap-2 mt-3">
              <Label htmlFor="scope" className="form-label text-muted mb-0">
                Unit time
              </Label>
              <Select
                value={data.timeUnit}
                onChange={handleChangeUnitTime}
                options={UNIT_TIME}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="scope" className="form-label text-muted mb-0">
                Who has the right to change the execution time ?
              </Label>
              <Select
                value={data.changeExecutionTime}
                onChange={handleChangeExecuteTime}
                options={memberChangeTimeExecute}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="scope" className="form-label text-muted mb-0">
                How to caculate work result ?
              </Label>
              <Select
                value={data.caculateWorkResult}
                onChange={handleChangeCaculateType}
                options={caculateType}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="scope" className="form-label text-muted mb-0">
                Priority
              </Label>
              <Select
                value={data.priority}
                onChange={handleChangePriority}
                options={GroupOptions}
              />
            </div>

            <div className="gap-2 mt-3">
              <Label htmlFor="scope" className="form-label text-muted mb-0">
                Work type
              </Label>
              <Select
                value={data.workType}
                onChange={handleChangeWorkType}
                options={workTypes}
              />
            </div>
            <div className="gap-2 mt-3">
              <Label htmlFor="code" className="form-label text-muted mb-0">
                Task receiver
              </Label>
              <Select
                value={data.taskReceivers}
                onChange={handleChangeTaskReceiver}
                options={activeOptions}
              />
            </div>
            <div>
              <div className="gap-2 mt-3">
                <Label htmlFor="scope" className="form-label text-muted mb-0">
                  Watchers
                </Label>
                <Select
                  value={data.watchers}
                  isMulti
                  onChange={handleChangeWatchers}
                  options={GroupOptions}
                />
              </div>

              <div className="gap-2 mt-3">
                <Label htmlFor="scope" className="form-label text-muted mb-0">
                  Block list
                </Label>
                <Select
                  value={data.blockList}
                  isMulti
                  onChange={handleChangeBlockList}
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
                  onChange={handleChangeDescriptions}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SettingFlow;
