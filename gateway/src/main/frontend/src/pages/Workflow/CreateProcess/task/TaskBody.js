import React, { useState } from "react";
import { store, setCustom } from "../../../../Components/WorkflowDiagram";
import {
  Button,
  Card,
  CardBody,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Select from 'react-select';
import arrow_ico from '../../../../assets/images/workflow/blue-arrow-png.ico'

const TaskBody = (props) => {
  const { setOpen, data, updateData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [inputLabel, setInputLabel] = useState('');

  const [action, setAction] = useState([]);
  const [openAction, setOpenAction] = useState(false);

  const handleClick = () => {
    console.log(data);
    const payload = { id: data.id, custom: { data: "custom data" } };
    store.dispatch(setCustom(payload));
  };

  const handleClickAddActionTranfer = () => {
    console.log('first')
  }

  const onChangeInput = (e) => {
    setInputLabel(e.target.value);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <Nav
            pills
            className="mb-3"
            style={{ borderBottom: "1px solid var(--vz-border-color)" }}
          >
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: tabValue === "1" })}
                onClick={() => {
                  setTabValue("1");
                }}
              >
                Setting
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({ active: tabValue === "2" })}
                onClick={() => {
                  setTabValue("2");
                }}
              >
                Form Template
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={tabValue} className="text-muted">
            <TabPane tabId="1" id="pill-justified-home-1">
              {/* <Button onClick={handleClick}>Log</Button> */}
              <div>
                <a href="#" role="button" className="d-flex align-items-center" onClick={()=> { setOpenAction(true)}}>
                  <li className="bx bx-plus"></li>
                  Add Action Tranfer
                </a>
              </div>
              {openAction &&
                <div>
                  <div className="input-group mt-2">
                    <span className="input-group-text">Label</span>
                    <Input type="text" className="form-control" placeholder="Label" onChange={onChangeInput}></Input>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      {`${data.name}`}
                    </div>
                    <div className="p-2" style={{width: '4rem', position: 'relative'}}>
                      <img src={arrow_ico} alt="img" style={{ height: '2rem', width: '100%' }} />
                      <span style={{position: 'absolute', top: '-1px', left: 0}}>{inputLabel}</span>
                    </div>
                    <div className="p-2" style={{flexGrow: 1}}>
                      <Select />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button color="success" className="btn-icon" >
                      <i className="ri-check-double-line" style={{fontSize: '1.2rem'}}></i>
                    </Button>
                    <Button color="danger" className="btn-icon shadow-none" outline onClick={()=>{setOpenAction(false)}}>
                      <i className="ri-close-line" style={{fontSize: '1.2rem'}}></i>
                    </Button>
                  </div>
                </div>
              }
            </TabPane>

            <TabPane tabId="2" id="pill-justified-profile-1">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <i className="ri-checkbox-circle-fill text-success"></i>
                </div>
                <div className="flex-grow-1 ms-2">
                  In some designs, you might adjust your tracking to create a
                  certain artistic effect. It can also help you fix fonts that
                  are poorly spaced to begin with.
                </div>
              </div>
              <div className="d-flex mt-2">
                <div className="flex-shrink-0">
                  <i className="ri-checkbox-circle-fill text-success"></i>
                </div>
                <div className="flex-grow-1 ms-2">
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart.
                </div>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default TaskBody;
