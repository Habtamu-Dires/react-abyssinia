import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Carousal from "./CarouselComponent";
import {CAROUSEL_ITEM} from "../shared/carousel_item";
import Home from "./HomeComponent";
import { PROGRAMS } from "../shared/programs";
import {Routes, Route, Navigate } from 'react-router-dom';
import  Register  from './RegisterComponent';
import  Certificate  from './CertificateComponent';


class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            programs: PROGRAMS,
            carousel_item: CAROUSEL_ITEM,
        };
    }
   
    render() {
        const HomePage = ()=> {
            return(
                <>
                    <Carousal items={this.state.carousel_item}/>
                    <Home programs={this.state.programs}/>
                </>
            );
        }
        return(
            <div>
                <Header programs={this.state.programs}/>
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/certificate" element={<Certificate />} />
                        <Route path="*" element={
                            <Navigate to='/home' replace />
                        } />
                    </Routes>
                <Footer />                 
            </div>
            
        );
    }
}

export default Main;
