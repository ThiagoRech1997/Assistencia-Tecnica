import React , { Component } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../services/api";

export default class Main extends Component {
    static navigationOptions = {
      title: "Assistencia"    
    };

    state = {
      clientes: [],
      errorMessage: '',
    };

    componentDidMount() {
      this.loadClients();
    }

    loadClients = async () => {
        const response = await api.get('/clientes');
        const { clientes } = response.data;
        this.setState({ clientes });
    };

    renderItem = ({ item }) => (
      <View>
        <Text>{item.nome}</Text>
      </View>
    );

    render() {
      return (
        <View>
          {this.state.clientes.map(clientes => (
            <View key={clientes._id}>
              <Text>{clientes.nome}</Text>
            </View>
          ))}
        </View>
      );
    }
  }