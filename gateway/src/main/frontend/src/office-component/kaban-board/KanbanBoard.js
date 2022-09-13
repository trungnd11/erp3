/* eslint-disable no-debugger */
import React, { useRef, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import SimpleBar from "simplebar-react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Popover,
  PopoverHeader,
  PopoverBody,
  ModalHeader,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { map } from "lodash";
import UncontrolledBoard from "./UncontrolledBoard";
import { kanbanBoardData } from "../../common/data";
import BreadCrumb from "../../Components/Common/BreadCrumb.js";
import classnames from "classnames";
import style from "./styles.module.css";

// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { object } from "yup";
import PopoverItem from "./PopoverItem";
import FormNewTask from "./FormNewTask";
import TableComponents from "./TableComponents";
import TaskFormModal from "./TaskFormModal";
import { showErrorNotice, showSuccessNotice } from "../../utils/toastify";
import Flatpickr from "react-flatpickr";
import { element } from "prop-types";
import apiproject from "../../api/listproject";
import DeleteModal from "../../Components/Common/DeleteModal";
import BackdropLoading from "../../Components/BackdropLoading";
import moment, * as moments from "moment";
import ModalEditTask from "./TaskFormModal/ModalEditTask";
import employeeApi from "../../api/employee/employeeApi";
import Select, { components } from "react-select";

function KanbanBoard() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState();
  const [statusProject, setStatusProject] = useState();

  const taskModalRef = useRef();

  const [modal_board, setmodal_board] = useState(false);
  function tog_board() {
    setmodal_board(!modal_board);
  }

  const [modal_member, setmodal_member] = useState(false);
  function tog_member() {
    setmodal_member(!modal_member);
  }

  const [modal_newTask, setmodal_newTask] = useState(false);
  function tog_newTask() {
    setmodal_newTask(!modal_newTask);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  // const [activeTab, setactiveTab] = useState(1);
  // const toggle = (tab) => {
  //   if (activeTab !== tab) {
  //     setactiveTab(tab);
  //   }
  // };

  const [tabSprint, setTabSprint] = useState([]);
  const [searchStatus, setSearchStatus] = useState();
  const [searchPriority, setSearchPriority] = useState();

  const [optionStatus, setOptionStatus] = useState();

  const fetData = async () => {
    setLoading(true);
    try {
      const projectInfo = await apiproject.getProjectById(projectId);
      const dataBoard = await apiproject.getDataKanbanBoard(projectId);
      setProjectData(projectInfo);
      let listDataKanban = convertDataProject(dataBoard, projectInfo);
      console.log(projectInfo);
      setOptionStatus(getOptionStatus(projectInfo.status));
      setTabSprint(listDataKanban);
      setCountTab(listDataKanban.length);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetData();
  }, []);

  const [pillsTab, setpillsTab] = useState(0);
  const [countSprint, setCountSprint] = useState(tabSprint.length + 1);
  const [countTab, setCountTab] = useState(tabSprint.length);

  const addNewRow = () => {
    toggleModalSprint();
  };

  const [hideSearch, setHideSearch] = useState(true);

  const selectType = (id, type) => {
    // console.log(id);

    const newData = [...tabSprint];
    const isSameStatus = (element) => element.id === id;
    const indPush = newData.findIndex(isSameStatus);
    // console.log(indPush);
    newData[indPush].type = type;
    if (type === "board") {
      setHideSearch(false);
    } else {
      setHideSearch(true);
    }
    setTabSprint(newData);
  };

  // console.log(tabSprint);

  function openModalNewTask() {
    const { tog_fullscreen } = taskModalRef.current;
    tog_fullscreen();
  }

  const onAddNewTask = () => {
    //   console.log(newStatus);
  };
  document.title = "Kanban Board | Velzon - React Admin & Dashboard Template";

  const [dataKanban, setDataKanban] = useState(() => {
    return tabSprint.length > 0
      ? map(tabSprint[0].kabanData, (task) => ({ ...task, cards: task.tasks }))
      : [];
  });

  const [dataTable, setDataTable] = useState(() => {
    return tabSprint.length > 0 ? tabSprint[0].kabanData : [];
  });

  const pillsToggle = (tab) => {
    // console.log(tab)
    // console.log(tabSprint)
    if (pillsTab !== tab) {
      if (tabSprint[tab].type === "board") {
        const data = map(tabSprint[tab].kabanData, (task) => ({
          ...task,
          cards: task.tasks,
        }));
        setDataKanban(data);
        setHideSearch(false);
      } else {
        const data = [...tabSprint[tab].kabanData];
        setHideSearch(true);
        setDataTable(data);
      }

      setpillsTab(tab);
    }
  };

  const getDataSubmit = (valueSelect, nameTask) => {
    // console.log(pillsTab)
    // console.log(valueSelect)
    // console.log(nameTask)
    const tabValue = [...tabSprint];
    const isSameStatus = (element) => element.name === valueSelect.value;
    const indPush = tabValue[pillsTab].kabanData.findIndex(isSameStatus);
    // console.log(tabValue[pillsTab].kabanData[indPush]);
    const day = new Date();
    const tmpData = {
      id: tabValue[pillsTab].kabanData[indPush].tasks.length,
      title: nameTask,
      desc: nameTask,
      view: "0",
      message: "0",
      date: day.toDateString(),
      file: "0",
      isTaskId: false,
    };
    tabValue[pillsTab].kabanData[indPush].tasks.push(tmpData);
    console.log(tabValue);
  };

  useEffect(() => {
    const dataSprints = [...tabSprint];
    // console.log(data)
    if (dataSprints !== undefined && dataSprints.length > 0) {
      if (dataSprints[pillsTab].type === "board") {
        const data = map(dataSprints[pillsTab].kabanData, (task) => ({
          ...task,
          cards: task.tasks,
        }));
        setDataKanban(data);
      } else {
        const data = [...dataSprints[pillsTab].kabanData];
        setDataTable(data);
      }
      // setpillsTab(countTab);
    }
    // console.log("first")
  }, [tabSprint]);
  // console.log(tabSprint);
  // console.log(pillsTab);

  const removeSprints = (id, tabDel) => {
    // console.log(id);
    // console.log(tabDel);
    // console.log(countTab);
    apiproject
      .deleteSprint(id)
      .then((res) => {
        console.log(res);
        const dataRemove = [...tabSprint];
        dataRemove.splice(tabDel, 1);
        setTabSprint(dataRemove);
        if (tabDel === countTab - 1) {
          if (tabDel === 0) {
            setpillsTab(0);
          } else {
            setpillsTab(countTab - 2);
          }
        }
        setCountTab((prev) => prev - 1);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(countSprint)
  };

  const onChangeName = (id, value, date) => {
    const data = [...tabSprint];
    const indexFind = (element) => element.id === id;
    const indx = data.findIndex(indexFind);
    if (!checkNameSprint(data, id, value)) {
      const tmpData = {
        id: id,
        sprintName: value,
        startDay: moment(date[0]).format("YYYY-MM-DD"),
        finishDay: moment(date[1]).format("YYYY-MM-DD"),
      };
      apiproject
        .updateSprint(projectId, tmpData)
        .then((res) => {
          data[indx].text = value;
          data[indx].dateSprint = date;
          setTabSprint(data);
          showSuccessNotice("Update success");
        })
        .catch((err) => {
          console.log(err);
        });
      return true;
    } else {
      showErrorNotice("Name Sprint must is unique");
      return false;
    }
  };

  const [modalSprint, setModalSprint] = useState(false);
  const toggleModalSprint = () => {
    setModalSprint(!modalSprint);
  };

  const [nameSprint, setNameSprint] = useState("");
  const onChangeNameSprint = (e) => {
    setNameSprint(e.target.value);
  };

  const [dateSprint, setDateSprint] = useState(["2022-05-10", "2022-05-12"]);

  const dateSprinChange = (e) => {
    // console.log(e);
    setDateSprint(e);
  };

  const addNewSprint = () => {
    if (nameSprint !== undefined && nameSprint !== "") {
      const tmpDataSprint = [...tabSprint];
      if (checkSprintExistByName(tmpDataSprint, nameSprint)) {
        showErrorNotice("Name sprint must is unique");
      } else {
        if (dateSprint !== undefined && dateSprint !== "") {
          const dataSprint = {
            sprintName: nameSprint,
            startDay: moment(dateSprint[0]).format("YYYY-MM-DD"),
            finishDay: moment(dateSprint[1]).format("YYYY-MM-DD"),
          };
          apiproject
            .createNewSprint(projectId, dataSprint)
            .then((res) => {
              console.log(res);
              const tmpData = {
                id: res.id,
                text: res.sprintName,
                dateSprint: dateSprint,
                type: "table",
                kabanData: [],
                tableData: [],
              };
              tmpDataSprint.push(tmpData);
              setpillsTab(countTab);
              setCountSprint((prev) => prev + 1);
              setCountTab((prev) => prev + 1);
              setTabSprint(tmpDataSprint);
              setModalSprint(false);
              fetData();
              showSuccessNotice("Update Success");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          showErrorNotice("Date sprint must not Empty");
        }
      }
    } else {
      showErrorNotice("Name sprint must not Empty");
    }
  };

  const popOverref = useRef();

  const [delRecord, setDelRecord] = useState(false);
  const [record, setRecord] = useState();

  const openDelRecord = (record) => {
    setRecord(record);
    setDelRecord(true);
  };

  const openDeleteModal = () => {
    // debugger
    console.log(record);
    apiproject
      .deleteTask(record.id)
      .then((res) => {
        const tmpData = [...tabSprint];
        const activeTab = pillsTab;
        // console.log(tmpData);
        // console.log(activeTab)
        // let taskRemove;
        let taskRemove = findTaskRemove(
          tmpData[activeTab].kabanData,
          record.id
        );
        const indexRemove = taskRemove.tasks.findIndex(
          (el) => el.id === record.id
        );
        // console.log(indexRemove)
        taskRemove.tasks.splice(indexRemove, 1);
        showSuccessNotice("Delete Task Success");
        setDelRecord(false);
        setTabSprint(tmpData);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(record)
  };

  const [editTask, setEditTask] = useState(false);
  const [editRecordTask, setEditRecordTask] = useState();

  const editRecord = (record) => {
    console.log(record);
    setEditRecordTask(record);
    setEditTask(true);
  };

  const closedTask = () => {
    setEditTask(false);
  };

  // const handleDelRecord = (record) => {
  //   console.log(record);
  // };

  // console.log(projectData)
  const [loading, setLoading] = useState(false);

  // const getProjectInfo = async () => {
  //   try {
  //     const projectInfo = await apiproject.getProjectById(projectId)
  //     const dataBoard = await apiproject.getDataKanbanBoard(projectId)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // setProjectData(res);
  // };

  // useEffect(() => {
  //   getProjectInfo();
  // }, []);

  const taskCreated = (sprint) => {
    console.log(sprint);
    fetData();
    let index = 0;
    if (sprint !== undefined && sprint !== null) {
      index = getIndexSprint(tabSprint, sprint.id);
    }
    setpillsTab(index);
  };

  const [listEmployee, setListEmployee] = useState([]);

  useEffect(() => {
    employeeApi
      .listEmployee()
      .then((res) => {
        setListEmployee(res);
        // setOptionReporter(getEmplyeeData(res));
        // setOptionAssignee(getEmplyeeData(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const moveTaskData = (task, updatedBoard) => {
    // console.log(task)
    // console.log(updatedBoard)
    // debugger
    // console.log(updatedBoard)
    const copyUpdatedBoard = { ...updatedBoard };
    const tmpTabData = [...tabSprint];
    const sprintChange = tmpTabData.find((el) => el.id === task.sprintId);
    // console.log(copyUpdatedBoard)
    for (let i in copyUpdatedBoard.columns) {
      delete copyUpdatedBoard.columns[i].tasks;
      copyUpdatedBoard.columns[i].tasks = copyUpdatedBoard.columns[i].cards;
    }
    // console.log(copyUpdatedBoard)
    sprintChange.kabanData = copyUpdatedBoard.columns;
    // console.log(tmpTabData)
    setTabSprint(tmpTabData);
  };

  const [optionsPiorities, setOptionPriority] = useState([]);
  useEffect(() => {
    apiproject
      .getPriority()
      .then((res) => {
        // console.log(res)
        const rs = getOptionPriority(res);
        // setPiority(rs[0])
        setOptionPriority(rs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [optionsIssueType, setOptionIssueType] = useState([]);
  useEffect(() => {
    apiproject
      .getTaskType()
      .then((res) => {
        // console.log(res)
        const rs = getOptionIssueType(res);
        // setSelectedIssueType(rs[0])
        setOptionIssueType(rs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [valueSearch, setValueSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const onEnterSearch = (event) => {
    if (event.code === "Enter") {
      const search = { ...searchData };
      search.searchText = valueSearch;
      setSearchData(search);
      // setSearchText(valueSearch);
    }
  };

  const handleSearchStatus = (options) => {
    const search = { ...searchData };
    search.searchStatus = options;
    setSearchData(search);
    setSearchStatus(options);
  };

  const handleSearchPriority = (options) => {
    const search = { ...searchData };
    search.searchPriority = options;
    setSearchData(search);
    setSearchPriority(options);
  };

  const [searchData, setSearchData] = useState(() => {
    return {
      searchText: searchText,
      searchStatus: searchStatus,
      searchPriority: searchPriority,
    };
  });

  // const handleSelectedStatus = (status) => {

  // }

  return (
    <React.Fragment>
      <div className="page-content">
        {loading && <BackdropLoading />}
        <Container fluid>
          <BreadCrumb
            title={projectData ? projectData.projectName : ""}
            pageTitle="Project"
          />
          <Row>
            <Col xxl={12}>
              <Card className={style.card_custom}>
                <CardBody>
                  <Nav
                    pills
                    className={`${style.nav_tab_custom} nav-success mb-3`}
                  >
                    {tabSprint.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <NavItem>
                          <NavLink
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            className={classnames({
                              active: pillsTab === index,
                            })}
                            onClick={() => {
                              pillsToggle(index);
                            }}
                          >
                            {setIconSprint(item.type)}
                            {item.text}
                            <PopoverItem
                              // ref={popOverref}
                              popItem={item}
                              popIdx={index}
                              pillsTab={pillsTab}
                              removeSprints={() =>
                                removeSprints(item.id, pillsTab)
                              }
                              onChangeName={(id, name, date) =>
                                onChangeName(id, name, date)
                              }
                              selectType={(id, type) => {
                                selectType(id, type);
                              }}
                            />
                          </NavLink>
                        </NavItem>
                      </React.Fragment>
                    ))}
                    <NavItem className={style.new_view_custom}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        // className={classnames({ active: pillsTab === "1" })}
                        onClick={addNewRow}
                      >
                        <i className="ri-add-line align-middle me-1"></i> New
                        Sprint
                      </NavLink>
                    </NavItem>
                    {/* <Modal></Modal> */}
                  </Nav>
                  {/* <div className="mb-2">
                    <div className="search-box">
                      <Input
                        type="text"
                        className="form-control search"
                        placeholder="Search for project, tasks..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                    <Button
                      color="success"
                      onClick={() => tog_positionTopRight()}
                    >
                      <i className="ri-add-line align-middle me-1"></i>New
                      Status
                    </Button>
                  </div> */}

                  <Row className="g-2 mb-4">
                    {hideSearch && (
                      <>
                        {" "}
                        <Col lg={3} className="col-auto">
                          <div className="search-box">
                            <Input
                              value={valueSearch}
                              onChange={(e) => setValueSearch(e.target.value)}
                              onKeyUp={(event) => {
                                onEnterSearch(event);
                              }}
                              type="text"
                              className="form-control search"
                              placeholder="Search buy name tasks or hash tags"
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </Col>
                        <Col lg={1} className="col-auto">
                          <div className="mb-3">
                            <Select
                              placeholder={"Status"}
                              isClearable
                              value={searchStatus}
                              onChange={(option) => {
                                handleSearchStatus(option);
                              }}
                              options={optionStatus}
                            />
                          </div>
                        </Col>
                        <Col lg={1} className="col-auto">
                          <div className="mb-3">
                            <Select
                              placeholder={"Priority"}
                              isClearable
                              value={searchPriority}
                              onChange={(option) => {
                                handleSearchPriority(option);
                              }}
                              options={optionsPiorities}
                            />
                          </div>
                        </Col>
                      </>
                    )}
                    {/* <Col
                      lg={3}
                      className="col-auto"
                      style={{ marginLeft: "auto" }}
                    >
                      <Button
                        style={{
                          display: "flex",
                          height: "35px",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                        color="success"
                        onClick={() => tog_positionTopRight()}
                      >
                        <i className="ri-add-line align-middle me-1"></i>New
                        Status
                      </Button>
                    </Col> */}

                    <Col
                      lg={3}
                      className="col-auto"
                      style={{ marginLeft: "auto" }}
                    >
                      <Button
                        style={{
                          display: "flex",
                          height: "35px",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                        color="success"
                        onClick={() => openModalNewTask()}
                      >
                        <i className="ri-add-line align-middle me-1"></i>New
                        Task
                      </Button>
                    </Col>
                  </Row>

                  <TabContent className="text-muted">
                    {showTabcontent(
                      tabSprint,
                      pillsTab,
                      dataKanban,
                      dataTable,
                      openDelRecord,
                      editRecord,
                      moveTaskData,
                      searchData
                    )}
                    {/* {tabSprint[pillsTab].type === "board" ? (
                      <UncontrolledBoard
                        board={{ columns: dataKanban }}
                        // content={tabSprint[pillsTab].kabanData}
                      />
                    ) : (
                      <TableComponents tableData={dataTable} />
                    )} */}
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Add Member */}
          <Modal
            id="addmemberModal"
            isOpen={modal_member}
            toggle={() => {
              tog_member();
            }}
            className="border-0"
          >
            <div className="modal-header p-3 bg-soft-warning">
              Add Member
              <Button
                type="button"
                className="btn-close"
                onClick={() => {
                  setmodal_member(false);
                }}
                aria-label="Close"
              ></Button>
            </div>
            <div className="modal-body">
              <Form>
                <Row className="g-3">
                  <Col lg={12}>
                    <Label htmlFor="submissionidInput" className="form-label">
                      Submission ID
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="submissionidInput"
                      placeholder="Submission ID"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="profileimgInput" className="form-label">
                      Profile Images
                    </Label>
                    <Input
                      className="form-control"
                      type="file"
                      id="profileimgInput"
                    />
                  </Col>
                  <Col lg={6}>
                    <Label htmlFor="firstnameInput" className="form-label">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="firstnameInput"
                      placeholder="Enter firstname"
                    />
                  </Col>
                  <Col lg={6}>
                    <Label htmlFor="lastnameInput" className="form-label">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="lastnameInput"
                      placeholder="Enter lastname"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="designationInput" className="form-label">
                      Designation
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="designationInput"
                      placeholder="Designation"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="titleInput" className="form-label">
                      Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="titleInput"
                      placeholder="Title"
                    />
                  </Col>
                  <Col lg={6}>
                    <Label htmlFor="numberInput" className="form-label">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="numberInput"
                      placeholder="Phone number"
                    />
                  </Col>
                  <Col lg={6}>
                    <Label htmlFor="joiningdateInput" className="form-label">
                      Joining Date
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="joiningdateInput"
                      data-provider="flatpickr"
                      placeholder="Select date"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="emailInput" className="form-label">
                      Email ID
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Email"
                    />
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="modal-footer">
              <Button
                color="light"
                onClick={() => {
                  tog_member();
                }}
              >
                <i className="ri-close-line align-bottom me-1"></i> Close
              </Button>
              <Button color="success" id="addMember">
                Add Member
              </Button>
            </div>
          </Modal>

          {/* Add Board */}
          <Modal
            isOpen={modal_board}
            toggle={() => {
              tog_board();
            }}
            centered
            id="createboardModal"
            className="border-0"
          >
            <div className="modal-header p-3 bg-soft-info">
              Add Board
              <Button
                type="button"
                onClick={() => {
                  setmodal_board(false);
                }}
                id="btn-close2"
                className="btn-close"
                aria-label="Close"
              ></Button>
            </div>
            <div className="modal-body">
              <Form action="#">
                <Row>
                  <Col lg={12}>
                    <Label htmlFor="boardName" className="form-label">
                      Board Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="boardName"
                      placeholder="Enter board name"
                    />
                  </Col>
                  <div className="mt-4">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setmodal_board(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        id="addNewBoard"
                      >
                        Add Board
                      </button>
                    </div>
                  </div>
                </Row>
              </Form>
            </div>
          </Modal>

          {/* Create New Task */}
          <Modal
            size="lg"
            isOpen={modal_newTask}
            toggle={() => {
              tog_newTask();
            }}
            centered
            id="creatertaskModal"
            className="border-0"
          >
            <div className="modal-header p-3 bg-soft-info">
              Create New Task
              <Button
                onClick={() => {
                  setmodal_newTask(false);
                }}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></Button>
            </div>
            <div className="modal-body">
              <Form action="#">
                <Row className="g-3">
                  <Col lg={12}>
                    <Label htmlFor="projectName" className="form-label">
                      Project Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="projectName"
                      placeholder="Enter project name"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="sub-tasks" className="form-label">
                      Task Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="sub-tasks"
                      placeholder="Task title"
                    />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="task-description" className="form-label">
                      Task Description
                    </Label>
                    <textarea
                      className="form-control"
                      id="task-description"
                      rows="3"
                    ></textarea>
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="formFile" className="form-label">
                      Tasks Images
                    </Label>
                    <Input className="form-control" type="file" id="formFile" />
                  </Col>
                  <Col lg={12}>
                    <Label htmlFor="tasks-progress" className="form-label">
                      Add Team Member
                    </Label>
                    <SimpleBar style={{ height: "95px" }}>
                      <ul className="list-unstyled vstack gap-2 mb-0">
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="anna-adame"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="anna-adame"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar1}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Anna Adame
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="frank-hook"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="frank-hook"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar3}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Frank Hook
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="alexis-clarke"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="alexis-clarke"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar6}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Alexis Clarke
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="herbert-stokes"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="herbert-stokes"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar2}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Herbert Stokes
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="michael-morris"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="michael-morris"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar7}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Michael Morris
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="nancy-martino"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="nancy-martino"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar5}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Nancy Martino
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="thomas-taylor"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="thomas-taylor"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar8}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Thomas Taylor
                              </span>
                            </Label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check d-flex align-items-center">
                            <Input
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="tonya-noble"
                            />
                            <Label
                              className="form-check-label d-flex align-items-center"
                              htmlFor="tonya-noble"
                            >
                              <span className="flex-shrink-0">
                                <img
                                  src={avatar10}
                                  alt=""
                                  className="avatar-xxs rounded-circle"
                                />
                              </span>
                              <span className="flex-grow-1 ms-2">
                                Tonya Noble
                              </span>
                            </Label>
                          </div>
                        </li>
                      </ul>
                    </SimpleBar>
                  </Col>
                  <Col lg={4}>
                    <Label htmlFor="due-date" className="form-label">
                      Due Date
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="due-date"
                      data-provider="flatpickr"
                      placeholder="Select date"
                    />
                  </Col>
                  <Col lg={4}>
                    <Label htmlFor="categories" className="form-label">
                      Tags
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="categories"
                      placeholder="Enter tag"
                    />
                  </Col>
                  <Col lg={4}>
                    <Label htmlFor="tasks-progress" className="form-label">
                      Tasks Progress
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      maxLength="3"
                      id="tasks-progress"
                      placeholder="Enter progress"
                    />
                  </Col>
                  <div className="mt-4">
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        color="light"
                        onClick={() => setmodal_newTask(false)}
                      >
                        Close
                      </Button>
                      <Button color="success">Add Task</Button>
                    </div>
                  </div>
                </Row>
              </Form>
            </div>
          </Modal>

          {/* Delete Record Modal */}
          <Modal
            isOpen={modal_delete}
            toggle={() => {
              tog_delete();
            }}
            centered
            modalClassName="zoomIn"
            id="deleteRecordModal"
          >
            <div className="modal-header">
              <Button
                type="button"
                onClick={() => {
                  setmodal_delete(false);
                }}
                className="btn-close"
                aria-label="Close"
              ></Button>
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#ffbe0b,secondary:#f06548"
                  style={{ width: "100px", height: "100px" }}
                ></lord-icon>
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this tasks ?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <Button
                  color="light"
                  className="w-sm"
                  onClick={() => setmodal_delete(false)}
                >
                  Close
                </Button>
                <Button color="danger" className="w-sm" id="delete-record">
                  Yes, Delete It!
                </Button>
              </div>
            </div>
          </Modal>
        </Container>
      </div>
      {/* Modal add new sprint */}
      <Modal
        isOpen={modalSprint}
        toggle={() => {
          toggleModalSprint();
        }}
        centered
        id="createboardModal"
        className="border-0"
      >
        <div className="modal-header p-3 bg-soft-info">
          Create New Sprint
          <Button
            type="button"
            onClick={() => {
              setModalSprint(false);
            }}
            id="btn-close2"
            className="btn-close"
            aria-label="Close"
          ></Button>
        </div>
        <div className="modal-body">
          <Row>
            <Col lg={12}>
              <Label htmlFor="sprintName" className="form-label">
                Sprint Name :
              </Label>
              <Input
                type="text"
                value={nameSprint}
                onChange={(e) => {
                  onChangeNameSprint(e);
                }}
                className="form-control"
                id="sprintName"
                placeholder="Enter sprint name"
              />
            </Col>
            <Col lg={12}>
              <div className="mt-3">
                <Label className="form-label">Start To End :</Label>
                <Flatpickr
                  value={dateSprint}
                  className="form-control"
                  onChange={(e) => {
                    dateSprinChange(e);
                  }}
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                />
              </div>
            </Col>
            <div className="mt-4">
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setModalSprint(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addNewSprint}
                >
                  Add Sprint
                </button>
              </div>
            </div>
          </Row>
        </div>
      </Modal>
      {projectData && (
        <TaskFormModal
          listEmployee={listEmployee}
          optionsPiorities={optionsPiorities}
          optionsIssueType={optionsIssueType}
          ref={taskModalRef}
          taskCreated={taskCreated}
          projectData={projectData}
          statusProject={projectData ? projectData.status : []}
        />
      )}
      <DeleteModal
        show={delRecord}
        onDeleteClick={openDeleteModal}
        onCloseClick={() => setDelRecord(false)}
      />
      {editTask && (
        <ModalEditTask
          optionsPiorities={optionsPiorities}
          optionsIssueType={optionsIssueType}
          taskCreated={taskCreated}
          editRecordTask={editRecordTask}
          editTask={editTask}
          closedTask={closedTask}
          projectData={projectData}
          listEmployee={listEmployee}
        />
      )}
    </React.Fragment>
  );
}

const checkSprintExistByName = (dataArray, value) => {
  const checkFunction = (element) =>
    element.text.toLowerCase() === value.toLowerCase();
  const index = dataArray.findIndex(checkFunction);
  if (index < 0) {
    return false;
  } else {
    return true;
  }
};
const checkSprintExistById = (dataArray, id) => {
  const checkFunction = (element) => element.id === id;
  const index = dataArray.findIndex(checkFunction);
  if (index < 0) {
    return false;
  } else {
    return true;
  }
};

const checkNameSprint = (dataArr, id, name) => {
  const checkFunction = (element) =>
    element.text.toLowerCase() === name.toLowerCase() && element.id !== id;
  const index = dataArr.findIndex(checkFunction);
  if (index < 0) {
    return false;
  } else {
    return true;
  }
};

const setIconSprint = (type) => {
  if (type === "table") {
    return (
      <i className={`ri-table-line ${style.icon_custom} align-middle`}></i>
    );
  } else {
    return (
      <i className={`ri-dashboard-line ${style.icon_custom} align-middle`}></i>
    );
  }
};

const showTabcontent = (
  sprintActive,
  tabActive,
  dataKanban,
  dataTable,
  openDelRecord,
  editRecord,
  moveTaskData,
  searchData
) => {
  // console.log(sprintActive);
  // console.log(tabActive);
  // console.log(searchData);
  // console.log(dataTable);
  if (sprintActive === undefined || sprintActive.length === 0) {
    return <></>;
  } else {
    if (sprintActive[tabActive].type === "board") {
      return (
        <UncontrolledBoard
          searchData={searchData}
          moveTaskData={moveTaskData}
          openDelRecord={openDelRecord}
          editRecord={editRecord}
          board={{ columns: dataKanban }}
          // content={tabSprint[pillsTab].kabanData}
        />
      );
    } else {
      return (
        <TableComponents
          searchData={searchData}
          data={dataTable}
          openDelRecord={openDelRecord}
          editRecord={editRecord}
        />
      );
    }
  }
};

const convertDataProject = (data, projectData) => {
  // debugger
  console.log(data);
  // console.log(projectData);
  const dataArr = [];
  const kanbanDataBacklog = [];
  kanbanDataBacklog.push({
    id: -1,
    name: "No Status",
    // badge: 0,
    badgeClass: "success",
    step: 0,
    tasks: [],
  });
  for (let i in projectData.status) {
    // console.log(projectData.status[i])
    const tempStatus = {
      id: projectData.status[i].id,
      name: projectData.status[i].name,
      // badge: 0,
      badgeClass: "success",
      step: projectData.status[i].step,
      tasks: [],
    };
    kanbanDataBacklog.push(tempStatus);
  }
  const tmpBackLog = {
    id: 1,
    text: "Backlog",
    type: "table",
    dateSprint: ["2022-05-10T17:00:00.000Z", "2022-05-12T17:00:00.000Z"],
    kabanData: kanbanDataBacklog,
  };
  console.log(tmpBackLog);
  for (let i = 0; i < data.taskNoSprintId.length; i++) {
    // console.log(data.taskNoSprintId[i]);
    let mem = getListMembers(data.taskNoSprintId[i].lstAssignee);
    let tags = getListTag(data.taskNoSprintId[i].tags);
    const tmpTask = {
      id: data.taskNoSprintId[i].id,
      taskId: data.taskNoSprintId[i].taskNo,
      title: data.taskNoSprintId[i].taskName,
      desc: "",
      progressBar: "15%",
      date: "",
      progressBarColor: "danger",
      progressBarText: "secondary",
      tags: tags,
      members: mem,
      view: "04",
      message: "19",
      file: "02",
      statusClass: "secondary",
      priority: data.taskNoSprintId[i].priority.name,
      priorityClass: "danger",
      creater: data.taskNoSprintId[i].reporter.fullName,
      isTaskId: true,
    };
    if (data.taskNoSprintId[i].status !== null) {
      const targetStatus = tmpBackLog.kabanData.find(
        (el) => el.id === data.taskNoSprintId[i].status.id
      );
      // tmpTask.statusId=data.taskNoSprintId[i].status.id;
      targetStatus.tasks.push(tmpTask);
    } else {
      tmpBackLog.kabanData[0].tasks.push(tmpTask);
    }
  }
  tmpBackLog.kabanData.sort((el1, el2) => el1.step - el2.step);
  dataArr.push(tmpBackLog);
  // debugger
  const kanbanDataSprint = getDataKanbanSprint(data.sprint, projectData);
  const listData = dataArr.concat(kanbanDataSprint);
  // debugger
  return listData;
};

const getDataKanbanSprint = (dataTask, projectData) => {
  // debugger;
  const listSprint = [];
  const kanbanDataSprint = [];
  kanbanDataSprint.push({
    id: -1,
    name: "No Status",
    // badge: 0,
    badgeClass: "success",
    step: 0,
    tasks: [],
  });
  for (let i in projectData.status) {
    const tempStatus = {
      id: projectData.status[i].id,
      name: projectData.status[i].name,
      // badge: 0,
      badgeClass: "success",
      step: projectData.status[i].step,
      tasks: [],
    };
    kanbanDataSprint.push({ ...tempStatus });
  }
  for (let i in projectData.sprints) {
    const tmpSprint = {
      id: projectData.sprints[i].id,
      text: projectData.sprints[i].sprintName,
      type: "table",
      dateSprint: [
        projectData.sprints[i].startDay,
        projectData.sprints[i].finishDay,
      ],
    };
    tmpSprint.kabanData = [...kanbanDataSprint];
    listSprint.push({ ...tmpSprint });
  }
  const tmpListSprint = JSON.stringify(listSprint);
  const sprint = JSON.parse(tmpListSprint);

  for (let i in dataTask) {
    let mem = getListMembers(dataTask[i].lstAssignee);
    let tags = getListTag(dataTask[i].tags);
    const tmpTask = {
      id: dataTask[i].id,
      taskId: dataTask[i].taskNo,
      title: dataTask[i].taskName,
      desc: "",
      progressBar: "15%",
      date: "",
      progressBarColor: "danger",
      progressBarText: "secondary",
      tags: tags,
      members: mem,
      view: "04",
      message: "19",
      file: "02",
      statusClass: "secondary",
      priority: dataTask[i].priority.name,
      priorityClass: "danger",
      creater: dataTask[i].reporter.fullName,
      isTaskId: true,
    };
    const sprintTarget = sprint.find((el) => el.id === dataTask[i].sprint.id);
    if (dataTask[i].status !== null) {
      const targetStatus = sprintTarget.kabanData.find(
        (el) => el.id === dataTask[i].status.id
      );
      tmpTask.sprintId = dataTask[i].sprint.id;
      tmpTask.statusId = dataTask[i].status.id;
      // targetStatus.badge++;
      targetStatus.sprintId = dataTask[i].sprint.id;
      targetStatus.tasks.push(tmpTask);
    } else {
      tmpTask.sprintId = dataTask[i].sprint.id;
      // sprintTarget.kabanData[0].badge++;
      sprintTarget.kabanData[0].sprintId = dataTask[i].sprint.id;
      sprintTarget.kabanData[0].tasks.push(tmpTask);
    }
  }
  // debugger;
  return sprint;
};

const checkSprintExist = (listSprint, sprint) => {
  for (let i in listSprint) {
    if (listSprint[i].id === sprint.id) {
      return i;
    }
  }
  return -1;
};

const checkStatusExist = (kanbanData, nameStatus) => {
  for (let index in kanbanData) {
    if (kanbanData[index].name === nameStatus) {
      return index;
    }
  }
  return -1;
};

const getListMembers = (listMembers) => {
  // console.log(listMembers)
  const arrMem = [];
  for (let index in listMembers) {
    const tmp = {
      id: index + 1,
      fullName: listMembers[index].fullName,
      img: listMembers[index].avatarPic,
    };
    arrMem.push(tmp);
  }
  return arrMem;
};

const getListTag = (listTags) => {
  const arrTag = [];
  for (let i in listTags) {
    const tmp = {
      tag: listTags[i].name,
    };
    arrTag.push(tmp);
  }
  return arrTag;
};

const getIndexSprint = (tabSprint, sprintId) => {
  const func = (element) => element.id === sprintId;
  return tabSprint.findIndex(func);
};

const findIndexStatus = (data, status) => {
  console.log(data);
  console.log(status);
  debugger;
  for (let index = 0; index < data.length; index++) {
    // console.log(index)
    if (data[index].id === status.id) {
      console.log(data[index].id);
      console.log(status.id);
      console.log(index);
      return index;
    }
  }
  return -1;
  // const func = (element) => element.id === status.id
  // const rs = data.findIndex(func)
  // console.log(rs)
};

const findTaskRemove = (listStatus, idTask) => {
  // console.log(listStatus)
  // console.log(idTask)
  for (let i in listStatus) {
    for (let index in listStatus[i].tasks) {
      if (listStatus[i].tasks[index].id === idTask) {
        return listStatus[i];
      }
    }
  }
  return null;
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

const getOptionStatus = (listStatus) => {
  console.log(listStatus);
  const tmp = [];
  tmp.push({
    id: -1,
    value: "No Status",
    label: "No Status",
  });
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

export default KanbanBoard;
