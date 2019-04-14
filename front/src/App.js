import React, { Component } from 'react';
import "./styles.css"

import Header from "./components/Header";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
