import React from "react";
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

const iconType = {
  "zip": "ri-folder-zip-line",
  "ppt": "ri-file-ppt-2-line",
}

function FileAttachment(props) {
  const file = props.file
  console.log(file)
  // const { type, name, size } = props;

  return (
    <div className="border rounded border-dashed p-2">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3">
          <div className="avatar-sm">
            <div className="avatar-title bg-light text-secondary rounded fs-24 shadow">
              <i className={iconType['zip']}></i>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 overflow-hidden">
          <h5 className="fs-13 mb-1">
            <Link to="#" className="text-body text-truncate d-block">
              {file.originalName}
            </Link>
          </h5>
          <div>{ file.type }</div>
        </div>
        <div className="flex-shrink-0 ms-2">
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-icon text-muted btn-sm fs-18 shadow-none"
            >
              <i className="ri-download-2-line"></i>
            </button>
            <UncontrolledDropdown>
              <DropdownToggle
                tag="button"
                className="btn btn-icon text-muted btn-sm fs-18 dropdown shadow-none"
                type="button"
              >
                <i className="ri-more-fill"></i>
              </DropdownToggle>
              <DropdownMenu>
                <li>
                  <DropdownItem>
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    Delete
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileAttachment;
