import React, { useEffect,useState } from 'react';
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
//redux
import { useSelector, useDispatch } from "react-redux";
import { getProjectList } from "../../../store/actions";
import apiproject from '../../../api/listproject'
import BackdropLoading from "../../../Components/BackdropLoading";


import List from './List';

const ListProject = () => {
    // const dispatch = useDispatch();

    // const [loading,setLoading] = useState(false)

    // const [listProject,setListProject] = useState([]);

    // const { projectList } = useSelector((state) => ({
    //     projectList: state.Projects.projectList,
    // }));

    // useEffect(() => {
    //     dispatch(getProjectList());
    // }, [dispatch]);

    // useEffect(() => {
    //     setLoading(true)
    //     apiproject.getAllListProject()
    //     .then(res => {
    //         setListProject(res)
    //         setLoading(false)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         setLoading(false)
    //     })
    // }, []);

    // const getDataProject = () => {
    //     setLoading(true)
    //     apiproject.getAllListProject()
    //     .then(res => {
    //         setListProject(res)
    //         setLoading(false)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         setLoading(false)
    //     })
    // }

    // const loadDataProject = () => {
    //     getDataProject();
    // }
    document.title = "Project List | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                {/* {loading && <BackdropLoading />} */}
                <Container fluid>
                    <BreadCrumb title="Project List" pageTitle="Projects" />
                    <List/>
                </Container>
            </div>
        </React.Fragment>
    );
};

// const getProjectList = (dataArr) => {

// }

export default ListProject;