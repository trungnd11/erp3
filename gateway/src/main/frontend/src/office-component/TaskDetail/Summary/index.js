import React from 'react';
import { Card, CardBody, Input, Label } from 'reactstrap';
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
  } from "react-html-parser";
  import style from "./style.module.css";

const Summary = (props) => {
    const taskData = props.taskData
    // console.log(taskData)
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="text-muted">
                        <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                        <div className={style.html_parse}>
                            {ReactHtmlParser(taskData.description)}
                        </div>

                        {/* <h6 className="mb-3 fw-semibold text-uppercase">Sub-tasks</h6>
                        <ul className=" ps-3 list-unstyled vstack gap-2">
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="productTask" />
                                    <Label className="form-check-label" htmlFor="productTask">
                                        Product Design, Figma (Software), Prototype
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="dashboardTask" defaultChecked />
                                    <Label className="form-check-label" htmlFor="dashboardTask">
                                        Dashboards : Ecommerce, Analytics, Project,etc.
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="calenderTask" />
                                    <Label className="form-check-label" htmlFor="calenderTask">
                                        Create calendar, chat and email app pages
                                    </Label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" defaultValue="" id="authenticationTask" />
                                    <Label className="form-check-label" htmlFor="authenticationTask">
                                        Add authentication pages
                                    </Label>
                                </div>
                            </li>
                        </ul> */}

                        <div className="pt-3 border-top border-top-dashed mt-4">
                            <h6 className="mb-3 fw-semibold text-uppercase">Tasks Tags</h6>
                            <div className="hstack flex-wrap gap-2 fs-15">
                                {taskData.tags.map((item,index) => (
                                    <div key = {index} className="badge fw-medium badge-soft-info">{item.name}</div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Summary;