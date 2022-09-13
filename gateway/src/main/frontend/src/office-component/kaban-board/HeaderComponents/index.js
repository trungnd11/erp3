import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import style from '../styles.module.css'

const RenderCardTitle = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex mb-3 me-4" style={{alignItems:'center'}}>
        <div className="flex-grow-1">
          <h6 className="fs-14 text-uppercase fw-semibold mb-0">
            {props.name}
            <small className={"badge align-bottom ms-1 bg-" + props.badgeClass}>
              {props.badge}
            </small>
          </h6>
        </div>
        <div className="flex-shrink-0">
          {/* <UncontrolledDropdown className="card-header-dropdown" direction='start'>
            <DropdownToggle tag="a" role="button">
              <span className="fw-medium text-muted fs-12">Priority<i className="mdi mdi-chevron-down ms-1" /></span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>Priority</DropdownItem>
              <DropdownItem>Date Added</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          {/* <button className={style.add_new_task}>
            <i className={`${style.ic_style_add} ri-add-line`}></i>
          </button> */}
          {/* <Button
            color="secondary"
            onClick={() => {console.log(props)}}
          >New task</Button> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RenderCardTitle;
