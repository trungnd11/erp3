import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import { createPosition, searchPosition } from "../../api/position";
import Board from "../../Components/Board/Board";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Modal from "../../Components/Modal";
import { showErrorNotice, showSuccessNotice } from "../../utils/toastify";
import { isEmpty } from "../../utils/validate-utils";
import PositionCommonForm from "./PositionCommonForm";

function List({ item }) {
  const history = useHistory();
  const [roles, setRoles] = useState(() => {
    const data = [];
    item.roles.forEach((el) => data.push(el.name));
    return data.join(", ");
  });

  return (
    <>
      <td>
        <div>{item.name}</div>
      </td>
      <td>{item.descriptions}</td>
      <td>{roles}</td>
      <td>
        <div className="hstack gap-3 flex-wrap">
          <Link to="#" className="link-success fs-15" onClick={()=>{history.push(`/position/${item.id}`);}}>
            <i className="ri-edit-2-line"></i>
          </Link>
          {/* <Link to="#" className="link-danger fs-15" onClick={()=>{console.log("Delete")}}>
            <i className="ri-delete-bin-line"></i>
          </Link> */}
        </div>
      </td>
    </>
  );
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    sort: true,
    width: "30%",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Descriptions",
    sort: true,
    width: "25%",
  },
  {
    id: "roles",
    numeric: false,
    disablePadding: true,
    label: "Roles",
    sort: false,
    width: "30%",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Actions",
    sort: false,
    width: "10%",
  },
];

const SaveAction = (props) => {
  const { onSave } = props;

  return (
    <Button onClick={onSave} className="bg-gradient">
      Save
    </Button>
  );
};

function PositionManagement() {
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 10,
    sort: "createdDate,desc",
    totalElements: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [positionData, setPositionData] = useState();
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const positionModal = useRef();
  const refForm = useRef();

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPageInfo((prev) => ({ ...prev, page: 0 }));
      searchKey(inputValue, 0, pageInfo.size);
    }
  };

  const searchKey = (key, page, size) => {
    setLoading(true);
    searchPosition(key, page, size)
      .then((response) => {
        setPositionData(response.content);
        setPageInfo((prev) => ({
          ...prev,
          page: page,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
        }));
      })
      .then(() => {
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        showErrorNotice("Failure when getting data!");
        setLoading(false);
      });
  };

  const onChangePage = (page) => {
    searchKey(inputValue, page - 1, pageInfo.size);
  };

  const onRowClick = (id) => {
    history.push(`/position/${id}`);
  };

  const onNewClick = () => {
    positionModal.current.setOpen(true);
  };

  const validateFunc = (name, roles) => {
    if (isEmpty(name)) {
      showErrorNotice("Name is empty!");
      return false;
    }
    if (!roles || roles.length === 0) {
      showErrorNotice("Please select at least one role!");
      return false;
    }
    return true;
  };

  const onSaveClick = () => {
    const data = refForm.current.getData();
    if (!validateFunc(data.name, data.roles)) {
      return;
    }
    setSaving(true);
    createPosition(data)
      .then((response) => {
        setPositionData(response.data.data);
        setSaving(false);
        positionModal.current.setOpen(false);
        searchKey(inputValue, 0, pageInfo.size);
        showSuccessNotice("Saved position successfully!");
      })
      .catch((err) => {
        setSaving(false);
        showErrorNotice("Failure when saving position");
      });
  };

  useEffect(() => {
    searchKey(inputValue, pageInfo.page, pageInfo.size);
  }, [pageInfo.size]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Position" pageTitle="Position management" />
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0 flex-grow-1">Position List</h5>
          </CardHeader>
          <CardBody>
            <div className="d-flex pb-2">
              <div className="flex-grow-1">
                <Button
                  color="secondary"
                  className="bg-gradient"
                  onClick={onNewClick}
                >
                  New
                </Button>
              </div>
              <div className="search-box ms-2">
                <Input
                  type="text"
                  className="form-control search"
                  placeholder="Search..."
                  value={inputValue}
                  onChange={(e) => {
                    handleChangeInput(e);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                  }}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>
            <Board
              columns={headCells}
              rows={positionData}
              pageInfo={pageInfo}
              loading={loading}
              setPageInfo={setPageInfo}
              onChangePage={onChangePage}
              component={List}
              checkbox={false}
            />
          </CardBody>
        </Card>
        <Modal
          ref={positionModal}
          title="Create New Position"
          action={<SaveAction onSave={onSaveClick} />}
        >
          <PositionCommonForm isEditable ref={refForm} />
        </Modal>
      </Container>
    </div>
  );
}

export default PositionManagement;
