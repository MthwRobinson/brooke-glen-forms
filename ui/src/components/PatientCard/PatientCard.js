import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import './PatientCard.css';

class PatientCard extends Component {
  render() {
    return (
      <div className="PatientCard" border>
        <Col xs={4} sm={4} md={4} lg={3}>
          <img 
            className='patient-image'
            src='/images/placeholder-headshot.png'
            height='135'
          />
        </Col>
        <Col xs={8} sm={8} md={8} lg={9}>
          <div className='patient-info'>
            <b>Name:</b> John Doe<br/>
            <b>Updated:</b> 07/07/18 8:18 PM<br/>
            <b>Unit:</b> Long Term Care<br/>
            <b>Obs. Level:</b> Q15<br/>
            <b>Precautions:</b> Fall, Aggression, Seizure, Withdrawal, Respiratory

          </div>
        </Col>

      </div>
    );
  }
}

export default PatientCard;
