import React , { Component } from "react";
import { View, Text } from "react-native";
import api from "../services/api";

export default class Main extends Component {
  static navigationOptions = {
    title: "Assistencia"    
  };

  state = {
    docs: [],
  };

  componentDidMount() {
    this.loadClients();
  }

  loadClients = async () => {
    const response = await api.get("/clientes");
    const { docs } = response.data;
    console.log(response.data);

    this.setState({ docs });
  };

    render() {
      return (
        <View>
          <Text>Welcome to React Pesadao!</Text>
          {this.state.docs.map(clientes => (
            <Text>{clientes.nome}</Text>
          ))}
        </View>
      );
    }
  }