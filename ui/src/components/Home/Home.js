import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import axios from 'axios';

import './Home.css';
import PatientCard from './../PatientCard/PatientCard';

const patients = require('./../../data/dummyPatients.json');

class Home extends Component {
  state = {
    patients: []
  }

  componentDidMount(){
    axios.get('/service/patients')
      .then(res => {
        const patients = res.data;
        this.setState({patients: patients });
      })

  }

  renderCard(){
    return(
      <div>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <PatientCard 
              name={this.state.patients[0].name}
              updated={this.state.patients[0].updated_date}
              unit={this.state.patients[0].unit}
              obsLevel={this.state.patients[0].obs_level}
              precautions={this.state.patients[0].precautions}
              click={()=>this.props.selectPatient(
                this.state.patients[0].name,
                this.state.patients[0].updated_date,
                this.state.patients[0].unit,
                this.state.patients[0].obs_level,
                this.state.patients[0].precautions
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderCards(i,j){
    return(
      <div>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <PatientCard 
              name={this.state.patients[i].name}
              updated={this.state.patients[i].updated_date}
              unit={this.state.patients[i].unit}
              obsLevel={this.state.patients[i].obs_level}
              precautions={this.state.patients[i].precautions}
              click={()=>this.props.selectPatient(
                this.state.patients[i].name,
                this.state.patients[i].updated_date,
                this.state.patients[i].unit,
                this.state.patients[i].obs_level,
                this.state.patients[i].precautions
              )}
            />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <PatientCard 
              name={this.state.patients[j].name}
              updated={this.state.patients[j].updated_date}
              unit={this.state.patients[j].unit}
              obsLevel={this.state.patients[j].obs_level}
              precautions={this.state.patients[j].precautions}
              click={()=>this.props.selectPatient(
                this.state.patients[j].name,
                this.state.patients[j].updated_date,
                this.state.patients[j].unit,
                this.state.patients[j].obs_level,
                this.state.patients[j].precautions
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    let firstRow = null;
    if(this.state.patients.length>=2){
      firstRow = this.renderCards(0,1);
    } else if (this.state.patients.length===1){
      firstRow = this.renderCard();
    }
    let secondRow = null;
    if(this.state.patients.length>=4){
      secondRow = this.renderCards(2,3);
    }
    let thirdRow = null;
    if(this.state.patients.length>=6){
      thirdRow = this.renderCards(3,4);
    }

    return (
      <div className="Home">
        <Grid fluid>
          <Row>
            <h2>Welcome back, Eileen!</h2>
            <hr/>
            <h4>Your recently viewed patients</h4>
          </Row>
          {firstRow}
          {secondRow}
          {thirdRow}
        </Grid>
      </div>
    );
  }
}

export default Home;
