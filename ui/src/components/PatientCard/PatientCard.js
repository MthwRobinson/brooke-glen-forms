import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import './PatientCard.css';

class PatientCard extends Component {
  render() {
    return (
      <div className="PatientCard" border>
        <Col xs={2} sm={2} md={2} lg={2}>
          <img 
            className='patient-image'
            src='/images/placeholder-headshot.png'
            height='135'
          />
        </Col>

      </div>
    );
  }
}

export default PatientCard;
