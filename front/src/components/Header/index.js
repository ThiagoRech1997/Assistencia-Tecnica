import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import "./styles.css";

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div id="main-header">
        <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>Clientes</Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <MenuItem onClick={this.handleClose}>Cadastrar</MenuItem>
          <MenuItem onClick={this.handleClose}>Buscar</MenuItem>
          <MenuItem onClick={this.handleClose}>Alterar</MenuItem>
          <MenuItem onClick={this.handleClose}>Deletar</MenuItem>
        </Menu>
        <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>Funcionarios</Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <MenuItem onClick={this.handleClose}>Cadastrar</MenuItem>
          <MenuItem onClick={this.handleClose}>Buscar</MenuItem>
          <MenuItem onClick={this.handleClose}>Alterar</MenuItem>
          <MenuItem onClick={this.handleClose}>Deletar</MenuItem>
        </Menu>
        <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>Orcamento</Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <MenuItem onClick={this.handleClose}>Cadastrar</MenuItem>
          <MenuItem onClick={this.handleClose}>Buscar</MenuItem>
          <MenuItem onClick={this.handleClose}>Alterar</MenuItem>
          <MenuItem onClick={this.handleClose}>Deletar</MenuItem>
        </Menu>
        <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>Orden de Servico</Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <MenuItem onClick={this.handleClose}>Cadastrar</MenuItem>
          <MenuItem onClick={this.handleClose}>Buscar</MenuItem>
          <MenuItem onClick={this.handleClose}>Alterar</MenuItem>
          <MenuItem onClick={this.handleClose}>Deletar</MenuItem>
        </Menu>
      </div>
    );
  }
}
 

export default Header;