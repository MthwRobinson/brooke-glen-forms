import React, { Component } from 'react';

import { 
  Button, 
  ControlLabel, 
  Col, 
  FormControl, 
  FormGroup, 
  Row 
} from 'react-bootstrap';

import './PatientRecords.css';

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

  render() {
    return (
      <div className="PatientRecords">
        <Row>
            <h2>Patient Records</h2><hr/>
            <h4>Search for, filter and access patient records.</h4><br/>
        </Row>
        <Row className='filter-form'>
          <form>
            <Col xs={3} sm={3} md={3} lg={3}>
              <FormGroup controlId="formControlsSelect">
              <ControlLabel>Unit</ControlLabel>
              <FormControl componentClass="select" placeholder="longTerm">
              <option value="longTerm">Long Term Care</option>
              <option value="shortTerm">Short Term Care</option>
              </FormControl>
            </FormGroup>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <FormGroup controlId="formControlsSelect">
              <ControlLabel>Observation Level</ControlLabel>
              <FormControl componentClass="select" placeholder="Q15">
              <option value="Q15">Q15</option>
              <option value="1on1">1:1</option>
              <option value="CPAP">CPAP</option>
              </FormControl>
            </FormGroup>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <Button className='submit-button' type="submit">Submit</Button>
            </Col>
          </form>
        </Row>


      </div>
    );
  }
}

export default PatientRecords;
