import React, { Component } from 'react';
import "./styles.css"

import Header from "./components/Header";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <div className="App"> 
        < link 
          rel = " stylesheet "
          href = " https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css "
          integridade = " sha384-ggOyR0iXCbMQv3Xipma34MD + dH / 1fQ784 / j6cY / iJTQUOhcWr7x9JvoRxT2MZw1T "
          crossorigin = " anônimo "
        />
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
