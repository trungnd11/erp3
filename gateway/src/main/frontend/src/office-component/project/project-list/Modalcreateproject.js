import React, { useState, useRef, useEffect } from "react";
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
import CreatableSelect from "react-select/creatable";
import style from "./List.module.css";
import CustomEditor from "../../../Components/Editor";
import Flatpickr from "react-flatpickr";
import { ToastContainer, toast } from "react-toastify";
import { showErrorNotice, showSuccessNotice } from "../../../utils/toastify";
import employeeApi from "../../../api/employee/employeeApi";
import apiproject from "../../../api/listproject";
import BackdropLoading from "../../../Components/BackdropLoading";
import { uploadFile } from "../../../api/common";
import { TagsInput } from "react-tag-input-component";
import "./Modalcreateproject.css";
import { element } from "prop-types";

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

// const optionPrioritys = [
//   { name: "Low", color: "#4ebd94" },
//   { name: "Medium", color: "#d3d250" },
//   { name: "High", color: "#dd3f3f" },
// ];

function Modalcreateproject(props) {
  const modalCreateProject = props.modalCreateProject;
  const closedCreateProject = props.closedCreateProject;
  const loadDataProject = props.loadDataProject;
  const userLogin = props.userLogin;

  const [titleProject, setTitleProject] = useState("");
  const changeTitleProject = (event) => {
    setTitleProject(event.target.value);
  };

  const [optionPriotySource, setOptionPriotySource] = useState([]);

  const [optionPriority, setOptionPriority] = useState([]);

  const [thumbnailImg, setThumbnailImg] = useState(null);
  const onChangeThumbnail = (event) => {
    // console.log(event.target.files[0]);
    setThumbnailImg(event.target.files[0]);
  };
  const refEditor = useRef();

  const [priority, setPriority] = useState();

  const selectedPriority = (option) => {
    setPriority(option);
  };

  const [dateDeadline, setDateDeadline] = useState([]);
  const dateDeadlineChange = (event) => {
    setDateDeadline(event);
  };

  const [privacy, setPrivacy] = useState("PRIVATE");
  const selectedPrivacy = (event) => {
    setPrivacy(event.target.value);
  };

  // const [creatorMember, setCreatorMember] = useState(() => {
  //   return getMemberLogin(userLogin);
  // });

  const [creatorMember, setCreatorMember] = useState(userLogin);

  const [selectMembers, setSelectMembers] = useState();
  const [selectLeader, setSelectLeader] = useState();

  const handleSelectLeader = (leader) => {

    const  optionTmp = [...optionMembers]
    // let index = findIndexEmployee(optionTmp,option);
    for(let index in optionTmp) {
      if(optionTmp[index].employeeNumb === leader.employeeNumb) {
        optionTmp[index].isDisabled = true;
      }
      else {
        optionTmp[index].isDisabled = false;
      }
    }

    setSelectLeader(leader);
    setOptionMembers(optionTmp)
  }

  const handleSelectMembers = (members) => {
    const optionTmp = [...optionLeader]

    for(let index in optionTmp) {
      optionTmp[index].isDisabled = false;
    }

    for(let index in optionTmp) {
      for(let index1 in members) {
        if(optionTmp[index].employeeNumb === members[index1].employeeNumb) {
          optionTmp[index].isDisabled = true;
          break;
        }
      }
    }
    setSelectMembers(members);
    setOptionLeader(optionTmp);
  };

  
  const [optionLeader, setOptionLeader] = useState([]);
  const [optionMembers, setOptionMembers] = useState([]);
  const [listStatus, setListStatus] = useState([
    { name: "Todo", color: "#d7d8d8", step: 1 },
    { name: "Inprogress", color: "#e3e078", step: 2 },
    { name: "Done", color: "#5ed161", step: 3 },
  ]);

  const removeStatus = (name) => {
    console.log(name);
    //   console.log(id)
    //   const list = [...listStatus];
    const list = listStatus.filter((element) => {
      return element.name !== name;
    });
    list.forEach((element, index) => {
      element.step = index + 1;
    });
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
    let imgRes = null;
    if (!!thumbnailImg) {
      try {
        const response = await uploadFile(thumbnailImg);
        imgRes = response.data;
      } catch (e) {
        console.log(e);
      }
    }

    const objPriority = getObjPriority(priority, optionPriotySource);
    const listMembers = getListMembers(employeeData, selectMembers);
    listMembers.push(userLogin);
    const teamLeader = getTeamLeader(employeeData, selectLeader);
    const dataEditor = refEditor.current.data;
    const dataTag = getHashTags(hashTags);

    const tmpData = {
      projectName: titleProject,
      description: dataEditor,
      privacy: privacy,
      // deadLine: dateDeadline[0],
      thumnailImage: imgRes,
      // priority: objPriority,
      status: listStatus,
      lstMember: listMembers,
      tags: dataTag,
      teamLead: teamLeader,
    };
    if (titleProject !== undefined && titleProject !== "") {
      if (dateDeadline[0] === undefined) {
        showErrorNotice("Date deadline must not empty");
      } else {
        tmpData.deadLine = moment(dateDeadline[0]).format("YYYY-MM-DD");
        // console.log(teamLeader);
        if (teamLeader === null) {
          showErrorNotice("Team Leader must not empty");
        } else {
          apiproject
            .createNewProject(tmpData)
            .then((res) => {
              showSuccessNotice("Create Success");
              closedCreateProject();
              loadDataProject();
              // setmodal_fullscreen1(false);
            })
            .catch((err) => {
              showErrorNotice("Create Error");
              console.log(err);
            });
        }
      }
    } else {
      showErrorNotice("Title must not empty");
    }
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState(["Java"]);
  

  useEffect(() => {
    setLoading(true);
    employeeApi
      .listEmployee()
      .then((res) => {
        console.log(res);
        setEmployeeData(res);
        setOptionMembers(getEmplyeeData(res, creatorMember));
        setOptionLeader(getEmplyeeData(res, creatorMember));
        setLoading(false);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // setLoading(true);
    apiproject
      .getAllPriority()
      .then((res) => {
        // const tmp = res.map((item) => ({...item,value:item.name}))
        // setOptionPriority(tmp);
        setOptionPriotySource(res);
        const tmp = getPriority(res);
        setOptionPriority(tmp);
        setPriority(tmp[0]);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const [optionHashTag, setOptionHashTag] = useState([]);
  const [hashTags, setHashTags] = useState([]);

  const handleSelectTags = (tag) => {
    // console.log(tag);
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

  // console.log(optionHashTag)

  return (
    <React.Fragment>
      {loading && <BackdropLoading />}
      <Modal
        size="xl"
        // fullscreen='xl'
        isOpen={modalCreateProject}
        scrollable={true}
        toggle={closedCreateProject}
      >
        <ModalHeader className={style.header_modal_custom}>
          Crete New Project
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
                    <Input
                      // value={thumbnailImg}
                      onChange={onChangeThumbnail}
                      className="form-control"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>

                  <div className="mb-4">
                    <Label className="form-label">Project Description</Label>
                    <CustomEditor ref={refEditor} />
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
                        <Select
                          value={priority}
                          onChange={(option) => {
                            selectedPriority(option);
                          }}
                          options={optionPriority}
                          getOptionLabel={(option) => option.value}
                        />
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
                          className="form-control"
                          // options={{
                          //   dateFormat: "d/m/Y",
                          // }}
                          placeholder="Selact Date"
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
                      data-choices
                      data-choices-search-false
                      onChange={selectedPrivacy}
                    >
                      <option defaultValue="PRIVATE">PRIVATE</option>
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
                        handleSelectLeader(leader);
                      }}
                      options={optionLeader}
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
                  {/* <div style={{marginBottom:'10px'}}>
                    <Label className="form-label">Creator</Label>
                    <Select
                      value={creatorMember}
                      onChange={(leader) => {
                        setCreatorMember(leader);
                      }}
                      options={optionMembers}
                    />
                  </div> */}
                  <div>
                    <Label className="form-label">Team Members</Label>
                    <Select
                      value={selectMembers}
                      closeMenuOnSelect={false}
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
                              removeStatus(status.name);
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
            onClick={closedCreateProject}
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
const getObjPriority = (priority, optionPriority) => {
  const indexFunction = (element) => element.id === priority.id;
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

const getEmplyeeData = (dataArr, creatorMember) => {
  const tmpOptions = [];
  for (let item in dataArr) {
    const options = {
      value: dataArr[item].fullName,
      label: dataArr[item].fullName + " (" + dataArr[item].employeeNumb + ")",
      employeeNumb: dataArr[item].employeeNumb,
      isDisabled:false,
    };
    if (options.employeeNumb !== creatorMember.employeeNumb) {
      tmpOptions.push(options);
    }
  }
  return tmpOptions;
};

const getPriority = (dataArr) => {
  // console.log(dataArr)
  const arrTmp = [];
  dataArr.forEach((element) => {
    const tmp = {
      id: element.id,
      value: element.name,
      label: element.name,
      color: element.color,
    };
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

const getMemberLogin = (member) => {
  console.log(member);
  const arrTmp = [];
  const tmp = {
    value: member.fullName,
    label: member.fullName + " (" + member.employeeNumb + ")",
    employeeNumb: member.employeeNumb,
  };
  arrTmp.push(tmp);
  return arrTmp;
};

const getTeamLeader = (dataArr, leader) => {
  if (leader !== null) {
    return dataArr.find(
      (element) => element.employeeNumb === leader.employeeNumb
    );
  } else {
    return null;
  }
};

export default Modalcreateproject;
