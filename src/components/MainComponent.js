import React, {  useEffect } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Carousal from "./CarouselComponent";
import {CAROUSEL_ITEM} from "../shared/carousel_item";
import Home from "./HomeComponent";
import {Routes, Route, Navigate } from 'react-router-dom';
import  Register  from './RegisterComponent';
import About from "./AboutComponent";
import ProgramDetail from "./ProgramDetailComponent";
import Certificate from "./CertificateComponent";
import Registered from "./RegisterSuccessComponent";
import ContactUs from "./ContactUsComponent";
import Calender from "./calenderComponent";
import AdminApp from "../adminComponents.js/AdminApp";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "../redux/programsSlice";
import { fetchClasses } from "../redux/classSlice";
import { fetchCorouselItems } from "../redux/carouselItemSlice";
import ResetPassword from '../adminComponents.js/resetPassword';


function Main()  {
   
    const dispatch = useDispatch();
    const programStatus = useSelector(state => state.programs.status);
    
    const carousel_item = CAROUSEL_ITEM;

    useEffect(()=> {
        if(programStatus === 'idle') {
            dispatch(fetchPrograms());
            dispatch(fetchClasses());
            dispatch(fetchCorouselItems());
        }
    }, [programStatus, dispatch]) 
    

    const HomePage = ()=> {
        return(
            <>
                <Carousal items={carousel_item}/>
                <Home/>
            </>
        );
    }
   
    const UserPage = (props) => {
        return(
            <>
            <Header />
                <props.page />
            <Footer />
            </>
            
        )
    };
    const AdminPage = ()=>{
        return(
            <AdminApp />        
        );
    }

    return(
        <>
            <Routes>               
                <Route path="/home" element={<UserPage page={HomePage}/>} />
                <Route path="/register" element={<UserPage page={Register} />}/>
                <Route path="/certificate" element={<UserPage page={Certificate}/>} />
                <Route path="/about" element={<UserPage page={About} />}/>
                <Route path="/programDetail/:programId" element={<UserPage page={ProgramDetail}/>} />
                <Route path="/contactus" element={<UserPage page={ContactUs} />}/>
                <Route path="/registerSuccess" element={<UserPage page= {Registered} />} />
                <Route path="/calender" element={<UserPage page = {Calender} />}/>
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
                <Route path="*" element={
                    <Navigate to='/home' replace />
                } />                
            </Routes>        
        </>
    )
   
}

export default Main;
