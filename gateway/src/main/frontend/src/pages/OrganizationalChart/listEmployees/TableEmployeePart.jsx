import React, { useEffect, useState, useMemo, useImperativeHandle } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import employeeApi from '../../../api/employee/employeeApi';
import TableContainer from '../../../Components/Common/TableContainer';
import { forwardRef } from 'react';
import { Alert } from '../alert';
import avatarDefault from "../../../assets/images/users/avatar-1.jpg"

function TableEmployeePart(prop, ref) {
  const [memberData, setMemberData] = useState({
    loading: true,
    data: [],
  });
  const navigationPageEmployees = useHistory();

  const handleDeletePartForEmployee = async (employee) => {
    try {
      const response = await employeeApi.deleteEmployeeForDepartment(employee.id);
      Alert(`Deleted complete `, "bg-success", "text-white");
      getListEmployeeByPart();
    } catch (error) {
      Alert(error, "bg-danger", "text-white");
    }
  }

  useImperativeHandle(
    ref,
    () => getListEmployeeByPart,
    [],
  )

  const { id } = useParams();

  const CreateAction = ({ original }) => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          href="#"
          className="btn-soft-secondary btn-sm dropdown"
          tag="button"
        >
          <i className="ri-more-fill align-middle"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem onClick={() => navigationPageEmployees.replace(`/hrcenter-employee-profile/employee-list/profiles/${original.id}`)}>
            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
          </DropdownItem>
          <DropdownItem onClick={() => handleDeletePartForEmployee(original)}>
            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const ShowAvatar = ({ original }) => {
    return (
      <div className='avatar'>
        <img className='rounded-circle' src={original.avatarPic || avatarDefault} alt="" width={50} />
      </div>
    )
  }

  const columns = useMemo(() => [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => CreateAction(row),
    },
    {
      Header: "Avatar",
      accessor: "avatarPic",
      Cell: ({ row }) => ShowAvatar(row),
    },
    {
      Header: "Full name",
      accessor: "fullName",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Position",
      accessor: "empPositionName",
    }
  ]);
  const getListEmployeeByPart = async () => {
    const response = await employeeApi.getEmployeeByDepartment(id);
    setMemberData({ loading: false, data: response });
  };

  useEffect(() => {
    getListEmployeeByPart();
  }, []);

  return (
    <div className="wapper-family">
      <Row className="mb-3">
        <TableContainer columns={columns} data={memberData.data} />
      </Row>
    </div>
  )
}

export default forwardRef(TableEmployeePart);
