import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, Collapse, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            dropdownopen: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleDropdown(){
        this.setState({
            dropdownopen: !this.state.dropdownopen
        })
    }

    render(){

        const items = this.props.programs.map((program)=>{
             return(
                <DropdownItem key={program.id}>{program.name}</DropdownItem>
             );
        });
        return(
            <div className="mt-0">
                <Navbar dark expand="md">
                    <NavbarBrand>
                      <p>Abyssina Computer <br/>{'\u00A0'} Traning Center</p>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav}/>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar className="me-auto">
                            <NavItem>
                                <NavLink> Home </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink> About</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown className="dropdown" isOpen={this.state.dropdownopen} toggle={this.toggleDropdown} {...this.props}>
                                    <NavLink>
                                        <DropdownToggle caret style={{
                                            background: '#07404e',
                                            border: 'none',
                                            padding: 0,
                                            color: "inherit"
                                        }}>
                                            Programs
                                        </DropdownToggle> 
                                    </NavLink>
                                    <DropdownMenu className="dropdown-menu">
                                        {items}
                                    </DropdownMenu>
                                </Dropdown>
                                
                            </NavItem>
                            <NavItem>
                                <NavLink> Register Online </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Our Clander</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink> Certificate </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink> Contact Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
        </div>
            
        );
    }
}

  

export default Header;