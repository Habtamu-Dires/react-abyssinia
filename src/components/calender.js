import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import DataTable from "react-data-table-component";
import fetch from "cross-fetch";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { TimeAgo } from "../shared/TimeAgo";



function MyComponent() {
    const[status, setStatus] = useState(false);
    const[calenderData, setCalender] = useState();

    useEffect(()=> {
        if(status === false) {
            //fetch data
            fetch(baseUrl + 'calender')
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
                setCalender(response);
                })
            .catch(error => setStatus(error.message)) 
        }
    }, [status,setStatus, setCalender]) 
   

    if(status === false) {
        return(
            <Loading />
        );
    } else if (status === true){
        const data = calenderData;

       //table columns
    const columns = [
        {
            name: 'Day',
            selector: row => row.day,
        },
        {
            name: 'Morning',
            selector: row => row.onProgress.morning.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                        {<TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        
        },
        {
            name: 'Afternoon',
            selector: row => row.onProgress.afternoon.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                        {<TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        },
        {
            name: 'Night',
            selector: row => row.onProgress.night.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                            {<TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        },
    ];

    //table columns
    const columnsSoon = [
        {
            name: 'Day',
            selector: row => row.day,
        },
        {
            name: 'Morning',
            selector: row => row.startingSoon.morning.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                        {<TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        
        },
        {
            name: 'Afternoon',
            selector: row => row.startingSoon.afternoon.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                        {<TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        },
        {
            name: 'Night',
            selector: row => row.startingSoon.night.map(day=>{
                return(
                    <div>{day.program}{" -"}{"("}{day.time}{")"}<br></br>
                        { <TimeAgo timestamp={day.date}/>}<br></br></div>
                )}),
        },
    ];

        return (
            <>
                <div className="mt-5">
                    <h4>On Progress</h4>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
                <div className="mt-5" style={{borderBottom: "1px ridge"}}></div>
                <div className="my-5">
                    <h4>Comming Soon</h4>
                    <DataTable
                        columns={columnsSoon}
                        data={data}
                    />    
                </div>
            </>
            
            

            
        );
    } else {
        return(
            <div>{status}</div>
        )
    }    
};


function Calender() {
    
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Our Calender</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div>
                <MyComponent />
            </div>
        </div>
    );

}

export default Calender;