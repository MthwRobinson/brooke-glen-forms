import React, { Component } from 'react';
import { 
  Button, 
  ControlLabel, 
  Col, 
  FormControl, 
  FormGroup,
  Table,
  Row 
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './PatientRecords.css';

class PatientRecords extends Component {
  constructor(props){
    super(props);
    this.state = {
      unit: 'All',
      obsLevel: 'All',
      precaution: 'Any',
      patients: [],
      allPatients: []
    }

    // Bindings for the filter settings
    this.handleUnit = this.handleUnit.bind(this);
    this.handleObservation = this.handleObservation.bind(this);
    this.handlePrecautions = this.handlePrecautions.bind(this);
  }

  componentDidMount(){
    // Either make a service call or used cached data
    if(this.props.cache){
      this.setState({
        allPatients: this.props.cache.allPatients,
        patients: this.props.cache.patients,
        unit: this.props.cache.unit,
        obsLevel: this.props.cache.obsLevel,
        precaution: this.props.cache.precaution
      });
    } else{
      axios.get('/service/patients')
        .then(res => {
          const patients = res.data;
          this.setState({
            allPatients: patients,
            patients: patients
          });
          this.props.setCache({
            allPatients: patients,
            patients: patients,
            unit: 'All',
            obsLevel: 'All',
            precaution: 'Any'
          });
        })
    }
  }

  handleUnit(event) {
    // Update the state and the cache
    this.setState({unit: event.target.value});
    this.props.cache.unit = event.target.value;
  }
  
  handleObservation(event) {
    // Update the state and the cache
    this.setState({obsLevel: event.target.value});
    this.props.cache.obsLevel = event.target.value;
  }

  handlePrecautions(event) {
    // Update the state and the cache
    this.setState({precaution: event.target.value});
    this.props.cache.precaution = event.target.value;
  }

  selectPatient = (patientID) => {
    // Updates the URL and selects the patient
    this.props.setCache(null);
    this.props.history.push('/patient-record/' + patientID);
    this.props.selectPatient(patientID);
  }

  addPatientHandler = () => {
    // Switches to the add patient screen
    this.props.setCache(null);
    this.props.setView('add-patient');
    this.props.history.push('add-patient');
  }

  deletePatientHandler = (patientId) => {
    // Flips a patients active flag to false in the db
    axios.delete('/service/patient/'+patientId)
      .then(res => {
        // Remove the patient from the state
        const patients = [...this.state.patients];
        let updatedPatients = [];
        for(var i=0; i<patients.length; i++){
          const patient = patients[i];
          if(patient.patient_id != patientId){
            updatedPatients.push(patient)
          }
        }

        // Remove the patient from the all patients list
        let allPatients = [...this.state.allPatients];
        let updatedAllPatients = [];
        for(var i=0; i<allPatients.length; i++){
          const patient = allPatients[i];
          if(patient.patient_id != patientId){
            updatedAllPatients.push(patient)
          }
        }

        // Update the state and the cache
        this.setState({
          allPatients: updatedAllPatients,
          patients: updatedPatients
        });
        this.props.setCache({
          allPatients: updatedAllPatients,
          patients: updatedPatients,
          unit: this.state.unit,
          obsLevel: this.state.obsLevel,
          precaution: this.state.precaution
        });
      })


  }

  clearFilter = () => {
    // Clears the filter settings
    this.setState({
      unit: 'All',
      obsLevel: 'All',
      precaution: 'Any',
      patients: this.state.allPatients
    })
  }

  handleFilter = () => {
    // Filter patients based on the selected settings
    let patients = [];

    for(var i=0; i<this.state.allPatients.length; i++){
      let patient = this.state.allPatients[i];
      let keepPatient = true;
      // Filter on Unit
      if(this.state.unit !== 'All'){
        if(patient.unit !== this.state.unit){
          keepPatient = false;
        }
      }

      // Filter on Observation level
      if(this.state.obsLevel !== 'All'){
        if(patient.obsLevel !== this.state.obsLevel){
          keepPatient = false;
        }
      }

      //Filter on precautions
      if(this.state.precaution !== 'Any'){
        if(!patient.precautions.includes(this.state.precaution)){
          keepPatient = false;
        }
      }

      if(keepPatient){
        patients.push(patient);
      }
    }

    // Update the state and the cache
    this.setState({patients: patients});
    this.props.setCache({
      allPatients: this.state.allPatients,
      patients: patients,
      unit: this.state.unit,
      obsLevel: this.state.obsLevel,
      precaution: this.state.precaution
    });

  }

  renderTable = () => {
    // Created the table with the patient information
    return(
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Updated</th>
              <th>Unit</th>
              <th>Obs. Level</th>
              <th>Precautions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.patients.map((patient, index) => {
              return(
                <tr className='table-row' key={index}>
                <th
                  onClick={()=>this.selectPatient(patient.patient_id)}
                >{patient.name}</th>
                <th
                  onClick={()=>this.selectPatient(patient.patient_id)}
                >{patient.updated_date}</th>
                <th
                  onClick={()=>this.selectPatient(patient.patient_id)}
                >{patient.unit}</th>
                <th
                  onClick={()=>this.selectPatient(patient.patient_id)}
                >{patient.obs_level}</th>
                <th
                  onClick={()=>this.selectPatient(patient.patient_id)}
                >{patient.precautions.join(', ')}</th>
                <th><Button 
                      bsSize='small' 
                      bsStyle='danger'
                      onClick={
                        () => this.deletePatientHandler(patient.patient_id)
                      }
                    >Delete</Button>
                </th>
              </tr>
              )
                
            })}

          </tbody>
        </Table>
        </div>
      );
  }

  renderFilters = () => {
    // Renders the filters
    return(
      <div>
        <form>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Unit</ControlLabel>
              <FormControl 
                componentClass="select"
                value={this.state.unit}
                onChange={this.handleUnit}
              >
                <option value="All">All</option>
                <option value="Long Term Care">Long Term Care</option>
                <option value="Short Term Care">Short Term Care</option>
              </FormControl>
          </FormGroup>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Observation Level</ControlLabel>
              <FormControl 
                componentClass="select"
                value={this.state.obsLevel}
                onChange={this.handleObservation}
              >
                <option value="All">All</option>
                <option value="Q15">Q15</option>
                <option value="1:1">1:1</option>
                <option value="CPAP">CPAP</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Precautions</ControlLabel>
              <FormControl 
                componentClass="select"
                value={this.state.precaution}
                onChange={this.handlePrecautions}
              >
                <option value="Any">Any</option>
                <option value="Aggression">Aggression</option>
                <option value="Fall">Fall</option>
                <option value="Respiratory">Respiratory</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Button 
              className='submit-button' 
              onClick={()=>this.handleFilter()}
            >Filter</Button>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Button 
              className='submit-button' 
              onClick={()=>this.clearFilter()}
            >Clear</Button>
          </Col>
        </form>
      </div>
    );
  }

  render() {
    let filters = this.renderFilters();
    let table = this.renderTable();

    return (
      <div className="PatientRecords">
        <Row>
          <h2>
            <i 
              className='fa fa-plus pull-right add-patient-button'
              onClick={() => this.addPatientHandler()}
            ></i>
            Patient Records</h2><hr/>
          <h4>Search for, filter and access patient records.</h4><br/>
        </Row>
        <Row className='filter-form'>
          {filters}
        </Row>
        <Row className='patient-table'>
          {table}
        </Row>
      </div>
    );
  }
}

export default withRouter(PatientRecords);
