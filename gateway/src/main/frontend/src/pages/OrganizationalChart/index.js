import React, { useState, useRef } from "react";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { viewPartDefault } from "../../store/organizational/organizational";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DepartmentMultiList from "./DepartmentMultiList";
import Infomation from "./Infomation";
import "./style/departmentChart.scss";
import "./style/infomation.scss";
import "./style/orgTreeDepartment.scss";
import "./style/modalStyle.scss";
import ImportExcelPart from "./components/modal/ImportExcelPart";

export default function OrganizationalChart() {
  document.title = "HR Center - Organizational Chart";
  const [view, setView] = useState("multi");
  const [partDetail, setpartDetail] = useState();
  const dispatch = useDispatch();
  const modalImport = useRef();
  const [showInfo, setShowInfo] = useState();

  const handleChooseView = (e) => {
    setView(e.target.value);
    dispatch(viewPartDefault());
  };

  const handleOpenModalImport = () => {
    modalImport.current.openModal.current.setOpen(true);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Organizational Chart" pageTitle="HR Center" />
          <Row>
            <Col className="col-12 col-md-6">
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
            <Col className="col-12 col-md-6">
              <div className="text-end">
                <Button
                  color="success"
                  outline
                  style={{ minWidth: "100px" }}
                  onClick={handleOpenModalImport}
                >
                  <i
                    className="mdi mdi-file-excel-outline"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Import
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={`col-12 ${showInfo ? "col-md-6" : "col-md-12"}`}>
              <DepartmentMultiList
                showInfo={setShowInfo}
                setpartDetail={setpartDetail}
                view={view}
              />
            </Col>
            <Col className="col-12 col-md-6">
              {showInfo && (
                <Infomation
                  showInfo={setShowInfo}
                  partDetail={partDetail}
                  setpartDetail={setpartDetail}
                />
              )}
            </Col>
          </Row>
        </Container>
        <ImportExcelPart ref={modalImport} />
      </div>
    </React.Fragment>
  );
}
