import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import './Home.css';
import PatientCard from './../PatientCard/PatientCard';

const PATIENTS = require('./../../data/dummyPatients.json');

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
              <PatientCard 
                name={PATIENTS[0].name}
                updated={PATIENTS[0].updated}
                unit={PATIENTS[0].unit}
                obsLevel={PATIENTS[0].obsLevel}
                precautions={PATIENTS[0].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[0].name,
                  PATIENTS[0].updated,
                  PATIENTS[0].unit,
                  PATIENTS[0].obsLevel,
                  PATIENTS[0].precautions
                )}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard 
                name={PATIENTS[1].name}
                updated={PATIENTS[1].updated}
                unit={PATIENTS[1].unit}
                obsLevel={PATIENTS[1].obsLevel}
                precautions={PATIENTS[1].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[1].name,
                  PATIENTS[1].updated,
                  PATIENTS[1].unit,
                  PATIENTS[1].obsLevel,
                  PATIENTS[1].precautions
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard 
                name={PATIENTS[2].name}
                updated={PATIENTS[2].updated}
                unit={PATIENTS[2].unit}
                obsLevel={PATIENTS[2].obsLevel}
                precautions={PATIENTS[2].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[2].name,
                  PATIENTS[2].updated,
                  PATIENTS[2].unit,
                  PATIENTS[2].obsLevel,
                  PATIENTS[2].precautions
                )}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard 
                name={PATIENTS[3].name}
                updated={PATIENTS[3].updated}
                unit={PATIENTS[3].unit}
                obsLevel={PATIENTS[3].obsLevel}
                precautions={PATIENTS[3].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[3].name,
                  PATIENTS[3].updated,
                  PATIENTS[3].unit,
                  PATIENTS[3].obsLevel,
                  PATIENTS[3].precautions
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard 
                name={PATIENTS[4].name}
                updated={PATIENTS[4].updated}
                unit={PATIENTS[4].unit}
                obsLevel={PATIENTS[4].obsLevel}
                precautions={PATIENTS[4].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[4].name,
                  PATIENTS[4].updated,
                  PATIENTS[4].unit,
                  PATIENTS[4].obsLevel,
                  PATIENTS[4].precautions
                )}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PatientCard 
                name={PATIENTS[5].name}
                updated={PATIENTS[5].updated}
                unit={PATIENTS[5].unit}
                obsLevel={PATIENTS[5].obsLevel}
                precautions={PATIENTS[5].precautions}
                click={()=>this.props.selectPatient(
                  PATIENTS[5].name,
                  PATIENTS[5].updated,
                  PATIENTS[5].unit,
                  PATIENTS[5].obsLevel,
                  PATIENTS[5].precautions
                )}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
