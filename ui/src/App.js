import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MenuContent from './components/MenuContent/MenuContent';
import PatientRecord from './components/PatientRecord/PatientRecord';
import PatientRecords from './components/PatientRecords/PatientRecords';
import Trends from './components/Trends/Trends';

const PATIENTS = require('./data/dummyPatients.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      view: 'home',
      lastView: 'home',
      currentPatient: {
        name: PATIENTS[0].name,
        updated: PATIENTS[0].updated,
        unit: PATIENTS[0].unit,
        obsLevel: PATIENTS[0].obsLevel,
        precautions: PATIENTS[0].precautions
      }
    };
  }
  
  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  openMenuHandler = () => {
    this.setState({ isPaneOpen: true });
  }
  
  closeMenuHandler = () => {
    this.setState({ isPaneOpen: false });
  }

  viewChangeHandler = (view) => {
    this.setState({ view: view });
    if(view==='home' || view==='patientRecords'){
      this.setState({ lastView: view });
    }
    this.closeMenuHandler();
  }

  selectPatientHandler = (name, updated, unit, obsLevel, precautions) => {
    this.setState({
      view: 'patientRecord',
      currentPatient: {
        name: name,
        updated: updated,
        unit: unit,
        obsLevel: obsLevel,
        precautions: precautions
      }
    })
  }

  exitHandler = () => {
    this.setState({ view: this.state.lastView });
  }

  render() {
    let menu = (
      <div ref={ref => this.el = ref}>
        <SlidingPane
          width='300px'
          isOpen={ this.state.isPaneOpen }
          onRequestClose={() => this.closeMenuHandler()}>
          <MenuContent changeView={(view)=>this.viewChangeHandler(view)}/>
        </SlidingPane>
      </div>

    );

    let body = null;
    if(this.state.view==='home'){
      body = <Home 
              selectPatient={
                (name, updated, unit, obsLevel, precautions) => 
                this.selectPatientHandler(name, updated, unit, obsLevel, precautions)
              }
            />
    } else if(this.state.view==='patientRecords'){
      body = <PatientRecords
              selectPatient={
                (name, updated, unit, obsLevel, precautions) => 
                this.selectPatientHandler(name, updated, unit, obsLevel, precautions)
              }
            />
    } else if(this.state.view==='trends'){
      body = <Trends />
    } else if(this.state.view==='patientRecord'){
      body = <PatientRecord 
              name={this.state.currentPatient.name}
              updated={this.state.currentPatient.updated}
              unit={this.state.currentPatient.unit}
              obsLevel={this.state.currentPatient.obsLevel}
              precautions={this.state.currentPatient.precautions}
              exit={()=>this.exitHandler()}
            />
    }

    return (
      <div className="App">
        <Header clickMenu={()=>this.openMenuHandler()}/>
        {body}
        {menu}
      </div>
    );
  }
}

export default App;
