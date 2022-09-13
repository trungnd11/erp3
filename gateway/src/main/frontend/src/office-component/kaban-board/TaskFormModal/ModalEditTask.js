import React,{useState,useEffect,useRef} from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import { Select } from "react-select";
import Select, { components } from "react-select";
import { Link } from "react-router-dom";
import CustomEditor from "../../../Components/Editor";
import apiproject from "../../../api/listproject";
import employeeApi from "../../../api/employee/employeeApi";
import { element } from 'prop-types';
import { showErrorNotice, showSuccessNotice } from './../../../utils/toastify';
import BackdropLoading from "../../../Components/BackdropLoading";
import DropzoneFile from "../../../Components/DropzoneFile";
import { uploadFile } from "../../../api/common";
import CreatableSelect from "react-select/creatable";

export default function ModalEditTask(props) {
  const editRecordTask = props.editRecordTask;
  const closedTask = props.closedTask;
  const editTask = props.editTask;
  const projectData = props.projectData
  // console.log(projectData)
  const listEmployee = props.listEmployee;
  const taskCreated = props.taskCreated;
  const optionsPiorities = props.optionsPiorities;
  const optionsIssueType = props.optionsIssueType
  // console.log(listEmployee);
  const refEditor = useRef();

  // const updateTask = () => {};

  const [taskInfomation,setTaskInfomation] = useState();

  

  

  const [selectedIssueType, setSelectedIssueType] = useState();
  const handleSelectedIssueType = (option) => {
    // console.log(option)
    setSelectedIssueType(option);
  };

  const [optionsSprint,setOptionSprint] = useState(getOptionSprint(projectData.sprints));
  const [optionStatus, setOptionStatus] = useState(getOptionStatus(projectData.status));
  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   if (projectData !== undefined) {
  //     const option = getOptionSprint(projectData.sprints);
  //     const optionStatus = getOptionStatus(projectData.status);
  //     setOptionStatus(optionStatus)
  //     setOptionSprint(option);
  //   }
  // }, [projectData]);

  const [taskName, setTaskName] = useState();
  const changeTaskName = (event) => {
    setTaskName(event.target.value);
  };

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

  const refattachFile = useRef();

  const [optionsReporter, setOptionReporter] = useState([]);
  const [optionsAssignee, setOptionAssignee] = useState([]);
  const [reporter, setReporter] = useState();
  const [assignee, setAssignee] = useState([]);
  const [piority, setPiority] = useState();
  const [labels, setLabels] = useState();
  const [sprint, setSprint] = useState();
  const [sttProject, setSttProject] = useState(null);

  const handleSelectedReporter = (option) => {
    const optionTmp = [...optionsAssignee]
    // let index = findIndexEmployee(optionTmp,option);
    for(let index in optionTmp) {
      if(optionTmp[index].employeeNumb === option.employeeNumb) {
        optionTmp[index].isDisabled = true;
      }
      else {
        optionTmp[index].isDisabled = false;
      }
    }
    // optionTmp[index].isDisabled = true;
    setOptionAssignee(optionTmp)
    setReporter(option);
  };

  const handleSelectedAssignee = (option) => {
    const optionTmp = [...optionsReporter]
    // console.log(option)
    // console.log(optionTmp)
    // let index = findIndexEmployee(optionTmp,option);

    for(let index in optionTmp) {
      optionTmp[index].isDisabled = false;
    }

    for(let index in optionTmp) {
      for(let index1 in option) {
        if(optionTmp[index].employeeNumb === option[index1].employeeNumb) {
          optionTmp[index].isDisabled = true;
          break;
        }
      }
    }
  }

  

  const handleSelectedPiority = (option) => {
    setPiority(option);
  };

  const handleChangeLabels = (options) => {
    setLabels(options);
  };

  const handleSelectedSprint = (option) => {
    setSprint(option);
  };

  const handleSelectedStatus = (options) => {
    setSttProject(options);
  };

  const [description,setDescription] = useState()

  // console.log(optionsSprint)
  // console.log(optionStatus)

  useEffect(() => {
    apiproject.getTaskByid(editRecordTask.id)
    .then(res => {
      console.log(res)
      const listFile = getListFile(res.files)
      refattachFile.current.setFileObj(listFile)
      setHashTags(getOptionHashTag(res.tags))
      console.log(optionsIssueType)
      setPiority(getDefaultPriority(optionsPiorities,res.priorityId))
      setSelectedIssueType(getDefaultIssueType(optionsIssueType,res.taskTypeId))
      setTaskInfomation(res)
      setTaskName(res.taskName)
      // setDescription(res.description)
      refEditor.current.setData(res.description)
      const report = getReporter(res.reporter,res.lstAssignee)
      const listAsign = getListAsign(res.lstAssignee);
      const rsSprint = getDefaultOption(optionsSprint,res.sprintId);
      const rsStatus = getDefaultOption(optionStatus,res.statusId);
      setSprint(rsSprint);
      setSttProject(rsStatus);
      setOptionReporter(getEmplyeeDataReport(listEmployee,listAsign));
      setOptionAssignee(getEmplyeeDataAsign(listEmployee,report));
      setReporter(report);
      setAssignee(listAsign);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  const updateTask = async () => {

    const allFile = refattachFile.current.files;
    const listFiles = [];
    for(let i in allFile) {
      if (!!allFile[i]) {
        try {
          const response = await uploadFile(allFile[i]);
          listFiles.push(response.data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    const dataEditor = refEditor.current.data;
    const selectReporter = getReporterVal(listEmployee, reporter);
    const listAssignee = getListAssigneeVal(listEmployee, assignee);
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
      id:editRecordTask.id,
      taskName: taskName,
      taskTypeId: selectedIssueType.id,
      // attachFile: "",
      description: dataEditor,
      reporter: selectReporter,
      lstAssignee: listAssignee,
      priorityId: piority.id,
      files:listFiles
      // hashTag: labels,
    };
    console.log(tmpData)
    setLoading(true)
    apiproject.updateTask(sttProject,sprint,tmpData)
    .then(res => {
      taskCreated(sprint);
      showSuccessNotice("Create Success !")
      closedTask();
      setLoading(false)
    })
    .catch(err => {
      showErrorNotice("Create Fail !")
      setLoading(false)
    })
  };

  const [loading, setLoading] = useState(false);

  const [hashTags, setHashTags] = useState([]);

  // const [hashTags, setHashTags] = useState(() => {
  //   return getOptionHashTag(dataProject.tags);
  // });

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
    <React.Fragment>
      {loading && <BackdropLoading />}
      <Modal
        size="lg"
        scrollable
        isOpen={editTask}
        toggle={closedTask}
        id="large modal"
      >
        <div className="modal-header bg-soft-info">
          <h5 style={{ margin: 0 }}>Edit Task</h5>
          <Button
            onClick={closedTask}
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
              <CustomEditor ref={refEditor} initData={description}/>
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
            onClick={closedTask}
            className="btn btn-link link-success fw-medium shadow-none"
          >
            <i className="ri-close-line me-1 align-middle" />
            Close
          </Link>
          <Button
            onClick={updateTask}
            color="primary"
            className="btn btn-primary "
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
const getOptionSprint = (listSprint) => {
  // console.log(listSprint);
  const tmp = [];
  for(let index in listSprint) {
    const tmpObj = {
      id: listSprint[index].id,
      value: listSprint[index].sprintName,
      label: listSprint[index].sprintName,
    };
    tmp.push(tmpObj)
  }
  return tmp;
};

const getOptionStatus = (listStatus) => {
  const tmp = [];
  for(let index in listStatus) {
    const tmpObj = {
      id: listStatus[index].id,
      value: listStatus[index].name,
      label: listStatus[index].name,
    };
    tmp.push(tmpObj)
  }
  return tmp;
};

const getEmplyeeDataReport = (dataArr,listAsign) => {
  const tmpOptions = [];
  for (let item in dataArr) {
    const options = {
      value: dataArr[item].fullName,
      label: dataArr[item].fullName + " (" + dataArr[item].employeeNumb + ")",
      employeeNumb: dataArr[item].employeeNumb,
      isDisabled:false,
    };
    if(checkinAsign(dataArr[item],listAsign)) {
      options.isDisabled = true;
    }
    tmpOptions.push(options);
  }
  return tmpOptions;
};

const checkinAsign = (data,listAsign) => {
  for(let index in listAsign) {
    if(data.employeeNumb === listAsign[index].employeeNumb) {
      return true;
    }
  }
  return false;
}

const getEmplyeeDataAsign = (dataArr,report) => {
  // console.log(dataArr)
  // console.log(report)
  const tmpOptions = [];
  for (let item in dataArr) {
    const options = {
      value: dataArr[item].fullName,
      label: dataArr[item].fullName + " (" + dataArr[item].employeeNumb + ")",
      employeeNumb: dataArr[item].employeeNumb,
      isDisabled:false,
    };
    if(dataArr[item].employeeNumb === report.employeeNumb) {
      options.isDisabled = true;
    }
    tmpOptions.push(options);
  }
  return tmpOptions;
};


const getReporter = (reporter,listAsign) => {
  const report = {
    value: reporter.fullName,
    label: reporter.fullName + " (" + reporter.employeeNumb + ")",
    employeeNumb: reporter.employeeNumb,
    isDisabled:false,
  };
  return report;
}
const getListAsign = (listAsign) => {
  const tmpOptions = [];
  for (let item in listAsign) {
    const options = {
      value: listAsign[item].fullName,
      label: listAsign[item].fullName + " (" + listAsign[item].employeeNumb + ")",
      employeeNumb: listAsign[item].employeeNumb,
      isDisabled:false,
    };
    tmpOptions.push(options);
  }
  return tmpOptions;
}
const disOptionReport = (data,listAsign) => {
    for(let index in data) {
    for(let index1 in listAsign) {
      if(data[index].employeeNumb === listAsign[index1].employeeNumb) {
        data[index].isDisabled = true;
        break;
      }
    }
  }
  return data;
}
const disOptionAsign = (data,report) => {
  for(let index in data) {
    if(data[index].employeeNumb === report.employeeNumb) {
      data[index].isDisabled = true;
      break;
    }
  }
  return data;
}
const getDefaultOption = (dataSprint,sprintId) => {
  // console.log(dataSprint)
  // console.log(sprintId)
  const func = (element) => element.id === sprintId
  return dataSprint.find(func)
}
const getReporterVal = (dataArr, selectData) => {
  // console.log(selectData);
  if (selectData !== undefined) {
    const rs = dataArr.find(
      (element) => element.employeeNumb === selectData.employeeNumb
    );
    return rs;
  }
};
const getListAssigneeVal = (dataArr, selectData) => {
  const tmpSelectData = [];
  for (let select in selectData) {
    const rs = dataArr.find(
      (element) => element.employeeNumb === selectData[select].employeeNumb
    );
    tmpSelectData.push(rs);
  }
  return tmpSelectData;
};

const getDefaultPriority = (listPriority,id) => {
  return listPriority.find(el => el.id === id)
}

const getDefaultIssueType = (listType,id) => {
  return listType.find(el => el.id === id)
}

const getListFile = (listFile) => {
  const list = [];
  for(let i in listFile) {
    const tmp = {
      downloadUri:listFile[i].downloadUri,
      originalName:listFile[i].originalName,
      id:listFile[i].id,
      fileSize: listFile[i].fileSize,
      type: listFile[i].type,
      formattedSize:formatBytes(listFile[i].fileSize)
    }
    list.push(tmp)
  }
  return list;
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

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