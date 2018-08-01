import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import axios from 'axios';

import './PatientRecord.css';

import CrisisPlan from './../CrisisPlan/CrisisPlan';
import ObservationRecord from './../ObservationRecord/ObservationRecord';

class PatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'crisisPlan',
      name: null,
      updated_date: null,
      unit: null,
      obs_level: null,
      precautions: []
    }
  }

  componentDidMount(){
    const route = '/service/patient/' + this.props.patientId;
    axios.get(route)
      .then(res => {
        const patient = res.data;
        this.setState({
          name: patient.name,
          updated_date: patient.updated_date,
          unit: patient.unit,
          obs_level: patient.obs_level,
          precautions: patient.precautions
        })
      })
  }

  selectHandler = (tab) => {
    this.setState({activeTab: tab});
  }

  renderPatientInfo = () => {
    const precautionsText = this.state.precautions.join(', ');
    return(
      <div>
        <div className='record-data hidden-sm hidden-xs'>
            <img
              src='/images/placeholder-headshot.png'
              height='260'
              alt='placeholder'
            /><br/>
          <div className='record-metadata'>
            <b>Name:</b> {this.state.name}<br/>
            <b>Updated:</b> {this.state.updated_date}<br/>
            <b>Unit:</b> {this.state.unit}<br/>
            <b>Obs. Level:</b> {this.state.obs_level}<br/>
            <b>Notes:</b> {precautionsText}
          </div>
        </div>
        <div className='record-metadata hidden-md hidden-lg'>
          <b>Name:</b> {this.state.name}<br/>
          <b>Updated:</b> {this.state.updated_date}<br/>
          <b>Unit:</b> {this.state.unit}<br/>
          <b>Obs. Level:</b> {this.state.obs_level}<br/>
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
        <div className='patient-form'>
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
            {this.state.name}</h2><hr/>
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
