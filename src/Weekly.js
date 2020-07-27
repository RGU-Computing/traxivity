import React, { Component } from 'react';
import { View } from 'react-native';
import { getSteps, getCals, getDists } from './api/googleFitApi'
import TraxivityDataTab from './components/TraxivityDataTab'
import Chart from './components/Chart'


export default class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      cals: [],
      distances: []
    }
  }

  componentDidMount() {
    let start = new Date();
    let end = new Date();
    let nbDays = start.getDay();
    if (nbDays == 0) nbDays = 7;
    start.setDate(start.getDate() - (nbDays-1));
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const options = {
      startDate: start,
      endDate: end
    };

    getSteps(options, null, res => {
      this.setState({steps: res})
    });

    getCals({...options, basalCalculation: false}, res => {
      this.setState({cals: res ? res : []})
    });

    getDists(options, res => {
      this.setState({distances: res ? res : []})
    });
  }

  render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let tabStep = this.state.steps.map(x => x.value);
    let stepSum = 0;
    let StepAvg = 0;
    if (tabStep.length > 0) {
      stepSum = tabStep.reduce(reducer);
      StepAvg = stepSum / tabStep.length
    }

    let tabCal = this.state.cals.map(x => x.calorie);
    let calSum = 0;
    if (tabCal.length > 0) {
      calSum = tabCal.reduce(reducer)
    }

    let tabDistance = this.state.distances.map(x => x.distance);
    let distSum = 0;
    if (tabDistance.length > 0) {
      distSum = tabDistance.reduce(reducer)/1000
    }

    let boxData = {
      numBox1: StepAvg,
      textBox1: "Avg Weekly",
      numBox2: stepSum,
      textBox2: "This Week",
      numBox3: calSum,
      textBox3: "Kcal Burned",
      numBox4: distSum,
      textBox4: "Kilometers"
    };

    let formatter = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    return (
      <View style={{flex: 1}}>
        <Chart tabStep={this.state.steps} formatter={formatter} granularity={1}/>
        <TraxivityDataTab data={boxData}/>
      </View>
    );
  }
}