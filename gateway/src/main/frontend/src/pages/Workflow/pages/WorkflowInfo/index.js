import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Input,
  Label,
  UncontrolledCollapse,
} from "reactstrap";
import InputText from "./InputText";
import Select from "react-select";
import styles from "./styles.module.css";
import { use } from "echarts";

const activeOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Not Active" },
];

const GroupOptions = [
  {
    label: "UK",
    options: [
      { label: "London", value: "London" },
      { label: "Manchester", value: "Manchester" },
      { label: "Liverpool", value: "Liverpool" },
    ],
  },
  {
    label: "FR",
    options: [
      { label: "Paris", value: "Paris" },
      { label: "Lyon", value: "Lyon" },
      { label: "Marseille", value: "Marseille" },
    ],
  },
  {
    label: "DE",
    options: [
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
      { label: "Berlin", value: "Berlin" },
    ],
  },
  {
    label: "US",
    options: [
      { label: "New York", value: "New York" },
      { label: "Washington", value: "Washington" },
      { label: "Michigan", value: "Michigan" },
    ],
  },
  {
    label: "SP",
    options: [
      { label: "Madrid", value: "Madrid" },
      { label: "Barcelona", value: "Barcelona" },
      { label: "Malaga", value: "Malaga" },
    ],
  },
  {
    label: "CA",
    options: [
      { label: "Montreal", value: "Montreal" },
      { label: "Toronto", value: "Toronto" },
      { label: "Vancouver", value: "Vancouver" },
    ],
  },
];

function WorkflowInfo() {
  const [active, setActive] = useState();
  const [scope, setScope] = useState();
  const [workManager, setWorkManager] = useState();
  const [watchers, setWatchers] = useState();

  const handleChangeActive = (option) => {
    setActive(option);
  };

  const handleChangeScope = (option) => {
    setScope(option);
  };

  const handlChangeWorkManager = (option) => {
    setWorkManager(option);
  };

  const handleChangeWatchers = (option) => {
    setWatchers(option);
  }

  return (
    <div>
      <Card>
        <div className="accordion accordion-flush">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-transparent shadow-none"
                type="button"
                id="flush-headingBrands"
              >
                <span className="text-muted text-uppercase fs-12 fw-medium">
                  Workflow Information
                </span>
                {/* <span className="badge bg-success rounded-pill align-middle ms-1">
                  2
                </span> */}
              </button>
            </h2>
            <UncontrolledCollapse defaultOpen toggler="#flush-headingBrands">
              <div
                id="flush-collapseBrands"
                className="accordion-collapse collapse show"
                aria-labelledby="flush-headingBrands"
              >
                <div className="accordion-body text-body pt-0">
                  {/* <div className="search-box search-box-sm">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Search Brands..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div> */}
                  <InputText
                    type="text"
                    className="form-control"
                    id="labelInput"
                    placeholder="Workflow's name"
                  />
                  <div className="gap-2 mt-3">
                    <div>
                      <Label
                        htmlFor="active"
                        className="form-label text-muted mb-0"
                      >
                        Active
                      </Label>
                      <Select
                        value={active}
                        onChange={handleChangeActive}
                        options={activeOptions}
                      />
                    </div>
                    <div className="gap-2 mt-3">
                      <Label
                        htmlFor="code"
                        className="form-label text-muted mb-0"
                      >
                        Code
                      </Label>
                      <Input type="text" className="form-control" id="code" />
                    </div>
                    <div className="gap-2 mt-3">
                      <Label
                        htmlFor="group"
                        className="form-label text-muted mb-0"
                      >
                        Group
                      </Label>
                      <Input type="text" className="form-control" id="group" />
                    </div>

                    <div className="gap-2 mt-3">
                      <Label
                        htmlFor="scope"
                        className="form-label text-muted mb-0"
                      >
                        Scope
                      </Label>
                      <Select
                        value={scope}
                        isMulti
                        onChange={handleChangeScope}
                        options={GroupOptions}
                      />
                    </div>

                    <div className="gap-2 mt-3">
                      <Label
                        htmlFor="scope"
                        className="form-label text-muted mb-0"
                      >
                        Work manager generated by workflow
                      </Label>
                      <Select
                        value={workManager}
                        isMulti
                        onChange={handlChangeWorkManager}
                        options={GroupOptions}
                      />
                    </div>

                    <div className="gap-2 mt-3"></div>
                      <div className="form-check mb-3">
                          <Input className="form-check-input" type="checkbox" id="changeManager" />
                          <Label className="form-check-label" htmlFor="changeManager">
                              Allow change manager when create task
                          </Label>
                      </div>
                    <div>

                    <div className="gap-2 mt-3">
                      <Label
                        htmlFor="scope"
                        className="form-label text-muted mb-0"
                      >
                        Watchers
                      </Label>
                      <Select
                        value={watchers}
                        isMulti
                        onChange={handleChangeWatchers}
                        options={GroupOptions}
                      />
                    </div>

                    <div className="gap-2 mt-3">
                      <Label htmlFor="descs" className="form-label">Descriptions</Label>
                      <textarea className="form-control" id="descs" rows="3"></textarea>
                    </div>
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                      >
                        1,235 More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </UncontrolledCollapse>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default WorkflowInfo;
