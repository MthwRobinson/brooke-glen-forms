import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './Home.css';

import PatientCard from './../PatientCard/PatientCard';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <PatientCard />
      </div>
    );
  }
}

export default Home;
