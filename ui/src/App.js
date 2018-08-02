import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    if(view==='home' || view==='patient-records'){
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

  renderPopoutMenu = () => {
    // Builds the pop out navigation menu
    let menuContent = (
      <div className="MenuContent">
        <h3>Menu</h3>
        <hr/>
        <Link 
          to="/"
          onClick={()=>this.viewChangeHandler('home')}
        >Home</Link><br/>
        <Link 
          to="/patient-records"
          onClick={()=>this.viewChangeHandler('patient-records')}
        >Patient Records</Link><br/>
        <Link 
          to="/trends"
          onClick={()=>this.viewChangeHandler('trends')}
        >Trends</Link><br/>
      </div>
    );
    
    return (
      <div ref={ref => this.el = ref}>
        <SlidingPane
          width='300px'
          isOpen={ this.state.isPaneOpen }
          onRequestClose={() => this.closeMenuHandler()}>
          {menuContent}
        </SlidingPane>
      </div>
    );
  }

  render() {
    let menu = this.renderPopoutMenu();

    // Builds the home screen with recently viewed patients
    const home = () => {
      return(
        <div>
          <Home 
            selectPatient={(patientId) => this.selectPatientHandler(patientId)}
            userId={this.state.userId} />
        </div>
      );
    }

    // Builds the patient records screen
    const patientRecords = () => {
      return (
        <div>
          <PatientRecords 
            selectPatient={(patientId) => this.selectPatientHandler(patientId)}
            userId={this.state.userId} />
        </div>
      );
    }

    // Builds the screen with graphs and analytics
    const trends = () => {
      return(
        <div>
          <Trends userId={this.state.userId} />
        </div>
      )
    }

    // Builds an individual patient's record
    let patientRecord = () => {
      return(
        <div>
        <PatientRecord
            patientId={this.state.currentPatient}
            userId={this.state.userId}
            exit={()=>this.exitHandler()} />
        </div>
      );
    }

    return (
      <div className="App">
        <Header clickMenu={()=>this.openMenuHandler()} />
        <Router>
          <div>
            {menu}
            <Route exact path="/" component={home} />
            <Route path="/patient-records" component={patientRecords} />
            <Route path="/patient" component={patientRecord} />
            <Route path="/trends" component={trends} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
