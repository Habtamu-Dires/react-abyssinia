import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {  useSelector } from 'react-redux';
import fetch from 'cross-fetch';
import { Persist } from 'formik-persist';

import { baseUrl } from '../shared/baseUrl';
//const baseUrl = process.env.REACT_APP_BASE_URL;

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={2} >
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>

            <Col md={6}>
                <input className='text-input form-control' {...field} {...props} />
            </Col>
            <Col md={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>
    );
}


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={2} >
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>
            <Col md={6}>
                <select className='form-control'{...field} {...props} />
            </Col>
            <Col sm={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>

    );
};


function Register(props)  {
    
        let navigate = useNavigate();

        const programs = useSelector(state => state.programs);
        const errMess = useSelector(state => state.programs.error);

        let programList = [];
        if(programs.status === 'loading') {
             programList =[ 
              <option>Loadding ...</option>
            ]
        } else if(programs.status === 'failed') {
            programList = [
              <option>{errMess}</option>
            ]
        }
        else if(programs.status === 'succeeded') {
            //bring programs from redux store
            // lets sort it so that the others appear at the last
            const programSorted = programs.programs.filter(program => program.name !== "Others");
            if(programs.programs.find(program => program.name === 'Others')){
                programSorted.push(programs.programs.find(program => program.name === 'Others'))
            }
            programList = programSorted.map((program) => {
                return (
                    <option key={program.id} value={program.id}>{program.name}</option>
                );
            });
            
    
            //form view
            const RegisterForm = () => {

                //status for rerendiring so that the form is claer after submit
                //const [clearForm, setClearForm] = useState(false);
                const phoneRegExp = /^[0-9]*$/;

                return (
                    <Formik
                        initialValues={{
                            name: '', phone: '', 
                            gender: '', program: '', 
                            otherProgram: '', educationStatus: '', 
                            preferredDays: '', preferredTime: ''
                        }}

                        validationSchema={Yup.object({
                            name: Yup.string()
                                .min(2, 'Must be 2 or more characters')
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            phone: Yup.string()
                                .required('Required')
                                .min(10, "Must be 10 or more digit")
                                .matches(phoneRegExp, 'Phone number is not valid'),
                            gender: Yup.string()
                                .required('Required')
                                .oneOf(['Male', 'Female'], 'Invalid'),

                            program: Yup.string()
                                .required('Required'),
                            otherProgram: Yup.string()
                                .when('program', {
                                    is: "Other",
                                    then: Yup.string().required("Must enter the name of program")
                                }),
                            educationStatus: Yup.string()
                                .required('Required'),
                            preferredDays: Yup.string()
                                .required('Required'),
                            preferredTime: Yup.string()
                                .required('Required'),

                        })}
                        
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            //change name to Title Case
                            values.name = values.name.trim();
                            values.name = values.name.split(' ').map(word => 
                                word[0].toUpperCase()+word.substring(1).toLowerCase()).join(' ');
                            //change other program names
                            if(values.otherProgram){
                                values.otherProgram = values.otherProgram.split(' ').map(word => 
                                    word[0].toUpperCase()+word.substring(1).toLowerCase()).join(' ');    
                            }
                                                            
                            fetch(baseUrl + '/students', {
                                method: 'POST',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                credentials: 'same-origin'
                            })
                            .then(response => {
                                if(response.ok) {
                                    return response;
                                } else {
                                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                                    error.response = response;
                                    throw error;
                                }
                            },)
                            .then(response => response.json())
                            .then(response=> {
                                setSubmitting(false);
                                resetForm();                                                  
                                navigate('/registerSuccess');                                                                                                            
                                })
                            .catch(error => console.log('Error '+ error.message))
                            }}                        
                    >
                        {props => (
                            <Form>
                                <MyTextInput label="Full Name" name="name" type="text"
                                    placeholder="Full Name" />


                                <MyTextInput label="Phone" name="phone" type="phone"
                                    placeholder="09..." />


                                <MySelect label="Gender" name="gender">
                                    <option value="" disabled={true} selected={true}>Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </MySelect>


                                <MySelect label="Program" name="program">
                                    <option value="" disabled={true} selected={true}>Select Program</option>    
                                    {programList}                    
                                </MySelect>
                                { programs.programs.find(prog=>prog.name === "Others")&&                              
                                props.values.program === programs.programs.find(prog=>prog.name ==="Others").id                              
                                && (
                                    <MyTextInput label="Other" name="otherProgram" type="text"
                                        placeholder="other program you want" />
                                )}

                                <MySelect label="Education Level" name="educationStatus">
                                    <option value="" disabled={true} selected={true}>Select Education Level</option>
                                    <option value="read_and_write">Read and Write</option>
                                    <option value="primary">Primary</option>
                                    <option value="secondary_school">Secondary School</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="degree_and_above">Degree and Above</option>
                                </MySelect>


                                <MySelect label="Days" name="preferredDays">
                                    <option value="" disabled={true} selected={true}>Select Days</option>
                                    <option value="monday_to_friday">Monday - Friday</option>
                                    <option value="saturday_and_sunday">Saturday {"&"} Sunday</option>
                                    <option value="any_day">Any Day</option>
                                </MySelect>

                                <MySelect label="Time" name="preferredTime">
                                    <option value="" disabled={true} selected={true}>Select Time</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="night">Night</option>
                                    <option value="any_time">Any Time</option>
                                </MySelect>

                                <Row className='form-group my-3 d-flex justify-content-center of'>        
                                    <Col md={4}>
                                        <button className='btn btn-success' type='submit'>Submit</button>
                                    </Col>
                                </Row>
                                <Persist name='register-form'></Persist>                    
                            </Form>

                        )}

                    </Formik>
                );

            };

            return(
                <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem><Link className='link' to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Register Oneline</BreadcrumbItem>
                </Breadcrumb>
                <div className='row d-flex justify-content-center'>
                    <div className='col-11'>
                        <Card className='row d-flex justify-content-center my-3'>
                            <CardHeader className='d-flex justify-content-center'>
                                <h3>Register</h3></CardHeader>
                            <CardBody className='col-12 d-flex justify-content-centern'>
                                <div className='regFormContainer'>
                                    <RegisterForm />
                                </div>
                                
                            </CardBody>

                        </Card>
                    </div>
                </div>

            </div>
            );
        } ///end of if successed         
    }



export default Register;

