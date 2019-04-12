import React, {Component} from 'react';

import "./styles.css";

//import "../Button";
//import Button from '../Button';

class Header extends Component {
    render() {
      return (
        <div> 
            <header id="main-header">Assistencia Técnica</header>
            <div>
                <button>Home</button>
            </div>
        </div>
      );
    }
}
 

export default Header;