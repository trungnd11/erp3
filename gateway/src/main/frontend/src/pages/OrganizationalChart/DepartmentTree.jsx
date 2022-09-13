import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showDetailPartOrg } from "../../store/organizational/organizational";
import OrgTreeDepartment from "./components/chart/OrgTreeDepartment";

export default function DepartmentTree({ showInfo, setpartDetail }) {
  const departments = useSelector(state => state.organizational);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const infoRef = useRef();
  let addNodeChildFunc = null;

  function onNodeClick(nodeId) {
    showInfo(true);
    setpartDetail(departments.departmentTree.find(item => item.id === nodeId));
  }

  useEffect(() => {
    const { departmentTree } = departments;
    setData(departmentTree.map(item => ({
      ...item,
      parentId: item.id === item.parent.id ? '' : item.parent.id,
    })));
  }, [departments]);

  return (
    <OrgTreeDepartment
      setClick={(click) => (addNodeChildFunc = click)}
      onNodeClick={onNodeClick}
      data={data}
    />
  );
}
