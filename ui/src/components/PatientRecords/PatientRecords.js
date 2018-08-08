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
      patients: []
    }

    this.handleUnit = this.handleUnit.bind(this);
    this.handleObservation = this.handleObservation.bind(this);
    this.handlePrecautions = this.handlePrecautions.bind(this);
  }

  componentDidMount(){
    // Either make a service call or used cached data
    if(this.props.cache){
      this.setState({patients: this.props.cache});
    } else{
      axios.get('/service/patients')
        .then(res => {
          const patients = res.data;
          this.setState({patients: patients});
          this.props.setCache(patients);
        })
    }
  }

  handleUnit(event) {
    this.setState({unit: event.target.value});
  }
  
  handleObservation(event) {
    this.setState({obsLevel: event.target.value});
  }

  handlePrecautions(event) {
    this.setState({precaution: event.target.value});
  }

  clearFilter = () => {
    // Clears the filter settings
    this.setState({
      unit: 'All',
      obsLevel: 'All',
      precaution: 'Any',
      patients: []
    })
  }

  handleFilter = () => {
    // Filter patients based on the selected settings
    let patients = [];

    for(var i=0; i<this.state.patients.length; i++){
      let patient = this.state.patients[i];
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
    this.setState({patients: patients});
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
            </tr>
          </thead>
          <tbody>
            {this.state.patients.map((patient, index) => {
              return(
              <tr className='table-row' key={index} 
                onClick={()=>this.props.selectPatient(patient.patient_id)}>
                <th>{patient.name}</th>
                <th>{patient.updated_date}</th>
                <th>{patient.unit}</th>
                <th>{patient.obs_level}</th>
                <th>{patient.precautions.join(', ')}</th>
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
            <h2>Patient Records</h2><hr/>
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
