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
import ModalProject from "./ModalProject";

export default function ProjectExp(prop) {
  const [project, setProject] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create Project employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateProject = () => {
    setTypeModal((pre) => ({ type: "create Project employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditProject = (original) => {
    setTypeModal((pre) => ({
      type: "update Project employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteProject = (original) => {
    const callApiDeleteProject = async () => {
      await employeeApi
        .deleteProject(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListProject();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteProject
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
          <DropdownItem onClick={() => handleEditProject(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteProject(original)}>
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
        Header: 'Start Year',
        accessor: 'startYear',
      },
      {
        Header: 'Project Time',
        accessor: 'projectTime',
      },
      {
        Header: 'Number People',
        accessor: 'numberPeople',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Job Description',
        accessor: 'jobDescription',
      },
      {
        Header: 'Technology Used',
        accessor: 'technologyUsed',
      },
      {
        Header: 'Implementation Company',
        accessor: 'implementationCompany',
      },
      {
        Header: 'Customer',
        accessor: 'customer',
      },
    ],
    [],
  );

  const getListProject = async () => {
    const response = await employeeApi.getProjectsByEmployeeId(prop.id);
    console.log(response + 'aloha' + prop.id)
    setProject({ loading: false, data: response });
  };

  useEffect(() => {
    getListProject();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List Project</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateProject}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Project
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={project.data} />
      <ModalProject
        ref={openModal}
        action={() => getListProject()}
        typeModal={typeModal}
      />
    </div>
  );
}
