import React, { Component } from 'react';
import {
  Button,
  Checkbox,
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
      precautions: [],
      aggression: false,
      elopement: false,
      fall: false,
      homocide: false,
      programSeparately: false,
      seizure: false,
      selfMutilation: false,
      withdrawal: false
    }

    // Bindings for info from the forms
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleObsLevel = this.handleObsLevel.bind(this);
    this.handleAggression = this.handleAggression.bind(this);
    this.handleElopement = this.handleElopement.bind(this);
    this.handleFall = this.handleFall.bind(this);
    this.handleHomocide = this.handleHomocide.bind(this);
    this.handleProgramSeparately = this.handleProgramSeparately.bind(this);
    this.handleSeizure = this.handleSeizure.bind(this);
    this.handleSelfMutilation = this.handleSelfMutilation.bind(this);
    this.handleWithdrawal = this.handleWithdrawal.bind(this);
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

  clearHandler = () => {
    // Clears the inputs of the form
    // this.setState({
    //   firstName: null,
    //   lastName: null,
    //   unit: null,
    //   obsLevel: null,
    //   precautions: [],
    //   aggression: false,
    //   elopement: false,
    //   fall: false,
    //   homocide: false,
    //   programSeparately: false,
    //   seizure: false,
    //   selfMutilation: false,
    //   withdrawal: false
    // })
    document.getElementById('patient-info-form').reset();
    console.log(this.state);
  }

  buildPrecautions = () => {
    // Compiles the precautions from the check boxes into a list
    let precautions = []
    if(this.state.aggression===true){
      precautions.push('Aggression');
    }
    if(this.state.elopement===true){
      precautions.push('Elopement');
    }
    if(this.state.fall===true){
      precautions.push('Fall');
    }
    if(this.state.homocide===true){
      precautions.push('Homocide');
    }
    if(this.state.programSeparately===true){
      precautions.push('Program Separately');
    }
    if(this.state.seizure===true){
      precautions.push('Seizure');
    }
    if(this.state.selfMutilation===true){
      precautions.push('Self-Mutilation');
    }
    if(this.state.withdrawal===true){
      precautions.push('Withdrawal');
    }
    return precautions
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
  
  handleAggression(event) {
    // Updates the aggression with the info from the form
    this.setState({ aggression: event.target.checked });
  }
  
  handleElopement(event) {
    // Updates elopement with the info from the form
    this.setState({ elopement: event.target.checked });
  }
  
  handleFall(event) {
    // Updates fall with the info from the form
    this.setState({ fall: event.target.checked });
  }
  
  handleHomocide(event) {
    // Updates homocide with the info from the form
    this.setState({ homocide: event.target.checked });
  }
  
  handleProgramSeparately(event) {
    // Updates program separately with the info from the form
    this.setState({ programSeparately: event.target.checked });
  }
  
  handleRespiratory(event) {
    // Updates respiratory with the info from the form
    this.setState({ respiratory: event.target.checked });
  }
  
  handleSeizure(event) {
    // Updates seizure with the info from the form
    this.setState({ seizure: event.target.checked });
  }
  
  handleSelfMutilation(event) {
    // Updates self mutilation with the info from the form
    this.setState({ selfMutilation: event.target.checked });
  }
  
  handleWithdrawal(event) {
    // Updates withdrawal with the info from the form
    this.setState({ withdrawal: event.target.checked });
  }



  render() {
    return (
      <div className="AddPatient">
        <h2>Add a Patient</h2>
        <hr/>
        <h4>Add a patient and define their crisis plan</h4>
        <div className='add-patient-form'>
          <h3>Patient Info</h3>
          <form id='patient-info-form'>
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
            <FormGroup>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <ControlLabel>Precautions</ControlLabel>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleAggression}
                    check={this.state.aggression}
                  >Aggression</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleElopement}
                    check={this.state.elopement}
                  >Elopement</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleHomocide}
                    check={this.state.homocide}
                  >Homocide</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleProgramSeparately}
                    check={this.state.programSeparately}
                  >Program Separately</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleRespiratory}
                    check={this.state.respiratory}
                  >Respiratory</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleSeizure}
                    check={this.state.seizure}
                  >Seizure</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleSelfMutilation}
                    check={this.state.selfMutilation}
                  >Self-Mutilation</Checkbox>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    onClick={this.handleWithdrawal}
                    check={this.state.withdrawal}
                  >Withdrawal</Checkbox>
                </Col>
            </FormGroup>

              <Col xs={12} sm={12} md={12} lg={12}>
                <Button
                  className='patient-form-button'
                >Submit</Button>
                <Button
                  className='patient-form-button'
                  onClick={()=>this.clearHandler()}
                >Clear</Button>
              </Col>
          </form>
        </div>

      </div>
    );
  }
}

export default withRouter(AddPatient);
