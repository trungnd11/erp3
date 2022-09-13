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
import "./style.scss";
import { Alert, SweetAlertComfirm } from "../../../../../Components/Common/Alert";
import ModalFamily from "./ModalFamily";

export default function Family(prop) {
  const [familyData, setFamilyData] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({ type: "create member family", data: "" });
  const openModal = useRef();

  const handleCreateMember = () => {
    setTypeModal((pre) => ({ type: "create member family", data: "" }));
    openModal.current.current.setOpen(true);
  }

  const handleEditFamilyMember = (original) => {
    setTypeModal((pre) => ({ type: "update member family", data: original }));
    openModal.current.current.setOpen(true);
  };

  const handleDeletFamilyMember = (original) => {
    const callApiDeleteFamilyMember = async () => {
      await employeeApi
        .deleteEmployeeFamilyMember(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListFamily();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteFamilyMember
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
          <DropdownItem onClick={() => handleEditFamilyMember(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeletFamilyMember(original)}>
            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const columns = React.useMemo(() => [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => CreateAction(row),
    },
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "Relationship",
      accessor: "relationship",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Job",
      accessor: "job",
    },
    {
      Header: "Birthday",
      accessor: "birthday",
    },
  ]);

  const getListFamily = async () => {
    const response = await employeeApi.getEmployeeFamily(prop.id);
    setFamilyData({ loading: false, data: response });
  };

  useEffect(() => {
    getListFamily();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List members employee</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateMember}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Member Family
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={familyData.data} />
      <ModalFamily
        action={() => getListFamily()}
        typeModal={typeModal}
        ref={openModal}
      />
    </div>
  );
}
