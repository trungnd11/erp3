import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select, { components } from "react-select";
import employeeApi from "../../../api/employee/employeeApi";
import CreatableSelect from "react-select/creatable";

// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";
import DropzoneFile from "../../../Components/DropzoneFile";
import CustomEditor from "../../../Components/Editor";
import apiproject from "../../../api/listproject";
import { showSuccessNotice, showErrorNotice } from "./../../../utils/toastify";
import BackdropLoading from "../../../Components/BackdropLoading";
import { element } from "prop-types";
import { uploadFile } from "../../../api/common";

// const optionsProject = [
//   { value: "Choices 1", label: "Choices 1" },
//   { value: "Choices 2", label: "Choices 2" },
//   { value: "Choices 3", label: "Choices 3" },
//   { value: "Choices 4", label: "Choices 4" },
// ];

// const optionsIssueType = [
//   { id: 1, name: "Story", value: "Story", label: "Story" },
//   { id: 2, name: "Task", value: "Task", label: "Task" },
//   { id: 3, name: "Bug", value: "Bug", label: "Bug" },
//   { id: 4, name: "Epic", value: "Epic", label: "Epic" },
// ];

// const optionsPiorities = [
//   { id: 1, name: "Blocker", value: "Blocker", label: "Blocker" },
//   { id: 2, name: "Critical", value: "Critical", label: "Critical" },
//   { id: 3, name: "Major", value: "Major", label: "Major" },
//   { id: 4, name: "Highest", value: "Highest", label: "Highest" },
//   { id: 5, name: "High", value: "High", label: "High" },
//   { id: 6, name: "Medium", value: "Medium", label: "Medium" },
//   { id: 7, name: "Low", value: "Low", label: "Lowest" },
//   { id: 8, name: "Minor", value: "Minor", label: "Minor" },
//   { id: 9, name: "Trivial", value: "Trivial", label: "Trivial" },
// ];

// const optionsSprint = [
//   { id: 1, value: "Sprint1", label: "Sprint1" },
//   { id: 2, value: "Sprint2", label: "Sprint2" },
//   { id: 3, value: "Sprint3", label: "Sprint3" },
// ];

const CustomOption = ({ children, ...props }) => {
  // console.log("render option");
  return (
    <components.CustomOption {...props}>
      <span>flag</span>
      {children}
    </components.CustomOption>
  );
};

