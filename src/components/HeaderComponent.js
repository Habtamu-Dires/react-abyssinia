import React, { useState } from "react";
import { Navbar, NavbarBrand, NavItem, Nav, Collapse, NavbarToggler, Dropdown, DropdownToggle, 
           DropdownMenu, DropdownItem, NavLink as Navlink} from "reactstrap";
import { Link, NavLink} from 'react-router-dom';
import {  useSelector } from "react-redux";

function Header() {

    const programs = useSelector(state => state.programs);
    const errMess = useSelector(state => state.programs.error);

    const[isNavOpen, setIsNavOpen] = useState(false);
    const[dropdownopen, setDropDown] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const toggleDropdown = () => setDropDown((prevState)=> !prevState);
    
        let items =[];

        if(programs.status === 'loading') {
            items =[
                    <DropdownItem   key={programs.status}>
                        Loading ...
                    </DropdownItem>
            ]         
        }else if(programs.status === 'failed'){
            items =[
                    <DropdownItem  key={programs.status}>
                        {errMess}
                    </DropdownItem>
            ]
            
       } else {
        
            // lets sort it so that the others appear at the last
            const programSorted = programs.programs.filter(program => program.name !== "Others");
            if(programs.programs.find(program => program.name === 'Others')){
                programSorted.push(programs.programs.find(program => program.name === 'Others'))
            }
            items = programSorted.map((program)=>{
                return(     
                    <div key={program.id} onClick={toggleDropdown} >
                        <Link  className="link"  to={`/programDetail/${program.id}`}>
                            <DropdownItem >
                                {program.name}
                            </DropdownItem>
                         </Link>
                    </div>               
                
                );
            });

  } 

    return(
        <div className="mt-0">
            <Navbar dark expand="md">
                <NavbarBrand>
                    <p>Abyssina Computer <br/>{'\u00A0'} Traning Center</p>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNav}/>
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar className="me-auto">
                        <NavItem>
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <Dropdown className="dropdown"  isOpen={dropdownopen}  toggle={toggleDropdown} >
                                <Navlink>
                                    <DropdownToggle caret style={{
                                        background: '#07404e',
                                        border: 'none',
                                        padding: 0,
                                        color: "inherit"
                                    }}>
                                        Programs
                                    </DropdownToggle> 
                                </Navlink>
                                <DropdownMenu className="dropdown-menu">
                                    {items}
                                </DropdownMenu>
                            </Dropdown>
                            
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/register">Register Online</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/calender">Our Calender</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/certificate">Certificate</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        
    );
  }

export default Header;