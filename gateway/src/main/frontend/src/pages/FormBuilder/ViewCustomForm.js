/* eslint-disable react/no-find-dom-node */
import React, { createRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { getFormTemplateById, updateFormTemplate } from '../../api/form-templates-api';
import { ReactFormGenerator, Registry } from '../../Components/FormBuilder'
import { showErrorNotice, showSuccessNotice } from '../../utils/toastify';
import DepartmentField from './CustomField/DepartmentField'
import { useState, useRef } from 'react';
import { Button } from 'reactstrap';
import { ReactDOM } from 'react-dom';
import { useParams } from 'react-router-dom';

Registry.register('DepartmentField', DepartmentField)

const items = [
// Additional standard components, you don't need full definition if no modification is required. 
{  
  key: 'Header',
}, {
  key: 'TextInput',
}, {
  key: 'TextArea',
}, {
  key: 'RadioButtons',
}, {
  key: 'Checkboxes',
}, {
  key: 'Image',
  },
  {
    key: 'DepartmentField',
    element: 'CustomElement',
    component: DepartmentField,
    type: 'custom',
    field_name: 'department_',
    name: 'Department',
    icon: 'fa fa-cog',
    static: true,
    props: { test: 'test_comp' },
    label: 'Department',
  },
];

function ViewCustomForm() {

  const [form, setForm] = useState([])
  const [formData, setFormData] = useState({});
  const [answerData, setAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fRef = useRef();
  const {id} = useParams();

  const getTemplateId = (templateId) => {
    setLoading(true);
    getFormTemplateById(templateId).then(response => {
      setForm(JSON.parse(response.data.template));
      setFormData(response.data);
      setAnswerData(JSON.parse(response.data.value));
      console.log(JSON.parse(response.data.value));
      setLoading(false);
    }).catch(ex => {
      showErrorNotice("Failure when get form from server!");
      setLoading(false);
    })
  }

  const handleSubmitClicked = (data) => {
    console.log('submit', data);
    const payload = { ...formData, value: JSON.stringify(data) };
    console.log(payload);
    // setLoading(true);
    updateFormTemplate(payload.id, payload).then((response) => {
      showSuccessNotice("Update successfully!");
    }).catch(ex => {
      showErrorNotice("Error when updating data");
    })
  }

  useEffect(() => {
    getTemplateId(id);
  }, [])

  return (
    <div style={{ maxWidth: '70%', margin: 'auto' }} className='page-content'>
      {!loading && <ReactFormGenerator
        download_path=""
        answer_data={answerData}
        data={form}
        actionName="Submit"
        onSubmit={handleSubmitClicked}
        mode="view"
      />}
    </div>
  )
}

export default ViewCustomForm