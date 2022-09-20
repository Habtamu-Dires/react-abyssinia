import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Carousal from "./CarouselComponent";
import {CAROUSEL_ITEM} from "../shared/carousel_item";
import Home from "./HomeComponent";
import { PROGRAMS } from "../shared/programs";

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            programs: PROGRAMS,
            carousel_item: CAROUSEL_ITEM,
        };
    }

    render() {
        return(
            <div>
                <Header programs={this.state.programs}/>
                <Carousal items={this.state.carousel_item}/>
                <Home  programs={this.state.programs}/> 
                <Footer />                
            </div>
            
        );
    }
}

export default Main;
