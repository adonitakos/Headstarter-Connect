import React from "react";
import logo from '../../images/Headstarter-logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: "#3D56F0", fontWeight:'600'}}>
          <Container>
            <Navbar.Brand href="/"><img src={logo} style={{zoom:'6%', borderRadius:'100px', marginLeft:'-20rem'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav style={{fontSize:'17px'}}>
                <Nav.Link href="/auth/register">Sign Up</Nav.Link>
                <Nav.Link href="/auth/login"> Login </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
} // <--- NavigationBar() function ends here

export default NavigationBar;