import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { baseUrl } from "../shared/baseUrl";
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";

const Stuffs = () => {

    const [status, setStatus] = useState(false);
    const[stuffData, setStuffData] = useState();

    useEffect(()=> {
        if(status === false) {
            //fetch data
            fetch(baseUrl + 'stuffs')
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
                console.log(response);
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
                        <div className='flex-shrink-1 mt-0'>
                            <img className="mt-0" src={baseUrl + stuff.image} alt={stuff.name} />
                        </div>
                        <div body className="flex-grow-1 ms-5 mt-4">
                            <div>{stuff.name}</div>
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
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5 m-3">
                    <img src={baseUrl + '/assets/images/sample.jpg'} height="300" width="350"></img>
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