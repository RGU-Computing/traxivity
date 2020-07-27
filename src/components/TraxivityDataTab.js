import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

export default class TraxivityDataTab extends Component {

  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.container}>
            <Text style={styles.bigtext}>{this.numberWithCommas(Math.round(this.props.data.numBox1))}</Text>
            <Text style={styles.littleText}>{this.props.data.textBox1}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.bigtext}>{this.numberWithCommas(Math.round(this.props.data.numBox2))}</Text>
            <Text style={styles.littleText}>{this.props.data.textBox2}</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.container}>
            <Text style={styles.bigtext}>{this.numberWithCommas(Math.round(this.props.data.numBox3))}</Text>
            <Text style={styles.littleText}>{this.props.data.textBox3}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.bigtext}>{this.numberWithCommas(Math.round(this.props.data.numBox4))}</Text>
            <Text style={styles.littleText}>{this.props.data.textBox4}</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  bigtext: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  littleText: {
    fontSize: 15
  }
});