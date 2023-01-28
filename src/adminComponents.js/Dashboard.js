import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import { Loading } from "../components/LoadingComponent";
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  FormGroup } from 'reactstrap';
import { email, useLogout } from "react-admin";
import {Formik, Form, useField} from 'formik';
import {Row, Col} from "reactstrap";
import * as Yup from 'yup';

Chart.register(...registerables);

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Row className='form-group mt-2'>
            <Col md={12}>
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
}

//form
const ProfileForm = () => {
    let creds;
    let bearer;
    //why typeof windo why???
    if (typeof window !== 'undefined') {
        creds = JSON.parse(localStorage.getItem('creds'));
        bearer = 'Bearer ' + localStorage.getItem('token');
        
    }

    return(
        <Formik 
        initialValues={{
            username: creds.username,
            name: creds.name,
            email: creds.email,
            oldpassword: '',
            newpassword: '',            
            confirm_passowrd: ''
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 or more characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            username: Yup.string()
                .min(2, 'Must be 2 or more characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email addresss'),
            newpassword: Yup.string()
                .min(3, 'Must be 3 or more characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            oldpassword: Yup.string()
                .min(2, 'Must be 2 or more characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            confirm_passowrd: Yup.string()
                .min(2, 'Must be 2 or more characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required')
        })}
        
        >
        {props => (<Form>
            <MyTextInput label="Username" id="username" name="username" type="text" 
                           placeholder="Username"  />
            <MyTextInput label="Full Name" id="name" name="name" type="text" 
                        placeholder="Full Name" />
            <MyTextInput label="Email" id="email" name="email" type="email" 
                        placeholder="Email" />
            <MyTextInput label="Old Password" id="oldpassword" name="oldpassword" type="password" 
                        placeholder="Old Passsword"  />
            <MyTextInput label="New Password" id="newpassword" name="newpassword" type="password" 
                            placeholder="New Password" />
            <MyTextInput label="Confirm Password" id="confirm_password" name="confirm_password" type="password" 
                        placeholder="Confirm Password"  />
        </Form>
        )}

        </Formik>
    )
}

//profile
const Profile = () => {

    const [modal, setModal] = useState(false);
    const logout = useLogout();
    //values
    let creds = {}
    let bearer = ''
    //why typeof windo why???
    if (typeof window !== 'undefined') {
        creds = JSON.parse(localStorage.getItem('creds'));
        bearer = 'Bearer ' + localStorage.getItem('token');
        
    }
    const toggle = () => {
        setModal(!modal)
    }

    const save_profile = () => {
        
        const username = document.querySelector('#username').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const newpassword = document.querySelector('#newpassword').value;
        const oldpassword = document.querySelector('#oldpassword').value;
        const confirm_password = document.querySelector('#confirm_password').value;
       
        if(confirm_password !== newpassword) {
            alert("The password you enter are different");
        } else {

            fetch(`${baseUrl}users/update`,{
                method: 'PUT',
                body:JSON.stringify({
                    username: username,
                    name: name,
                    email: email,
                    newpassword: newpassword,
                    oldpassword: oldpassword
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                credentials: 'same-origin'
            })
            .then(response => response.json())
            .then(response => {
                logout()
            })
            .catch(err => console.log(err))
        }
        
    }

    return(
        <div className="row">
            <div className="d-flex justify-content-end">
                <Button onClick={toggle} className="btn btn-secondary">My Profile</Button>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>My Profile</ModalHeader>
                <ModalBody>
                    <ProfileForm />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={save_profile}>Save</Button>
                    <Button color="secondary" onClick={logout}>Logout</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

const Dashboard = () => {
    const [students, setStudents] = useState(null);

    const programs = useSelector(state => state.programs);
    const errMess = useSelector(state => state.programs.error);
    const classes = useSelector(state => state.classes);
    
    //fetch students
    if(students === null) {
        fetch(baseUrl + 'students')
        .then(response => response.json())
        .then(response => {
            setStudents(response);
        })
        .catch(err=> console.log(err))
    }
    
    if(programs.status === 'loading' || classes.status === 'loading' || students === null){
        return(
            <Loading />
        )
    } else if(programs.status === 'failed' || classes.status === 'failed'){
        return(
            <div>
                {errMess} <br></br>
                {errMess} <br></br>
                {errMess}
            </div>            
        );
    } else if(programs.status === 'succeeded') {
        //function to generate random color
        function r() {
            return Math.floor(Math.random() * 256);
          }
        
        const theProgram = programs.programs.map(program => {
            
            if (program.name !== "Others"){
                //varialbes to display.
                let no_unenrolled = 0;
                let no_recently_registered = 0;
                let no_enrolled = 0;
                let no_certified = 0;
                let no_class = 0;
                //the student    
                const the_students = students.filter(student => student.program === program.id);        

                if(the_students){
                no_unenrolled = (the_students.filter(student => student.enrolled === false)).length;
                no_enrolled = (the_students.filter(student => student.enrolled === true)).length;
                no_certified = (the_students.filter(student => student.certificateStatus === true)).length;
                //two weeks ago date
                let today = new Date();
        
                no_recently_registered = (the_students.filter(student => 
                    Math.abs(today.getDate() -  new Date(student.createdAt).getDate()) <= 14)).length;

                }
                //the class
                const the_class = classes.classes.filter(clas => clas.program === program.id);
                if(the_class){
                    no_class = (the_class).length;
                }
                const color = "rgb(" + r() + "," + r() + "," + r() + ")";
                return(
                    <div key={program.id} className="col-md-4">
                        <Card>
                            <CardHeader title={program.name} style={{color: color}}/>
                            <CardContent>
                                <div className="dashbored-table" 
                                      style={{backgroundColor: color}}>
                                    <table>
                                        <tbody>
                                           <tr>
                                                <th>Unenrolled Students</th>
                                                <td>{no_unenrolled}</td>
                                           </tr>            
                                           <tr>
                                                <th>Recently Registered</th>
                                                <td>{no_recently_registered}</td>
                                           </tr>
                                           <tr>
                                                <th>Total Enrolled Students</th>
                                                <td>{no_enrolled}</td>
                                           </tr>
                                           <tr>
                                                <th>Number  of Classes</th>
                                                <td>{no_class}</td>
                                           </tr>
                                           <tr>
                                                <th>Total Certified Students</th>
                                                <td>{no_certified}</td>
                                           </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            } 
        }); // end of program
        //for other programs
         
        let otherProgramObject = {};
        const theOtherPrograms = programs.programs.map(program => {

            if(program.name === "Others") {

                const the_students = students.filter(student => student.program === program.id);
                if(the_students) {
                    
                    the_students.map(student => {
                        if(student.otherProgram in otherProgramObject) {
                            otherProgramObject[student.otherProgram] += 1;
                        } else {
                            otherProgramObject[student.otherProgram] = 1;
                        }
                    });
                }

                let xlabel = []
                let data = []
                for(let prop in otherProgramObject){
                    xlabel.push(prop);
                    data.push(otherProgramObject[prop])
                }
                //based on how many data we have let's generate different color
                let borderColor = [], backgroundColor = [];
                for(let i=0; i<data.length; i++) {
                    borderColor.push("rgb(" + r() + "," + r() + "," + r() + ")");
                    backgroundColor.push("rgb(" + r() + "," + r() + "," + r() + ")");
                }
                //Bar chart
                const BarChart = () => {
                    const barChartData = {
                        labels: xlabel,
                        datasets: [
                          {
                            data: data,
                            //label: ['web devloepmen', 'spss'],
                            borderColor: borderColor,
                            backgroundColor: backgroundColor,
                            barThickness: 80,
                            fill: true
                          },
                                                 
                        ]
                      };
                    
                      const barChart = (
                        <Bar
                          type="bar"
                           
                          options={{
                            title: {
                              display: false,
                            },
                            plugins: {
                                legend: {
                                    display: false // This hides all text in the legend and also the labels.
                                }
                            },
                                                        
                          }}
                          data={barChartData}
                        />
                      );
                      return barChart;
                };

                  
                return(
                    <div key={program.id} className="offset-1 col-md-10">
                        <div className="d-flex justify-content-center">
                            {<BarChart />}  
                        </div>
                    </div>
                )
            }
        });
        //for the trend
        let datasets = []
       
        programs.programs.map(program =>{
            if(program.name !== 'Others') {
                const the_students = students.filter(student => student.program === program.id)
                const color = "rgb(" + r() + "," + r() + "," + r() + ")";
                let each_data = { label: program.name, data:Array(12).fill(0), 
                                    borderColor: color, 
                                    backgroundColor: color }
                the_students.map(student => {
                    //console.log(student.createdAt)
                    each_data['data'][new Date(student.createdAt).getMonth()] += 1;
                });
                datasets.push(each_data)
            }
            
        });

        //Line chart
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November', 'December'];
        const LineChart = () => {
            const lineChartData = {
                labels,
                datasets: datasets
            };
            const lineChart = (
                <Line 
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Program trend',
                            },
                        },
                    }}
                    data={lineChartData}
                />
            );
            return lineChart;
        }
        
    
        return(
        
            <div>
                <div className="row">
                    <Card className="container col-12 col-md-8">
                        <CardHeader title="Abyssinia Computer Engineering Dashboard" />
                    </Card>
                    <div className="col-12 col-md-4 mt-2">                        
                        <Profile />
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5">
                            <h2>Programs</h2>
                            {theProgram}
                    </div>
                    <div className="row my-4">
                        <h2>Other Programs</h2>
                        {theOtherPrograms}
                    </div>
                    <div className="row my-5">
                        <h2>Trend</h2>
                        {<LineChart />}
                    </div>
                </div>                
                
            </div>                    
            
        );
    }
};

export default Dashboard;
