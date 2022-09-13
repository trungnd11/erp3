/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import TableContainer from "../../../../../Components/Common/TableContainer";
import employeeApi from "../../../../../api/employee/employeeApi";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  Alert,
  SweetAlertComfirm,
} from "../../../../../Components/Common/Alert";
import ModalWorkProcess from "./ModalWorkingProcess";
import ModalWorkingProcess from "./ModalWorkingProcess";

export default function WorkProcess(prop) {
  const [workingProcess, setWorkingProcess] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create working process employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateWorkingProcess = () => {
    setTypeModal((pre) => ({ type: "create working process employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditWorkingProcess = (original) => {
    setTypeModal((pre) => ({
      type: "update working process employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteWorkingProcess = (original) => {
    const callApiDeleteWorkingProcess = async () => {
      await employeeApi
        .deleteWorking(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListWorkingProcess();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteWorkingProcess
    );
  };

  const CreateAction = ({ original }) => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          href="#"
          className="btn-soft-secondary btn-sm dropdown"
          tag="button"
        >
          <i className="ri-more-fill align-middle"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem onClick={() => handleEditWorkingProcess(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteWorkingProcess(original)}>
            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => CreateAction(row),
      },
      {
        Header: 'Company Name',
        accessor: 'company',
      },
      {
        Header: 'Finish Date',
        accessor: 'finishDate',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Salary',
        accessor: 'salary',
      },
      {
        Header: 'Job Description',
        accessor: 'jobDescription',
      },
    ],
    [],
  );

  const getListWorkingProcess = async () => {
    const response = await employeeApi.getWorkingByEmployeeId(prop.id);
    console.log(response + 'aloha' + prop.id)
    setWorkingProcess({ loading: false, data: response });
  };

  useEffect(() => {
    getListWorkingProcess();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List Working Process</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateWorkingProcess}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Working Process
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={workingProcess.data} />
      <ModalWorkingProcess
        ref={openModal}
        action={() => getListWorkingProcess()}
        typeModal={typeModal}
      />
    </div>
  );
}
