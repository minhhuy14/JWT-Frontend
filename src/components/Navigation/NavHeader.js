import React, { useContext} from "react";
import './Nav.scss';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHeader = (props) => {

    const {user}=useContext(UserContext);

    const location=useLocation();
    

    if ((user&&user?.isAuthenticated===true)||(location.pathname=='/'))
        return (
            <div className="nav-header">
    <Navbar bg="header" expand="lg">
      <Container>
      <Navbar.Brand href="#home">
            <img
              src="/logo192.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Brand href="/">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
           
          </Nav>
          <Nav>
            <Nav.Item className="nav-link">Welcome Huy!</Nav.Item>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1" >Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
               Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </div>
        );
    else{

        return <></>
    }
}

export default NavHeader;
