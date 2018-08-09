import React, { Component } from 'react';
import {
  Button,
  Col, 
  ControlLabel,
  FormControl, 
  FormGroup, 
  Grid, 
  Row
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './AddPatient.css';

class AddPatient extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      unit: null,
      obsLevel: null,
      precautions: null
    }

    // Bindings for info from the forms
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleObsLevel = this.handleObsLevel.bind(this);
    this.handlePrecautions = this.handlePrecautions.bind(this);
  }

  componentDidMount(){
    // Either makes a service call or sets patients using
    //  cached data when the component is rendered
    // if(this.props.cache){
    //   this.setState({patients: this.props.cache});
    // } else{
    //   const route = '/service/patient_views/' + this.props.userId;
    //   axios.get(route)
    //     .then(res => {
    //       const patients = res.data;
    //       this.setState({patients: patients });
    //       this.props.setCache(patients);
    //     })
    // }
  }

  handleFirstName(event) {
    // Updates the first name with the info from the form
    this.setState({ firstName: event.target.value });
  }

  handleLastName(event) {
    // Updates the last name with the info from the form
    this.setState({ lastName: event.target.value });
  }
  
  handleUnit(event) {
    // Updates the unit with the info from the form
    this.setState({ unit: event.target.value });
  }
  
  handleObsLevel(event) {
    // Updates the obervation level with the info from the form
    this.setState({ obsLevel: event.target.value });
  }
  
  handlePrecautions(event) {
    // Updates the precautions  with the info from the form
    this.setState({ precautions: event.target.value });
  }

  render() {
    return (
      <div className="AddPatient">
        <h2>Add a Patient</h2>
        <hr/>
        <h4>Add a patient and define their crisis plan</h4>
        <div className='add-patient-form'>
          <h3>Patient Info</h3>
          <form>
            <Col xs={6} sm={6} md={6} lg={6} >
              <FormGroup controlId="formControlSelect">
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  value={this.state.firstName}
                  onChange={this.handleFirstName}
                >
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} >
              <FormGroup controlId="formControlSelect">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  componentClass="input"
                  value={this.state.lastName}
                  onChange={this.handleLastName}
                >
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} >
              <FormGroup controlId="formControlSelect">
                <ControlLabel>Unit</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.unit}
                  onChange={this.handleUnit}
                >
                  <option value="Long Term Care">Long Term Care</option>
                  <option value="Short Term Care">Short Term Care</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} >
              <FormGroup controlId="formControlSelect">
                <ControlLabel>Observation Level</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.obsLevel}
                  onChange={this.handleObsLevel}
                >
                  <option value="Q15">Q15</option>
                  <option value="1:1">1:1</option>
                  <option value="CPAP">CPAP</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} >
              <FormGroup controlId="formControlSelect">
                <ControlLabel>Precautions</ControlLabel>
                <FormControl
                  componentClass="select"
                  multiple
                  value={this.state.precautions}
                  onChange={this.handlePrecautions}
                >
                  <option value="Q15">Aggression</option>
                  <option value="1:1">Elopement</option>
                  <option value="CPAP">Fall</option>
                  <option value="Homocide">Homocide</option>
                  <option value="Program Separately">Program Separately</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Seizure">Seizure</option>
                  <option value="Self-Mutilation">Self-Mutilation</option>
                  <option value="Withdrawal">Withdrawal</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Button
                className='patient-form-button'
              >Submit</Button>
              <Button
                className='patient-form-button'
              >Clear</Button>
            </Col>
          </form>
        </div>

      </div>
    );
  }
}

export default withRouter(AddPatient);
