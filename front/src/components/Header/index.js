import React, {Component} from 'react';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';


import "./styles.css";

class Header extends Component {
  render() {

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Assistencia Tecnica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Procurar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Funcionarios" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Procurar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Servicos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Procurar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Orcamentos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Procurar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
 

export default Header;