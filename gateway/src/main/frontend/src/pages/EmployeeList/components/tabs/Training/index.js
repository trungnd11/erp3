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
import ModalTraining from "./ModalTraining";

export default function Training(prop) {
  const [training, setTraining] = useState({
    loading: true,
    data: [],
  });
  const [typeModal, setTypeModal] = useState({
    type: "create training employee",
    data: "",
  });
  const openModal = useRef();

  const handleCreateTraining = () => {
    setTypeModal((pre) => ({ type: "create training employee", data: "" }));
    openModal.current.current.setOpen(true);
  };

  const handleEditTraining = (original) => {
    setTypeModal((pre) => ({
      type: "update training employee",
      data: original,
    }));
    openModal.current.current.setOpen(true);
  };

  const handleDeleteTraining = (original) => {
    const callApiDeleteTraining = async () => {
      await employeeApi
        .deleteTraining(original.id)
        .then(() => {
          Alert("Delete Complete");
          getListTraining();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteTraining
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
          <DropdownItem onClick={() => handleEditTraining(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteTraining(original)}>
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
        Header: 'Year Completed',
        accessor: 'yearCompleted',
      },
      {
        Header: 'Degree unit',
        accessor: 'degreeUnit',
      },
      {
        Header: 'Note',
        accessor: 'note',
      },
    ],
    [],
  );

  const getListTraining = async () => {
    const response = await employeeApi.getTrainingsByEmployeeId(prop.id);
    console.log(response + 'aloha' + prop.id)
    setTraining({ loading: false, data: response });
  };

  useEffect(() => {
    getListTraining();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List training</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateTraining}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add training
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={training.data} />
      <ModalTraining
        ref={openModal}
        action={() => getListTraining()}
        typeModal={typeModal}
      />
    </div>
  );
}
