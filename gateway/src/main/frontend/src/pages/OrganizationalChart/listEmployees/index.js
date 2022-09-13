import React, { useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import TableEmployeePart from './TableEmployeePart';
import ModalAddTeamPart from '../components/modal/ModalAddTeamPart';

export default function ListEmployeePart() {
  const { part } = useParams();
  const openModal = useRef();
  const tableRef = useRef();

  const handleAddMember = () => {
    openModal.current.current.setOpen(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={`${part} - Employee List`} pageTitle="HR Center" />
          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md={9} className="d-flex align-items-end">
                      <h4>{`List Employees ${part}`}</h4>
                    </Col>
                    <Col md={3} className="d-flex justify-content-end">
                      <Button color="success" outline onClick={handleAddMember}>
                        <i className="mdi mdi-plus-circle-outline me-1"></i>
                        Add Members to Part
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <TableEmployeePart ref={tableRef} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ModalAddTeamPart resetTable={() => tableRef.current()} ref={openModal} />
      </div>
    </React.Fragment>
  );
}
