/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../../../Components/Common/TableContainer';
import employeeApi from "../../../../../api/employee/employeeApi";
import ModalCertificate from './ModalCertificate';
import { Alert, SweetAlertComfirm } from '../../../../../Components/Common/Alert';

export default function Certificate(prop) {
  const openModal = useRef();
  const [certificateData, setCertificateData] = useState({ loading: true, data: [] });
  const [certificateType, setCertificateType] = useState({
    type: "create certificate",
    data: "",
  });

  const handleCreateCertificate = () => {
    setCertificateType((pre) => ({ type: "create certificate", data: "" }));
    openModal.current.current.setOpen(true);
  }

  const handleUpdateCertificate = (data) => {
    setCertificateType((pre) => ({ type: "update certificate", data: data }));
    openModal.current.current.setOpen(true);
  }

  const handleDeleteCertificate = (original) => {
    const callApiDeleteCertificate = async () => {
      await employeeApi
        .deleteCertificate(original.id)
        .then(() => {
          Alert("Delete Complete");
          getDataCertificate();
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    };
    SweetAlertComfirm(
      "Are you sure!",
      "You won't be able to revert this!",
      callApiDeleteCertificate
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
          <DropdownItem onClick={() => handleUpdateCertificate(original)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeleteCertificate(original)}>
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
        Header: "Certificate Name",
        accessor: "name",
      },
      {
        Header: "Year completed",
        accessor: "yearCompleted",
      },
      {
        Header: "Degree Unit",
        accessor: "degreeUnit",
      },
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  );

  const getDataCertificate = async () => {
    await employeeApi.getCertificatesByEmployeeId(prop.id).then(response => {
      setCertificateData({ loading: false, data: response });
    })
    
  }

  useEffect(() => {
    getDataCertificate();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <Col md={9} className="d-flex align-items-end">
          <h4>List Certificate employee</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button color="success" outline onClick={handleCreateCertificate}>
            <i className="mdi mdi-plus-circle-outline me-1"></i>
            Add Certificate
          </Button>
        </Col>
      </Row>
      <TableContainer columns={columns} data={certificateData.data} />
      <ModalCertificate typeModal={certificateType} ref={openModal} action={() => getDataCertificate()} />
    </div>
  );
}
