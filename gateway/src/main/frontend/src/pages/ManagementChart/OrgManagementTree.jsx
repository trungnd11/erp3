/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import employeeApi from "../../api/employee/employeeApi";
import OrgManagementChart from "./components/chart/OrgManagementChart";
import "./components/styles/orgManagementTree.scss";
import Infomation from "./Infomation";

export default function OrgManagementTree({ info }) {
  const [data, setData] = useState();
  const [employeeId, setEmployeeId] = useState(0);
  const [showInfo, setShowInfo] = useState({
    data: {},
    isOpen: false,
  });
  const department = useSelector((state) => state.organizational);
  let addNodeChildFunc = null;

  // eslint-disable-next-line no-unused-vars
  function addNode() {
    const node = {
      nodeId: "new Node",
      parentNodeId: "O-6066",
    };

    addNodeChildFunc(node);
  }

  async function onNodeClick(nodeId) {
    setEmployeeId(nodeId);
    await employeeApi.getDataEmployeeByID(nodeId).then((data) => {
      setShowInfo({ data, isOpen: true });
    });
  }

  const getEmployeesByDepartment = async (id, managerId) => {
    await employeeApi.getEmployeeByDepartment(id).then((response) => {
      const dataEmployee = response.map((item) => ({
        ...item,
        parentId: item.id === managerId ? "" : item.empUrID,
      }));
      setData(dataEmployee);
    });
  };

  useEffect(() => {
    if (info) {
      const partFilter = department.departmentTree.find(
        (item) => item.id === info.id
      );
      partFilter &&
        getEmployeesByDepartment(partFilter.id, partFilter.manager.id);
    }
  }, [info]);

  return (
    <div className="org-management-tree">
      <Col md={12}>
        <Card>
          <CardHeader>
            <CardTitle>Employee tree diagram</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={showInfo.isOpen ? 6 : 12}>
                {data ? (
                  <OrgManagementChart
                    setClick={(click) => (addNodeChildFunc = click)}
                    onNodeClick={onNodeClick}
                    data={data}
                    reRender={info.isOpen}
                  />
                ) : (
                  <div>Choose department</div>
                )}
              </Col>
              {showInfo.isOpen && (
                <Infomation
                  info={showInfo}
                  isClose={() =>
                    setShowInfo((pre) => ({ data: {}, isOpen: false }))
                  }
                />
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
