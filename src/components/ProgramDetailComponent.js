import React from "react";
import {Breadcrumb, BreadcrumbItem, Row, Col} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Loading } from "./LoadingComponent";
import {TimeAgo} from '../shared/TimeAgo';

//import { baseUrl } from "../shared/baseUrl";
const baseUrl = process.env.REACT_APP_BASE_URL;

function ProgramDetail() {
    const {programId} = useParams();
    
    const programs = useSelector(state => state.programs);
    const errMess = useSelector(state => state.programs.error);
    const classes = useSelector(state => state.classes)

    if(programs.status === 'loading'){
        return(
            <Loading />
        )
    } else if(programs.status === 'failed'){
        return(
            <div>
                {errMess} <br></br>
                {errMess} <br></br>
                {errMess}
            </div>
            
        );
    } else if(programs.status === 'succeeded') {
        const program = programs.programs.find(prog => prog.id === programId );
        
        const modules = program.modules.map(mod => {
            return(
                <li key={mod.module}>
                   {mod.module}
                </li>
            );
        });

        //classes 
        const Classes = classes.classes.filter(theClass =>
            theClass.program === program.id
        )
        //...
        let class_counter = 0; //to distinguish different classes of one  program
        const theClasses = Classes.map(theClass =>{
            class_counter++;
            //schedule
            const schedules = theClass.schedule.map(schedule =>{ 
                return(
                    <tr key={schedule.day}>
                        <td>{schedule.day} </td>
                        <td>{schedule.partOfTheDay}</td>
                        <td>{schedule.time}</td>
                    </tr>
                )
            })
            
            return(
                <div className="row" key={theClass.id}>
                    <h5>Class {class_counter}</h5>
                    <div className="offset-1">
                        <table className="calender_tables">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Shift</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules}
                            </tbody>
                        </table>
                        <p style={{margin: "10px"}}>Start Date: 
                            {<TimeAgo timestamp={theClass.classStartDate}/>}
                        </p>
                    </div>
                </div>
            )
        });

    
        return(
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link className='link' to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Program</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <div className="col-8 row program_detail" >
                        <h3>{program.name}</h3>
                        {program.image_url &&
                            <div className="col-10">
                                <img  className="m-3" src={program.image_url} height="200" width="300"></img> 
                            </div>
                        }
                        
                        
                        <h3>Description</h3>
                        <p className="offset-1">{program.description}</p>
                        {program.name === 'Others' &&
                            <>
                             <h3>Programs</h3>
                                <ul className="offset-1">
                                    {modules}
                                </ul>
                            </>   
                        }
                        {program.name !== 'Others' &&
                            <>
                             <h3>Modules</h3>
                                <ul className="offset-1">
                                    {modules}
                                </ul>
                            </>   
                        }
                            
                        <h3>Program Prerequisite</h3>
                        <ul className="offset-1">
                                <li>{program.prerequisite}</li>
                            </ul>
                        <h3>Program Duration</h3>
                        <ul className="offset-1">
                                <li>{program.duration}</li>
                            </ul>
                        <h3>Price</h3>
                        <ul className="offset-1">
                                <li>{parseInt(program.price)/100} Birr</li>
                            </ul>
                        <h3>Classes</h3>
                            <div>{theClasses}</div>
                    </div>
                </div>
                
            </div>
        );

    }

}

export default ProgramDetail;