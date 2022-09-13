import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  getPrivileges,
  getRoles,
  setRole,
} from "../../store/auth/authorization";
import { Storage } from "../../utils/storage-utils";
import BoardAll from "../../Components/Board/BoardAll";
import CommonModal from "../../Components/Modal";
import { showErrorNotice, showSuccessNotice } from "../../utils/toastify";
import { updateRole } from "../../api/account";

const columns = [
  {
    id: "role_code",
    numeric: false,
    disablePadding: true,
    label: "Role Code",
    sort: true,
    width: "25%",
  },
  {
    id: "role_name",
    numeric: true,
    disablePadding: false,
    label: "Role Name",
    width: "25%",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Descriptions",
    width: "50%",
  },
];

function List({ item }) {
  return (
    <>
      <td>
        <span component="span">{item.code}</span>
      </td>
      <td>
        <span component="span">{item.name}</span>
      </td>
      <td>
        <div className="d-flex flex-column">
          {item.privileges.map((privilege, index) => (
            <span key={index}>{`- ${privilege.description}`}</span>
          ))}
        </div>
      </td>
    </>
  );
}
function RoleManagement() {
  const roles = useSelector((state) => state.authorization.roles);
  const privileges = useSelector((state) => state.authorization.privileges);
  const account =
    useSelector((state) => state.authentication.account) ||
    Storage.local.get("account");
  const dispatch = useDispatch();

  const roleBoard = useRef();
  const roleModal = useRef();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedPrivilege, setSelectedPrivilege] = useState();
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    if (!roles) {
      await dispatch(getRoles());
    }
    if (!privileges) {
      await dispatch(getPrivileges());
    }
  };

  const isLoading = roles !== null && privileges !== null;

  useEffect(() => {
    fetchData();
  }, []);

  const isSelected = (privilege) => {
    if (!selectedPrivilege) {
      return false;
    }
    return (
      selectedPrivilege.findIndex((item) => item.id === privilege.id) !== -1
    );
  };

  const onRowClick = (item) => {
    setSelectedRole({...item});
    setSelectedPrivilege(item.privileges);
    roleModal.current.setOpen(true);
  };

  const handleClickCheckbox = (privilege) => {
    const selectedIndex = selectedPrivilege.findIndex(
      (item) => item.id === privilege.id
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedPrivilege, privilege);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedPrivilege.slice(1));
    } else if (selectedIndex === selectedPrivilege.length - 1) {
      newSelected = newSelected.concat(selectedPrivilege.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedPrivilege.slice(0, selectedIndex),
        selectedPrivilege.slice(selectedIndex + 1)
      );
    }

    setSelectedPrivilege(newSelected);
  };

  const onSaveChangeRole = () => {
    const updatedRole = { ...selectedRole, privileges: selectedPrivilege };
    setSaving(true);
    updateRole(selectedRole.id, updatedRole)
      .then((response) => {
        dispatch(setRole(response.data));
      })
      .then(() => {
        setSaving(false);
        showSuccessNotice("Save change successfully!");
        roleModal.current.setOpen(false);
      })
      .catch(() => {
        showErrorNotice("Save change error!", "error");
      });
  };

  const onChangeRoleName = (e) => {
    setSelectedRole(prev => ({...prev, name: e.target.value}))
  }

  const onChangeRoleCode = (e) => {
    setSelectedRole(prev => ({...prev, name: e.target.value}))
  }

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Role" pageTitle="Role Management" />
        {isLoading && (
          <>
            <Card>
              <CardHeader>List Role</CardHeader>
              <CardBody>
                <BoardAll
                  ref={roleBoard}
                  columns={columns}
                  rows={roles}
                  component={List}
                  isEditable={false}
                  onRowClick={onRowClick}
                />
              </CardBody>
            </Card>
            <CommonModal
              title="Role Detail"
              ref={roleModal}
              action={<SaveButton onSave={onSaveChangeRole} />}
            >
              <div>
                <Label htmlFor="project" className="form-label">
                  Role's name
                </Label>
                <Input
                  type="text"
                  value={(selectedRole && selectedRole.name) || ""}
                  className="form-control"
                  placeholder=""
                  onChange={onChangeRoleName}
                />
                <Label htmlFor="project" className="form-label mt-3">
                  Role's descriptions
                </Label>
                <Input
                  type="text"
                  value={(selectedRole && selectedRole.code) || ""}
                  className="form-control"
                  placeholder=""
                  onChange={onChangeRoleCode}
                />
              </div>
              <div className="mt-3 d-flex">
                {privileges.map((item, index) => {
                  const itemChecked = isSelected(item);
                  return (
                    <React.Fragment key={index}>
                      <div className="form-check mb-3" style={{width: '25%', flexWrap: 'wrap'}}>
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          checked={itemChecked}
                          onClick={() => {
                            handleClickCheckbox(item);
                          }}
                        />
                        <Label className="form-check-label">
                          {item.description}
                        </Label>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </CommonModal>
          </>
        )}
      </Container>
    </div>
  );
}

const SaveButton = ({ onSave, saving }) => {
  return (
    <Button type="button" className="btn btn-success btn-load" onClick={onSave}>
      {saving ? (
        <>
        <span className="d-flex align-items-center">
        <span className="flex-grow-1 me-2">Updating...</span>
        <span className="spinner-grow flex-shrink-0" role="status">
          <span className="visually-hidden">Updating...</span>
        </span>
      </span></>
      ):
      <span>Update</span>
      }
    </Button>
  );
};

export default RoleManagement;
