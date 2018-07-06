import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './Header.css';

//<i className="fa fa-bars menu-button pull-right"></i>
class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home"> Brooke Glen Form Manager</a>
            </Navbar.Brand>
            <Navbar.Form className='pull-right menu-icon'>
              <i className="fa fa-bars" onClick={this.props.clickMenu}></i>
            </Navbar.Form>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default Header;
