import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";

function Registered() {

    return(
        <div className="container justify-content-center">
           <Card className="m-5">
                <CardHeader><h4 className="text-center">Abysinia Computer Training Center</h4></CardHeader>
                <CardBody>
                    <div class="d-flex row">
                            <h2 className="col-12 text-center">
                                Thank You!!!</h2><br></br>
                            <h4 className="col-12 text-center" >
                                You have Successfully Registered </h4>
                    </div>
                    <div class="col mt-5">
                        <div class="row justify-content-center">
                            <Link to={'/home'} className="btn btn-success col-auto" >Finish </Link>
                        </div>                           
                    </div>
                </CardBody>
           </Card>    
        </div>
    );
}

export default Registered;