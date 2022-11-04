import React from "react";
import {Breadcrumb, BreadcrumbItem, Row, Col} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";


function ProgramDetail() {
    const {programId} = useParams();
    
    const program = useSelector(state =>  state.programs.programs.find(prog => prog.id === programId));

    const modules = program.module.map(mod => {
        return(
            <li >
               {mod}
            </li>
        );
    })

    return(
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link className='link' to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Program</BreadcrumbItem>
            </Breadcrumb>
            <div className="row">
               <h3>{program.name}</h3>
               <div className="col-10">
                    <img  className="m-3" src={baseUrl + program.image} height="200" width="300"></img> 
               </div>
               
               <h4>Short Description</h4>
               <p>{program.description}</p>
               <h4>Modules</h4>
               <ul>
                {modules}
               </ul>
               <h6>prerequisite</h6>
               <p>{program.prerequisite}</p>
               <h6>Duration</h6>
               <p>{program.Duration}</p>
               <h6>Price:</h6>
               <p>{program.price}</p>
            </div>
        </div>
    );
}

export default ProgramDetail;