import React, { useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react';
import { Button, Modal } from 'reactstrap';


function CommonModal(props, ref) {
  const { action: Action, title, onCloseCallback=()=>{}} = props;
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  }

  useImperativeHandle(ref, () => ({
    open, setOpen
  }), [])

  const onClose = () =>{
    onCloseCallback();
    setOpen(false);
  }
  return (
    <Modal size='lg' isOpen={open} toggle={toggleModal}  centered className="border-0">
      <div className="modal-header p-3 bg-soft-info">
        <h5 className='modal-title'>{title || "Modal title"}</h5>
        <Button
          onClick={onClose}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></Button>
      </div>

      <div className="modal-body">
        {props.children}
      </div>
      <div className='modal-footer'>
        <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            Close
        </button>
        {Action ? Action : null}
      </div>
   </Modal>
  )
}

export default forwardRef(CommonModal)