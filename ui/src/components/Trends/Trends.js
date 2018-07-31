import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import axios from 'axios';


import './Trends.css';

class Trends extends Component {
  constructor(props){
    super(props);
    this.state = {
      counts: {},
      x: [],
      y: []
    }
  }

  componentDidMount(){
    axios.get('/service/trends/precautions')
      .then(res => {
        const counts = res.data;
        this.setState({counts: counts});
        
        var x = [];
        var y = [];
        for(var key in this.state.counts){
          x.push(key);
          y.push(this.state.counts[key]);
        }
        this.setState({x: x, y: y});
      })
  }

  render() {
    return (
      <div className="Trends">
        <Row>
          <h2>Trends</h2><hr/>
          <h4>Track trends in the patient population.</h4>
        </Row>
        <Row className='plot-container visible-md visible-lg'>
          <Plot
          data={[
            {
              type: 'bar', 
              marker: {color: '#828f5c'},
              x: this.state.x, 
              y: this.state.y
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
              x: this.state.x, 
              y: this.state.y
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
