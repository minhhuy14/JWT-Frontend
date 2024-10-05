import React, { useContext } from "react";
import './Nav.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";


const NavHeader = (props) => {

  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let data = await logoutUser();//clear cookie
    localStorage.removeItem('jwt');//clear local storage
    logoutContext();  //clear user context
    if (data && +data.EC === 0) {
      navigate("/");
    }
    else {
      toast.error(data.EM);
    }
  }


  if ((user && user?.isAuthenticated === true) || (location.pathname == '/'))
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
                <Nav.Link href="/roles">Roles</Nav.Link>
                <Nav.Link href="/group-role">Group-Role</Nav.Link>
                <Nav.Link href="/projects">Projects</Nav.Link>


              </Nav>

              {user && user.account.username ?
                <Nav>
                  <Nav.Item className="nav-link">Welcome {user.account.username}!</Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="#" >Change Password</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                :
                <Nav.Link href="/login">Login</Nav.Link>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  else {

    return <></>
  }
}

export default NavHeader;
