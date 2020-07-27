import React, { Component } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Dimensions,
  Button,
  Text,
  Alert
} from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";

import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

const screenWidth = Dimensions.get('window').width

export default class DailyGoal extends Component {
  static navigationOptions = {
    title: 'Set the daily goal',
  };

  constructor(props) {
    super(props)

    this.state = {
      goal: 5000,
      user: null
    }

    this.items = []
    for(var i = 3000; i < 100000; i += 500) {
      this.items.push(i)
    }
  }

  componentDidMount() {
    GoogleSignin.getCurrentUser().then(user => this.setState({user}, () => {
      const ref = firebase.firestore().collection('users').doc(this.state.user.user.id);
      
      firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(ref);

        if(!doc.exists) {
          transaction.set(ref, {user: this.state.user.user, dailyStepGoal: 5000})
        } else {
          this.setState({goal: doc._data.dailyStepGoal})
        }
      })
    })).catch(err => console.log(err))
  }

  _saveGoal = () => {
    const ref = firebase.firestore().collection('users').doc(this.state.user.user.id);
    firebase.firestore().runTransaction(async transaction => {
      const doc = await transaction.get(ref);
      
      if(!doc.exists) {
        transaction.set(ref, {user: this.state.user.user, dailyStepGoal: this.state.goal})
      } else {
        transaction.update(ref, {user: this.state.user.user, dailyStepGoal: this.state.goal})
      }

    }).then(() => {
      Alert.alert('Thank you', 'Your goal have been saved', [
        {text: 'ok', onPress: () => this.props.navigation.goBack()}
      ])
    }).catch(err => {
      Alert.alert('Oups, An error occurred', err+"", [
        {text: 'ok', onPress: () => this.props.navigation.goBack()}
      ])
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.text}>Your daily goal:</Text>
          <Picker 
            style={styles.picker}
            selectedValue={this.state.goal}
            prompt={"Daily goal"}
            onValueChange={(value) => this.setState({goal: value})}
          >
            {
              this.items.map((item) => {
                return (<Picker.Item label={item.toString()} value={item} key={item}/>)
              })
            }
          </Picker>
        </View>
        <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
          <Button color={'rgb(0, 220, 169)'} title={'Cancel'} onPress={() => this.props.navigation.goBack()}/>
          <Button color={'rgb(0, 220, 169)'} title={'Ok'} onPress={() => this._saveGoal()}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    width: (screenWidth/2)-5,
    marginTop: 10
  },
  picker: {
    width: (screenWidth/2)-5
  }
})
