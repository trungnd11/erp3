import { useFormik } from 'formik';
import React from 'react'
import { toast } from 'react-toastify';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody } from 'reactstrap';
import * as Yup from "yup";
import employeeApi from '../../api/employee/employeeApi';

export default function ModalChangePassword({modalChangePw, setmodalChangePw, dataUser}) {

    function tog_ChangNewPw() {
        setmodalChangePw(!modalChangePw);
    }

    
    const changePassword2Default = async () => {
            await employeeApi.changePassword2Default(dataUser.username).then(({ data }) => {
                  const newEmployee = data;
                  console.log('success')
                successnotify();
                tog_ChangNewPw();
            })
                .catch((e) => {
                errornotify();
                console.log(e);
                });
            
    }

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          password: '',
          password1: '',
          oldPassword: '',
        },
    
        validationSchema: Yup.object({
            password: Yup.string().required(),

            password1: Yup
            .string()
            .oneOf([Yup.ref('password'), null])
            .required(),

            oldPassword: Yup.string().required(),

        }),
    
        onSubmit: (values,{ resetForm }) => {
        //  console.log(values.password)
        
         employeeApi.changePassword(dataUser.username, {password: values.oldPassword , newPassword: values.password})
         .then(() => {
            
            console.log('success')
            successnotify();
              
            })
    
        .catch((e) => {
                errornotify();

                console.log(e);
        });
    
        //  handleAddNewEmp();
        // //  handleDeleteCustomer(values);
         resetForm();
         validation.resetForm(); 
         tog_ChangNewPw();
        },
    });

    const successnotify = () => {
        toast("Password was successfully change", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary overflow-hidden mt-3', autoClose : 2000 });
    }
    
    const errornotify = () => {
        toast("Cannot change !", 
        { position: "top-center", hideProgressBar: false, closeOnClick: false, className: 'toast-border-primary bg-danger text-white overflow-hidden mt-3', autoClose : 2000 });
    }

  return (
    <div>

                <Modal isOpen={modalChangePw} toggle={() => { tog_ChangNewPw(); }}  id="dRecordModal" centered >
                    <div className="modal-header">
                        <h4><b>Change password user : {dataUser ? dataUser.username : 'nobody'} </b></h4>
                        <Button type="button" onClick={() => setmodalChangePw(false)} className="btn-close" aria-label="Close"> </Button>
                    </div>

                    <Form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}>
                    <ModalBody>
                        <div className="mt-2">

                        <FormGroup row>
                            <Label for="code-part" sm={4}>
                                Old password
                            </Label>
                            <Col sm={8}>
                                    <Input type="text" 
                                            id="name2-field" 
                                            className="form-control" 
                                            placeholder="Enter old password"
                                            name='oldPassword'
                                            value={validation.values.oldPassword}
                                        
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.oldPassword && validation.errors.oldPassword ? true : false
                                            }
                                    />
                            </Col>
                        </FormGroup>
                            
                        <FormGroup row>
                            <Label for="code-part" sm={4}>
                                New password
                            </Label>
                            <Col sm={8}>
                                    <Input type="text" 
                                            id="name-field" 
                                            className="form-control" 
                                            placeholder="Enter new password"
                                            name='password'
                                            value={validation.values.password}
                                        
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.password && validation.errors.password ? true : false
                                            }
                                    />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="code-part" sm={4}>
                                Confirm password
                            </Label>
                            <Col sm={8}>
                                    <Input type="text" 
                                            id="name1-field" 
                                            className="form-control" 
                                            placeholder="Enter confirm new password"
                                            name='password1'
                                            value={validation.values.password1}
                                        
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                                validation.touched.password1 && validation.errors.password1 ? true : false
                                            }
                                    />
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="d-flex gap-2 justify-content-between mt-4 mb-2">
                            
                            <div>
                            <button type="button" className="btn btn-sm w-sm btn-info " id="derecord" 
                                onClick={changePassword2Default} >Default password</button>
                            </div>
                            
                            <div>
                                <button type="submit" className="btn btn-sm w-sm btn-success " id="record" >Confirm</button>
                                &nbsp;
                                <button type="button" className="btn btn-sm w-sm btn-light" onClick={() => setmodalChangePw(false)}>Close</button> 
                            </div> 

                        </div>
                    </ModalBody>
                    </Form>
                </Modal>

    </div>
  )
}
