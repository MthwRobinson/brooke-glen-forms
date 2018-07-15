import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';

import './PatientRecord.css';

import CrisisPlan from './../CrisisPlan/CrisisPlan';
import ObservationRecord from './../ObservationRecord/ObservationRecord';

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
    const precautionsText = this.props.precautions.join(', ');
    return(
      <div>
        <div className='record-data hidden-sm hidden-xs'>
            <img
              src='/images/placeholder-headshot.png'
              height='260'
              alt='placeholder'
            /><br/>
          <div className='record-metadata'>
            <b>Name:</b> {this.props.name}<br/>
            <b>Updated:</b> {this.props.updated}<br/>
            <b>Unit:</b> {this.props.unit}<br/>
            <b>Obs. Level:</b> {this.props.obsLevel}<br/>
            <b>Notes:</b> {precautionsText}
          </div>
        </div>
        <div className='record-metadata hidden-md hidden-lg'>
          <b>Name:</b> {this.props.name}<br/>
          <b>Updated:</b> {this.props.updated}<br/>
          <b>Unit:</b> {this.props.unit}<br/>
          <b>Obs. Level:</b> {this.props.obsLevel}<br/>
          <b>Notes:</b> {precautionsText}
        </div>
      </div>
    );
  }

  renderBody = () => {
    let body = null;
    if(this.state.activeTab==='crisisPlan'){
      body = (
        <div className='patient-form'>
          <CrisisPlan />
        </div>
      );
    } else if(this.state.activeTab==='obsRecord'){
      body = (
        <div className='patientForm'>
          <ObservationRecord />
        </div>
      );
    }
    return body;
  }

  render() {
    let patientInfo = this.renderPatientInfo();
    let body = this.renderBody();

    return (
      <div className="PatientRecord">
        <Row>
          <h2>
            <i className='fa fa-times pull-right exit-button'
               onClick={()=>this.props.exit()}
             ></i>
            {this.props.name}</h2><hr/>
          <h4>View and manage patient information.</h4>
        </Row>
        <Row>
          <Col xm={12} sm={12} md={4} lg={4}>
            {patientInfo}
          </Col>
          <Col xm={12} sm={12} md={8} lg={8}>
            <Row>
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
            </Row>
            <Row>
              {body}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PatientRecord;
