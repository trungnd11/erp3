/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Col, Card, CardBody, CardTitle, Row, Input, Label } from "reactstrap";
import SortableTree from "@nosferatu500/react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";
import "@nosferatu500/react-sortable-tree/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  departments,
  filterOrg,
} from "../../store/organizational/organizational";
import { Alert, SweetAlert } from "./alert";
import api from "../../api/department";
import DepartmentTree from "./DepartmentTree";
import { forwardRef } from "react";

export const arrayToTree = (arr, parent = 0) =>
  arr
    .filter((item) => item.parent === parent)
    .map((child) => ({ ...child, children: arrayToTree(arr, child.id) }));

function DepartmentMultiList({ showInfo, view, setpartDetail }) {
  const [isSearch, setIsSearch] = useState(true);
  const [nodeTree, setNodeTree] = useState();
  const [searchString, setSearchString] = useState("");
  const searchRef = useRef();
  const dispart = useDispatch();
  const department = useSelector((state) => state.organizational);
  const [dataDepartment, setDataDepartment] = useState([]);

  const showSearchDepartment = () => {
    isSearch
      ? (searchRef.current.style.display = "flex")
      : (searchRef.current.style.display = "none");
    setIsSearch(!isSearch);
  };

  const handleSearchDepartment = (e) => {
    view === "multi" ? setSearchString(e.target.value)
      : dispart(filterOrg(e.target.value));
  };

  const showDetailNode = (partDetail) => {
    setpartDetail(department.departmentTree.find(item => item.id === partDetail.id));
  };

  const handleSetParentNodePart = (nodes) => {
    const { nextParentNode, node } = nodes;
    if (!nextParentNode) {
      Alert("Can not set this parent part", "bg-danger", "text-white");
      dispart(departments());
    } else {
      try {
        const { children } = nextParentNode;
        const childArray = children.map((item, index) => ({
          parentCode: nextParentNode.id,
          id: item.id,
          position: index,
        }));
        childArray.forEach(async (partUpdate) => {
          await api
            .updateParentDepartment(partUpdate)
            .then(() => {
              SweetAlert("success", `Change ${node.name} complete`, 2000);
            })
            .catch();
        });
      } catch (error) {
        Alert("Not change department", "bg-warning", "text-black");
        dispart(departments());
      }
    }
  };

  useEffect(() => {
    dispart(departments());
  }, []);

  useEffect(() => {
    setDataDepartment(
      arrayToTree(
        department.departmentTree.map((item) => ({
          ...item,
          title: item.name,
          parent: item.parent.id === item.id ? 0 : item.parent.id,
          expanded: item.parent.id === item.id,
        }))
      )
    );
  }, [department]);

  return (
      <Card className="mt-4 wapper-department">
        <div className="card-header">
          <CardTitle tag="h5">Department</CardTitle>
          <label
            htmlFor="search-part"
            className="lab las la-search"
            onClick={showSearchDepartment}
          />
        </div>
        <CardBody>
          <Row>
            <Col className="col-12 col-md-6">
              <div ref={searchRef} className="search-department">
                <Label>Search</Label>
                <Input id="search-part" onChange={handleSearchDepartment} />
              </div>
            </Col>
          </Row>
          {view === "multi" ? (
            <SortableTree
              theme={FileExplorerTheme}
              isSearchMatch
              searchQuery={searchString}
              treeData={dataDepartment}
              onChange={(data) => setDataDepartment(data)}
              onMoveNode={(node) => handleSetParentNodePart(node)}
              generateNodeProps={(prop) => {
                const { node } = prop;
                return {
                  listIndex: 0,
                  lowerSiblingCounts: [],
                  buttons: [],
                  onClick: () => {
                    showInfo(true);
                    setNodeTree(node);
                    showDetailNode(node);
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
            <DepartmentTree showInfo={showInfo} setpartDetail={setpartDetail} />
          )}
        </CardBody>
      </Card>
  );
}

export default DepartmentMultiList;
