import React, { useRef,useEffect,useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Summary from "./Summary";
import TaskTracking from "./TaskTracking";
import TaskComments from "./TaskComment";
import { useParams } from "react-router-dom";
import api from "../../api/listproject";

function TaskDetail() {
  const taskId = useParams();
  const [taskData,setTaskData] = useState();
  useEffect(() => {
    api.getTaskByid(taskId.id)
    .then(res => {
      setTaskData(res);
    })
    .catch(err => {
      console.log(err)
    })
  }, []);
  // console.log(taskData)
  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      <Container fluid style={{paddingTop:'80px',paddingBottom:'50px'}}>
        {/* <BreadCrumb title="Tasks Details" pageTitle="Tasks" /> */}
        <Row>
          <Col xxl={3}>
            {taskData && <TaskTracking taskData={taskData} />}
          </Col>
          <Col xxl={9}>
            {taskData && <Summary taskData={taskData} /> }
            {taskData && <TaskComments taskData={taskData}/> }
          </Col>
        </Row>
      </Container>
      {/* </div> */}
    </React.Fragment>
  );
}

export default TaskDetail;
