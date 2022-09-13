import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody, Container } from "reactstrap";
import { getPosition, updatePosition } from "../../api/position";
import BackdropLoading from "../../Components/BackdropLoading";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { showErrorNotice, showSuccessNotice } from "../../utils/toastify";
import PositionCommonForm from "./PositionCommonForm";

function EditPosition() {
  const { id } = useParams();
  const [positionData, setPositionData] = useState();
  const [loading, setLoading] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const refForm = useRef();
  const history = useHistory();

  const getPositionData = (pId) => {
    setLoading(true);
    getPosition(pId)
      .then((response) => {
        setPositionData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showErrorNotice("get data for position fail!");
        setLoading(false);
      });
  };

  const onCancelClick = () => {
    setEditable(false);
    setPositionData((prev) => ({ ...prev }));
  };

  const onSaveClick = () => {
    const data = refForm.current.getData();
    const payload = { ...data, id };
    setLoading(true);
    updatePosition(id, payload)
      .then((response) => {
        setPositionData(response.data);
        setLoading(false);
        setEditable(false);
        showSuccessNotice("Saved position successfully!");
        history.push('/position')
      })
      .catch((err) => {
        setLoading(false);
        showErrorNotice("Failure when saving position");
      });
  };

  useEffect(() => {
    getPositionData(id);
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Position detail" pageTitle="Position management" />
        {loading && <BackdropLoading />}
        <Card>
          <CardBody>
            <div className="d-flex flex-row-reverse">
              {isEditable ? (
                <>
                  <Button
                    className="bg-gradient"
                    color="secondary"
                    onClick={onSaveClick}
                  >
                    Save
                  </Button>
                  <Button
                    className="bg-gradient"
                    color="light"
                    onClick={onCancelClick}
                    style={{ marginRight: "1rem" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="gradient"
                  color="danger"
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </div>

            <div className="mt-3">
              <PositionCommonForm
                position={positionData}
                isEditable={isEditable}
                ref={refForm}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default EditPosition;