function TaskFormModal(props, ref) {
  // console.log(props);
  // const { quill, quillRef, Quill } = useQuill();
  // console.log(quillRef);
  // console.log(useQuill());
  const projectData = props.projectData;
  // console.log(projectData)
  const statusProject = props.statusProject;
  const taskCreated = props.taskCreated;
  const optionsPiorities = props.optionsPiorities;
  const optionsIssueType = props.optionsIssueType;
  const listEmployee = props.listEmployee;

  // console.log(statusProject)
  // console.log(optionStatus)

  // const [optionsPiorities,setOptionPriority] = useState([])
  // useEffect(() => {
  //   apiproject.getPriority()
  //   .then(res => {
  //     // console.log(res)
  //     const rs = getOptionPriority(res);
  //     setOptionPriority(rs);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, []);

  // const [optionsIssueType,setOptionIssueType] = useState([])
  // useEffect(() => {
  //   apiproject.getTaskType()
  //   .then(res => {
  //     // console.log(res)
  //     const rs = getOptionIssueType(res);
  //     setOptionIssueType(rs);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, []);

  const [optionsSprint, setOptionSprint] = useState(
    getOptionSprint(projectData.sprints)
  );
  const [optionStatus, setOptionStatus] = useState(
    getOptionStatus(projectData.status)
  );
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (projectData !== undefined) {
      const option = getOptionSprint(projectData.sprints);
      const optionStatus = getOptionStatus(projectData.status);
      setOptionStatus(optionStatus);
      setOptionSprint(option);
    }
  }, [projectData]);

  const [optionsReporter, setOptionReporter] = useState(() => {
    return getEmplyeeData(listEmployee);
  });
  const [optionsAssignee, setOptionAssignee] = useState(() => {
    return getEmplyeeData(listEmployee);
  });

  // const [listEmployee, setListEmployee] = useState([]);

  // useEffect(() => {
  //   employeeApi
  //     .listEmployee()
  //     .then((res) => {
  //       setListEmployee(res);
  //       setOptionReporter(getEmplyeeData(res));
  //       setOptionAssignee(getEmplyeeData(res));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const [taskName, setTaskName] = useState("");
  const changeTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const refEditor = useRef();
  const refattachFile = useRef();

  const [selectedProject, setSelectedProject] = useState(null);
  // const [projects, setProjects] = useState(optionsProject);

  const [selectedIssueType, setSelectedIssueType] = useState();
  const [reporter, setReporter] = useState();
  const [assignee, setAssignee] = useState();
  const [piority, setPiority] = useState();
  const [labels, setLabels] = useState();
  const [sprint, setSprint] = useState();
  const [sttProject, setSttProject] = useState(null);

  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  function tog_fullscreen() {
    setmodal_fullscreen(!modal_fullscreen);
  }

  useImperativeHandle(
    ref,
    () => ({
      tog_fullscreen,
    }),
    []
  );

  const handleSelectedProject = (option) => {
    setSelectedProject(option);
  };

  const handleSelectedIssueType = (option) => {
    setSelectedIssueType(option);
  };

  const handleSelectedReporter = (option) => {
    const optionTmp = [...optionsAssignee];
    // let index = findIndexEmployee(optionTmp,option);
    for (let index in optionTmp) {
      if (optionTmp[index].employeeNumb === option.employeeNumb) {
        optionTmp[index].isDisabled = true;
      } else {
        optionTmp[index].isDisabled = false;
      }
    }
    // optionTmp[index].isDisabled = true;
    setOptionAssignee(optionTmp);
    setReporter(option);
  };

  const handleSelectedAssignee = (option) => {
    const optionTmp = [...optionsReporter];
    // console.log(option)
    // console.log(optionTmp)
    // let index = findIndexEmployee(optionTmp,option);

    for (let index in optionTmp) {
      optionTmp[index].isDisabled = false;
    }

    for (let index in optionTmp) {
      for (let index1 in option) {
        if (optionTmp[index].employeeNumb === option[index1].employeeNumb) {
          optionTmp[index].isDisabled = true;
          break;
        }
      }
    }
    // optionTmp[index].isDisabled = true;
    setOptionReporter(optionTmp);
    setAssignee(option);
  };

  const handleSelectedPiority = (option) => {
    setPiority(option);
  };

  const handleSelectedSprint = (option) => {
    setSprint(option);
  };

  const handleChangeLabels = (options) => {
    setLabels(options);
  };

  const handleSelectedStatus = (options) => {
    setSttProject(options);
  };

  const styles = {
    control: (css) => ({ ...css, paddingLeft: "1rem" }),
  };

  const createTask = async () => {
    // console.log()
    const allFile = refattachFile.current.files;
    const listFiles = [];
    for (let i in allFile) {
      if (!!allFile[i]) {
        try {
          const response = await uploadFile(allFile[i]);
          listFiles.push(response.data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    const dataTag = getHashTags(hashTags);
    const dataEditor = refEditor.current.data;
    const selectReporter = getReporter(listEmployee, reporter);
    const listAssignee = getListAssignee(listEmployee, assignee);

    // const tmpTaskType = {
    //   id:selectedIssueType.id,
    //   name:selectedIssueType.value
    // }
    // const tmpPriorty = {
    //   id:piority.id,
    //   name:piority.value
    // }
    // console.log(listAssignee)
    
    if(taskName === '') {
      showErrorNotice('Name task must not empty')
      return
    }

    if(selectedIssueType === null || selectedIssueType === undefined) {
      showErrorNotice('Issue type must not empty')
      return
    }

    if(selectReporter === null || selectReporter === undefined) {
      showErrorNotice('Report must not empty')
      return
    }

    if(piority === null || piority === undefined) {
      showErrorNotice('Priority must not empty')
      return
    }

    const tmpData = {
      taskName: taskName,
      taskTypeId: selectedIssueType.id,
      // attachFile: "",
      description: dataEditor,
      reporter: selectReporter,
      lstAssignee: listAssignee,
      priorityId: piority.id,
      files: listFiles,
      tags: dataTag,
      // hashTag: labels,
    };

    setLoading(true);
    apiproject
      .createNewTask(projectData.id, sttProject, sprint, tmpData)
      .then((res) => {
        taskCreated(sprint);
        showSuccessNotice("Create Success !");
        setmodal_fullscreen(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showErrorNotice("Create Fail !");
        setLoading(false);
      });
  };
  const [loading, setLoading] = useState(false);

  const [hashTags, setHashTags] = useState([]);

  const handleSelectTags = (tag) => {
    // console.log(tag);
    setHashTags(tag);
  };

  const [optionHashTag, setOptionHashTag] = useState([]);

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

  return (
    <div>
      {loading && <BackdropLoading />}
      <Modal
        size="lg"
        scrollable
        isOpen={modal_fullscreen}
        toggle={() => {
          tog_fullscreen();
        }}
        id="large modal"
      >
        <div className="modal-header bg-soft-info">
          <h5 style={{ margin: 0 }}>Create New Task</h5>
          <Button
            onClick={() => {
              setmodal_fullscreen(false);
            }}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></Button>
        </div>
        <ModalBody style={{ overflowX: "hidden" }}>
          <div className="mb-3" style={{ width: "40%" }}>
            <Label htmlFor="project" className="form-label">
              Project
            </Label>
            <Input
              readOnly
              type="text"
              value={projectData ? projectData.projectName : ""}
              className="form-control"
              placeholder=""
            />
            {/* <Select
              value={selectedProject}
              onChange={(option) => {
                handleSelectedProject(option);
              }}
              options={projects}
              // components={{ CustomOption }}
              // getOptionLabel={(option) => `${option.label}: ${option.value}`}
            /> */}
          </div>

          <div className="mb-3" style={{ width: "40%" }}>
            <Label htmlFor="issue-type" className="form-label">
              Issue Type
            </Label>
            <Select
              value={selectedIssueType}
              onChange={(option) => {
                handleSelectedIssueType(option);
              }}
              options={optionsIssueType}
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="issue-type" className="form-label">
              Attachment
            </Label>
            <div>
              <DropzoneFile ref={refattachFile} />
            </div>
          </div>

          <div className="mb-3">
            <Label htmlFor="summary" className="form-label">
              Summary
            </Label>
            <Input
              value={taskName}
              type="text"
              className="form-control"
              onChange={(e) => {
                changeTaskName(e);
              }}
            ></Input>
          </div>

          <div className="mb-3">
            <Label htmlFor="descriptions" className="form-label">
              Descriptions
            </Label>
            <div className="snow-editor">
              <CustomEditor ref={refEditor} />
            </div>
            <div className="mb-3" style={{ width: "40%" }}>
              <Label htmlFor="issue-type" className="form-label">
                Reporter
              </Label>
              <Select
                value={reporter}
                onChange={(option) => {
                  handleSelectedReporter(option);
                }}
                options={optionsReporter}
              />
            </div>
            <div className="mb-3" style={{ width: "40%" }}>
              <Label htmlFor="issue-type" className="form-label">
                Assignee
              </Label>
              <Select
                value={assignee}
                isMulti={true}
                onChange={(option) => {
                  handleSelectedAssignee(option);
                }}
                options={optionsAssignee}
              />
            </div>
            <div className="mb-3" style={{ width: "40%" }}>
              <Label htmlFor="issue-type" className="form-label">
                Piority
              </Label>
              <Select
                value={piority}
                onChange={(option) => {
                  handleSelectedPiority(option);
                }}
                options={optionsPiorities}
              />
            </div>

            <div className="mb-3" style={{ width: "80%" }}>
              <Label htmlFor="issue-type" className="form-label">
                Label (hashtag)
              </Label>
              <CreatableSelect
                value={hashTags}
                isMulti
                onChange={(tag) => {
                  handleSelectTags(tag);
                }}
                options={optionHashTag}
              />
              {/* <Select
                isMulti
                value={labels}
                onChange={(options) => {
                  handleChangeLabels(options);
                }}
                options={optionsPiorities}
              /> */}
            </div>

            <div className="mb-3" style={{ width: "80%" }}>
              <Label htmlFor="issue-type" className="form-label">
                Sprint
              </Label>
              <Select
                isClearable
                value={sprint}
                onChange={(option) => {
                  handleSelectedSprint(option);
                }}
                options={optionsSprint}
              />
            </div>

            <div className="mb-3" style={{ width: "80%" }}>
              <Label className="form-label">Status</Label>
              <Select
                isClearable
                value={sttProject}
                onChange={(option) => {
                  handleSelectedStatus(option);
                }}
                options={optionStatus}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Link
            to="#"
            color="light"
            onClick={() => {
              tog_fullscreen();
            }}
            className="btn btn-link link-success fw-medium shadow-none"
          >
            <i className="ri-close-line me-1 align-middle" />
            Close
          </Link>
          <Button
            onClick={createTask}
            color="primary"
            className="btn btn-primary "
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const getEmplyeeData = (dataArr) => {
  const tmpOptions = [];
  for (let item in dataArr) {
    const options = {
      value: dataArr[item].fullName,
      label: dataArr[item].fullName + " (" + dataArr[item].employeeNumb + ")",
      employeeNumb: dataArr[item].employeeNumb,
      isDisabled: false,
    };
    tmpOptions.push(options);
  }
  return tmpOptions;
};

const getReporter = (dataArr, selectData) => {
  // console.log(selectData);
  if (selectData !== undefined) {
    const rs = dataArr.find(
      (element) => element.employeeNumb === selectData.employeeNumb
    );
    return rs;
  }
};

const getListAssignee = (dataArr, selectData) => {
  const tmpSelectData = [];
  for (let select in selectData) {
    const rs = dataArr.find(
      (element) => element.employeeNumb === selectData[select].employeeNumb
    );
    tmpSelectData.push(rs);
  }
  return tmpSelectData;
};

const getOptionSprint = (listSprint) => {
  // console.log(listSprint);
  const tmp = [];
  for (let index in listSprint) {
    const tmpObj = {
      id: listSprint[index].id,
      value: listSprint[index].sprintName,
      label: listSprint[index].sprintName,
    };
    tmp.push(tmpObj);
  }
  return tmp;
};

const getOptionStatus = (listStatus) => {
  const tmp = [];
  for (let index in listStatus) {
    const tmpObj = {
      id: listStatus[index].id,
      value: listStatus[index].name,
      label: listStatus[index].name,
    };
    tmp.push(tmpObj);
  }
  return tmp;
};

const getOptionIssueType = (listTaskType) => {
  // console.log(listTaskType)
  const tmp = [];
  for (let index in listTaskType) {
    const tmpObj = {
      id: listTaskType[index].id,
      value: listTaskType[index].name,
      label: listTaskType[index].name,
    };
    tmp.push(tmpObj);
  }
  return tmp;
};

const getOptionPriority = (listPriority) => {
  const tmp = [];
  for (let index in listPriority) {
    const tmpObj = {
      id: listPriority[index].id,
      value: listPriority[index].name,
      label: listPriority[index].name,
    };
    tmp.push(tmpObj);
  }
  return tmp;
};

const findIndexEmployee = (data, op) => {
  const func = (element) => element.employeeNumb === op.employeeNumb;
  return data.findIndex(func);
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

export default forwardRef(TaskFormModal);
