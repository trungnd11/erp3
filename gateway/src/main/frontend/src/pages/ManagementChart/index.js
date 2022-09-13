import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import OrgManagementTree from "./OrgManagementTree";
import apiDepartment from "../../api/department";
import { useDispatch, useSelector } from "react-redux";
import MultiManagementChart from "./MultiManagementChart";
import { departments } from "../../store/organizational/organizational";

export default function ManagementChart() {
  document.title = "HR Center - Management Chart";
  const [view, setView] = useState("multi");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [infoPart, setInfoPart] = useState();
  const [searchEmployee, setsearchEmployee] = useState("");
  const dispart = useDispatch();

  const handleChooseView = (e) => {
    setView(e.target.value);
  };

  const handleInputPartChange = (val) => {
    setSearchDepartment(val);
  };

  const findDepartmentOption = async () => {
    const response = await apiDepartment.findDepartmentByName(searchDepartment);
    const { data } = response;
    return data.map((item) => ({
      ...item,
      label: `${item.code} - ${item.name}`,
      value: item.id,
    }));
  };

  const handleChoosePart = (value) => {
    setInfoPart(value);
  };

  useEffect(() => {
    dispart(departments());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Organizational Chart" pageTitle="HR Center" />
          <Row>
            <Col className="col-12 col-md-4">
              <Row>
                <Col className="col-12 col-md-12 col-lg-3">
                  <Label htmlFor="choose-chart" className="pt-2">
                    Department
                  </Label>
                </Col>
                <Col className="col-12 col-md-12 col-lg-9">
                  <AsyncSelect
                    name="name"
                    placeholder="Enter Name or Id..."
                    onChange={handleChoosePart}
                    cacheOptions
                    loadOptions={findDepartmentOption}
                    defaultOptions
                    onInputChange={handleInputPartChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="col-12 col-md-4">
              <Row>
                <Col className="col-12 col-md-12 col-lg-3">
                  <Label htmlFor="choose-chart" className="pt-2">
                    Choose Chart
                  </Label>
                </Col>
                <Col className="col-12 col-md-12 col-lg-9">
                  <Input
                    id="choose-chart"
                    type="select"
                    onChange={handleChooseView}
                  >
                    <option value="multi">Multi-level list</option>
                    <option value="tree">List off tree</option>
                  </Input>
                </Col>
              </Row>
            </Col>
            <Col className="col-12 col-md-4">
              <FormGroup row>
                <Label for="search-part" sm={2}>
                  Search
                </Label>
                <Col sm={10}>
                  <Input
                    id="search-part"
                    name="employee"
                    placeholder="Enter employee name"
                    type="text"
                    onChange={(e) => setsearchEmployee(e.target.value)}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            {view === "tree" ? (
              <OrgManagementTree info={infoPart} />
            ) : (
              <MultiManagementChart info={infoPart} search={searchEmployee} />
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
