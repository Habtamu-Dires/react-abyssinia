import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import { Formik,Field, Form, useField, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { studentAdded } from '../redux/studentSlice';
import { nanoid } from '@reduxjs/toolkit';


const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <Row className='form-group mt-2'>
            <Col md={2}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>
            
            <Col md={7}>
                <input className='text-input form-control' {...field} {...props} />
            </Col>
            <Col md={{size:10, offset:2}} className="text-danger">
                {meta.touched && meta.error? (
                    <div className='error'>{meta.error}</div>
                ): null }
            </Col>
        </Row>
    );
}


const MySelect = ({label, ...props}) =>{
    const[field, meta] = useField(props);
    return(
        <Row className='form-group mt-2'>
            <Col md={2}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>
            <Col md={7}>
                <select className='form-control'{...field} {...props}/>
            </Col>
            <Col sm={{size:10, offset:2}} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ): null}
            </Col>
        </Row>
        
    );
};


function Register (props) {

        const dispatch = useDispatch();
    
        //bring other programs from props
        const program = props.programs.map((program)=> {
            return(
                <option key={program.id} value={program.name}>{program.name}</option>
            );
        });
        
        //form view
        const SingnupForm = () => {
            const phoneRegExp = /^[0-9]*$/;

            return(
            
            <Formik
            
                initialValues={{fullName: '', phone: '',gender: '',
                                program: '',otherProgram:'',  education: '', days: '', time: '' }}
                validationSchema ={ Yup.object({
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
                    
                }) }
                onSubmit = { (values, {setSubmitting}) => {
                    setTimeout(()=> {
                        //alert(JSON.stringify(values, null, 2));
                        dispatch(studentAdded({
                            id: nanoid(), 
                            ...values
                        }));
                        setSubmitting(false);     
                    }, 400);
                }}
                >
               {props => (     
                    <Form>
                        <MyTextInput label="Full Name" name="fullName" type="text"
                            placeholder="Full Name"/>

                        <MyTextInput label="Phone" name="phone" type="phone"  
                            placeholder="09..." />  

                    
                        <MySelect label="Gender" name="gender">
                            <option value="" disabled={true} selected={true}>Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </MySelect>
                        
                    
                        <MySelect label="Program" name="program">
                            <option value="" disabled={true} selected={true}>Select Program</option>
                            {program}
                        </MySelect>

                        {props.values.program === "Other" && (
                                <MyTextInput label="Other" name="otherProgram" type="text"
                                placeholder="other program you want"/>
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
                            <CardBody className='col-12 offset-1'>
                                <SingnupForm />
                            </CardBody>
                            
                        </Card>
                    </div>
                </div>
                
            </div>

        ); // end of return

    

}

export default Register;

