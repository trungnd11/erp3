import React, { useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { Button, Modal, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import SimpleBar  from 'simplebar-react';

function ConfigModal(props, ref) {
  const { action: Action, title } = props;
  const [open, setOpen] = useState(false);
  const toggleCanvas = () => {
    setOpen(!open);
  };

  useImperativeHandle(
    ref,
    () => ({
      open,
      setOpen,
    }),
    []
  );

  return (
    <Offcanvas
      isOpen={open}
      direction="end"
      toggle={toggleCanvas}
      id="offcanvasRight"
      className="border-bottom"
      style={{width: 500}}
    >
      <OffcanvasHeader toggle={toggleCanvas} id="offcanvasRightLabel">
        {title || "Setting"}
      </OffcanvasHeader>
      <OffcanvasBody className="p-0 overflow-hidden">
        <SimpleBar style={{ height: "100vh" }}>
            {props.children}
        </SimpleBar>
      </OffcanvasBody>
      <div className="offcanvas-foorter border p-3 text-center">
      </div>
    </Offcanvas>
  );
}

export default forwardRef(ConfigModal);
