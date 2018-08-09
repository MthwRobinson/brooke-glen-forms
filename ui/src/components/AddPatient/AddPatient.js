import React, { Component } from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './AddPatient.css';

class AddPatient extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: null
    }

    // Bindings for info from the forms
    this.handleFirstName = this.handleFirstName.bind(this);
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

  render() {
    return (
      <div className="AddPatient">
        <h2>Add a patient</h2>
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
          </form>
        </div>

      </div>
    );
  }
}

export default withRouter(AddPatient);
