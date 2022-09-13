import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import MetaTags from "react-meta-tags";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import '../styles.scss'
import { Link } from 'react-router-dom';
import PaginationTable from '../../../Components/pagination/PaginationTable';
import { getFormTemplate } from '../../../api/form-templates-api';
import { ToastContainer } from 'react-toastify';
import { showSuccessNotice, showErrorNotice, showWarningNotice } from '../../../utils/toastify';
import { useHistory } from 'react-router-dom';

const PageSize = 10;

const ListForm = () => {
  document.title = "List form builder | Velzon - React Admin & Dashboard Template";
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFormTemplatesData('');
    return () => {}
  }, [])
  

  const getFormTemplatesData = (key, page=0, size=10, sort='createdDate,desc') => {
    setLoading(true);
    getFormTemplate(key, page, size, sort).then(response => {
      setForms(response.data.content);
      setLoading(false);
    }).catch(ex => {
      setLoading(false);
      console.log(ex);
      showErrorNotice("Failure get form from server!");
    });
  }

  const showSuccess = () => {
    showWarningNotice("Message success");
  }

  const handleNewClicked = () => {
    history.push('/form-builder/create')
  }

  const handleEditClicked = (form) => {
    const { id } = form;
    console.log(history);
    history.push(`/form-builder/${id}`);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="List Form" pageTitle="Pages" />
          <Button color="primary" className='btn-label' onClick={handleNewClicked}>
            <i className='bx bx-plus label-icon align-middle fs-16 me-2'></i>
            New
          </Button>
          <Row className='mt-3'>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0 flex-grow-1">Table list form template</h4>
                </CardHeader>
                <CardBody>
                  <div className='table-responsive'>
                    <Table className="table-hover align-middle table-nowrap mb-0">
                      <thead>
                          <tr>
                              <th scope="col">No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        {forms.map((item, index) => (
                            <tr key={index}>
                            <th scope="row"><Link to="#" className="fw-medium">#{ index+1}</Link></th>
                              <td>{item.name}</td>
                              <td>
                                <div className="hstack gap-3 flex-wrap">
                                <Link to={{ pathname: `/form-builder/${item.id}`, state: { form: item } }} className="link-success fs-15">
                                  <i className="ri-edit-2-line"></i>
                                </Link>
                                <Link to="#" className="link-danger fs-15">
                                  <i className="ri-delete-bin-line"></i>
                                </Link>
                                </div>
                              </td>
                            </tr> 
                          ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className='mt-3'>
                    {/* <PaginationTable
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={100}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                    /> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ListForm;