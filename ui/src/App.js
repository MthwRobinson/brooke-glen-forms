import React, { Component } from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import Header from './components/Header/Header';


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
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          width='400px'
          isOpen={ this.state.isPaneOpen }
          title='Hey, it is optional pane title.  I can be React component too.'
          subtitle='Optional subtitle.'
          onRequestClose={ () => {
          this.setState({ isPaneOpen: false });
        } }>
          <div>And I am pane content. BTW, what rocks?</div>
          <br />
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
