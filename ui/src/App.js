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
import PatientRecord from './components/PatientRecord/PatientRecord';
import PatientRecords from './components/PatientRecords/PatientRecords';
import Trends from './components/Trends/Trends';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      view: null,
      lastView: null,
      currentPatient: null,
      userId: 'eileen',
      cache: null
    };
  }
  
  componentDidMount() {
    console.log(window.location);
    if(window.location.pathname==='/patient-records'){
      this.setState({ 
        view: 'patient-records',
        lastView: 'patient-records'
      });
    } else if (window.location.pathname==='/trends'){
      this.setState({ 
        view: 'trends',
        lastView: 'trends'
      });
    } else {
      this.setState({ 
        view: 'home',
        lastView: 'home'
      });
      
    }
    Modal.setAppElement(this.el);
  }

  // Methods for operating the sliding menu

  openMenuHandler = () => {
    // Opens the menu
    this.setState({ isPaneOpen: true });
  }
  
  closeMenuHandler = () => {
    // Closes the menu
    this.setState({ isPaneOpen: false });
  }

  viewChangeHandler = (view) => {
    // Changes the current screen for the app
    this.setState({ view: view });
    if(view==='home' || view==='patient-records'){
      this.setState({ 
        lastView: view,
        cache: null
      });
    }
    this.closeMenuHandler();
    this.setCacheHandler(null);
  }

  selectPatientHandler = (patientId) => {
    // Selects a patient for display in the app
    this.setState({
      view: 'patientRecord',
      currentPatient: patientId
    })
  }

  exitHandler = () => {
    // Exits the screen in the patient component
    this.setState({ view: this.state.lastView });
    this.setCacheHandler(null);
  }

  setCacheHandler = (cache) => {
    // Resets the state when the view changes
    this.setState({ cache: cache});
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
      let body = null;
      if(this.state.view==='home'){
        body = (
          <Home 
            selectPatient={(patientId) => this.selectPatientHandler(patientId)}
            userId={this.state.userId} 
            cache={this.state.cache}
            setCache={(cache) => this.setCacheHandler(cache)}
          />
        )
      }
      return(
        <div>
          {body}
        </div>
      );
    }

    // Builds the patient records screen
    const patientRecords = () => {
      let body = null;
      if(this.state.view==='patient-records'){
          body = (
            <PatientRecords 
              selectPatient={(patientId) => this.selectPatientHandler(patientId)}
              userId={this.state.userId} 
              cache={this.state.cache}
              setCache={(cache) => this.setCacheHandler(cache)}
            />
          )
      }
      return (
        <div>
          {body}
        </div>
      );
    }

    // Builds the screen with graphs and analytics
    const trends = () => {
      let body = null;
      if(this.state.view==='trends'){
        body = (
            <Trends 
                userId={this.state.userId}
                cache={this.state.cache}
                setCache={(cache) => this.setCacheHandler(cache)}
            />
          )
      }
      return(
        <div>
          {body}
        </div>
      )
    }

    // Builds an individual patient's record
    let patientRecord = null;
    if(this.state.view==='patientRecord'){
      patientRecord = (
          <div>
          <PatientRecord
              patientId={this.state.currentPatient}
              userId={this.state.userId}
              exit={()=>this.exitHandler()} 
              cache={this.state.cache}
              setCache={(cache) => this.setCacheHandler(cache)}
          />
          </div>
        );
    }

    console.log(this.props);

    return (
      <div className="App">
        <Header clickMenu={()=>this.openMenuHandler()} />
        <Router>
          <div>
            {menu}
            <Route exact path="/" component={home} />
            <Route path="/patient-records" component={patientRecords} />
            <Route path="/trends" component={trends} />
          </div>
        </Router>
        {patientRecord}
      </div>
    );
  }
}

export default App;
