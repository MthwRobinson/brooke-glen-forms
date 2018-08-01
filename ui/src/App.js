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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      view: 'home',
      lastView: 'home',
      currentPatient: null,
      userId: 'eileen'
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

  selectPatientHandler = (patientId) => {
    this.setState({
      view: 'patientRecord',
      currentPatient: patientId
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
      body = <Home selectPatient={
                (patientId) => this.selectPatientHandler(patientId)
                }
                userId={this.state.userId}

            />
    } else if(this.state.view==='patientRecords'){
      body = <PatientRecords selectPatient={
                (patientId) => this.selectPatientHandler(patientId)
                }
                userId={this.state.userId}
            />
    } else if(this.state.view==='trends'){
      body = <Trends userId={this.state.userId} />
    } else if(this.state.view==='patientRecord'){
      body = <PatientRecord
              patientId={this.state.currentPatient}
              userId={this.state.userId}
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
