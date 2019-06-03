import React , { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../../services/api";

//import "./styles.css"

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
      <View style={styles.clienteContainer}>
        <Text>{item.nome}</Text>
        <Text>{item.cpf}</Text>
        <Text>{item.telefone}</Text>
        <Text>{item.email}</Text>
      </View>
    );

    render() {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.lista}
            data={this.state.clientes}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
          />  
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  lista: {
    padding: 20
  },
  clienteContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
});