import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import DeleteModal from "../../../Components/Common/DeleteModal";
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
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "../../../Components/Editor";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import Flatpickr from "react-flatpickr";
import Dropzone from "react-dropzone";
import Select from "react-select";
import classnames from "classnames";

import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import style from "./List.module.css";
import { ToastContainer, toast } from "react-toastify";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { showErrorNotice, showSuccessNotice } from "../../../utils/toastify";

import OverviewTab from "../project-view/OverviewTab";
import DocumentsTab from "../project-view/DocumentsTab";
import ActivitiesTab from "../project-view/ActivitiesTab";
import TeamTab from "../project-view/TeamTab";
import StatusTab from "../project-view/StatusTab";
import { element, number, object } from "prop-types";
import employeeApi from "../../../api/employee/employeeApi";
import apiproject from "../../../api/listproject";

import slack from "../../../assets/images/brands/slack.png";
import BackdropLoading from "../../../Components/BackdropLoading";
import Modalviewproject from "./Modalviewproject";
import Modalcreateproject from "./Modalcreateproject";
import Viewcardtype from "./Viewcardtype";
import Viewtabletype from "./Viewtabletype";
import Modaleditproject from "./Modaleditproject";
import { useSelector } from "react-redux";

const List = (props) => {
  // const [projectList,setProjectList] = useState(props.projectList);
  // const arrayProject = props.projectList;
  // const loadDataProject = props.loadDataProject;
  // const onFilterProject = props.onFilterProject;
  // console.log(arrayProject);
  const [modalCreateProject, setmodalCreateProject] = useState(false);

  const [dataProject, setDataProject] = useState();

  const userLogin = useSelector((state) => state.userprofile.userInfo);

  const [projectList, setProjectList] = useState([]);

  // const loadDataProject = () => {
  //   console.log("first")
  // }

  const closedCreateProject = () => {
    setmodalCreateProject(false);
  };
  const openCreateProject = () => {
    setmodalCreateProject(true);
  };

  const [modalProject, setModalProject] = useState(false);

  const closedView = () => {
    setModalProject(false);
  };

  const [record, setRecord] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteOrder = () => {
    console.log(record);
    apiproject
      .deleteProject(record.id)
      .then((res) => {
        setDeleteModal(false);
        showSuccessNotice("Delete Success");
        getDataProject();
      })
      .catch((err) => {
        showErrorNotice(err);
      });
  };

  const openModalView = (index) => {
    if (typeof index === "object") {
      index = getIndexById(index, projectList.lstProject);
    }
    setDataProject(projectList.lstProject[index]);
    setModalProject(true);
  };

  const deleteRecord = (record) => {
    // console.log(record)
    setRecord(record);
    setDeleteModal(true);
  };

  const SingleOptions = [
    { value: "Watches", label: "Watches" },
    { value: "Headset", label: "Headset" },
    { value: "Sweatshirt", label: "Sweatshirt" },
    { value: "20% off", label: "20% off" },
    { value: "4 star", label: "4 star" },
  ];

  const [selectedMulti, setselectedMulti] = useState(null);

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  //Dropzone file upload
  const [selectedFiles, setselectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

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

  const [typeProject, setTypeProject] = useState("Table");

  const handleTypeProject = (event) => {
    setTypeProject(event.target.value);
  };

  const [idxDelBoard, setIdxDelBoard] = useState(null);

  const [deleteModalBoard, setDeleteModalBoard] = useState(false);

  const handleDeleteBoard = () => {
    console.log(idxDelBoard);
    apiproject
      .deleteProject(idxDelBoard)
      .then((res) => {
        setDeleteModalBoard(false);
        showSuccessNotice("Delete Success");
        getDataProject();
      })
      .catch((err) => {
        showErrorNotice(err);
      });
  };

  const deleteBoardRecord = (id) => {
    setIdxDelBoard(id);
    setDeleteModalBoard(true);
  };

  const [modalEditProject, setModalEditProject] = useState(false);
  const editBoardRecord = (index) => {
    if (typeof index === "object") {
      index = getIndexById(index, projectList.lstProject);
    }
    setDataProject(projectList.lstProject[index]);
    setModalEditProject(true);
  };

  const closedEditProject = () => {
    setModalEditProject(false);
  };

  const [nameSearch, setNameSearch] = useState("");
  const changeNameSearch = (event) => {
    // console.log(event.target.value)
    setNameSearch(event.target.value);
  };

  const [deadLineSearch, setDeadLineSearch] = useState(null);
  const changeDeadLineSearch = (date) => {
    // console.log(date)
    setDeadLineSearch(date);
  };

  const [userIdCurrent,setUserIdCurrent] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);
      apiproject
        .filterProject(nameSearch, deadLineSearch)
        .then((res) => {
          setProjectList(res);
          setLoading(false);
        })
        .catch((err) => {
          showErrorNotice(err);
          setLoading(false);
        });
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [nameSearch]);

  useEffect(() => {
    if (deadLineSearch !== null && deadLineSearch.length === 2) {
      setLoading(true);
      apiproject
        .filterProject(nameSearch, deadLineSearch)
        .then((res) => {
          setProjectList(res);
          setLoading(false);
        })
        .catch((err) => {
          showErrorNotice(err);
          setLoading(false);
        });
    }
  }, [deadLineSearch]);

  // useEffect(() => {
  //   setProjectList(arrayProject);
  // }, []);

  const [loading, setLoading] = useState(false);
  const getDataProject = () => {
    setLoading(true);
    apiproject
      .filterProject(nameSearch, deadLineSearch)
      .then((res) => {
        setProjectList(res);
        setLoading(false);
      })
      .catch((error) => {
        showErrorNotice(error);
        setLoading(false);
      });
  };

  const onEnterSearch = (event) => {
    if (event.code === "Enter") {
      setLoading(true);
      apiproject
        .filterProject(nameSearch, deadLineSearch)
        .then((res) => {
          setProjectList(res);
          setLoading(false);
        })
        .catch((error) => {
          showErrorNotice(error);
          setLoading(false);
        });
    }
  };

  // console.log(arrayProject)
  // console.log(projectList);

  return (
    <React.Fragment>
      {loading && <BackdropLoading />}
      <div className="card">
        <div className="card-body">
          <Row className="g-4 mb-3">
            <div className="col-sm-auto">
              <div>
                {/* <Link to="/apps-projects-create" className="btn btn-success">
              <i className="ri-add-line align-bottom me-1"></i> Add New
            </Link> */}
                <Button color="success" onClick={openCreateProject}>
                  <i className="ri-add-line align-bottom me-1"></i> Add New
                </Button>
              </div>
            </div>
            <div className="col-sm">
              <div className="d-flex justify-content-sm-end gap-2">
                <div className="search-box ms-2">
                  <Input
                    value={nameSearch}
                    onChange={(event) => {
                      changeNameSearch(event);
                    }}
                    onKeyUp={(event) => {
                      onEnterSearch(event);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Search project name..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
                <div className="w-md">
                  <Flatpickr
                    value={deadLineSearch}
                    onChange={(date) => {
                      changeDeadLineSearch(date);
                    }}
                    className="form-control"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                    }}
                  />
                </div>

                <div className="w-md">
                  <select
                    className="form-select"
                    data-choices
                    data-choices-search-false
                    value={typeProject}
                    onChange={(event) => {
                      handleTypeProject(event);
                    }}
                  >
                    <option value="Table">Table</option>
                    <option value="Board">Board</option>
                  </select>
                </div>
                {/* <div className="w-md">
                  <select
                    className="form-select"
                    data-choices
                    data-choices-search-false
                  >
                    <option value="All">All</option>
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="This Month">This Month</option>
                    <option value="Last Year">Last Year</option>
                  </select>
                </div> */}
              </div>
            </div>
          </Row>

          <div className="row" style={{ margin: "auto" }}>
            {typeProject === "Table" ? (
              <Viewtabletype
                listData={projectList.lstProject}
                openModalView={openModalView}
                deleteRecord={deleteRecord}
                editBoardRecord={editBoardRecord}
              ></Viewtabletype>
            ) : (
              <Viewcardtype
                listData={projectList.lstProject}
                openModalView={openModalView}
                deleteBoardRecord={deleteBoardRecord}
                editBoardRecord={editBoardRecord}
              />
            )}
          </div>
        </div>
      </div>

      {modalCreateProject && (
        <Modalcreateproject
          modalCreateProject={modalCreateProject}
          closedCreateProject={closedCreateProject}
          loadDataProject={getDataProject}
          userLogin={userLogin}
        />
      )}
      {modalProject && (
        <Modalviewproject
          modalProject={modalProject}
          closedView={closedView}
          dataProject={dataProject}
          userLogin={userLogin}
        />
      )}
      {modalEditProject && (
        <Modaleditproject
          modalEditProject={modalEditProject}
          closedEditProject={closedEditProject}
          loadDataProject={getDataProject}
          dataProject={dataProject}
          userLogin={userLogin}
        />
      )}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalBoard}
        onDeleteClick={handleDeleteBoard}
        onCloseClick={() => setDeleteModalBoard(false)}
      />
    </React.Fragment>
  );
};

const getIndexById = (find, data) => {
  const findFunction = (element) => element.id === find.id;
  const index = data.findIndex(findFunction);
  return index;
};

export default List;
