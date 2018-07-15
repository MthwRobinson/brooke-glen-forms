import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import './PatientCard.css';

class PatientCard extends Component {
  render() {
    return (
      <div onClick={()=>this.props.click()} className="PatientCard">
        <Col xs={12} sm={12} md={4} lg={3}>
          <img 
            className='patient-image hidden-sm hidden-xs'
            src='/images/placeholder-headshot.png'
            height='135'
            alt="placeholder"
          />
        </Col>
        <Col xs={12} sm={12} md={8} lg={9}>
          <div className='patient-info'>
            <b>Name:</b> {this.props.name}<br/>
            <b>Updated:</b> {this.props.updated}<br/>
            <b>Unit:</b> {this.props.unit}<br/>
            <b>Obs. Level:</b> {this.props.obsLevel}<br/>
            <b>Precautions:</b> {this.props.precautions.join(', ')}
          </div>
        </Col>
      </div>
    );
  }
}

export default PatientCard;
