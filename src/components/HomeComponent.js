import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";


function Home()  {

    const programs = useSelector(state => state.programs);
    const errMess = useSelector(state => state.programs.error);

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
    } else if(programs.status === 'succeeded')  {
        let shift = true;
        const programList = programs.programs.map((program) => {
            if(shift && program.featured === true){
                shift = !shift;
                return(
                    <div key={program.id} className="container">
                        <div className="row d-flex align-items-center justify-content-center mt-5">
                            <div className="col-sm-5 me-1">
                                <img className="home-image img-fluid" src={program.image_url} alt={program.name} />
                            </div>
                            <div className="col-sm-5 home-text">
                                <h4>{program.name}</h4>
                                <p> {program.description}</p>
                            </div>
                        </div>
                    </div>
                );
            } else if(program.featured === true) {
                shift = !shift;
                return(
                    <div key={program.id} className="container">
                        <div className="row d-flex align-items-center justify-content-center mt-5">
                                <div className="col-sm-5 home-text me-1">
                                    <h4>{program.name}</h4>
                                    <p>{program.description}</p>
                                </div>
                                <div className="col col-sm-5">
                                    <img className="home-image img-fluid" src={program.image_url} alt={program.name} />
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
                    <CardBody className="m-1">
                        <CardTitle className="d-flex justify-content-center align-items-center">
                            <h5>Our Programs</h5>
                        </CardTitle>
                    </CardBody>
                </Card>
                <div  className=" mb-5">
                    {programList}
                </div>
           </div> 
            
        );
    }
}

export default Home;