/* eslint-disable no-prototype-builtins */
import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const labelText = myxss.process(props.data.label);
  const field_name = props.data.field_name;
  return (
    <label className={props.className || ''}>
      <span dangerouslySetInnerHTML={{ __html: labelText }} />
      <br />
      {!props.mode && <span style={{ color: '#fb6262' }}>{`{${field_name}}`}</span>}
      {hasRequiredLabel && <span className="label-required badge badge-danger">Required</span>}
    </label>
  );
};

export default ComponentLabel;
