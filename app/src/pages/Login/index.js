import React, { Component } from 'react';
import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

export default class Login extends Component {
  state = {
    loggedInUser: null,
    errorMessage: '',
    projects: [],
  };

  
  signIn = async () => {
    try {
      const response = await api.post('/users/auth', {
        email:"thiagorech.1997@gmail.com",
        senha:"123456",
      },{
        headers: { 'Content-Type': 'application/json' }
      }).catch(error =>{
        console.log(error);
      }); 
      await AsyncStorage.multiSet([
        ['@CodeApi:token', response.data.token],
        ['@CodeApi:user', JSON.stringify(response.data.nome)],
      ]);

      this.setState({ loggedInUser: response.data.nome }); 

      Alert.alert('Logado com sucesso!');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  }; 

  getProjectList = async () => {
    try {
      const response = await api.get('/clientes');

      const { clientes } = response.data;

      this.setState({ clientes });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  async componentDidMount() {
    await AsyncStorage.clear();

    const token = await AsyncStorage.getItem('@CodeApi:token');
    const nome = JSON.parse(await AsyncStorage.getItem('@CodeApi:nome')) || null;

    if (token && nome) 
      this.setState({ loggedInUser: nome });
  }

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.errorMessage && <Text>{this.state.errorMessage}</Text> }
        { this.state.loggedInUser
          ? <Button onPress={this.getProjectList} title="Carregar projetos" />
          : <Button onPress={this.signIn} title="Entrar" /> }

        { this.state.projects.map(project => (
          <View key={project._id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{project.title}</Text>
            <Text>{project.description}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
