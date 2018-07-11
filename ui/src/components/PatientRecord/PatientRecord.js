import React, { Component } from 'react';
import { Nav, NavItem, Row } from 'react-bootstrap';

import './PatientRecord.css';

const PATIENTS = require('./../../data/dummyPatients.json');

class PatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'patientInfo'
    }
  }

  selectHandler = (tab) => {
    this.setState({activeTab: tab});
  }

  render() {
    return (
      <div className="PatientRecord">
        <Row>
          <h2>{PATIENTS[0].name}</h2><hr/>
          <h4>View and manage patient information.</h4>
        </Row>
        <Row>
          <Nav 
            className='record-tabs' 
            bsStyle="tabs" 
            activeKey={this.state.activeTab} 
          >
            <NavItem 
              eventKey="patientInfo"
              onClick={()=>this.selectHandler('patientInfo')}
              className='record-nav-item'
            ><span className='record-tab'>Patient Info</span></NavItem>
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
  
        </Row>

      </div>
    );
  }
}

export default PatientRecord;
