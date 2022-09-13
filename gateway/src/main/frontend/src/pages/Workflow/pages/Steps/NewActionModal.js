import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import CommonModal from "../../../../Components/Modal";
import Select from "react-select";
import classnames from "classnames";
import { ReactFormBuilder, ElementStore } from "../../../../Components/FormBuilder";
import MyInput from "../../../FormBuilder/CustomField/MyInput";
import DemListenChangeobar from "./ListenChange";
import ListenChange from "./ListenChange";

const items = [
  {
    key: "Header",
  },
  {
    key: "Label",
  },
  {
    key: "Paragraph",
  },
  {
    key: "LineBreak",
  },
  {
    key: "Dropdown",
  },
  {
    key: "Tags",
  },
  {
    key: "Checkboxes",
  },
  {
    key: "RadioButtons",
  },
  {
    key: "TextInput",
  },
  {
    key: "NumberInput",
  },
  {
    key: "TextArea",
  },
  {
    key: "TwoColumnRow",
  },
  {
    key: "ThreeColumnRow",
  },
  {
    key: "FourColumnRow",
  },
  {
    key: "Image",
  },
  {
    key: "Rating",
  },
  {
    key: "DatePicker",
  },
  {
    key: "Signature",
  },
  {
    key: "HyperLink",
  },
  {
    key: "Download",
  },
  {
    key: "Range",
  },
  {
    key: "Camera",
  },
  // {
  //   key: "DepartmentField",
  //   element: "CustomElement",
  //   component: DepartmentField,
  //   type: "custom",
  //   field_name: "department_",
  //   name: "Department",
  //   icon: "fa fa-cog",
  //   static: true,
  //   props: { test: "test_comp" },
  //   label: "Department",
  // },
  {
    key: 'MyInputField',
    element: 'CustomElement',
    component: MyInput,
    type: 'custom',
    forwardRef: true,
    field_name: 'my_input_',
    name: 'My Input',
    icon: 'fa fa-cog',
    props: { test: 'test_input' },
    label: 'Label Input',
  }, 
];


const SaveAction = (props) => {
  const {onSave} = props;
  return (
    <React.Fragment>
      <Button onClick={onSave}>Save</Button>
    </React.Fragment>
  )
}

function NewActionModal({ executors = [], callback = () => {}, actions, setActions }, ref) {
  const actionModal = useRef();
  const [actionName, setActionName] = useState();
  const [limitExecutors, setLimitExecutors] = useState();
  const [tabValue, setTabValue] = useState("1");
  const [form, setForm] = useState();

  // const [actions, setActions] = useState([]);

  const onChangeActionName = (e) => {
    setActionName(e.target.value);
  };

  const handleChangeLimitExecutors = (option) => {
    setLimitExecutors(option);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal: () => {
          actionModal.current.setOpen(true);
        },
      };
    },
    []
  );

  const onSave = () => {
    const action = {name: actionName, executors: limitExecutors, form: form}
    actions.push(action);
    setActions([...actions]);
    actionModal.current.setOpen(false);
    setActionName('');
    setLimitExecutors([]);
    setForm([])
    callback();
  }

  return (
    <>
      <CommonModal
        ref={actionModal}
        title="Add New Action"
        onCloseCallback={() => {
          callback();
        }}
        action={<SaveAction onSave={onSave} />}
      >
        <ListenChange setData={setForm}></ListenChange>
        <Nav
          tabs
          className="nav nav-tabs nav-justified nav-border-top nav-border-top-primary mb-3"
        >
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({ active: tabValue === "1" })}
              onClick={() => {
                setTabValue("1");
              }}
            >
              <i className="ri-home-5-line align-middle me-1"></i> Action
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
              <i className="ri-user-line me-1 align-middle"></i> Form
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={tabValue} className="text-muted">
          <TabPane tabId="1" id="nav-border-justified-home">
            <div>
              <Label htmlFor="action" className="form-label">
                Action's name
              </Label>
              <Input
                value={actionName}
                type="text"
                className="form-control"
                id="action"
                onChange={onChangeActionName}
              />
            </div>

            <div className="mt-3">
              <Label htmlFor="scope" className="form-label">
                Limit who has the right to take action
              </Label>
              <Select
                value={limitExecutors}
                isMulti
                onChange={handleChangeLimitExecutors}
                options={executors}
              />
            </div>
          </TabPane>

          <TabPane tabId="2" id="nav-border-justified-profile">
            <ReactFormBuilder edit data={form} toolbarItems={items} />
          </TabPane>
        </TabContent>
      </CommonModal>
    </>
  );
}

export default forwardRef(NewActionModal);
