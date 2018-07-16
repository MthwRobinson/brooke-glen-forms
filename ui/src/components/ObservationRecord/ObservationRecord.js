import React, { Component } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';

import './ObservationRecord.css';

class ObservationRecord extends Component {
  render() {
    return (
      <div className="ObservationRecord">
        <h3 className='record-heading'>
          <i className='fa fa-chevron-left pull-left arrow-button'></i>
          Observation Record 7/16/2018
          <i className='fa fa-chevron-right pull-right arrow-button'></i>
        </h3> 
        <hr/>
        <Row>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>RN Review</b>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>7-3 PM</b>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>3-11 PM</b>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>11-7 AM</b>
          </Col>
        </Row>
        <Row>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>1st Review</b>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <i className='fa fa-check-circle good-icon'></i>
            [MWR|2:43 PM]
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <i className='fa fa-check-circle good-icon'></i>
            [EUR|10:26 PM]
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <i className='fa fa-check-circle good-icon'></i>
            [LTU|6:32 AM]
          </Col>
        </Row>
        <Row>
          <Col xs={3} sm={3} md={3} lg={3}>
            <b>1st Review</b>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <i className='fa fa-check-circle good-icon'></i>
            [EUR|2:49 PM]
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <i className='fa fa-exclamation-triangle warning-icon'></i>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Button bsSize='xsmall' className='certify-button'>Certify</Button>
          </Col>
        </Row>

        <Table responsive hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Activity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>07:01</td>
              <td>Patient Room</td>
              <td>Agitated</td>
              <td>Patient was very agitated</td>
            </tr>
            <tr>
              <td>10:43</td>
              <td>Cafeteria</td>
              <td>Disputive</td>
              <td>Patient threw food</td>
            </tr>
            <tr>
              <td>13:55</td>
              <td>Hallway</td>
              <td>Pacing</td>
              <td>Patient paced around the hallway</td>
            </tr>
            <tr>
              <td>17:15</td>
              <td>School</td>
              <td>Socializing</td>
              <td>Patient socialized very well</td>
            </tr>
            <tr>
              <td>18:12</td>
              <td>Gym</td>
              <td>Crying</td>
              <td>Patient cried during workout</td>
            </tr>
            <tr>
              <td>20:22</td>
              <td>w/ Visitors</td>
              <td>Socializing</td>
              <td>Patient visited with family</td>
            </tr>
            <tr>
              <td>21:31</td>
              <td>Patient Room</td>
              <td>Asleep/Eyes closed</td>
              <td>Patient fell asleep</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ObservationRecord;
