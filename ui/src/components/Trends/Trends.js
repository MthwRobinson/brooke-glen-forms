import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';

import './Trends.css';

class Trends extends Component {
  render() {
    return (
      <div className="Trends">
        <Row>
          <h2>Trends</h2><hr/>
          <h4>Track trends in the patient population.</h4>
        </Row>
        <Row>
          <Plot
          data={[
            {
              type: 'bar', 
              marker: {color: '#828f5c'},
              x: [1, 2, 3], 
              y: [2, 5, 3]
            },
          ]}
          layout={{
              width: 1000, 
              height: 600, 
              title: 'Precautions in the Patient Population',
              showLegend: false
            
          }}
          config={{staticPlot:true}}
          />
        </Row>
      </div>
    );
  }
}

export default Trends;
