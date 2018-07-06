import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import './Home.css';

import PatientCard from './../PatientCard/PatientCard';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Grid fluid>
          <Row>
            <h2>Welcome back, Eileen!</h2>
            <hr/>
            <h4>Your recently viewed patients</h4>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
