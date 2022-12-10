import React from "react";
import {Link} from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer mb-0">
            <div className="container ">
                <div className="row d-flex row-register-footer justify-content-center">
                    <Link className="btn-register justify-self-center col-auto"
                     to="/register" > Register</Link>
    
                </div>
                <div className="row footer-content">
                    <div className="col-4 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="./aboutus">About Us</Link></li>
                            <li><Link to="./clander">Our Clander</Link></li>
                            <li><Link to="./certificate">Certificate</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                            Serga Building Ground Floor<br/>
                            Infront of avanti Hotel<br />
                            Bahir Dar<br/><br/>
                            <i className="fa fa-phone fa-lg"></i>: +251 918 310782<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="#">abyssinia@gmail.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4">
                        <h5>About us</h5>
                        <div><p>
                            Abyssina Computer Trining Center is one of the leading
                            training center in Bahir Dar with more than 10 years of 
                            exprinace.
                        </p></div>
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-facebook" href="#"><i className="fa fa-facebook fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="#"><i className="fa fa-twitter fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="#"><i className="fa fa-linkedin fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-google" href="#"><i className="fa fa-youtube fa-lg"></i></a>
                            <a className="btn btn-social-icon" href="#"><i className="fa fa-envelope fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row copy-right justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2022 Abyssinia Computer Training Center</p>
                    </div>
                </div>
            </div>            
        </div>
    );
    
}

export default Footer;