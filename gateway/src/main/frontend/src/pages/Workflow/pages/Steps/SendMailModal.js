import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, Label } from "reactstrap";
import Editor from "../../../../Components/Editor";
import Modal from "../../../../Components/Modal";

function SendMailModal({ callback = () => {} }, ref) {
  const mailModal = useRef();
  const editorEmail = useRef();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [files, setFiles] = useState();
  const inputRef = useRef();
  const [fileName, setFileName] = useState("Attachment")
  const [file, setFile] = useState();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    inputRef.current.value = null;
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal: () => {
          mailModal.current.setOpen(true);
        },
      };
    },
    []
  );

  return (
    <>
      <Modal
        ref={mailModal}
        title="Email Setting"
        onCloseCallback={() => {
          callback();
        }}
      >
        <div>
          <Label htmlFor="title" className="form-label">
            Title
          </Label>
          <Input
            value={title}
            type="text"
            className="form-control"
            id="title"
            onChange={onChangeTitle}
          />
        </div>
        <div className="gap-2 mt-3">
          <Label htmlFor="content" className="form-label">
            Content
          </Label>
          <Editor />
        </div>
        <div className="gap-3 mt-3">
          <div className="input-group">
            <Input
              type="text"
              className="form-control"
              aria-label="Attachments"
              value={fileName}
              readOnly
              onClick={()=>{inputRef.current.click()}}
            />
            <span className="input-group-text"><i className=" ri-attachment-line fs-14"></i></span>
            <input ref={inputRef} type="file" hidden onChange={onInputChange}/>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default forwardRef(SendMailModal);
