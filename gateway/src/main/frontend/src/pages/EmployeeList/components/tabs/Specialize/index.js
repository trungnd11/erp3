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
import ModalSpecialize from "./ModalSpecialize";

export default function Specialize(prop) {
  const [specialize, setSpecialize] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create Specialize employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateSpecialize = () => {
    setTypeModal((pre) => ({ type: "create Specialize employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditSpecialize = (original) => {
    setTypeModal((pre) => ({
      type: "update Specialize employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteSpecialize = (original) => {
    const callApiDeleteSpecialize = async () => {
      await employeeApi
        .deleteSpecialize(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListSpecialize();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteSpecialize
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
          <DropdownItem onClick={() => handleEditSpecialize(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteSpecialize(original)}>
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
        Header: 'specialize',
        accessor: 'specialize',
      },
      {
        Header: 'Usage Time',
        accessor: 'usageTime',
      },
      {
        Header: 'Last Used Time',
        accessor: 'lastUsedTime',
      },
      {
        Header: 'Note',
        accessor: 'note',
      },
    ],
    [],
  );

  const getListSpecialize = async () => {
    const response = await employeeApi.getSpecializeByEmployeeId(prop.id);
    console.log(response + 'aloha' + prop.id)
    setSpecialize({ loading: false, data: response });
  };

  useEffect(() => {
    getListSpecialize();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List Specialize</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateSpecialize}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Specialize
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={specialize.data} />
      <ModalSpecialize
        ref={openModal}
        action={() => getListSpecialize()}
        typeModal={typeModal}
      />
    </div>
  );
}
