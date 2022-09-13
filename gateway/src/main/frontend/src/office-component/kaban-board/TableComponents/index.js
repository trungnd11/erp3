import React, { useState, useEffect, useMemo, useCallback } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import style from "./style.module.css";
import Offcanvasview from "../Offcanvasview"

// Import Scroll Bar - SimpleBar
import SimpleBar from "simplebar-react";

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Label,
  Input,
  Button,
  ModalHeader,
  FormFeedback,
  Form,
} from "reactstrap";

import {
  OrdersId,
  Project,
  Tasks,
  CreateBy,
  AssignedTo,
  DueDate,
  Status,
  Priority,
  HashTag
} from "./TaskListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { element } from 'prop-types';

const TableComponents = (props) => {
  const openDelRecord = props.openDelRecord
  const editRecord = props.editRecord
  const data = props.data;
  // console.log(data)
  const searchData = props.searchData
  // console.log(searchData)
  // const [tableData,setTableData] = useState(getTableData(data))
  const [dataTableSearch,setDataTableSearch] = useState()

  useEffect(() => {
    // setTableData(value)
    const value = getTableData(data,searchData)
    setDataTableSearch(value)
  }, [data,searchData]);

  // console.log(tableData);
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState([]);
  const [TaskList, setTaskList] = useState([]);

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  const [openView,setopenView] = useState(false);

  const closeView = () => {
    setopenView(false)
  }

  const [taskData,setTaskData] = useState();

  const handleOpenView = (taskData) => {
    setopenView(true)
    setTaskData(taskData)
  }

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task) => {
    setTask(task);
    setDeleteModal(true);
  };

  // Update Data
  const handleCustomerClick = useCallback(
    (arg) => {
      const task = arg;

      setTask({
        id: task.id,
        taskId: task.taskId,
        project: task.project,
        task: task.task,
        creater: task.creater,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
        subItem: task.subItem,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />;
      //   },
      // },
      // {
      //   Header: "Order ID",
      //   accessor: "taskId",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <OrdersId {...cellProps} />;
      //   },
      // },
      //   {
      //     Header: "Project",
      //     accessor: "project",
      //     filterable: false,
      //     Cell: (cellProps) => {
      //       return <Project {...cellProps} />;
      //     },
      //   },
      {
        Header: "Tasks",
        accessor: "task",
        filterable: false,
        Cell: (cellProps) => {
          return (
            <React.Fragment>
              <div className="d-flex">
                <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
              </div>
            </React.Fragment>
          );
        },
      },
      {
        Header: "Creator Name",
        accessor: "creater",
        filterable: false,
        Cell: (cellProps) => {
          return <CreateBy {...cellProps} />;
        },
      },
      {
        Header: "Assigned To",
        accessor: "subItem",
        filterable: false,
        Cell: (cell) => {
          const assigned = cell.value.map((item) =>
            item.img ? item.img : item
          );
          return (
            <React.Fragment>
              <div className="avatar-group">
                {/* {assigned.map((item, index) => (
                  <Link key={index} to="#" className="avatar-group-item">
                    <img
                      src={item}
                      alt=""
                      className="rounded-circle avatar-xxs"
                    />
                  </Link>
                ))} */}
                {cell.value.map((item, index) => (
                  <Link
                    key={index}
                    to="#"
                    className={`avatar-group-item`}
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-placement="top"
                    title={item.fullName}
                  >
                    {item.avatarPic ? (
                      <img
                        src={item.avatarPic}
                        alt=""
                        className="rounded-circle avatar-xxs"
                      />
                    ) : (
                      <div className={`avatar-xxs`}>
                        <div className="avatar-title rounded-circle bg-secondary">
                          ?
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </React.Fragment>
          );
        },
      },
      // {
      //   Header: "Due Date",
      //   accessor: "dueDate",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <DueDate {...cellProps} />;
      //   },
      // },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Priority",
        accessor: "priority",
        filterable: false,
        Cell: (cellProps) => {
          return <Priority {...cellProps} />;
        },
      },
      {
        Header: "HashTag",
        accessor: "tags",
        filterable: false,
        colWidth:200,
        Cell: (cellProps) => {
          return <HashTag {...cellProps} />;
        },
      },
      {
        Header: "Action",
        colWidth: 140,
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to={`/tasks-detail/${cellProps.row.original.id}`} 
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const taskData = cellProps.row.original;
                    editRecord(taskData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const taskData = cellProps.row.original;
                    openDelRecord(taskData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    // [handleCustomerClick]
  );

  return (
    <React.Fragment>
      <div
        className={`${style.show_hide_icon} card-body`}
        style={{ paddingRight: "unset", paddingLeft: "unset" }}
      >
        <TableContainer
          columns={columns}
          data={dataTableSearch ? dataTableSearch : []}
          isGlobalFilter={false}
          isAddUserList={false}
          customPageSize={8}
          className="custom-header-css"
          divClass="table-responsive mb-4"
          tableClass="align-middle table-nowrap mb-0"
          theadClass="table-light table-nowrap"
          thClass="table-light text-muted"
          handleTaskClick={handleTaskClicks}
        />
      </div>
      <Offcanvasview openView={openView} taskData={taskData} closeView={closeView} />
    </React.Fragment>
  );
};

const getTableData = (tableData,searchData) => {
  // console.log(searchData)
  // console.log(tableData)
  const tmpData = [];
  for(let item in tableData) {
    for(let task in tableData[item].tasks) {
      const temp = {
        id:tableData[item].tasks[task].id,
        taskId:tableData[item].tasks[task].taskId,
        task:tableData[item].tasks[task].title,
        creater:tableData[item].tasks[task].creater,
        subItem:tableData[item].tasks[task].members,
        // dueDate:tableData[item].tasks[task].date,
        tags:tableData[item].tasks[task].tags,
        status:tableData[item].name,
        statusClass:tableData[item].tasks[task].statusClass,
        priority:tableData[item].tasks[task].priority,
        priorityClass:tableData[item].tasks[task].priorityClass,
      }
      tmpData.push(temp);
    }
  }
  // console.log(tmpData)
  let rsSearchText = [...tmpData]
  if(searchData.searchText !== '') {
    const funcFindText = (element) => (element.task.toUpperCase().indexOf(searchData.searchText.toUpperCase()) > -1 || element.tags.findIndex((el) => el.tag.toUpperCase().indexOf(searchData.searchText.toUpperCase())  > -1) > -1)
    rsSearchText = tmpData.filter(funcFindText)
  }
  if(searchData.searchStatus !== undefined && searchData.searchStatus !== null) {
    const funcFindStatus = (element) => element.status.toUpperCase().indexOf(searchData.searchStatus.value.toUpperCase()) > -1
    rsSearchText = rsSearchText.filter(funcFindStatus)
    // console.log(rsSearchText)
  }
  if(searchData.searchPriority !== undefined && searchData.searchPriority !== null) {
    const funcFindPriority = (element) => element.priority.toUpperCase().indexOf(searchData.searchPriority.value.toUpperCase()) > -1
    rsSearchText = rsSearchText.filter(funcFindPriority)
    // console.log(rsSearchText)
  }
  
  // console.log(rsData)
  return rsSearchText;
}

export default TableComponents;
