import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './MenuContent.css';

class MenuContent extends Component {
  render() {
    return (
      <div className="MenuContent">
        <h4>Menu</h4>
        <hr/>
        Home<br/>
        Patient Records<br/>
        Trends<br/>
      </div>
    );
  }
}

export default MenuContent;
