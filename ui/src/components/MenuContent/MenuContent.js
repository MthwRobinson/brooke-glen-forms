import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './MenuContent.css';

class MenuContent extends Component {
  render() {
    return (
      <div className="MenuContent">
        <h3>Menu</h3>
        <hr/>
        <a
          href="#home"
          onClick={()=>this.props.changeView('home')}>Home
        </a><br/>
        <a 
          href="#patient-records"
          onClick={()=>this.props.changeView('patientRecords')}>Patient Records
        </a><br/>
        <a
          href="#trends"
          onClick={()=>this.props.changeView('trends')}>Trends
        </a><br/>
      </div>
    );
  }
}

export default MenuContent;
