import React, { useState } from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import { Loading } from "../components/LoadingComponent";
import {Bar, Line} from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
import { date } from "yup";
Chart.register(...registerables);


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
                    <div key={program.id} className="col-md-6">
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
                        console.log(student.otherProgram)
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
                    console.log("hello")
                    //console.log(student.createdAt)
                    console.log( new Date(student.createdAt).getMonth() )
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
        
            <div className="container">
                <Card>
                    <CardHeader title="Abyssinia Computer Engineering Dashboard" />
                </Card>
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
            
        );
    }
};

export default Dashboard;
