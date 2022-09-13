/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SortableTree from "@nosferatu500/react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import employeeApi from "../../api/employee/employeeApi";
import { arrayToTree } from "../OrganizationalChart/DepartmentMultiList";
import user from "../../assets/images/users/avatar-1.jpg";
import "./components/styles/multiListManagement.scss";
import Infomation from "./Infomation";

export default function MultiManagementChart({ info, search }) {
  const [dataEmployee, setDataEmployee] = useState();
  const [nodeTree, setNodeTree] = useState();
  const [showInfo, setShowInfo] = useState({
    data: {},
    isOpen: false,
  });
  const department = useSelector((state) => state.organizational);

  console.log({ search })

  const getEmployeesByDepartment = async (id, managerId) => {
    await employeeApi.getEmployeeByDepartment(id).then((response) => {
      const dataEmployee = response.map((item) => ({
        ...item,
        title: item.fullName,
        subtitle: `Position: ${item.empPositionName}`,
        parent: item.id === managerId ? 0 : item.empUrID,
        expanded: item.id === managerId,
      }));
      setDataEmployee(arrayToTree(dataEmployee));
    });
  };

  useEffect(() => {
    if (info) {
      const partFilter = department.departmentTree.find(
        (item) => item.id === info.id
      );
      console.log(partFilter);
      partFilter &&
        getEmployeesByDepartment(partFilter.id, partFilter.manager.id);
    }
  }, [info]);

  return (
    <div className="org-management-tree">
      { console.log({ dataEmployee }) }
      <Col md={12}>
        <Card>
          <CardHeader>
            <CardTitle>Employee Multilevel list diagram</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={showInfo.isOpen ? 6 : 12}>
                <div className="wapper-employee-multi">
                  {dataEmployee ? (
                    <SortableTree
                      isSearchMatch
                      searchQuery={search}
                      theme={FileExplorerTheme}
                      treeData={dataEmployee}
                      onChange={(data) => setDataEmployee(data)}
                      generateNodeProps={(prop) => {
                        const { node } = prop;
                        return {
                          listIndex: 0,
                          lowerSiblingCounts: [],
                          buttons: [
                            <img src={node.avatarPic || user} alt="img" />,
                          ],
                          onClick: () => {
                            setNodeTree(node);
                            setShowInfo({ data: node, isOpen: true });
                          },
                          style:
                            node === nodeTree
                              ? {
                                  borderRadius: "6px",
                                  boxShadow: "8px 8px 5px 5px #888888",
                                  color: "red",
                                }
                              : {},
                        };
                      }}
                    />
                  ) : (
                    <div className="">Choose Department</div>
                  )}
                </div>
              </Col>
              {showInfo.isOpen && <Infomation info={showInfo} isClose={() => setShowInfo((pre) => ({ data: {}, isOpen: false }))} />}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
