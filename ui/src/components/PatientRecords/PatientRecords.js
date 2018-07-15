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

import './PatientRecords.css';

const PATIENTS = require('./../../data/dummyPatients.json');

class PatientRecords extends Component {
  constructor(props){
    super(props);
    this.state = {
      unit: 'Unit 1',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('submitted');
  }

  handleChange(event) {
    this.setState({unit: event.target.value});
  }

  renderTable = () => {
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
            {PATIENTS.map((patient, index) => {
              return(
              <tr key={index} onClick={()=>this.props.selectPatient(
                patient.name,
                patient.updated,
                patient.unit,
                patient.obsLevel,
                patient.precautions
              )}>
                <th>{patient.name}</th>
                <th>{patient.updated}</th>
                <th>{patient.unit}</th>
                <th>{patient.obsLevel}</th>
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
    return(
      <div>
        <form>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Unit</ControlLabel>
              <FormControl componentClass="select" placeholder="all">
                <option value="all">All</option>
                <option value="longTerm">Long Term Care</option>
                <option value="shortTerm">Short Term Care</option>
              </FormControl>
          </FormGroup>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Observation Level</ControlLabel>
              <FormControl componentClass="select" placeholder="Q15">
                <option value="all">All</option>
                <option value="Q15">Q15</option>
                <option value="1on1">1:1</option>
                <option value="CPAP">CPAP</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Precautions</ControlLabel>
              <FormControl componentClass="select" placeholder="any">
                <option value="any">Any</option>
                <option value="Q15">Aggression</option>
                <option value="1on1">Fall</option>
                <option value="CPAP">Respiratory</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <Button className='submit-button' type="submit">Filter</Button>
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

export default PatientRecords;
