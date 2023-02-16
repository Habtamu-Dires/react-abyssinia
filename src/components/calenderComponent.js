import React, { useState } from "react";
import { useSelector } from "react-redux";
import {Breadcrumb, BreadcrumbItem, Accordion, AccordionBody, AccordionHeader, 
            AccordionItem} from 'reactstrap';
import {Loading} from './LoadingComponent'
import { Link } from 'react-router-dom';
import {TimeAgo} from '../shared/TimeAgo'

function Calender() {
    const classes = useSelector(state => state.classes)
    const errMess = useSelector(state => state.classes.error);
    const programs = useSelector(state => state.programs);
    //accordion control
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if(open === id){
            setOpen();
        }else{
            setOpen(id);
        }
    }

    if(classes.status === 'loading'){
        return(
            <Loading />
        )
    } else if(classes.status === 'failed'){
        return(
            <div>
                {errMess} <br></br>
                {errMess} <br></br>
                {errMess}
            </div>
            
        );
    } else if(classes.status === 'succeeded') {

        let accd_counter  = 0; //accordion togle target counter
        // lets sort it so that the others appear at the last
        const programSorted = programs.programs.filter(program => program.name !== "Others");
        if(programs.programs.find(program => program.name === 'Others')){
            programSorted.push(programs.programs.find(program => program.name === 'Others'))
        }
        //for each program
        const classSchedule = programSorted.map(program=>{
            const Classes = classes.classes.filter(theClass =>
                theClass.program === program.id
            )
            accd_counter++;
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
                        <h2>Class {class_counter}</h2>
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
            })

            return(
                <div key={program.id}>
                    <AccordionItem>
                        <AccordionHeader targetId={accd_counter.toString()}>{program.name}</AccordionHeader>
                        <AccordionBody accordionId={accd_counter.toString()}>{theClasses}</AccordionBody>
                    </AccordionItem>                   
                </div>
            )
        })

        return(
            <div className="container">
                <Breadcrumb>
                        <BreadcrumbItem><Link className='link' to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Calender</BreadcrumbItem>
                    </Breadcrumb>
                
                <div className="row">
                    <div>
                        <Accordion open={open} toggle={toggle}>
                            {classSchedule}
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Calender;