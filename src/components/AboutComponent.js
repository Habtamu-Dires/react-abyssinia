import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
//import { baseUrl } from "../shared/baseUrl";
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";

//const baseUrl = process.env.REACT_APP_BASE_URL;
import { baseUrl } from "../shared/baseUrl";

const Stuffs = () => {

    const [status, setStatus] = useState(false);
    const[stuffData, setStuffData] = useState();

    useEffect(()=> {
        if(status === false) {
            //fetch data
            fetch(baseUrl + '/stuffs')
            .then(response => {
                if(response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.json())
            .then(response=> {
                setStatus(true);
                setStuffData(response);
                })
            .catch(error => setStatus(error.message)) 
        }
    }, [status,setStatus, setStuffData]) 
    
    if(status === false) {
        return(
            <Loading />
        );
        
    } else if(status === true){
        const stuffs = stuffData.map((stuff) => {
            return(
                <div key={stuff.id} className="col-12 mt-5">                                     
                    <div className="d-flex align-items-center">
                        
                        <div className="flex-grow-1 ms-5 mt-4">
                            <h2>{stuff.name}</h2>
                            <h6>{stuff.designation}</h6>
                            <p>{stuff.description}</p>
                        </div>
                    </div>                                        
                </div>
            );
                        
        });
        
        return(
            <div className="row">
                {stuffs}  
            </div>                                     
        );

    } else{
        return(
            <div>{status}</div>
        );
    }    
}


const About = () => {
    
   
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
               <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 1998, Abyssinia computer Training Center is one of the leading computer trinaing center in Bahir Dar.</p>
                    <p>The training center has more than thousounds of certified studetns in Bahir Dar, a successful chain started by our CEO, Mr.Getachew, that featured for the first time the citie's best training center.</p>
                </div>
                <div className="col-12 col-md-5 m-3">
                    <img src={''} alt="img" height="300" width="350"></img>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Our Stuffs</h2>
                </div>
                <div>
                    <Stuffs />
                </div>
            </div>
        </div>
    );
}

export default About;