import React, { useEffect, useState } from "react";
import {
  ReactFormBuilder,
  ReactFormGenerator,
  Registry,
} from "../../../Components/FormBuilder";
import Demobar from "../DemoBar";
import "../CreateNewFormBuilder/form-builder.css";
import { useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getFormTemplateById,
  updateFormTemplate,
} from "../../../api/form-templates-api";
import { showErrorNotice, showSuccessNotice } from "../../../utils/toastify";
import { ElementStore } from "../../../Components/FormBuilder";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import DepartmentField from "../CustomField/DepartmentField";
import MyInput from "../CustomField/MyInput";

// Registry.register("DepartmentField", DepartmentField);
Registry.register("MyInputField", MyInput);

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

const ActionBar = (props) => {
  const { idForm, form, formData } = props;
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (data) => {};

  useEffect(() => {
    ElementStore.subscribe((state) => onChange(state.data));
  }, []);

  const handleSaveClick = () => {
    const data = { ...formData, template: JSON.stringify(form) };
    // console.log(data);
    saveFormTemplate(idForm, data);
  };

  const saveFormTemplate = (id, data) => {
    setLoading(true);
    updateFormTemplate(id, data)
      .then((response) => {
        showSuccessNotice("Update form template successfully");
        setLoading(false);
      })
      .catch((ex) => {
        showErrorNotice("Failure when update form");
        setLoading(false);
      });
  };

  const handlePreviewClick = () => {
    console.log("sshow modal");
    setShowPreview(true);
  };

  const toggleModal = () => {
    setShowPreview(false);
  };

  return (
    <>
      <div className="clearfix" style={{ margin: "10px", width: "70%" }}>
        <button
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={handleSaveClick}
        >
          Save Form
        </button>
        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handlePreviewClick}>Preview</button>
      </div>
      <Modal
        isOpen={showPreview}
        toggle={toggleModal}
        scrollable={true}
        id="modal-scrollable"
        style={{ maxWidth: "55%" }}
      >
        <ModalHeader>
          Scrollable modal
          <Button
            type="button"
            onClick={() => setShowPreview(false)}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>
        <ModalBody>
          <ReactFormGenerator
            download_path=""
            answer_data={{}}
            variables={props.variables}
            hide_actions={true}
            data={form}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={() => setShowPreview(false)}>
            Close
          </Button>
          <Button color="primary">Save changes</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

function EditFormBuilder() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  // const [form, setForm] = useState(() => {
  //   const tmp =
  //     location.state && location.state.form
  //       ? JSON.parse(location.state.form.template)
  //       : [];
  //   return tmp;
  // });

  // const [formData, setFormData] = useState(() => {
  //   const tmp =
  //     location.state && location.state.form ? location.state.form : {};
  //   return tmp;
  // });

  const [form, setForm] = useState([]);
  const [formData, setFormData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getTemplateId = (templateId) => {
    setLoading(true);
    getFormTemplateById(templateId)
      .then((response) => {
        setFormData(response.data);
        setForm(JSON.parse(response.data.template));
        setLoading(false);
      })
      .catch((ex) => {
        showErrorNotice("Failure when get form from server!");
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!isNaN(id)) {
      if (form.length === 0) {
        getTemplateId(Number(id));
      }
    } else {
      history.push("/");
    }
  }, []);

  console.log(form);
  return (
    <div className="page-content">
      {!loading && (
        <>
          <ActionBar idForm={id} form={form} formData={formData} />
          <ReactFormBuilder
            edit
            data={form}
            toolbarItems={items}
            customToolbarItems={items}
          />
        </>
      )}
    </div>
  );
}

export default EditFormBuilder;
