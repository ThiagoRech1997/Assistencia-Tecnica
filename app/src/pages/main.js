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
    };

    loadClients = async () => {
        const response = await api.get('/clientes');
        
        this.setState({ clientes: response.data });
    };

    renderItem = ({ item }) => (
      <View>
        <Text>{item.nome}</Text>
        <Text>{item.cpf}</Text>
      </View>
    );

    render() {
      return (
        <View>
          <FlatList
            data={this.state.clientes}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
          />  
        </View>
      );
    }
  }