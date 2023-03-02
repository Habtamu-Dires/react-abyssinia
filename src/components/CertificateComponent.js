import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardHeader, CardBody} from "reactstrap";
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { Persist } from "formik-persist";
//import { baseUrl } from "../shared/baseUrl";
import { stringify } from 'query-string';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Result = ({status,message}) => {
    if(status === true){
        return( 
            <div className='row d-flex justify-content-center '>
                <Card className="d-flex justify-content-center">
                    <CardBody>
                        <h4 style={{fontWeight: "bold", textAlign: "center"}}>{message}</h4>
                    </CardBody>
                    </Card>
            </div>            
        );
    } else {
        return(
            <div></div>
        );
    }
    
}

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={3}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>

            <Col md={8}>
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
            <Col md={3}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>
            <Col md={8}>
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

function Certificate(props) {

    //load programs
    const programs = useSelector(state => state.programs);
    const errMess = useSelector(state => state.programs.error);
    var programList = [];
    if(programs.status === 'loading') {
            programList =[ 
            <option>Loadding ...</option>
        ]
    } else if(programs.status === 'failed') {
        programList = [
            <option>{errMess}</option>
        ]
    }
    else {
        //bring programs from redux store
        // lets sort it so that the others appear at the last
        const programSorted = programs.programs.filter(program => program.name !== "Others");
        if(programs.programs.find(program => program.name === 'Others')){
            programSorted.push(programs.programs.find(program => program.name === 'Others'))
        }
        programList = programSorted.map((program) => {
            return (
                <option key={program.id} value={program.id}>
                    {program.name}
                </option>
            );
        });
       

    }

    //state to track the status to rerender
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState('');
    

    const CertificateForm = () => {
        
        const phoneRegExp = /^[0-9]*$/;
        return(
            <Formik 
            initialValues={{
                name: '',
                phone: '',
                program: '',
                otherProgram: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Must be 2 or more characters')
                    .max(50, 'Must be 15 characters or less')
                    .required('Required'),
                phone: Yup.string()
                    .required('Required')
                    .min(9, "Must be 10 or more digit")
                    .matches(phoneRegExp, 'Phone number is not valid'),
                program: Yup.string()
                    .required('Required'),
                otherProgram: Yup.string()
                    .when('program', {
                        is: "Other",
                        then: Yup.string().required("Must enter the name of program")
                    }),
            })}
             
             onSubmit={(values, {restForm}) => {
                setStatus(true);
                //fetch student from server
                values.name = values.name.split(' ').map(word => 
                    word[0].toUpperCase()+word.substring(1).toLowerCase()).join(' ');
                const query = {name: values.name, phone:values.phone}
                const url = `${baseUrl}/students?${stringify(query)}`;
                fetch(url, {
                    method: 'GET',    
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
                    if(response.length !== 0){
                        const student = response[0]
                        //find the program name
                        let programName = programs.programs.find(prog => 
                                            prog.id === values.program).name
                        if (programName === "Others") {
                            programName = values.otherProgram;
                        }
                       if(student.program === values.program){
                        if(student.certificateStatus)
                            setMessage(`Your Certificate for a ${programName} program is Ready\n`);
                        else {
                            setMessage(`Your Certificate for a ${programName} program is not Ready\n`);
                    } 
                       } else{
                            setMessage(`Your are not Registered for a ${programName} Program\n`);
                       } 
                    } else{
                        setMessage("Sorry!, You're not Registered!")
                    }
                    })
                .catch(error => setMessage('Error '+ error.message+'\nPlease try again'))
                
               
             }}
            >
            {props => (<Form>
                <MyTextInput label="Full Name" name="name" type="text" 
                        placeholder="Full Name"  />

                <MyTextInput label="Phone" name="phone" type="phone" 
                        placeholder="09..." />
                
                <MySelect label="Program" name="program">
                    <option value="" disabled={true} selected={true}>Select Program</option>
                            {programList}
                </MySelect>                        
                
                {programs.programs.find(prog=>prog.name === "Others")&&
                props.values.program === programs.programs.find(prog=>prog.name ==="Others").id && (
                    <MyTextInput label="Other" name="otherProgram" type="text"
                                placeholder="other program you want" />
                )}

                <Row className='form-group my-3 d-flex justify-content-center'>
                    <Col md={4}>
                        <button className='btn btn-success' type='submit'>Submit</button>
                    </Col>
                </Row>
                <Persist name="certificate-form"></Persist>
            </Form>
          )}
            </Formik>
        );
    };

    return(
        <div className='container'>
            <Breadcrumb>
                <BreadcrumbItem><Link className='link' to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Certificate</BreadcrumbItem>
            </Breadcrumb>
            <div className="row">
                <h4>Check Your Certificate Online</h4>
                <div className="col col-md-6 mt-2 mb-2 ">
                    <Card>
                        <CardHeader>
                            <h3>Personal Information</h3>
                        </CardHeader>
                        <CardBody>
                            <CertificateForm />
                        </CardBody>
                    </Card>
                </div>
                <div className="col col-md-6 mt-2 mb-2 d-flex justify-content-center">
                    {<Result status={status} message={message}/>}
                </div> 
                           
            </div>
        </div>
    );
}

export default Certificate;