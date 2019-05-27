import React , { Component } from "react";
import { View, Text } from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    title: "Assistencia"
  };

    render() {
      return (
        <View>
          <Text>Welcome to React Pesadao!</Text>
          <Text>To get started, edit App.js</Text>
        </View>
      );
    }
  }