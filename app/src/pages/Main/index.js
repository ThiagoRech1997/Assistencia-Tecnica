import React , { Component } from "react";
import { View, Text, FlatList, Button } from "react-native";
import styles from './styles';
import api from "../../services/api";
import './../../routes';

export default class Main extends Component {
    static navigationOptions = {
      title: "Main"    
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

    headerMenu = () => (
      <View>
        <Button onPress={ () => {this.props.navigation.openDrawer()} } title="Menu" />
      </View>
    );

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.headerMenu}>
            <Button onPress={ () => {this.props.navigation.toggleDrawer()} } title="Menu" />
          </View>          
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
