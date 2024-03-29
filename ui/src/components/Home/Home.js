import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import PatientCard from './../PatientCard/PatientCard';

class Home extends Component {
  state = {
    patients: []
  }

  componentDidMount(){
    // Either makes a service call or sets patients using
    //  cached data when the component is rendered
    if(this.props.cache){
      this.setState({patients: this.props.cache});
    } else{
      const route = '/service/patient_views/' + this.props.userId;
      axios.get(route)
        .then(res => {
          const patients = res.data;
          this.setState({patients: patients });
          this.props.setCache(patients);
        })
    }
  }

  selectPatient = (patientID) => {
    // Updates the URL and selects the patient
    this.props.setCache(null);
    this.props.history.push('/patient-record/'+patientID);
    this.props.selectPatient(patientID);
  }

  renderCards = (i,j) => {
    // Renders the cards in the row screen
    // If there is only one card in the row,
    //  then the second column will be blank
    let firstCard = (
      <div>
          <Col xs={6} sm={6} md={6} lg={6}>
            <PatientCard 
              name={this.state.patients[i].name}
              updated={this.state.patients[i].updated_date}
              unit={this.state.patients[i].unit}
              obsLevel={this.state.patients[i].obs_level}
              precautions={this.state.patients[i].precautions}
              click={() => this.selectPatient(this.state.patients[i].patient_id)}
            />
          </Col>
      </div>
    )

    let secondCard = null;
    if(this.state.patients.length>=i+2){
      secondCard = (
        <div>
          <Col xs={6} sm={6} md={6} lg={6}>
            <PatientCard 
              name={this.state.patients[j].name}
              updated={this.state.patients[j].updated_date}
              unit={this.state.patients[j].unit}
              obsLevel={this.state.patients[j].obs_level}
              precautions={this.state.patients[j].precautions}
              click={() => this.selectPatient(this.state.patients[j].patient_id)}
            />
          </Col>
        </div>
      )
    }

    return(
      <div>
        <Row>
          {firstCard}
          {secondCard}
        </Row>
      </div>
    );
  }

  renderAllCards = () => {
    // Populate the cards in the home screen
    // The fourth row will only appear when
    //  the screen is rotate long-ways
    let firstRow = null;
    if(this.state.patients.length>=1){
      firstRow = this.renderCards(0,1);
    } 
    let secondRow = null;
    if(this.state.patients.length>=3){
      secondRow = this.renderCards(2,3);
    }
    let thirdRow = null;
    if(this.state.patients.length>=5){
      thirdRow = this.renderCards(4,5);
    }
    let fourthRow = null;
    if(this.state.patients.length>=7){
      fourthRow = this.renderCards(6,7);
    }

    return(
      <div>
        {firstRow}
        {secondRow}
        {thirdRow}
        <div className='hidden-md hidden-lg'>
          {fourthRow}
        </div>
      </div>
    )
  }

  renderHeader = () => {
    // Only display welcome back if a user has
    //  already view a patient
    let header = null;
    if(this.state.patients.length>=1){
      header = (
        <div>
          <h2>Welcome back, Eileen!</h2>
          <hr/>
          <h4>Your recently viewed patients</h4>
        </div>
      );
    } else {
      header = (
        <div>
          <h2>Welcome, Eileen!</h2>
          <hr/>
          <h4>Select a patient from the patient records screen to begin.</h4>
        </div>
      );
    }
    return header;
  }

  render() {
    let header = null;
    header = this.renderHeader();

    let cards = null;
    cards = this.renderAllCards();

    return (
      <div className="Home">
        <Grid fluid>
          <Row>
            {header}
          </Row>
          {cards}
        </Grid>
      </div>
    );
  }
}

export default withRouter(Home);
