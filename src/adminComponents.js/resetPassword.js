//import { baseUrl } from "../shared/baseUrl";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {Row, Col, Modal,ModalHeader, ModalBody } from 'reactstrap';
import { useState } from "react";
import { useNotify } from "react-admin";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2 d-flex justify-content-center'>
            
            <Col md={9}>
                <input className=' text-input form-control' {...field} {...props} />
            </Col>
            <Col md={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>
    );
}


function ResetForm() {
    const notify = useNotify();
    const navigate = useNavigate();
    
    const urlObject =  window.location.search.substring(1).split("&")
                        .map(param => param.split('='))
                        .reduce((values, [key, value]) => {
                            values[key] = value;
                            return values
                        }, {});

    return(
        <Formik 
            initialValues={{
                newpassword:'',
                confirmpassword: ''
            }}
            
            validationSchema={Yup.object({
                newpassword: Yup.string()
                    .min(6, 'Must be 6 or more character')
                    .required('Required'),
                confirmpassword: Yup.string()
                    .oneOf([Yup.ref('newpassword'), null], 'password must match')
                    .required('Required')
            })}

            onSubmit={(values, {})=>{
                const bearer = 'Bearer ' + urlObject.token;
        
                const url = `${baseUrl}/users/resetPassword`;
                fetch(url,{
                    method: 'PUT',
                    body:JSON.stringify({
                        userId: urlObject.id,
                        newpassword: values.newpassword,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    credentials: 'same-origin'
                })
                .then(response => response.json())
                .then(response => {
                    
                    notify(response.status);
                    localStorage.setItem('token', response.token);
                    //if you needs creds username, firstname, lastname                     
                    localStorage.setItem('creds', JSON.stringify(response.creds));
                    navigate('/admin');
                })
                .catch(err => console.log(err));
            }}
        >
            {props => (
                <Form>
                    <MyTextInput label="New Password" name="newpassword" type='password'
                        placeholder="New Password" />
                    <MyTextInput label="Confirm Password" name="confirmpassword" type="password"
                        placeholder="Confirm password"/>

                    <Row className='form-group my-3 d-flex justify-content-center'>        
                        <Col md={4}>
                            <button className='btn btn-success' type='submit'>Submit</button>
                        </Col>
                    </Row>
                </Form>
            )}
            

        </Formik>
    );
}

function ResetPassword() {
   
    return(
        <Modal isOpen={true} >
                <ModalHeader > Reset Passsword </ModalHeader>
                <ModalBody>
                    <ResetForm />
                </ModalBody>
            </Modal>
    )
}

export default ResetPassword;
