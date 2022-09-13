import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  Label,
  CardHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import style from "./List.module.css";
import CustomEditor from "../../../Components/Editor";
import Flatpickr from "react-flatpickr";
import { ToastContainer, toast } from "react-toastify";
import { showErrorNotice, showSuccessNotice } from "../../../utils/toastify";
import employeeApi from "../../../api/employee/employeeApi";
import apiproject from "../../../api/listproject";
import BackdropLoading from "../../../Components/BackdropLoading";
import { uploadFile } from "../../../api/common";
import CreatableSelect from "react-select/creatable";
import { element } from 'prop-types';
import { forEach } from "lodash";

const toprightnotify = () =>
  toast("Create Completed !", {
    position: "top-right",
    hideProgressBar: true,
    className: "bg-success text-white",
  });
const errornotify = () =>
  toast("Please check value new status !", {
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: false,
    className: "bg-danger text-white",
  });

const optionPriority = [
  { id: 1, value: "Low", color: "#4ebd94" },
  { id: 2, value: "Medium", color: "#d3d250" },
  { id: 3, value: "High", color: "#dd3f3f" },
];

function Modaleditproject(props) {
  const refFile = useRef();
  const modalEditProject = props.modalEditProject;
  const closedEditProject = props.closedEditProject;
  const loadDataProject = props.loadDataProject
  const dataProject = props.dataProject;
  // console.log(dataProject)
  const userLogin = props.userLogin

  const [creatorMember,setCreatorMember] = useState(userLogin)
  // console.log(dataProject);

  const [titleProject, setTitleProject] = useState(dataProject.projectName);
  const changeTitleProject = (event) => {
    setTitleProject(event.target.value);
  };

  const [fileThumbnail, setFileThumbnail] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(
    dataProject.thumnailImage ? dataProject.thumnailImage.originalName : ""
  );
  const onChangeThumbnail = (event) => {
    // console.log(event.target.files[0].name)
    setFileThumbnail(event.target.files[0]);
    setThumbnailImg(event.target.files[0].name);
  };

  // console.log(thumbnailImg)
  const refEditor = useRef();

  const [priority, setPriority] = useState("Low");

  const selectedPriority = (event) => {
    setPriority(event.target.value);
  };

  const [selectLeader, setSelectLeader] = useState(() => {
    return convertTeamLead(dataProject.teamLead);
  });

  const [dateDeadline, setDateDeadline] = useState([new Date(dataProject.deadLine)]);
  // console.log(dateDeadline)
  const dateDeadlineChange = (event) => {
    setDateDeadline(event);
  };

  const [privacy, setPrivacy] = useState(dataProject.privacy);
  const selectedPrivacy = (event) => {
    setPrivacy(event.target.value);
  };
  const [selectMembers, setSelectMembers] = useState(() => {
    return getEmplyeeData(dataProject.lstMember,creatorMember);
  });
  const handleSelectMembers = (members) => {
    // console.log(members)
    setSelectMembers(members);
  };
  const [optionMembers, setOptionMembers] = useState([]);
  const [listDelStatus,setListDelStatus] = useState([])
  const [listStatus, setListStatus] = useState(() => {
    return dataProject.status.sort((el1,el2) => el1.step - el2.step)
  });

  const removeStatus = (title,index) => {
    //   console.log(id)
    //   const list = [...listStatus];
    if(listStatus[index].id !== undefined) {
      const lstDel = [...listDelStatus]
      const dataDel = listStatus.find(element => element.id === listStatus[index].id)
      dataDel.delFlg = true;
      lstDel.push(dataDel)
      setListDelStatus(lstDel)
    }
    const list = listStatus.filter((element) => {
      return element.name !== title;
    });
    list.forEach((element,index) => {
      element.step = index + 1;
    })
    setListStatus(list);
  };

  const onMoveDownStatus = (index) => {
    const list = [...listStatus];
    list[index].step = list[index].step + 1;
    list[index + 1].step = list[index + 1].step - 1;
    const tmp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = tmp;
    setListStatus(list);
  };

  const onMoveUpStatus = (index) => {
    const list = [...listStatus];
    list[index].step = list[index].step - 1;
    list[index - 1].step = list[index - 1].step + 1;
    const tmp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = tmp;
    setListStatus(list);
  };

  const [btnType, setBtnType] = useState("add");

  const onAddNewStatus = () => {
    setBtnType("confirm");
  };

  const onCancelNewStatus = () => {
    setBtnType("add");
  };

  const onConfirmNewStatus = () => {
    const list = [...listStatus];
    if (valNewStatus !== "" && valNewStatus !== undefined) {
      if (!isExisted(valNewStatus, list)) {
        const tmp = {
          name: valNewStatus,
          color: valueColor,
          step: list.length + 1,
        };
        setNewStatus("");
        list.push(tmp);
        setBtnType("add");
        setListStatus(list);
        toprightnotify();
      } else {
        showErrorNotice("Status is duplicated !");
      }
    } else {
      showErrorNotice("Status must not Empty !");
    }
  };

  const [valNewStatus, setNewStatus] = useState("");

  const changeValueStatus = (e) => {
    // console.log(e.target.value);
    setNewStatus(e.target.value);
  };

  const [valueColor, setValueColor] = useState("#000000");
  const changeValueColor = (e) => {
    setValueColor(e.target.value);
    // console.log(e.target.value)
  };

  const createNewProject = async () => {
    let imgRes = dataProject.thumnailImage;
    if (!!fileThumbnail) {
      try {
        const response = await uploadFile(fileThumbnail);
        imgRes = response.data;
      } catch (e) {
        console.log(e);
      }
    }

    // const objPriority = getObjPriority(priority, optionPriotySource);
    const listMembers = getListMembers(employeeData, selectMembers);
    listMembers.push(userLogin)
    // const teamLeader = getTeamLeader(employeeData,selectLeader)
    const dataEditor = refEditor.current.data;
    const dataTag = getHashTags(hashTags);
    const teamLeader = getTeamLeader(employeeData, selectLeader);
    // const dataTag = getHashTags(hashTags);
    // console.log(dataProject);
    const tmpData = {
      id:dataProject.id,
      projectName: titleProject,
      description: dataEditor,
      privacy: privacy,
      // deadLine: dateDeadline[0],
      thumnailImage: imgRes,
      status: listStatus.concat(listDelStatus),
      lstMember: listMembers,
      tags: dataTag,
      teamLead: teamLeader,
    };
    // console.log(tmpData);
    // return;
    if (titleProject !== undefined && titleProject !== "") {
      if (dateDeadline[0] === undefined) {
        showErrorNotice("Date deadline must not empty");
      } else {
        tmpData.deadLine = moment(dateDeadline[0]).format("YYYY-MM-DD");
        
        apiproject
          .updateProject(tmpData)
          .then((res) => {
            showSuccessNotice("Create Success");
            closedEditProject();
            loadDataProject();
            // setmodal_fullscreen1(false);
          })
          .catch((err) => {
            showErrorNotice("Create Error");
            console.log(err);
          });
      }
    } else {
      showErrorNotice("Title must not empty");
    }
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [optionHashTag, setOptionHashTag] = useState([]);
  const [hashTags, setHashTags] = useState(() => {
    return getOptionHashTag(dataProject.tags);
  });

  const handleSelectTags = (tag) => {
    setHashTags(tag);
  };

  useEffect(() => {
    apiproject
      .getAllTagProject()
      .then((res) => {
        const tmpData = getOptionHashTag(res);
        setOptionHashTag(tmpData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    employeeApi
      .listEmployee()
      .then((res) => {
        setEmployeeData(res);
        setOptionMembers(getEmplyeeData(res,creatorMember));
        setLoading(false);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {loading && <BackdropLoading />}
      <Modal
        size="xl"
        // fullscreen='xl'
        isOpen={modalEditProject}
        scrollable={true}
        toggle={closedEditProject}
      >
        <ModalHeader className={style.header_modal_custom}>
          Edit Project
        </ModalHeader>
        <ModalBody className={style.conten_modal_custom}>
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="mb-4">
                    <Label className="form-label" htmlFor="project-title-input">
                      Project Title
                    </Label>
                    <Input
                      value={titleProject}
                      onChange={changeTitleProject}
                      type="text"
                      className="form-control"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="mb-4">
                    <Label
                      className="form-label"
                      htmlFor="project-thumbnail-img"
                    >
                      Thumbnail Image
                    </Label>

                    <div className="input-group">
                      <span className="input-group-text">Choose File</span>
                      <Input
                        readOnly
                        value={thumbnailImg}
                        style={{ backgroundColor: "var(--vz-input-bg)" }}
                        type="text"
                        className="form-control"
                        aria-describedby="basic-addon3"
                        onClick={() => {
                          refFile.current.click();
                        }}
                      />
                      <input
                        hidden
                        ref={refFile}
                        onChange={onChangeThumbnail}
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="form-label">Project Description</Label>
                    <CustomEditor ref={refEditor} initData={dataProject.description} />
                  </div>

                  <Row>
                    {/* <Col lg={4}>
                      <div className="mb-3 mb-lg-0">
                        <Label
                          htmlFor="choices-priority-input"
                          className="form-label"
                        >
                          Priority
                        </Label>
                        <select
                          className="form-select"
                          data-choices
                          data-choices-search-false
                          onChange={selectedPriority}
                        >
                          <option defaultValue="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </Col> */}
                    <Col lg={4}>
                      <div>
                        <Label
                          htmlFor="datepicker-deadline-input"
                          className="form-label"
                        >
                          Deadline
                        </Label>
                        <Flatpickr
                          value={dateDeadline}
                          onChange={(e) => {
                            dateDeadlineChange(e);
                          }}
                          options={{
                            dateFormat: "d-m-Y",
                          }}
                          className="form-control"
                          placeholder="Select Date"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Privacy</h5>
                </div>
                <CardBody>
                  <div>
                    <Label
                      htmlFor="choices-privacy-status-input"
                      className="form-label"
                    >
                      Privacy
                    </Label>
                    <select
                      className="form-select"
                      value={privacy}
                      data-choices
                      data-choices-search-false
                      onChange={selectedPrivacy}
                    >
                      <option value="PRIVATE">PRIVATE</option>
                      <option value="PUBLIC">PUBLIC</option>
                    </select>
                  </div>
                </CardBody>
              </div>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Tags</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <CreatableSelect
                      value={hashTags}
                      isMulti
                      onChange={(tag) => {
                        handleSelectTags(tag);
                      }}
                      options={optionHashTag}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Members</h5>
                </CardHeader>
                <CardBody>
                  <div style={{ marginBottom: "10px" }}>
                    <Label className="form-label">Team Leader</Label>
                    <Select
                      value={selectLeader}
                      onChange={(leader) => {
                        setSelectLeader(leader);
                      }}
                      options={optionMembers}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <Label htmlFor="firstNameinput" className="form-label">
                      Creator
                    </Label>
                    <Input
                      readOnly
                      type="text"
                      value={
                        creatorMember.fullName +
                        " (" +
                        creatorMember.employeeNumb +
                        ")"
                      }
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <Label className="form-label">Team Members</Label>
                    <Select
                      value={selectMembers}
                      isMulti={true}
                      onChange={(event) => {
                        handleSelectMembers(event);
                      }}
                      options={optionMembers}
                    />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Status</h5>
                </CardHeader>
                <CardBody className={style.card_status_custom}>
                  {listStatus &&
                    listStatus.map((status, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={`external-event fc-event ${style.status_custom}`}
                          style={{
                            cursor: "pointer",
                            background: status.color,
                          }}
                          key={"cat-" + index}
                          // onDrag={(event) => {
                          //   onDrag(event, category);
                          // }}
                        >
                          <i
                            onClick={() => {
                              removeStatus(status.name,index);
                            }}
                            className={`${style.button_add_cancel} mdi mdi-close-thick font-size-11 mr-3`}
                          />
                          <strong>{status.name}</strong>
                          <div className={style.move_total_custom}>
                            {moveArrow(
                              index,
                              listStatus,
                              onMoveUpStatus,
                              onMoveDownStatus
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  {btnType === "confirm" ? (
                    <div className={style.input_new_status_custom}>
                      <Input
                        value={valNewStatus}
                        placeholder="New Status"
                        type="text"
                        className={`${style.inp_status_custom} form-control`}
                        onChange={(e) => changeValueStatus(e)}
                      />
                      <Input
                        value={valueColor}
                        placeholder="New Status"
                        type="color"
                        className={`${style.inp_status_custom_color} form-control ml-1`}
                        onChange={(e) => changeValueColor(e)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className={`external-event fc-event ${style.status_custom_add}`}
                    style={{ cursor: "pointer" }}
                  >
                    {btnTypeShow(
                      btnType,
                      onAddNewStatus,
                      onConfirmNewStatus,
                      onCancelNewStatus
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <div className={`${style.footer_modal_custom} modal-footer`}>
          <Button
            onClick={closedEditProject}
            color="danger"
            className="btn btn-primary "
          >
            <i className="ri-close-line me-1 align-middle" />
            Cancel
          </Button>
          <Button
            onClick={createNewProject}
            color="success"
            className="btn btn-primary "
          >
            Save
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
}
const moveArrow = (index, list, onMoveUp, onMoveDown) => {
  const len = list.length;
  if (index === 0) {
    if (len === 1) {
      return <></>;
    }
    return (
      <i
        onClick={() => {
          onMoveDown(index);
        }}
        className={`${style.move_btn_custom} mdi mdi-arrow-down-thick font-size-11`}
      />
    );
  } else if (index === len - 1) {
    return (
      <i
        onClick={() => {
          onMoveUp(index);
        }}
        className={`${style.move_btn_custom} mdi mdi-arrow-up-thick font-size-11`}
      />
    );
  } else {
    return (
      <>
        <i
          onClick={() => {
            onMoveUp(index);
          }}
          className={`${style.move_btn_custom} mdi mdi-arrow-up-thick font-size-11`}
        />
        <i
          onClick={() => {
            onMoveDown(index);
          }}
          className={`${style.move_btn_custom} mdi mdi-arrow-down-thick font-size-11`}
        />
      </>
    );
  }
};
const isExisted = (value, arrCheck) => {
  return arrCheck.some(
    (element) => element.name.toLowerCase() === value.toLowerCase()
  );
};
const btnTypeShow = (
  typeBtn,
  onAddNewStatus,
  onConfirmNewStatus,
  onCancelNewStatus
) => {
  if (typeBtn === "add") {
    return (
      <i
        onClick={onAddNewStatus}
        className={`${style.button_add_status} mdi mdi-plus font-size-11`}
      />
    );
  } else {
    return (
      <>
        <i
          onClick={onConfirmNewStatus}
          className={`${style.button_confirm_status} mdi mdi-check-bold font-size-11`}
        />
        <i
          onClick={onCancelNewStatus}
          className={`${style.button_add_cancel} mdi mdi-close-thick font-size-11`}
        />
      </>
    );
  }
};
const getObjPriority = (namePriority) => {
  const indexFunction = (element) => element.value === namePriority;
  const idx = optionPriority.findIndex(indexFunction);
  return optionPriority[idx];
};

const getListMembers = (dataArr, selectData) => {
  const tmpSelectData = [];
  //   console.log(dataArr);
  for (let select in selectData) {
    const rs = dataArr.find(
      (element) => element.employeeNumb === selectData[select].employeeNumb
    );
    tmpSelectData.push(rs);
  }
  return tmpSelectData;
};

const getEmplyeeData = (dataArr,creatorMember) => {
  const tmpOptions = [];
  for (let item in dataArr) {
    const options = {
      value: dataArr[item].fullName,
      label: dataArr[item].fullName + " (" + dataArr[item].employeeNumb + ")",
      employeeNumb: dataArr[item].employeeNumb,
    };
    if(creatorMember.employeeNumb !== options.employeeNumb) {
      tmpOptions.push(options);
    }
  }
  return tmpOptions;
};

const getTeamLeader = (dataArr, leader) => {
  if (leader !== null) {
    return dataArr.find(
      (element) => element.employeeNumb === leader.employeeNumb
    );
  } else {
    return {};
  }
};

const getHashTags = (dataTag) => {
  console.log(dataTag);
  const arrTmp = [];
  dataTag.forEach((element) => {
    const tmp = {
      name: element.value,
    };
    if (!element.__isNew__) {
      tmp.id = element.id;
    }
    arrTmp.push(tmp);
  });
  return arrTmp;
};

const getOptionHashTag = (dataArr) => {
  const arrTmp = [];
  dataArr.forEach((element) => {
    const tmp = {
      id: element.id,
      value: element.name,
      label: element.name,
    };
    arrTmp.push(tmp);
  });
  return arrTmp;
};

const convertTeamLead = (teamLead) => {
  const tmp = {
    value: teamLead.fullName,
    label: teamLead.fullName + " (" + teamLead.employeeNumb + ")",
    employeeNumb: teamLead.employeeNumb,
  };
  return tmp;
};

export default Modaleditproject;
