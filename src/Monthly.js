import React, { Component } from 'react';
import { View } from 'react-native';
import { getSteps, getCals, getDists } from './api/googleFitApi'
import TraxivityDataTab from './components/TraxivityDataTab'
import Chart from './components/Chart'

export default class Monthly extends Component {
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
    start.setDate(1);
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
    })
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

    let data = {
      numBox1: StepAvg,
      textBox1: "Avg Monthly",
      numBox2: stepSum,
      textBox2: "This Month",
      numBox3: calSum,
      textBox3: "Kcal Burned",
      numBox4: distSum,
      textBox4: "Kilometers"
    };

    var formatter = [];
    for (var i = 1; i <= 31; i++) {
      formatter.push(i.toString());
    }

    return (
      <View style={{flex: 1}}>
        <Chart tabStep={this.state.steps} formatter={formatter} granularity={5}/>
        <TraxivityDataTab data={data}/>
      </View>
    );
  }
}