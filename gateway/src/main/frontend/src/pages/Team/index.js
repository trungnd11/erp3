import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
  Input,
} from "reactstrap";
import { OrgChart } from "d3-org-chart";
import {
  createTeam,
  getDepartmentInfo,
  getEmployeeDepartment,
  getTeamData,
  setLeader,
  updateMember,
} from "../../api/team";
import { useSelector } from "react-redux";
import { showErrorNotice, showSuccessNotice } from "../../utils/toastify";
import OrgTeam from "./Chart";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonModal from "../../Components/Modal";
import "./style/information.scss";
import default_avatar from "../../assets/images/users/user-dummy-img.jpg";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import BackdropLoading from "../../Components/BackdropLoading";

const memberColor = [
  {
    class_name:
      "blockquote custom-blockquote blockquote-primary rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-secondary rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-success rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-info rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-danger rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-warning rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
  {
    class_name:
      "blockquote custom-blockquote blockquote-dark rounded mb-0 shadow",
    text_class: "text-dark mb-2",
  },
];

function TeamManagement() {
  const [teamData, setTeamData] = useState([]);
  const [teamBackup, setTeamBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userprofile.userInfo);
  const [selectedNode, setSelectedNode] = useState();
  const teamModal = useRef();
  const memberModal = useRef();
  const [saving, setSaving] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState("");

  const getMember = useMemo(() => {
    const selectOption = employees.filter(
      (el) =>
        selectedNode.members.findIndex(
          (es) => es.employeeId === el.employeeId
        ) === -1
    );
    return {
      options: selectOption,
      members: selectedNode ? selectedNode.members : [],
    };
  }, [selectedNode]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDesc = (e) => {
    setDescriptions(e.target.value);
  };

  let addNodeChildFunc = null;

  const getData = async () => {
    try {
      setLoading(true);
      const department = await getDepartmentInfo(userInfo.empDepartmentID);

      const employeeData = await getEmployeeDepartment(
        userInfo.empDepartmentID
      );
      const normalizeEmployeeData = employeeData.map((item) => ({
        avatar: item.avatarPic || default_avatar,
        employeeId: item.id,
        fullname: item.fullName,
        role: "TEAM_MEMBER",
      }));

      const departmentData = {
        id: 0,
        code: department.code,
        departmentId: department.id,
        color: "",
        name: department.name,
        parentId: null,
        type: "DEPARTMENT",
        teamLead: {
          avatar: department.manager.avatarPic,
          employeeId: department.manager.id,
          fullname: department.manager.fullName,
          role: "Part leader",
        },
        members: [...normalizeEmployeeData],
      };

      setEmployees([...normalizeEmployeeData]);

      const teamData = await getTeamData(userInfo.empDepartmentID);
      let normalData = teamData.data.map((d) => ({
        ...d,
        parentId: d.parentId === null ? 0 : d.parentId,
        type: "DEPARTMENT_TEAM",
      }));

      normalData.push(departmentData);
      setSelectedNode(departmentData);
      setTeamData(normalData);
      setTeamBackup(normalData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorNotice("Error when getting data!");
    }
  };

  function onNodeClick(nodeId) {
    const data = teamData.find((el) => el.id === nodeId);
    setSelectedNode({ ...data });
    // setpartDetail(departments.departmentTree.find(item => item.id === nodeId));
  }

  const onCreateNewClick = () => {
    teamModal.current.setOpen(true);
  };

  const onUpdateMemberClick = () => {
    memberModal.current.setOpen(true);
  };

  const handleAddMember = (member) => {
    const tmp = { ...selectedNode };
    tmp.members.push({ ...member });
    setSelectedNode(tmp);
  };

  const onRemoveMember = (member) => {
    const tmp = { ...selectedNode };
    const newMember = tmp.members.filter((el) => el.id !== member.id);
    tmp.members = newMember;
    setSelectedNode(tmp);
  };

  const onCreateClick = () => {
    setSaving(true);
    const departmentId = userInfo.empDepartmentID;
    const data = {
      name,
      descriptions,
      parentId: selectedNode.id === 0 ? null : selectedNode.id,
      departmentId,
      code: "",
    };
    createTeam(departmentId, data)
      .then((response) => {
        teamData.push({...response.data, parentId: response.data.parentId ? response.data.parentId : 0});
        setTeamData([...teamData]);
        showSuccessNotice("Create team successfully!");
        setSaving(false);
        teamModal.current.setOpen(false);
        getData();
      })
      .catch((ex) => {
        setSaving(false);
        showErrorNotice("Create new team fail!");
      });
  };

  const onUpdateMember = () => {
    setLoading(true);
    updateMember(selectedNode.id, selectedNode.members)
      .then((response) => {
        setSelectedNode(response.data);
        setLoading(false);
        showSuccessNotice("Update member successfully");
        memberModal.current.setOpen(false);
      })
      .catch((ex) => {
        showErrorNotice("Updated Member fail");
        setLoading(false);
      });
  };

  const onCancelUpdateMember = () => {
    const tmp = [...teamData];
    const team = tmp.find((el) => el.id === selectedNode.id);
    setSelectedNode(team);
  };

  const onSetLeader = (item) => {

    setLoading(true);
    setLeader(selectedNode.id, item.employeeId)
      .then((response) => {
        const tmp = [...teamData];
        const team = tmp.find((el) => el.id === selectedNode.id);
        // const tmp = {...selectedNode};
        const oldLeader = team.members.find((el) => el.role === "TEAM_LEAD");
        if (oldLeader) {
          oldLeader.role = "TEAM_MEMBER";
        }
        const newLeader = team.members.find((el) => el.employeeId === item.employeeId);
        newLeader.role = "TEAM_LEAD";
        team.teamLead = newLeader;
        setSelectedNode({ ...team });
        setTeamData([...tmp]);
        console.log(teamData);
      })
      .then(() => {
        showSuccessNotice("Updated Successfully!");
        setLoading(false);
      })
      .catch((ex) => {
        showErrorNotice("Update member fail");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userInfo){
      getData();
    }
  }, [userInfo]);

return (
  <div className="page-content wapper-team-infomation">
    <Container fluid>
      <BreadCrumb title="Team" pageTitle="Team management" />
      {loading ? (
        <BackdropLoading />
      ) : (
        <>
          <Row style={{ minHeight: "80vh", marginBottom: "1rem" }}>
            <Col className="col-12 col-md-6">
              <Card style={{ minHeight: "100%" }}>
                <CardHeader>
                  <h5>Team Org Chart</h5>
                </CardHeader>
                <CardBody>
                  <OrgTeam
                    setClick={(click) => (addNodeChildFunc = click)}
                    onNodeClick={onNodeClick}
                    data={teamData}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className="col-12 col-md-6">
              <Card style={{ minHeight: "100%" }}>
                <CardHeader>
                  <h5>Team Information</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="col-12 col-md-3">
                      <div className="manager-avatar">
                        <img
                          className="image-avatar"
                          src={
                            (selectedNode &&
                              selectedNode.teamLead &&
                              selectedNode.teamLead.avatar) ||
                            default_avatar
                          }
                          alt="user avatar"
                        />
                      </div>
                    </Col>
                    <Col className="col-12 col-md-9">
                      {selectedNode && (
                        <React.Fragment>
                          <div className="department-detail">
                            <h3>{selectedNode.name}</h3>
                            <p>
                              Team lead:
                              <span>
                                {selectedNode.teamLead &&
                                  selectedNode.teamLead.fullname}
                              </span>
                            </p>
                            <p>
                              Team code:<span>{selectedNode.code}</span>
                            </p>
                            <p>
                              Descriptions:
                              <span>{selectedNode.descriptions}</span>
                            </p>
                            {/* <p>
                            Members total:<span>25</span>
                          </p> */}
                          </div>
                        </React.Fragment>
                      )}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="col-12">
                      <Button
                        color="success"
                        className="btn-label"
                        onClick={onCreateNewClick}
                      >
                        <i className="ri-add-fill label-icon align-middle fs-16 me-2"></i>
                        Add New Team
                      </Button>
                      {selectedNode && selectedNode.type !== "DEPARTMENT" && (
                        <Button
                          color="primary"
                          className="btn-label"
                          onClick={onUpdateMemberClick}
                        >
                          <i className="ri-user-settings-line label-icon align-middle fs-16 me-2"></i>
                          Update Member
                        </Button>
                      )}
                    </Col>
                    <Col className="col-12 p-3">
                      <Row>
                        {selectedNode &&
                          selectedNode.members &&
                          selectedNode.members.map((item, index) => (
                            <React.Fragment key={index}>
                              <Col
                                className="col-12 col-md-6 mt-3 wrap-member"
                                style={{ position: "relative" }}
                              >
                                <Button
                                  color="primary"
                                  className="btn-leader"
                                  style={{
                                    padding: "5px",
                                    position: "absolute",
                                    bottom: 1,
                                    right: 14,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    onSetLeader(item);
                                  }}
                                >
                                  Set Leader
                                </Button>

                                <blockquote
                                  className={
                                    memberColor[index % memberColor.length]
                                      .class_name
                                  }
                                >
                                  <Row className="text-dark mb-2">
                                    <Col className="col-12 col-md-3">
                                      <img
                                        src={item.avatar || default_avatar}
                                        alt="user-img"
                                        className="rounded-circle header-profile-user"
                                      />
                                    </Col>
                                    <Col className="col-12 col-md-9">
                                      <p className="text-dark mb-2">
                                        {item.fullname}
                                      </p>
                                    </Col>
                                  </Row>
                                  <footer className="blockquote-footer mt-0">
                                    <cite title="Source Title">
                                      {item.role}
                                    </cite>
                                  </footer>
                                </blockquote>
                              </Col>
                            </React.Fragment>
                          ))}
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {/*Modal create new team*/}
      <CommonModal
        ref={teamModal}
        title="Create New Team"
        action={<CreateButton onCreate={onCreateClick} />}
      >
        <div>
          <Label htmlFor="name" className="form-label">
            Name
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              onChangeName(e);
            }}
            className="form-control"
            id="name"
            placeholder="Enter team name"
          />
        </div>
        <div className="mt-3">
          <Label htmlFor="desc" className="form-label">
            Descriptions
          </Label>
          <Input
            type="textarea"
            value={descriptions}
            onChange={(e) => {
              onChangeDesc(e);
            }}
            className="form-control"
            id="name"
            placeholder="Enter descriptions"
          />
        </div>
      </CommonModal>

      {/*Modal update team member*/}

      <CommonModal
        ref={memberModal}
        title="Team Member"
        action={<UpdateMember onUpdate={onUpdateMember} />}
        onCloseCallback={onCancelUpdateMember}
      >
        <div className="mb-4 align-items-center">
          <div className="me-2">
            <h5 className="mb-0 fs-13">Members :</h5>
          </div>
          <Row>
            {getMember.members.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={
                    memberColor[index % memberColor.length].class_name
                  }
                  style={{ width: "33%", position: "relative" }}
                >
                  <i
                    className="ri-close-fill p-1"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => {
                      onRemoveMember(item);
                    }}
                  />
                  <Row className="text-dark mb-2">
                    <Col className="col-12 col-md-3">
                      <img
                        src={item.avatar || default_avatar}
                        alt="user-img"
                        className="rounded-circle header-profile-user"
                      />
                    </Col>
                    <Col className="col-12 col-md-9">
                      <p className="text-dark mb-2">{item.fullname}</p>
                    </Col>
                  </Row>
                </div>
              </React.Fragment>
            ))}
          </Row>
        </div>
        <SimpleBar
          className="mx-n4 px-4"
          data-simplebar="init"
          style={{ maxHeight: "225px" }}
        >
          <div className="vstack gap-3">
            {getMember.options.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                <div className="avatar-xs flex-shrink-0 me-3">
                  <img
                    src={item.avatar || default_avatar}
                    alt=""
                    className="rounded-circle header-profile-user"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-13 mb-0">
                    <Link to="#" className="text-body d-block">
                      {item.fullname}
                    </Link>
                  </h5>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => {
                      handleAddMember(item);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </CommonModal>
    </Container>
  </div>
);
}

const CreateButton = ({ onCreate }) => {
  return (
    <Button color="success" className="gradient" onClick={onCreate}>
      Create
    </Button>
  );
};

const UpdateMember = ({ onUpdate }) => {
  return (
    <Button color="success" className="gradient" onClick={onUpdate}>
      Update
    </Button>
  );
};

export default TeamManagement;
