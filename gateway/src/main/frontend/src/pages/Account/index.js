import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import classnames from "classnames";
import ListActiveAccount from "./ListActiveAccount";
import ListBlockAccount from "./ListBlockAccount";
import ListNotActiveAccount from "./ListNotActiveAccount";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPrivileges, getRoles } from "../../store/auth/authorization";

const initAccount = [
  {
    id: 1,
    username: "trungnt",
    code: "E01",
    fullname: "Nguyen Tien Trung",
    department: "ASP",
    createdAt: "2022-10-06",
    activatedAt: "2022-17-06",
  },
  {
    id: 2,
    username: "tupm",
    code: "E02",
    fullname: "Pham Minh Tu",
    department: "ASP",
    createdAt: "2022-10-06",
    activatedAt: "2022-17-06",
  },
  {
    id: 3,
    username: "dungdv",
    code: "E03",
    fullname: "Duong Van Dung",
    department: "ASP",
    createdAt: "2022-10-06",
    activatedAt: "2022-17-06",
  },
  {
    id: 4,
    username: "tungnpv",
    code: "E04",
    fullname: "Nguyen Phan Viet Tung",
    department: "ASP",
    createdAt: "2022-10-06",
    activatedAt: "2022-17-06",
  },
];

function AccountManagement() {
  const [tabValue, setTabValue] = useState("1");
  const [accounts, setAccounts] = useState(initAccount);
  const roles = useSelector((state) => state.authorization.roles);
  const privileges = useSelector((state) => state.authorization.privileges);
  const [keyActive, setKeyActive] = useState('');
  const [keyNotActive, setKeyNotActive] = useState('');
  const [keyBlock, setKeyBlock] = useState('');
  const refActive = useRef();
  const refNotActive = useRef();
  const refBlock = useRef();

  const onChangeKeyActive = (e) => {
    setKeyActive(e.target.value);
  }

  const onActiveKeydown = (e) => {
    if(e.keyCode===13){
      const {getData, pageInfo} = refActive.current;
      getData(keyActive, 0, pageInfo.size, pageInfo.sort)
      // console.log(refActive.current);
    }
  }

  const onChangeKeyNotActive = (e) => {
    setKeyNotActive(e.target.value);
  }

  const onNotActiveKeydown = (e) => {
    if(e.keyCode===13){
      //search
      const {getData, pageInfo} = refNotActive.current;
      getData(keyNotActive, 0, pageInfo.size, pageInfo.sort)
    }
  }

  const onChangeKeyBlock = (e) => {
    setKeyBlock(e.target.value);
  }
  
  const onBlockKeydown = (e) => {
    if(e.keyCode===13){
      //search
      const {getData, pageInfo} = refBlock.current;
      getData(keyBlock, 0, pageInfo.size, pageInfo.sort)
    }
  }

  const dispatch = useDispatch();

  const fetchData = async () => {
    if (!roles) {
      await dispatch(getRoles());
    }
    if (!privileges) {
      await dispatch(getPrivileges());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Account & User" pageTitle="User management" />
        <div>
          <Card>
            <CardHeader>
              <Row className="g-4 mb-3">
                <Col className="col-sm-auto">
                  <div className="d-flex gap-1">
                    <Nav
                      className="nav-tabs-custom border-bottom-0"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: tabValue === "1" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            setTabValue("1");
                          }}
                          href="#"
                        >
                          Actived
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: tabValue === "2" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            setTabValue("2");
                          }}
                          href="#"
                        >
                          Not Actived
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames(
                            { active: tabValue === "3" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            setTabValue("3");
                          }}
                          href="#"
                        >
                          Blocked
                        </NavLink>
                      </NavItem> */}
                    </Nav>
                  </div>
                </Col>
                <Col className="col-sm">
                  <div className="d-flex justify-content-sm-end">
                    <div className="search-box ms-2">
                      {tabValue ==="1" && <input
                        type="text"
                        value={keyActive}
                        onChange={onChangeKeyActive}
                        onKeyDown={onActiveKeydown}
                        className="form-control search"
                        placeholder="Search..."
                      />}
                      {tabValue ==="2" && <input
                        type="text"
                        value={keyNotActive}
                        onChange={onChangeKeyNotActive}
                        onKeyDown={onNotActiveKeydown}
                        className="form-control search"
                        placeholder="Search..."
                      />}
                      {tabValue ==="3" && <input
                        type="text"
                        value={keyBlock}
                        onChange={onChangeKeyBlock}
                        onKeyDown={onBlockKeydown}
                        className="form-control search"
                        placeholder="Search..."
                      />}
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={tabValue} className="text-muted">
                <TabPane tabId="1" id="nav-border-justified-home">
                  <ListActiveAccount ref={refActive} keySearch={keyActive} />
                </TabPane>
                <TabPane tabId="2" id="nav-border-justified-home">
                  <ListNotActiveAccount ref={refNotActive} keySearch={keyNotActive} />
                </TabPane>
                {/* <TabPane tabId="3" id="nav-border-justified-home">
                  <ListBlockAccount ref={refBlock} keySearch={keyBlock} />
                </TabPane> */}
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default AccountManagement;
