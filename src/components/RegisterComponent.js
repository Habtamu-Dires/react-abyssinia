import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { registerStudent, studentAdded } from '../redux/studentSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import fetch from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';
import Registered from '../components/RegisterSuccessComponent';
import { Persist } from 'formik-persist';


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={2}>
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
            <Col md={2}>
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
              <option><div>Loadding ...</div> </option>
            ]
        } else if(programs.status === 'failed') {
            programList = [
              <option><div>{errMess}</div></option>
            ]
        }
        else {
            //bring programs from redux store
            programList = programs.programs.map((program) => {
                return (
                    <option key={program.id} value={program.name}>{program.name}</option>
                );
            });
    
        }

        
        //form view
        const RegisterForm = () => {

            const phoneRegExp = /^[0-9]*$/;

            //dispatch
            const dispatch = useDispatch();
        
            return (
                <Formik
                    initialValues={{
                        fullName: '', phone: '', 
                        gender: '', program: '', 
                        otherProgram: '', education: '', 
                        days: '', time: ''
                    }}

                    validationSchema={Yup.object({
                        fullName: Yup.string()
                            .min(2, 'Must be 2 or more characters')
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        phone: Yup.string()
                            .required('Required')
                            .min(10, "Must be 10 or more digit")
                            .matches(phoneRegExp, 'Phone number is not valid'),
                        gender: Yup.string()
                            .required('Required')
                            .oneOf(['male', 'female'], 'Invalid'),

                        program: Yup.string()
                            .required('Required'),
                        otherProgram: Yup.string()
                            .when('program', {
                                is: "Other",
                                then: Yup.string().required("Must enter the name of program")
                            }),
                        education: Yup.string()
                            .required('Required'),
                        days: Yup.string()
                            .required('Required'),
                        time: Yup.string()
                            .required('Required'),

                    })}
                    
                    onSubmit={(values, {setSubmitting,resetForm}) => {
                        
                        fetch(baseUrl + 'students', {
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
                            dispatch(studentAdded(response));
                            setSubmitting(false);
                            resetForm();                                                      
                            navigate('/registerSuccess');                                                                                                            
                            //localStorage.setItem("register-form", "");
                            })
                        .catch(error => alert('Couldn\'t register\nError '+ error.message))
                        }}                        
                >
                    {props => (
                        <Form>
                            <MyTextInput label="Full Name" name="fullName" type="text"
                                placeholder="Full Name" />


                            <MyTextInput label="Phone" name="phone" type="phone"
                                placeholder="09..." />


                            <MySelect label="Gender" name="gender">
                                <option value="" disabled={true} selected={true}>Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </MySelect>


                            <MySelect label="Program" name="program">
                                <option value="" disabled={true} selected={true}>Select Program</option>
                                {programList}
                            </MySelect>

                            {props.values.program === "Other" && (
                                <MyTextInput label="Other" name="otherProgram" type="text"
                                    placeholder="other program you want" />
                            )}

                            <MySelect label="Education Level" name="education">
                                <option value="" disabled={true} selected={true}>Select Education Level</option>
                                <option value="read and write">Read and Write</option>
                                <option value="Primary">Primary</option>
                                <option value="Secondary School">Secondary School</option>
                                <option value="Diploma">Diploma</option>
                                <option value="degree and above">Degree and Above</option>
                            </MySelect>


                            <MySelect label="Days" name="days">
                                <option value="" disabled={true} selected={true}>Select Days</option>
                                <option value="mondayTofriday">Monday - Friday</option>
                                <option value="weekend">Saturday {"&"} Sunday</option>
                                <option value="anyDay">Any Day</option>
                            </MySelect>

                            <MySelect label="Time" name="time">
                                <option value="" disabled={true} selected={true}>Select Time</option>
                                <option value="morning">Morining</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="night">Night</option>
                                <option value="anyTime">Any Time</option>
                            </MySelect>

                            <Row className='form-group my-3 d-flex justify-content-center'>
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
                        <CardBody className='col-10 offset-2'>
                            <RegisterForm />
                        </CardBody>

                    </Card>
                </div>
            </div>

        </div>
        );

    }



export default Register;

