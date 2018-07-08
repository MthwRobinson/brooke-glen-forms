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
import PatientRecords from './components/PatientRecords/PatientRecords';
import Trends from './components/Trends/Trends';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
      view: 'home'
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
      body = <Home />
    } else if(this.state.view==='patientRecords'){
      body = <PatientRecords />
    } else if(this.state.view==='trends'){
      body = <Trends />
    }

    return (
      <div className="App">
        <Header clickMenu={()=>this.openMenuHandler()}/>
        {menu}
        {body}
      </div>
    );
  }
}

export default App;
