import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import './CrisisPlan.css';

class CrisisPlan extends Component {
  render() {
    return (
      <div className="CrisisPlan">
        <h3>
          Crisis Plan
          <i className='fa fa-edit pull-right edit-button'></i>
        </h3>
        <hr/>
        
        <Row>
          <Col xs={11} sm={11} md={11} lg={11}>
            <b>Are there medical conditions that may be contraindicated to restraint?</b>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            No
          </Col>
        </Row>
        <Row>
          <Col xs={11} sm={11} md={11} lg={11}>
            <b>Is there a history of physical or sexual abuse?</b>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            No
          </Col>
        </Row>

        <h3>Warning signs that I'm upset</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Sweating</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Pacing</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Breathing hard</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Biting my nails</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Isolating/ staying in my room</b>
          </Col>
        </Row>

        <h3>Situations that trigger me</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Loneliness</b>
          </Col>
        </Row>
        
        <h3>Things that don't help / make me worse</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Being Along</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Humor</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Teasing</b>
          </Col>
        </Row>
        
        <h3>Internal Coping Strategies</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Time alone in my room</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Reading</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Lying down with a cold face cloth</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Covering shoulders with a blanket</b>
          </Col>
        </Row>
        
        <h3>Distraction and Active Coping Strategies</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Drawing/coloring</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Having a healthy snack</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Working with clay</b>
          </Col>
        </Row>
        
        <h3>Support from Others</h3><hr/>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Sitting by nurses' station</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Holding a stuffed animal or pillow</b>
          </Col>
        </Row>

      </div>
    );
  }
}

export default CrisisPlan;
