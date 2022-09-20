import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

class Home extends Component {

    constructor(props){
        super(props);
    }

    render(){
        const programs = this.props.programs.map((program) => {
            if(program.id%2 === 0){
                return(
                    <div key={program.id} className="container">
                        <div className="row d-flex align-items-center justify-content-center mt-5">
                            <div className="col-sm-5 me-1">
                                <img className="home-image img-fluid" src={program.image} alt={program.name} />
                            </div>
                            <div className="col-sm-5 home-text">
                                <h4>{program.name}</h4>
                                <p> {program.description}</p>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div key={program.id} className="container">
                        <div className="row d-flex align-items-center justify-content-center mt-5">
                                <div className="col-sm-5 home-text me-1">
                                    <h4>{program.name}</h4>
                                    <p>{program.description}</p>
                                </div>
                                <div className="col col-sm-5">
                                    <img className="home-image img-fluid" src={program.image} alt={program.name} />
                                </div>
                                
                        </div>
                    </div>
                    );    
            }

        });

        return( 
           <div className="container">
                <Card style={{background: '#2a7285',
                              color:"floralwhite",
                              fontStyle: "bold"}}>
                    <CardBody className="m-2"><style>
                        
                    </style>
                        <CardTitle className="d-flex justify-content-center align-items-center">
                            <h4>Our Programs</h4>
                        </CardTitle>
                    </CardBody>
                </Card>
                <div  className=" mb-5">
                    {programs}
                </div>
           </div> 
            
            
        );
    }
}

export default Home;