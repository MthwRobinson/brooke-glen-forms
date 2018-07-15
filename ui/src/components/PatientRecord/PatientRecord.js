import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';

import './PatientRecord.css';

const PATIENTS = require('./../../data/dummyPatients.json');

class PatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'crisisPlan'
    }
  }

  selectHandler = (tab) => {
    this.setState({activeTab: tab});
  }

  renderPatientInfo = () => {
    const precautionsText = PATIENTS[0].precautions.join(', ');
    return(
      <div>
        <div className='patient-record-data hidden-sm hidden-xs'>
            <img
              src='/images/placeholder-headshot.png'
              height='260'
              alt='placeholder'
            /><br/>
          <div className='patient-metadata'>
            <b>Name:</b> {PATIENTS[0].name}<br/>
            <b>Updated:</b> {PATIENTS[0].updated}<br/>
            <b>Unit:</b> {PATIENTS[0].unit}<br/>
            <b>Obs. Level:</b> {PATIENTS[0].obsLevel}<br/>
            <b>Notes:</b> {precautionsText}
          </div>
        </div>
        <div className='patient-metadata hidden-md hidden-lg'>
          <b>Name:</b> {PATIENTS[0].name}<br/>
          <b>Updated:</b> {PATIENTS[0].updated}<br/>
          <b>Unit:</b> {PATIENTS[0].unit}<br/>
          <b>Obs. Level:</b> {PATIENTS[0].obsLevel}<br/>
          <b>Notes:</b> {precautionsText}
        </div>
      </div>
    );
  }

  render() {
    let patientInfo = this.renderPatientInfo();

    return (
      <div className="PatientRecord">
        <Row>
          <h2>{PATIENTS[0].name}</h2><hr/>
          <h4>View and manage patient information.</h4>
        </Row>
        <Row>
          <Col xm={12} sm={12} md={4} lg={4}>
            {patientInfo}
          </Col>
          <Col xm={8} sm={8} md={8} lg={8}>
            <Nav 
              className='record-tabs' 
              bsStyle="tabs" 
              activeKey={this.state.activeTab} 
            >
              <NavItem 
                eventKey="crisisPlan"
                onClick={()=>this.selectHandler('crisisPlan')}
                className='record-nav-item'
              ><span className='record-tab'>Crisis Plan</span></NavItem>
              <NavItem 
                eventKey="obsRecord"
                onClick={()=>this.selectHandler('obsRecord')}
                className='record-nav-item'
              ><span className='record-tab'>Observation Record</span></NavItem>
            </Nav>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PatientRecord;
