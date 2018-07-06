import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Header from './components/Header/Header';
import MenuContent from './components/MenuContent/MenuContent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: false,
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


  render() {
    let menu = (
      <div ref={ref => this.el = ref}>
        <SlidingPane
          width='300px'
          isOpen={ this.state.isPaneOpen }
          onRequestClose={() => this.closeMenuHandler()}>
          <MenuContent />
        </SlidingPane>
      </div>

    );

    return (
      <div className="App">
        <Header clickMenu={()=>this.openMenuHandler()}/>
        {menu}
      </div>
    );
  }
}

export default App;
