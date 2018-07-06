import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './MenuContent.css';

class MenuContent extends Component {
  render() {
    return (
      <div className="MenuContent">
        <h3>Menu</h3>
        <hr/>
        <a href="#home">Home</a><br/>
        <a href="#patient">Patient Records</a><br/>
        <a href="#trends">Trends</a><br/>
      </div>
    );
  }
}

export default MenuContent;
