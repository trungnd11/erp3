import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Project, CreateBy, DueDate, TagComponent } from "./Viewtabletypecol";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import noavatar from "../../../assets/images/project/noavatar.png";
import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledCollapse,
  Row,
  Card,
  CardHeader,
  Col,
  Input,
} from "reactstrap";
import classnames from "classnames";
import style from "./view.module.css";
import "./view.css";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import PaginationTable from "../../../Components/pagination/PaginationTable";

const Viewtabletype = (props) => {
  const deleteRecord = props.deleteRecord;
  const editBoardRecord = props.editBoardRecord;
  const openModalView = props.openModalView;
  const listData = props.listData;
  const [tableData, setTableData] = useState(getTableData(listData));

  useEffect(() => {
    setTableData(getTableData(listData));
  }, [listData]);
  //   console.log(tableData);
  const [task, setTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  // Add Data
  //   const handleTaskClicks = () => {
  //     setTask("");
  //     setIsEdit(false);
  //     toggle();
  //   };

  //   const [order, setOrder] = useState([]);

  //   const [deleteModal, setDeleteModal] = useState(false);

  //   const onClickDelete = (order) => {
  //     setOrder(order);
  //     // setDeleteModal(true);
  //   };

  //   const handleDeleteOrder = () => {
  //     console.log(order);
  //   };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
    }
  }, [modal]);
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
  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />;
      //   },
      // },
      {
        Header: "Project",
        accessor: "project",
        filterable: false,
        Cell: (cellProps) => {
          return <Project {...cellProps} />;
        },
      },
      {
        Header: "List Members",
        accessor: "subItem",
        filterable: false,
        Cell: (cell) => {
          //   console.log(cell);
          return (
            <React.Fragment>
              <div className="avatar-group">
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
      {
        Header: "Tasks",
        accessor: "task",
        colWidth: 140,
        filterable: false,
        Cell: (cellProps) => {
          return <div>{cellProps.value}</div>;
        },
      },
      {
        Header: "DeadLine",
        accessor: "deadline",
        colWidth: 140,
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },
      {
        Header: "Team Leader",
        accessor: "teamleader",
        colWidth: 140,
        filterable: false,
        Cell: (cellProps) => {
          return <CreateBy {...cellProps} />;
        },
      },
      {
        Header: "Tags",
        accessor: "tag",
        colWidth: 200,
        filterable: false,
        Cell: (cellProps) => {
          return <TagComponent {...cellProps} />;
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
                  to="#"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    openModalView(orderData);
                  }}
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
                    const orderData = cellProps.row.original;
                    editBoardRecord(orderData);
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
                    const orderData = cellProps.row.original;
                    deleteRecord(orderData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ]
    // [handleCustomerClick]
  );

  return (
    <React.Fragment>
      <TableContainer
        columns={columns}
        data={tableData}
        isGlobalFilter={false}
        isAddUserList={false}
        customPageSize={10}
        className="custom-header-css"
        divClass="table-responsive mb-4 he-100 p-0"
        tableClass="align-middle table-nowrap mb-0"
        theadClass="table-light table-nowrap"
        thClass="table-light text-muted"
        // handleTaskClick={handleTaskClicks}
      />
      {/* <PaginationTable
        className="pagination-bar"
        currentPage={pageInfo.page + 1}
        totalCount={pageInfo.totalElements}
        pageSize={pageInfo.size}
        onPageChange={onChangePage}
      /> */}
    </React.Fragment>
  );
};

const getTableData = (tableData) => {
  // console.log(tableData)
  const tmpData = [];
  for (let item in tableData) {
    const temp = {
      id: tableData[item].id,
      project: tableData[item].projectName,
      task: tableData[item].totalTask,
      subItem: tableData[item].lstMember,
      deadline: tableData[item].deadLine,
      tag: tableData[item].tags,
      teamleader: tableData[item].teamLead,
    };
    tmpData.push(temp);
  }
  return tmpData;
};

export default Viewtabletype;
