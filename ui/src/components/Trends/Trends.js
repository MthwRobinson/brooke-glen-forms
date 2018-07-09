import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';

import './Trends.css';

const PATIENTS = require('./../../data/dummyPatients.json');

class Trends extends Component {
  aggregateCounts = () => {
    var counts = {};
    for(var i=0; i<PATIENTS.length; i++){
      let patient = PATIENTS[i];
      for(var j=0; j<patient.precautions.length; j++){
        let precaution = patient.precautions[j];
        if(precaution in counts){
          counts[precaution] += 1;
        } else {
          counts[precaution] = 1;
        }
      }
    }
    return counts;
  }

  render() {
    const counts = this.aggregateCounts();
    var x = [];
    var y= [];
    for(var key in counts){
      x.push(key);
      y.push(counts[key]);
    }

    return (
      <div className="Trends">
        <Row>
          <h2>Trends</h2><hr/>
          <h4>Track trends in the patient population.</h4>
        </Row>
        <Row className='plot-container hidden-xs hidden-sm'>
          <Plot
          data={[
            {
              type: 'bar', 
              marker: {color: '#828f5c'},
              x: x, 
              y: y
            },
          ]}
          layout={{
              width: 900, 
              height: 500, 
              title: 'Precautions in the Patient Population',
              showLegend: false,
              yaxis: { tickformat: 'd' }
            
          }}
          config={{staticPlot:true}}
          />
        </Row>
        <Row className='plot-container hidden-md hidden-lg'>
          <Plot
          data={[
            {
              type: 'bar', 
              marker: {color: '#828f5c'},
              x: x, 
              y: y
            },
          ]}
          layout={{
              width: 700, 
              height: 600, 
              title: 'Precautions in the Patient Population',
              showLegend: false,
              yaxis: { tickformat: 'd' }
            
          }}
          config={{staticPlot:true}}
          />
        </Row>
      </div>
    );
  }
}

export default Trends;
