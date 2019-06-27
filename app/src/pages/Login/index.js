import React, { Component } from 'react';
import api from "../../services/api";
import './../../routes';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Text,
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';

import styles from './styles';

export default class Login extends Component {
  static navigationOptions = {
    title: "Login"    
  };

  state = {
    loggedInUser: null,
    errorMessage: '',
    email: '',
    senha: ''
  };
  
  signIn = async () => {
    try {
      const response = await api.post('/users/auth', {
        email:this.state.email,
        senha:this.state.senha,
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
      senha: null,
    });
    Alert.alert('Desconectado');
  };

  menu = () => { this.props.navigation.navigate('Main') };

  cadastro = () => { this.props.navigation.navigate('Cadastro') };

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
          ? <View>
              <Button onPress={ this.menu } title="Inicio" />
              <Button onPress={ this.signOut } title="Sair" />
            </View>
          : <View>
              <TextInput 
                style={styles.textImput}
                placeholder="E-mail"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                textContentType="emailAddress"
              />
              <TextInput 
                style={styles.textImput} 
                placeholder="Password"
                onChangeText={(senha) => this.setState({senha})}
                secureTextEntry={true}
                textContentType="password"
              />
              <Button onPress={ this.signIn } title="Entrar" />
              
              <Button onPress={ this.cadastro } title="Cadastrar-se" />
            </View> 
        }
      </View>
    );
  }
}


