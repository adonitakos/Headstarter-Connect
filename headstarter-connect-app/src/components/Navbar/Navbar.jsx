import React, { useContext } from "react";
import { UserContext } from '../../config/user'
import { Link } from 'react-router-dom'
import logo from '../../images/Headstarter-logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  const userInfo = useContext(UserContext)[0].user

  const links = [
    { to: '/', title: 'Home' }
  ]
  if (userInfo != null) {
    links.push(
      { to: `/profile`, title: 'Profile' },
      { to: `/calendar`, title: 'Calendar' },
      { to: `/video_chat`, title: 'Video Chat' },
      { to: '/sign_out', title: 'Sign Out' }
    )
  } else {
    links.push(
      { to: '/auth/login', title: 'Login' },
      { to: '/auth/register', title: 'Sign Up' }
    )
  }

  return (
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: "#3D56F0", fontWeight:'600'}}>
        <Container>
          <Navbar.Brand href="/"><img src={logo} style={{zoom:'6%', borderRadius:'100px', marginLeft:'-20rem'}}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{fontSize:'17px'}}>
              {links.map(link => (
                <Nav.Link as={Link} to={link.to} key={link.to}>{link.title}</Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
} // <--- NavigationBar() function ends here

export default NavigationBar;