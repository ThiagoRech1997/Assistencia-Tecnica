import React , { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from './styles';
import api from "../../services/api";
import './../../routes';

export default class Main extends Component {
    state = {
    };

    componentDidMount() {
    };

    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonStyle} onPress={ () => {this.props.navigation.toggleDrawer()} }>
            <Text style={styles.buttonText}>Menu</Text>
          </TouchableOpacity>
          <View>
            
          </View>
        </View>
      );
    }
  }

