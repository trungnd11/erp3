/* eslint-disable no-mixed-operators */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { Col, Card, CardBody, CardTitle, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import user from "../../assets/images/users/avatar-1.jpg";
import { Alert, ShowImage, SweetAlertComfirm } from "./alert";
import api from "../../api/department";
import { departments } from "../../store/organizational/organizational";
import { arrayToTree } from "./DepartmentMultiList";
import CreateManager from "./components/modal/CreateManager";
import CreateDepartment from "./components/modal/CreateDepartment";
import UpdateDepartment from "./components/modal/UpdateDepartment";

function Infomation({ showInfo, partDetail, setpartDetail }) {
  const { departmentTree } = useSelector(
    (state) => state.organizational
  );
  const [defaultPart, setDefaultPart] = useState();
  const dispatch = useDispatch();
  const openCreateManager = useRef();
  const openCreateDepartment = useRef();
  const openUpdateDepartment = useRef();
  const navigationPageEmployees = useHistory();

  const filterParent = partDetail && departmentTree.map(item => ({
    ...item,
   parent: item.parent.id === item.id ? 0 : item.parent.id,
  })).filter(
    (item) => item.parent === partDetail.id
  );

  const handleDeletePart = () => {
    if (!partDetail) {
      Alert("Can not this department", "bg-danger", "text-white");
    }
    const { children } = partDetail;
    const callApiDeleteDepartmant = async () => {
      try {
        await api.deleteDepartment(partDetail.id).then(() => {
          dispatch(departments());
          Alert("Delele complete", "bg-success", "text-white");
        });
      } catch (error) {
        Alert("Server not responding", "bg-danger", "text-white");
      }
    };
    if (children && children.length) {
      Alert("Please Delete Sub Department", "bg-warning", "text-black");
    } else if (!children) {
      filterParent.length !== 0
        ? Alert("Please Delete Sub Department", "bg-warning", "text-black")
        : SweetAlertComfirm(
            "Are you sure?",
            "You won't be able to revert this!",
            callApiDeleteDepartmant
          );
    } else {
      SweetAlertComfirm(
        "Are you sure?",
        "You won't be able to revert this!",
        callApiDeleteDepartmant
      );
    }
  };

  const hanleCreateManager = () => {
    openCreateManager.current.openModal.current.setOpen(true);
  }

  const handleCreateDepartment = () => {
    openCreateDepartment.current.openModal.current.setOpen(true);
  }

  const handleUpdateDepartment = () => {
    openUpdateDepartment.current.openModal.current.setOpen(true)
  }

  useEffect(() => {
    const arrayMap = arrayToTree(
      departmentTree.map((item) => ({
        ...item,
        title: item.name,
        parent: item.parent.id === item.id ? 0 : item.parent.id,
        expanded: item.parent.id === item.id,
      }))
    );
    setDefaultPart(arrayMap[0]);
  }, [departmentTree]);

  return (
    <React.Fragment>
      <Card className="mt-4 wapper-infomation">
        <div className="card-header">
          <CardTitle tag="h5">Infomation</CardTitle>
          <i onClick={() => showInfo(false)} title="close" className="ri-close-fill close-icon" />
        </div>
        <CardBody>
          <Row>
            <Col className="col-12 col-md-3">
              <div className="manager-avatar">
                <img
                  onClick={() =>
                    ShowImage(
                      partDetail
                        ? partDetail.manager.avatarPic || user
                        : defaultPart
                        ? defaultPart.manager.avatarPic
                        : user
                    )
                  }
                  className="image-avatar"
                  src={
                    partDetail
                      ? partDetail.manager.avatarPic || user
                      : defaultPart
                      ? defaultPart.manager.avatarPic
                      : user
                  }
                  alt=""
                />
              </div>
            </Col>
            <Col className="col-12 col-md-9">
              <div className="department-detail">
                <h3>
                  {partDetail
                    ? partDetail.name
                    : defaultPart && defaultPart.name}
                </h3>
                <p>
                  Main Representative:
                  <span>
                    {partDetail
                      ? partDetail.manager.fullName
                      : defaultPart && defaultPart.manager.fullName}
                  </span>
                </p>
                <p>
                  Total number of dependent units:
                  <span>
                    {partDetail
                      ? partDetail.children && partDetail.children.length ||
                       filterParent.length
                      : defaultPart
                      ? defaultPart.children && defaultPart.children.length ||
                        filterParent.length
                      : 0}
                  </span>
                </p>
                <p>
                  Total number of employees:
                  <span>
                    {partDetail
                      ? partDetail.employeeNumber
                      : defaultPart && defaultPart.employeeNumber}
                  </span>
                </p>
                <p>
                  Budget department:
                  <span>
                    {partDetail
                      ? partDetail.budget.toLocaleString()
                      : defaultPart && defaultPart.budget.toLocaleString()}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="col-12 col-md-6">
              {/* <div className="action-department">
                <i className="mdi mdi-target" />
                <p>Unit target</p>
              </div>
              <div className="action-department">
                <i className="mdi mdi-target-account" />
                <p>Target map</p>
              </div> */}
              <div className="action-department" onClick={() => navigationPageEmployees.push(`/hrcenter/employees-department/${partDetail
                    ? partDetail.name
                    : defaultPart && defaultPart.name}/${partDetail
                    ? partDetail.id
                    : defaultPart && defaultPart.id}`)}>
                <i className="mdi mdi-account-switch" />
                <p>Update employees part</p>
              </div>
              <div className="action-department" onClick={handleDeletePart}>
                <i className="mdi mdi-delete-alert" />
                <p>Delete Department</p>
              </div>
            </Col>
            <Col className="col-12 col-md-6">
              <div className="action-department" onClick={hanleCreateManager}>
                <i className="mdi mdi-account-edit" />
                <p>Update main representative agent</p>
              </div>
              <div className="action-department" onClick={handleCreateDepartment}>
                <i className="mdi mdi-account-multiple-plus-outline" />
                <p>Create functional part</p>
              </div>
              <div className="action-department" onClick={handleUpdateDepartment}>
                <i className="mdi mdi-account-switch" />
                <p>Update infomation part</p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <CreateManager ref={openCreateManager} detail={partDetail || departmentTree[0]} setDetail={setpartDetail} />
      <CreateDepartment ref={openCreateDepartment} info={partDetail || departmentTree[0]} />
      <UpdateDepartment ref={openUpdateDepartment} info={partDetail || departmentTree[0]} />
    </React.Fragment>
  );
}

export default React.memo(Infomation);
