import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
//import { baseUrl } from '../shared/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

const baseUrl = process.env.REACT_APP_BASE_URL;

//map
const AnyReactComponent = ({ text }) => <div> {text}</div>;

function SimpleMap(){
    const defaultProps = {
      center: {
        lat: 11.60006,
        lng: 37.380240
      },
      zoom: 18
    };
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={11.60006}
            lng={37.380240} 
            text=""
          />
        </GoogleMapReact>
      </div>
    );
  }


//feedback form
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={2}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>

            <Col md={10}>
                <input className='text-input form-control' {...field} {...props} />
            </Col>
            <Col md={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>
    );
};


const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return(
        <Row className='form-group mt-2'>
            <Col md={8} className="offset-md-4">
                <label className="checkbox">
                    <input className='me-2' {...field} {...props} type="checkbox" />
                    {children}
                </label>
            </Col>

            <Col md={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>
    )
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
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


const MyTextArea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <Row className='form-group mt-2'>
            <Col md={2}>
                <label htmlFor='{props.id || props.name}'>{label}</label>
            </Col>

            <Col md={10}>
                <textarea className="container text-area" {...field} {...props} />
            </Col>
            <Col md={{ size: 10, offset: 2 }} className="text-danger">
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </Col>
        </Row>
    )
};

const FeedbackForm = () => {
        
    const phoneRegExp = /^[0-9]*$/;
    const emailRegExp = /^\S+@\S+\.\S+$/;

    //dispatch
    const dispatch = useDispatch();
    
    return(
        <Formik 
        initialValues={{
            name: '',
            phone: '',
            email: '',
            mayWeContactYou: false,
            contactWay:'',
            feedback: ''
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
            email: Yup.string()                
                .email('Invalid email addresss'),
            feedback: Yup.string()
                .min(2, 'Must be 2 or more characters')
                .max(200, 'Must be 15 characters or less')
                .required('Required')
        })}
         
         onSubmit={(values, {resetForm, setSubmitting}) => {

            fetch(baseUrl + 'feedbacks', {
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
                alert("Thank you for your feedback");                                                     
                //navigate('/registerSuccess');                                                                                                            
                //localStorage.setItem("register-form", "");
                })
            .catch(error => alert('Couldn\'t register\nError '+ error.message))
                    
         }}
        >
        {props => (<Form>
            <MyTextInput label="Full Name" name="name" type="text" 
                    placeholder="Full Name"  />

            <MyTextInput label="Contact Tel." name="phone" type="phone" 
                    placeholder="Tel.Number" />

            <MyTextInput label="Email" name="email" type="text" 
                    placeholder="Email"  />


            <Row>
                 <Col md={6}>
                    <MyCheckbox name="mayWeContactYou">
                        May we contact you?
                    </MyCheckbox>
                 </Col>
                 <Col md={6}>
                    <MySelect label="" name="contactWay">
                        <option value="tel">Tel.</option>
                        <option value="emial">Email</option>
                    </MySelect>
                 </Col>
            </Row>
            
            <MyTextArea label="Your Feedback" name="feedback" rows="6" />
            
            <Row className='form-group my-3 d-flex '>
                <Col md={4} className="offset-2">
                    <button className='btn btn-primary' type='submit'>Send Feedback</button>
                </Col>
            </Row>
            
        </Form>
      )}
        </Formik>
    );
};


function ContactUs () {


    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row" style={{borderBottom: "1px ridge"}}>
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        Serga Building Ground Floor<br/>
                        Infront of avanti Hotel<br />
                        Bahir Dar<br/><br/>
                        <i className="fa fa-phone"></i>: +251 1834 0529<br />
                        <i className="fa fa-fax"></i>: +251 1834 0529<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:abyssinia19@gmail.com">abyssinia19@gmail.com</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                    <div className='container' >
                        <SimpleMap />
                    </div>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1 mb-5">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+251918340529"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href=""><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                </div>
            </div>
            <div className="col-12 col-md-9" >
                <FeedbackForm />
            </div>
        </div>
        )
}

export default ContactUs;