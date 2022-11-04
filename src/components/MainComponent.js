import React, { Component, useEffect, useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Carousal from "./CarouselComponent";
import {CAROUSEL_ITEM} from "../shared/carousel_item";
import Home from "./HomeComponent";
import { PROGRAMS } from "../shared/programs";
import {Routes, Route, Navigate, useParams } from 'react-router-dom';
import  Register  from './RegisterComponent';
import About from "./AboutComponent";
import ProgramDetail from "./ProgramDetailComponent";
import Certificate from "./CertificateComponent";
import Registered from "./RegisterSuccessComponent";
import ContactUs from "./ContactUsComponent";
import Calender from "./calender";
import Counter from '../features/counter/counter';
import {PostsList} from '../features/posts/postList';
import {AddPostForm} from '../features/posts/AddPostForm';
import { SinglePostPage } from '../features/posts/SinglePostPage';
import {EditPostForm} from '../features/posts/EditPostForm';
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "../redux/programsSlice";
import { fetchStudents } from "../redux/studentSlice";
import { fetchCorouselItems } from "../redux/carouselItemSlice";


function Main()  {
   
    const dispatch = useDispatch();
    const programStatus = useSelector(state => state.programs.status);
       
    const programs = PROGRAMS;
    const carousel_item = CAROUSEL_ITEM;

    useEffect(()=> {
        if(programStatus === 'idle') {
            dispatch(fetchPrograms());
            dispatch(fetchStudents());
            dispatch(fetchCorouselItems());
        }
    }, [programStatus, dispatch]) 
    

    const AboutPage = () => (
        
            <About />

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
                <Carousal items={carousel_item}/>
                <Home/>
            </>
        );
    }
    const SinglePost =() => {
        const { postId } = useParams();
        return(
            <SinglePostPage  postId = {postId}/>
        );
    }

    return(
        <div>
            <Header/>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/certificate" element={<Certificate />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programDetail/:programId" element={<ProgramDetail />}/>
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/registerSuccess" element={<Registered />} />
                    <Route path="/calender" element={<Calender />}/>
                    <Route path="/post" element={<ContacPage />} />
                    <Route path="/post/:postId" element={<SinglePost />}/>
                    <Route path="/editPost/:postId" element={<EditPostForm />} />
                    <Route path="*" element={
                        <Navigate to='/home' replace />
                    } />
                </Routes>
            <Footer />                 
        </div>
        
    );
}

export default Main;
