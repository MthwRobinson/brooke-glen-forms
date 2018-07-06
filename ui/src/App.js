import React, { Component } from 'react';
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
      isPaneOpenLeft: false
    };
  }

  render() {
    let menu = (
      <div ref={ref => this.el = ref}>
        <button onClick={() => this.setState({ isPaneOpen: true })}>
          Click me to open right pane!
        </button>
        <div style={{ marginTop: '32px' }}>
          <button onClick={ () => this.setState({ isPaneOpenLeft: true }) }>
            Click me to open left pane with 20% width!
          </button>
        </div>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={ this.state.isPaneOpen }
          title='Hey, it is optional pane title.  I can be React component too.'
          subtitle='Optional subtitle.'
          onRequestClose={ () => {
          this.setState({ isPaneOpen: false });
        } }>
          <div>And I am pane content. BTW, what rocks?</div>
          <br />
        </SlidingPane>
        <SlidingPane
          isOpen={ this.state.isPaneOpenLeft }
          title='Hey, it is optional pane title.  I can be React component too.'
          from='left'
          width='200px'
          onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
          <div>And I am pane content on left.</div>
        </SlidingPane>
      </div>

    );

    return (
      <div className="App">
        <Header />
        {menu}
      </div>
    );
  }
}

export default App;
