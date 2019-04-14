import React, { Component } from 'react';

import "./styles.css";

import CadastroCliente from "../../pages/cliente/Cadastro";

class Body extends Component {

    render() {
        return (
            <div>
               {this.props.pagina}
               <CadastroCliente />
            </div>
        );
    }
}

export default Body;