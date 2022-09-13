import React, { useState } from 'react'
import { ReactFormBuilder } from '../../Components/FormBuilder'
import Demobar from './DemoBar';
import * as variables from './variables';

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
}];

function FormBuilder(props) {
  const [form, setForm] = useState([]);
  const handleUpdate = (e, data) => {
    console.log(e);
    console.log(data);
  }
  const handleSubmit = (e, data) => {
    console.log(e);
    console.log(data);
  }
  return (
    <div className='page-content'>
    </div>
  )
}

export default FormBuilder