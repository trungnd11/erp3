import { divide } from 'lodash'
import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Container } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "../Components/styles/listWorkFlows.scss";
import TableCommon from '../Components/table';

export default function ListWorkFlows() {
  document.title = "Work - List WorkFlow";

  return (
    <React.Fragment>
      <div className="page-content wapper-list-workflow">
        <Container fluid>
          <BreadCrumb title="List work flow" pageTitle="Works" />
          <Card>
            <CardHeader>
              <div className="title-workflow">
                <CardTitle tag="h5">List WorkFlow</CardTitle>
                <Button outline color="success">
                  <i className="mdi mdi-view-grid-plus-outline"></i>
                  Add WorlFlow
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <TableCommon />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}
