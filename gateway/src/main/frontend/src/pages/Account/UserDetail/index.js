import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Label,
  Button,
  Input
} from "reactstrap";
import { Storage } from "../../../utils/storage-utils";
import { getEmployee, updatePermission } from "../../../api/account";
import BoardAll from "../../../Components/Board/BoardAll";
import { getPrivileges, getRoles } from "../../../store/auth/authorization";
import { formatDate } from "../../../utils/date";
import { showErrorNotice, showSuccessNotice } from "../../../utils/toastify";
import BackdropLoading from "../../../Components/BackdropLoading";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { changeActiveStatus } from './../../../api/account/index';
import noavatar from "../../../assets/images/users/user-dummy-img.jpg"

const columns = [
  {
    id: "role_code",
    numeric: false,
    disablePadding: true,
    label: "Role Code",
    sort: true,
    width: "25%",
  },
  {
    id: "role_name",
    numeric: true,
    disablePadding: false,
    label: "Role Name",
    width: "25%",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Descriptions",
    width: "50%",
  },
];

const ACCOUNT_KEY = "account";

function UserDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = useState();
  const [loading, setLoading] = useState(true);
  const boardPermission = useRef();
  const [isEdit, setEdit] = useState(false);
  const roles = useSelector((state) => state.authorization.roles);
  const privileges = useSelector((state) => state.authorization.privileges);
  const [active,setActive] = useState();

  const account =
    useSelector((state) => state.authentication.account) ||
    Storage.local.get(ACCOUNT_KEY);
  const [saving, setSaving] = useState(false);

  const getData = () => {
    setLoading(true);
    getEmployee(id)
      .then((response) => {
        setEmployeeInfo(response.data);
        // console.log(response.data.account.active)
        setActive(response.data.account.active)
        setLoading(false);
      })
      .catch((ex) => {
        setLoading(false);
        showErrorNotice("Failure when getting data!!!");
      });
  };
  const fetchData = async () => {
    if (!roles) {
      await dispatch(getRoles());
    }
    if (!privileges) {
      await dispatch(getPrivileges());
    }
  };

  const onSaveClick = () => {
    const seletedRoleChange = boardPermission.current.getSelectedRow();
    const { id, username } = account;
    const roleIds = [];
    seletedRoleChange.forEach((item) => roleIds.push(item.id));
    const data = { username, roleIds };
    setSaving(true);
    updatePermission(data)
      .then((response) => {
        showSuccessNotice("Save change successfully!");
        setEdit(false);
        setSaving(false);
      })
      .catch((ex) => {
        setSaving(false);
        showErrorNotice("Save change error!");
      });
  };

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  useEffect(() => {
    if (employeeInfo && employeeInfo.account) {
      boardPermission.current.setSelectedRow(employeeInfo.account.roles);
    }
  }, [employeeInfo]);

  const handleActive = () => {
    setSaving(true);
    changeActiveStatus(employeeInfo.account.username).then(response => {
      const tmp = {...employeeInfo};
      tmp.account.active = response.data;
      setEmployeeInfo(tmp);

    }).then(()=>{
      setSaving(false);
      showSuccessNotice("Update successfully!");
    }).catch(e => {
      showErrorNotice("Error when updatting user");
      setSaving(false);
    })
  }
  
  const onChangeActive = (e) => {
    setSaving(true);
    changeActiveStatus(employeeInfo.account.username).then(response => {
      const tmp = {...employeeInfo};
      tmp.account.active = response.data;
      setActive(response.data)
      setEmployeeInfo(tmp);
    }).then(()=>{
      setSaving(false);
      showSuccessNotice("Update successfully!");
    }).catch(e => {
      showErrorNotice("Error when updatting user");
      setSaving(false);
    })
    
  }

  // console.log(active)

  return (
    <div className="page-content">
      <BreadCrumb title="User Detail" pageTitle="User management" />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {saving && <BackdropLoading />}
          <div className="d-flex flex-row-reverse pb-2">
            {!isEdit ? (
              <div>
                <Button
                  color="secondary"
                  className="bg-gradient"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  color="danger"
                  className="bg-gradient"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-gradient"
                  onClick={onSaveClick}
                  style={{marginLeft:'10px'}}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <Row>
            <Col lg={3}>
              <Card>
                <CardHeader className="bg-soft-dark">
                  <h5 className="card-title mb-0 flex-grow-1">
                    Account Infomation
                  </h5>
                </CardHeader>
                <CardBody style={{height:'254px'}}>
                  <Row>
                    <Col lg={12}>
                      <Row>
                        <Col lg={6}>
                          <Label className="form-label">Username</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-danger">
                            {employeeInfo.account.username}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Label className="form-label">Active status</Label>
                        </Col>
                        <Col lg={6}>
                          {/* {employeeInfo.account.active ? (
                            <span onClick={handleActive} className="badge badge-soft-success" style={{cursor:'pointer'}}>
                              Actived
                            </span>
                          ) : (
                            <span onClick={handleActive} className="badge badge-soft-warning" style={{cursor:'pointer'}}>
                              Not actived
                            </span>
                          )} */}
                          <div className="form-check form-switch form-switch-custom form-switch-primary mb-3">
                              <Input onChange={(e) => onChangeActive(e)} checked={active} className="form-check-input" type="checkbox" role="switch"/>
                              <Label className="form-check-label">{
                                employeeInfo.account.active ? (
                                  <span className="badge badge-soft-success">
                                    Actived
                                  </span>
                                ) : (
                                  <span className="badge badge-soft-warning">
                                    Not actived
                                  </span>
                                )
                              }</Label>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <Label className="form-label">Actived at</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {formatDate(employeeInfo.account.activedAt)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={9}>
              <Card>
                <CardHeader className="bg-soft-dark">
                  <h5 className="card-title mb-0 flex-grow-1">
                    Personal Infomation
                  </h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="col-auto">
                      <div className="avatar-lg">
                        <img
                          src={employeeInfo.avatarPic ? employeeInfo.avatarPic : noavatar}
                          alt="avatar"
                          className="img-thumbnail rounded-circle"
                        ></img>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-3">
                    <Col lg={6}>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Employee Code :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {employeeInfo.employeeNumb}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Department :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {employeeInfo.department}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Email :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">{employeeInfo.email}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Phone number :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {employeeInfo.phoneNumber}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6}>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Fullname :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {employeeInfo.fullName}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Position :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {employeeInfo.positionName}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Home town :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">{employeeInfo.address}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Label className="form-label">Date of birth :</Label>
                        </Col>
                        <Col lg={6}>
                          <span className="text-muted">
                            {formatDate(employeeInfo.birthday)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
            <Card>
              <CardHeader className="bg-soft-dark">
                <h5 className="card-title mb-0 flex-grow-1">Permission Detail</h5>
              </CardHeader>
              <CardBody>
                <BoardAll
                  ref={boardPermission}
                  columns={columns}
                  rows={roles}
                  component={List}
                  isEditable={isEdit}
                  checkbox
                />
              </CardBody>
            </Card>
          
        </div>
      )}
    </div>
  );
}

function List({ item }) {
  return (
    <>
      <td>
        <span component="span">{item.code}</span>
      </td>
      <td>
        <span component="span">{item.name}</span>
      </td>
      <td>
        <div className="d-flex flex-column">
          {item.privileges.map((privilege, index) => (
            <span key={index}>{`- ${privilege.description}`}</span>
          ))}
        </div>
      </td>
    </>
  );
}

export default UserDetail;
