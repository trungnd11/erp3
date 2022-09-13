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
import ModalEducation from "./ModalEducation";

export default function Education(prop) {
  const [educationData, setEducationData] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create education employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateEducation = () => {
    setTypeModal((pre) => ({ type: "create education employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditEductions = (original) => {
    setTypeModal((pre) => ({
      type: "update education employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteEducation = (original) => {
    const callApiDeleteFamilyMember = async () => {
      await employeeApi
        .deleteEducation(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListEducations();
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
          <DropdownItem onClick={() => handleEditEductions(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteEducation(original)}>
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
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => CreateAction(row),
      },
      {
        Header: "Degree",
        accessor: "degree",
      },
      {
        Header: "Course",
        accessor: "course",
      },
      {
        Header: "School Name",
        accessor: "schoolName",
      },
      {
        Header: "Faculty",
        accessor: "faculty",
      },
      {
        Header: "Specialized",
        accessor: "specialized",
      },
      {
        Header: "Classification",
        accessor: "classification",
      },
    ],
    []
  );

  const getListEducations = async () => {
    const response = await employeeApi.getEducaionsByEmployeeId(prop.id);
    setEducationData({ loading: false, data: response });
  };

  useEffect(() => {
    getListEducations();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List educations employee</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateEducation}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Education
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={educationData.data} />
      <ModalEducation
        ref={openModal}
        action={() => getListEducations()}
        typeModal={typeModal}
      />
    </div>
  );
}
