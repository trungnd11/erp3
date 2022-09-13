import React, { useState, useCallback, forwardRef } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Card, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useImperativeHandle } from "react";
import { generate_UUID } from "./../../utils/generate-unique";

const dataHolder = {
  downloadUri:
    "/hr/api/common/files/project/project_1656578808575_1656578808575.png",
  id: 18,
  fileSize: 1234,
  originalName: "kanbanBoard.png",
  type: "image/png",
};

function DropzoneFile(props, ref) {
  const [selectedFiles, setselectedFiles] = useState([]);
  const [fileObj, setFileObj] = useState([]);

  useImperativeHandle(
    ref,
    () => {
      return { files: selectedFiles, fileObj, setFileObj };
    },
    [selectedFiles, fileObj]
  );

  function handleAcceptedFiles(files) {
    const tmpFile = files.map(
      (file) => ({
        ...dataHolder,
        downloadUri: "",
        originalName: file.name,
        id: generate_UUID(),
        fileSize: file.size,
        type: file.type,
        formattedSize: formatBytes(file.size),
      })
      // Object.assign(file, {
      //   preview: URL.createObjectURL(file),
      //   formattedSize: formatBytes(file.size),
      // })
    );
    setFileObj(tmpFile);
    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div>
      <Dropzone
        noClick
        onDrop={(acceptedFiles) => {
          handleAcceptedFiles(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps, open }) => (
          <div className="dropzone dz-clickable" style={{ minHeight: "100px" }}>
            <div className="dz-message needsclick" {...getRootProps()}>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ fontSize: "2rem" }}
              >
                <i
                  className="display-4 text-muted ri-upload-cloud-2-fill mr-1"
                  style={{ fontSize: "2rem" }}
                />
                <span style={{ fontSize: "1rem" }}>
                  Drop files to attach, or{" "}
                  <span
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                    onClick={open}
                  >
                    browser
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="list-unstyled mb-0" id="file-previews">
        {fileObj.map((item, index) => (
          <Card
            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
            key={index + "-file"}
          >
            <div className="p-2">
              <Row className="align-items-center">
                <Col>
                  <Link to="#" className="text-muted font-weight-bold">
                    {item.originalName}
                  </Link>
                  <p className="mb-0">
                    <strong>{item.formattedSize}</strong>
                  </p>
                </Col>
              </Row>
            </div>
          </Card>
        ))}
        {/* {selectedFiles.map((f, i) => {
          return (
            <Card
              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
              key={i + "-file"}
            >
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      data-dz-thumbnail=""
                      height="80"
                      className="avatar-sm rounded bg-light"
                      alt={f.name}
                      src={f.preview}
                    />
                  </Col>
                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {f.name}
                    </Link>
                    <p className="mb-0">
                      <strong>{f.formattedSize}</strong>
                    </p>
                  </Col>
                </Row>
              </div>
            </Card>
          );
        })} */}
      </div>
    </div>
  );
}

export default forwardRef(DropzoneFile);
