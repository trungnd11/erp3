/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ModalCommon(prop, ref) {
  const [open, setOpen] = useState();
  useImperativeHandle(
    ref,
    () => ({
      setOpen,
      open,
      closeModal,
    }),
    [open]
  );

  const closeModal = (action) => {
    setOpen(false);
    action && action();
  }

  useEffect(() => prop.resetForm, [open]);

  return (
    <div>
      <Modal
        className={`modal-style ${prop.styles}`}
        isOpen={open}
        size={prop.size || "lg"}
        centered
        toggle={() => closeModal()}
      >
        <ModalHeader
          close={
            <button
              className="close"
              onClick={() => closeModal()}
            >
              ×
            </button>
          }
          charCode="Y"
          toggle={() => closeModal()}
        >
          {prop.title || "Modal title"}
        </ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            prop.validation && prop.validation();
            return false;
          }}
        >
          <ModalBody>{prop.children}</ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="success"
              outline
              onClick={prop.handleClick}
            >
              <i className="mdi mdi-content-save-outline" />
              Save
            </Button>{" "}
            <Button
              color="danger"
              outline
              onClick={() => closeModal()}
            >
              <i className="las las la-minus-circle" />
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default forwardRef(ModalCommon);
