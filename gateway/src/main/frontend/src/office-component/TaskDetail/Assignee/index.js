import React from 'react'
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import noavatar from '../../../assets/images/users/user-dummy-img.jpg'

const Assignee = (props) => {
  const assignee = props.assignee
  // const { avatar, name, title } = props;
  
  return (
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0">
          <img src={assignee.avatarPic ? assignee.avatarPic : noavatar} alt="" className="avatar-xs rounded-circle" />
        </div>
        <div className="flex-grow-1 ms-2">
          <h6 className="mb-1">
            <Link to="/pages-profile">{ assignee.fullName }</Link>
          </h6>
          <p className="text-muted mb-0">{assignee.employeeNumb}</p>
        </div>
        <div className="flex-shrink-0">
          <UncontrolledDropdown>
            <DropdownToggle
              tag="button"
              className="btn btn-icon btn-sm fs-16 text-muted dropdown shadow-none"
              type="button"
            >
              <i className="ri-more-fill"></i>
            </DropdownToggle>
            <DropdownMenu>
              <div>
                <DropdownItem>
                  <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                  View
                </DropdownItem>
              </div>
              <div>
                <DropdownItem>
                  <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                  Favourite
                </DropdownItem>
              </div>
              <div>
                <DropdownItem>
                  <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                  Delete
                </DropdownItem>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
  );
};

export default Assignee;