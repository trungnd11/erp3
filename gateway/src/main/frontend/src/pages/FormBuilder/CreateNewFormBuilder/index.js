import React, { useState } from 'react'
import { ReactFormBuilder, Registry } from '../../../Components/FormBuilder';
import Demobar from '../DemoBar';
import './form-builder.css';
import DepartmentField from '../CustomField/DepartmentField';
import MyInput from '../CustomField/MyInput'


// Registry.register('DepartmentField', DepartmentField)
Registry.register('MyInputField', MyInput)

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

function CreateNewFormBuilder() {
  const [form, setForm] = useState([]);
  return (
      <ReactFormBuilder
        edit
        data={form}
        toolbarItems={items}
      />
  )
}

export default CreateNewFormBuilder;