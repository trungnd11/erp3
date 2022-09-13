import React from "react";

function Chip({label, onClose = ()=>{}, ...rest}) {
  return (
    <React.Fragment>
      <span className="d-inline-flex align-items-center badge badge-outline-info fs-12">
        {label}
        <i className="ri-close-line fs-16" style={{ cursor: "pointer" }} onClick={onClose}></i>
      </span>
    </React.Fragment>
  );
}

export default Chip;
