import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Carousal from "./CarouselComponent";
import {CAROUSEL_ITEM} from "../shared/carousel_item";
import Home from "./HomeComponent";
import { PROGRAMS } from "../shared/programs";
import {Routes, Route, Navigate } from 'react-router-dom';
import  Register  from './RegisterComponent';
import About from "./AboutComponent";
import  Certificate  from './CertificateComponent';
import Counter from '../features/counter/counter';
import {PostsList} from '../features/posts/postList';
import {AddPostForm} from '../features/posts/AddPostForm';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            programs: PROGRAMS,
            carousel_item: CAROUSEL_ITEM,
        };
    }
   
    render() {
        const AboutPage = () => (
            <>
                <About />
                <Counter />
            </>
        )

        const ContacPage = ()=> (
            <>  
                <AddPostForm />
                <PostsList />
            </>
        );

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
                        <Route path="/register" element={<Register programs={this.state.programs}/>} />
                        <Route path="/certificate" element={<Certificate />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contactus" element={<ContacPage />} />
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
