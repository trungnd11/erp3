import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Dropzone from "react-dropzone";
import departmentApi from "../../../../api/department";
import ModalCommon from "./ModalCommon";
import "../../style/importDepartment.scss";
import { Alert } from "../../alert";
import { useDispatch } from "react-redux";
import { departments } from "../../../../store/organizational/organizational";

function ImportExcelPart(prop, ref) {
  const openModal = useRef();
  const [chooseImport, setChooseImport] = useState("update-departments");
  const [fileDepartment, setFileDepartment] = useState();
  const dispatch = useDispatch();

  const handleExportTempleteForm = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

    const templatePart = [
      {
        name: "",
        code: "",
        parentCode: "",
        managerCode: "",
      },
    ];

    exportToCSV(templatePart, "form-department");
  };

  const handleUploadDepartment = async () => {
    if (chooseImport === "update-departments") {
      const formData = new FormData();
      formData.append("name", "file");
      formData.append("file", fileDepartment);
      await departmentApi
        .importDepartment(formData)
        .then((data) => {
          Alert(`Updated ${data} department `, "bg-success", "text-white");
          openModal.current.setOpen(false);
          dispatch(departments());
        })
        .catch((e) => {
          Alert(e, "bg-danger", "text-white");
        });
    }
  };

  const CreateBody = () => {
    return (
      <div className="wapper-import-function">
        <Row className="mt-3">
          <Col md={3}>
            <Label for="import-excel">Select import function</Label>
          </Col>
          <Col md={9}>
            <Input
              id="import-excel"
              type="select"
              placeholder="Choose function import"
              onChange={(e) => setChooseImport(e.value)}
            >
              <option value="update-departments">Update Departments</option>
            </Input>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}>
            <Label for="choose-file">Select list file</Label>
          </Col>
          <Col md={9}>
            <Dropzone onDrop={(acceptedFiles) => {
              setFileDepartment(acceptedFiles[0]);
            }}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone dz-clickable">
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <div className="mb-0">
                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                    </div>
                    <h6>Drop files here or click to upload.</h6>
                  </div>
                </div>
              )}
            </Dropzone>
          </Col>
        </Row>
        <div className="import-description">
          <ul>
            <li>Update employees according to the uploaded excel list</li>
            <li>Download the sample file</li>
            <li>Enter employee code</li>
            <li>Enter employee information</li>
            <li>Select file and done!</li>
          </ul>
          <Button color="success" outline onClick={handleExportTempleteForm}>
            <i className="mdi mdi-file-download-outline"></i>
            Download Form templete
          </Button>
        </div>
      </div>
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal,
    }),
    [openModal]
  );

  return (
    <div>
      <ModalCommon
        ref={openModal}
        styles="detail-manager"
        title="Import from excel"
        handleClick={handleUploadDepartment}
      >
        {CreateBody()}
      </ModalCommon>
    </div>
  );
}

export default forwardRef(ImportExcelPart);
