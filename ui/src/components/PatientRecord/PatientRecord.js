import React, { Component } from 'react';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './PatientRecord.css';

import CrisisPlan from './../CrisisPlan/CrisisPlan';
import ObservationRecord from './../ObservationRecord/ObservationRecord';

class PatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'obsRecord',
      name: null,
      updated_date: null,
      unit: null,
      obs_level: null,
      precautions: []
    }
  }

  exitHandler = () => {
    // Exits the patient view screen and returns to the last view
    if(this.props.lastView==='home'){
      this.props.history.push('/')
    } else {
      const url = '/' + this.props.lastView;
      this.props.history.push(url)
    }
    this.props.exit();
  }

  componentDidMount(){
    // Either makes a service call or sets patient information
    //  using cached data
    if(this.props.cache){
      const patient = this.props.cache;
      this.setState({
        name: patient.name,
        updated_date: patient.updated_date,
        unit: patient.unit,
        obs_level: patient.obs_level,
        precautions: patient.precautions
      })
    } else{
      const patientId = this.props.match.params.patientID;
      const route = '/service/patient/' + patientId;
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
          this.props.setCache(patient);
        })

      // Post the user viewed information back to the database
      axios.post('/service/patient_views',
        {
          'user_id': this.props.userId,
          'patient_id': this.props.match.params.patientID
        }
      )
    }
  }
  

  selectHandler = (tab) => {
    this.setState({activeTab: tab});
  }

  renderPatientInfo = () => {
    let precautionsText = null;
    if(this.state.precautions){
      precautionsText = this.state.precautions.join(', ');
    }
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
               onClick={()=>this.exitHandler()}
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
                  eventKey="obsRecord"
                  onClick={()=>this.selectHandler('obsRecord')}
                  className='record-nav-item'
                ><span className='record-tab'>Observation Record</span></NavItem>
                <NavItem 
                  eventKey="crisisPlan"
                  onClick={()=>this.selectHandler('crisisPlan')}
                  className='record-nav-item'
                ><span className='record-tab'>Crisis Plan</span></NavItem>
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

export default withRouter(PatientRecord);
