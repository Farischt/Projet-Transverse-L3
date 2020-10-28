import React, { Component } from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';


class NavBar extends Component {
    render() {
        return (        
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand >e-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                   <Link to="/" className="nav-link" > Accueil </Link>
                </Nav>
                <Nav className="mr-auto">
                   <Link to="/register" className="nav-link" > S'inscrire </Link>
                </Nav>
                <Nav className="mr-auto">
                   <Link to="/profil" className="nav-link" > Mon profil </Link>
                </Nav>
                <Nav className="mr-auto">
                   <Link to="/cart" className="nav-link" > <i className="large shopping cart icon"></i> </Link>
                </Nav>
                <Login login={this.props.login} userName={this.props.userName}/>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}

export default NavBar;