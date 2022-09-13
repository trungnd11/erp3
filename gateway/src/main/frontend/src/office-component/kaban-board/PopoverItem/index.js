import React, { useState, useEffect, Fragment,forwardRef,useImperativeHandle } from "react";
import style from "./PopoverItem.module.css";
import "./PopoverItem.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  Popover,
  PopoverHeader,
  PopoverBody,
  ModalBody,
  ModalFooter,
  Modal,
  Button,
  ModalHeader,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";
import Flatpickr from "react-flatpickr";

export default function PopoverItem(props) {
  const popItem = props.popItem;
  // console.log(popItem)
  const selectType = props.selectType;
  const popIdx = props.popIdx;
  const onChangeName = props.onChangeName


  //   const type = popItem.type;

    // console.log(props);
  const [openPop, setOpenPop] = useState(false);
  const pillsTab = props.pillsTab;
  const removeSprints = props.removeSprints;

  useEffect(() => {
    setOpenPop(false);
  }, [pillsTab]);

  const onToggle = () => {
    setOpenPop(!openPop);
  };

  //   const setType = () => {
  //     selectType(id,type)
  //   }
  const onClickType = (type) => {
    selectType(popItem.id, type);
    setOpenPop(false);
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteSprint = () => {
    // console.log("delete")
    removeSprints();
    setDeleteModal(false);
  };

  const clickDeleteSprint = () => {
    setOpenPop(false);
    setDeleteModal(true);
  };

  const closedRemove = () => {
    setOpenPop(true);
    setDeleteModal(false);
  };

  const [modalEdit, setModalEdit] = useState(false);

  const ToggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openModalEdit = () => {
    setOpenPop(false);
    setModalEdit(true);
  };

  const onCancelEdit = () => {
    setOpenPop(true);
    setModalEdit(false);
  };

  const [valueEdit,setValueEdit] = useState(popItem.text)

  const changeValueEdit = (e) => {
    setValueEdit(e.target.value)
    // console.log(e.target.value)
  }

  const onChangeNameSubmit = () => {
    const changeOk = onChangeName(popItem.id,valueEdit)
    if(changeOk) {
      setOpenPop(true);
      setModalEdit(false);
    }
  }

  const [dateSprint,setDateSprint] = useState(popItem.dateSprint)

  const dateSprinChange = (e) => {
    setDateSprint(e);
  };

  const changeSprint = () => {
    const changeOk = onChangeName(popItem.id,valueEdit,dateSprint)
    console.log(changeOk)
    if(changeOk) {
      setOpenPop(true);
      setModalEdit(false);
    }
  }

  // useImperativeHandle(ref, () => ({

  //   getAlert() {
  //     alert("getAlert from Child");
  //   }

  // }));

  return (
    <React.Fragment>
      <div id={"popover_" + popIdx} onClick={onToggle}>
        {(pillsTab === popIdx && popItem.text !== 'Backlog') ? (
          <i className={`${style.icon_custom_down} ri-arrow-down-s-line`}></i>
        ) : (
          <></>
        )}
      </div>
      <Popover
        placement="bottom"
        isOpen={openPop}
        target={"popover_" + popIdx}
        toggle={onToggle}
        hideArrow={true}
        className="popover_content"
      >
        <div>
          <ul className={style.setting_view_custom}>
            <li className={style.setting_view_layout}>
              <div className={style.setting_view_layout_header}>
                <span className={style.setting_view_layout_header_text}>
                  Layout {popItem.id}
                </span>
                <i
                  onClick={() => {
                    setOpenPop(false);
                  }}
                  className={`${style.icon_closed_popover} ri-close-line`}
                ></i>
              </div>
              <ul className={style.layout_table_board}>
                <li
                  onClick={() => onClickType("table")}
                  className={
                    popItem.type === "table"
                      ? style.layout_table_active
                      : style.layout_table
                  }
                >
                  <div className={style.layout_table_background}>
                    <i
                      style={{ fontSize: "32px" }}
                      className="ri-table-line"
                    ></i>
                    <span style={{ fontSize: "12px", paddingTop: "4px" }}>
                      Table
                    </span>
                  </div>
                </li>
                <li
                  onClick={() => onClickType("board")}
                  className={
                    popItem.type === "board"
                      ? style.layout_board_active
                      : style.layout_board
                  }
                >
                  <div className={style.layout_table_background}>
                    <i
                      style={{ fontSize: "32px" }}
                      className="ri-dashboard-line"
                    ></i>
                    <span style={{ fontSize: "12px", paddingTop: "4px" }}>
                      Board
                    </span>
                  </div>
                </li>
              </ul>
            </li>
            {/* <li className={style.setting_view_underline}></li>
            <li className={style.setting_view_config}>
              <div className={style.setting_view_config_header}>
                <span className={style.setting_view_config_text}>
                  Configuration
                </span>
              </div>
              <ul className={style.setting_view_config_content}>
                <li className={style.setting_view_config_content_text}>
                  <i
                    style={{ fontSize: "16px", marginRight: "8px" }}
                    className="ri-bank-card-line"
                  ></i>
                  <span style={{ fontSize: "14px" }}>
                    Title, Assignees, Status, and Labels
                  </span>
                </li>
                <li className={style.setting_view_config_content_text}>
                  <i
                    style={{ fontSize: "16px", marginRight: "8px" }}
                    className="ri-archive-drawer-line"
                  ></i>
                  <span className={style.config_view_group}>
                    <span>group:</span>
                    <span className={style.config_view_group_none}> none</span>
                  </span>
                </li>
                <li className={style.setting_view_config_content_text}>
                  <i
                    style={{ fontSize: "16px", marginRight: "8px" }}
                    className="ri-sort-desc"
                  ></i>
                  <span className={style.config_view_group}>
                    <span>sort:</span>
                    <span>Title-desc</span>
                  </span>
                </li>
                <li className={style.setting_view_config_content_text}>
                  <i
                    style={{ fontSize: "16px", marginRight: "8px" }}
                    className="ri-filter-3-line"
                  ></i>
                  <div>
                    <span style={{ fontSize: "14px" }}>
                      Search or filter this view
                    </span>
                    <span className={style.setting_config_btn}>
                      <code className={style.setting_config_btn_ctrl}>
                        Ctrl
                      </code>
                      &nbsp;
                      <code className={style.setting_config_btn_ctrl}>F</code>
                    </span>
                  </div>
                </li>
              </ul>
            </li> */}
            <li className={style.setting_view_underline}></li>
            <li onClick={openModalEdit} className={style.setting_view_rename}>
              <i
                style={{ fontSize: "16px", marginRight: "8px" }}
                className="ri-pencil-line"
              ></i>
              <span style={{ fontSize: "14px" }}>Edit Sprint</span>
            </li>
            {/* <li className={style.setting_view_duplicate}>
              <i
                style={{ fontSize: "16px", marginRight: "8px" }}
                className="ri-file-copy-line"
              ></i>
              <span style={{ fontSize: "14px" }}>Save changes to new view</span>
            </li> */}
            <li
              onClick={clickDeleteSprint}
              className={style.setting_view_delete}
            >
              <i
                style={{ fontSize: "16px", marginRight: "8px" }}
                className="ri-delete-bin-7-line"
              ></i>
              <span style={{ fontSize: "14px" }}>Delete Sprint</span>
            </li>
            {/* <li className={style.setting_view_underline}></li>
            <li>
              <ul className={style.setting_view_bottom}>
                <li className={style.setting_view_bottom_save}>
                  <div className={style.bottom_save_btn}>
                    <span>Save changes</span>
                  </div>
                </li>
                <li className={style.setting_view_bottom_discard}>
                  <div className={style.bottom_save_btn}>
                    <span>Discard changes</span>
                  </div>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </Popover>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteSprint}
        onCloseClick={closedRemove}
      />
      <Modal
        isOpen={modalEdit}
        toggle={() => {
          ToggleModalEdit();
        }}
        centered
        className="border-0"
      >
        <div className="modal-header p-3 bg-soft-info">
          Edit Sprint
          <Button
            type="button"
            onClick={onCancelEdit}
            id="btn-close2"
            className="btn-close"
            aria-label="Close"
          ></Button>
        </div>
        <div className="modal-body">
          <Row>
            <Col lg={12}>
              <Label htmlFor="sprintName" className="form-label">
                Sprint Name :
              </Label>
              <Input
                type="text"
                value={valueEdit}
                onChange={(e) => {
                  changeValueEdit(e);
                }}
                className="form-control"
                id="sprintName"
                placeholder="Enter sprint name"
              />
            </Col>
            <Col lg={12}>
              <div className="mt-3">
                <Label className="form-label">Start To End :</Label>
                <Flatpickr
                  value={dateSprint}
                  className="form-control"
                  onChange={(e) => {
                    dateSprinChange(e);
                  }}
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                />
              </div>
            </Col>
            <div className="mt-4">
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={onCancelEdit}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={changeSprint}
                >
                  Edit Sprint
                </button>
              </div>
            </div>
          </Row>
        </div>
      </Modal>
    </React.Fragment>
  );
}
