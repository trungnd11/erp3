/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import AsyncSelect from "react-select/async";
import "../../style/detailManager.scss";
import apiEmployee from "../../../../api/employee/employeeApi";
import ApiDepartment from "../../../../api/department";
import user from "../../../../assets/images/users/avatar-1.jpg";
import { Alert } from "../../alert";
import { departments } from "../../../../store/organizational/organizational";
import ModalCommon from "./ModalCommon";

function CreateManager({ detail, setDetail }, ref) {
  const openModal = useRef();
  const [searchManager, setSearchManager] = useState("");
  const [detailManager, setdetailManager] = useState("");

  const handleInputChange = (e) => {
    setSearchManager(e);
  };

  const handleSelectChange = (e) => {
    setdetailManager(e);
  };

  const handleUpdateManager = async () => {
    if (detailManager) {
      const requestData = {
        id: detail.id,
        managerCode: detailManager.id,
      };
      await ApiDepartment.updateManagerPart(requestData)
        .then((part) => {
          Alert(
            `Updated Manager ${part.manager.fullName} for ${part.name} `,
            "bg-success",
            "text-white"
          );
          openModal.current.setOpen(false);
          setDetail(part);
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    } else {
      Alert("Choose Manager, Please!", "bg-warning", "text-black");
    }
  };

  const findManagerOption = async () => {
    const response = await apiEmployee.findEmployeeByKey(searchManager);
    return response.map((item) => ({
      ...item,
      label: `${item.employeeNumb} - ${item.fullName}`,
      value: item.id,
    }));
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal,
    }),
    [openModal]
  );

  const InfoManager = ({ info }) => {
    const { avatarPic, fullName, phoneNumber, email, positionName } = info;
    return (
      <Row className="mt-3">
        <Col className="col-md-3">
          <div className="wapper-avatar">
            <img src={avatarPic || user} alt="" />
          </div>
        </Col>
        <Col className="col-md-9">
          <div className="infomation">
            <p>
              Name: <b>{fullName}</b>
            </p>
            <p>
              PhoneNumber: <b>{phoneNumber}</b>
            </p>
            <p>
              Email: <b>{email}</b>
            </p>
            <p>
              Position: <b>{positionName}</b>
            </p>
          </div>
        </Col>
      </Row>
    );
  };

  const CreateBody = () => {
    return (
      <>
        <Row>
          <AsyncSelect
            onChange={handleSelectChange}
            placeholder="Enter Name or Id..."
            cacheOptions
            loadOptions={findManagerOption}
            defaultOptions
            onInputChange={handleInputChange}
          />
        </Row>
        {detailManager && <InfoManager info={detailManager} />}
      </>
    );
  };

  return (
    <div>
      <ModalCommon
        ref={openModal}
        styles="detail-manager"
        title="UPDATE MAIN REPRSENTATIVE AGENT"
        action={() => setdetailManager("")}
        handleClick={handleUpdateManager}
      >
        {CreateBody()}
      </ModalCommon>
    </div>
  );
}

export default forwardRef(CreateManager);
