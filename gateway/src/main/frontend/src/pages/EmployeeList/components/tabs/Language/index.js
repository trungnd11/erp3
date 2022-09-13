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
import ModalLanguage from "./ModalLanguage";

export default function Language(prop) {
  const [language, setLanguage] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create language employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateLanguage = () => {
    setTypeModal((pre) => ({ type: "create Language employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditLanguage = (original) => {
    setTypeModal((pre) => ({
      type: "update Language employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteLanguage = (original) => {
    const callApiDeleteLanguage = async () => {
      await employeeApi
        .deleteLanguage(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListLanguage();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteLanguage
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
          <DropdownItem onClick={() => handleEditLanguage(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteLanguage(original)}>
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Listen',
        accessor: 'useListen',
      },
      {
        Header: 'Read',
        accessor: 'useRead',
      },
      {
        Header: 'Write',
        accessor: 'useWrite',
      },
      {
        Header: 'Understand',
        accessor: 'understand',
      },
      {
        Header: 'Note',
        accessor: 'note',
      },
    ],
    [],
  );

  const getListLanguage = async () => {
    const response = await employeeApi.getLanguageByEmployeeId(prop.id);
    console.log(response + 'aloha' + prop.id)
    setLanguage({ loading: false, data: response });
  };

  useEffect(() => {
    getListLanguage();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List Language</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateLanguage}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Language
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={language.data} />
      <ModalLanguage
        ref={openModal}
        action={() => getListLanguage()}
        typeModal={typeModal}
      />
    </div>
  );
}
