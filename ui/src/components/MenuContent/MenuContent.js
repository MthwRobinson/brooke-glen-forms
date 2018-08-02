import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MenuContent.css';

class MenuContent extends Component {
  render() {
    console.log(this.props.history);

    return (
      <div className="MenuContent">
        <h3>Menu</h3>
        <hr/>
        {this.props.links}
      </div>
    );
  }
}

export default MenuContent;
