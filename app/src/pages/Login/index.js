import React, { Component } from 'react';
import api from "../../services/api";
import './../../routes';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

export default class Login extends Component {
  static navigationOptions = {
    title: "Login"    
  };

  state = {
    loggedInUser: null,
    errorMessage: '',
    email: null,
    senha: null
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
        ['@CodeApi:nome', JSON.stringify(response.data.nome)],
      ]);

      this.setState({ loggedInUser: response.data.nome }); 

      Alert.alert('Logado com sucesso!');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
    this.props.navigation.navigate('Main')
  }; 

  signOut = async () => {
    await AsyncStorage.clear();
    this.setState({ 
      loggedInUser: null,
      errorMessage: '',
      email: null,
      senha: null,
    });
    Alert.alert('Desconectado');
  };

  async componentDidMount() {
    var token = await AsyncStorage.getItem('@CodeApi:token');
    var nome = JSON.parse(await AsyncStorage.getItem('@CodeApi:nome')) || null;
    if (token && nome) 
      this.setState({ loggedInUser: nome });
  }

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.loggedInUser && <Text>{ this.state.loggedInUser }</Text> }
        { !!this.state.errorMessage && <Text>{ this.state.errorMessage }</Text> }
        { this.state.loggedInUser 
          ? <Button onPress={ this.signOut } title="Sair" />
          : <Button onPress={ this.signIn } title="Entrar" /> 
        }

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
