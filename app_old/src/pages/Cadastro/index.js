import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from './../../services/api';
import './../../routes';

import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default class Cadastro extends Component {
  state = {
    errorMessage: null,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
    token: '',
  };

  getToken = async () => {
    const response = await api.post('/users/auth', {
      email: 'usuario@batata.com',
      senha: '123',
    });
    console.log(response.data.token);
    await AsyncStorage.multiSet([
      ['@CodeApi:token', response.data.token],
      ['@CodeApi:nome', JSON.stringify(response.data.nome)],
    ]);
    console.log(await AsyncStorage.getItem('@CodeApi:token'));
  };

  cadastrar = async () => {
    this.getToken();
    this.cadUser();
    this.cadCliente();
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };

  cadUser = async () => {
    try{
      const response = await api.post('/users', {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        tipo: 'Cliente',
      }).catch(error =>{
        console.log(error);
      });
      console.log('Usuario cadastrado');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  cadCliente = async () => {
    try{
      const response = await api.post('/clientes',{
        nome: this.state.nome,
        cpf: this.state.cpf,
        telefone: this.state.telefone,
        email: this.state.email
      }).catch(error =>{
        console.log(error);
      });
      console.log('Cliente cadastrado');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text>Nome Completo</Text>
          <TextInput
            placeholder="Nome"
            onChangeText={(nome) => this.setState({nome})} 
            value={this.state.nome}
            textContentType="name"
          />
          <Text>CPF</Text>
          <TextInput
            placeholder="CPF"
            onChangeText={(cpf) => this.setState({cpf})}
            value={this.state.cpf}
            textContentType="none"
          />
          <Text>E-mail</Text>
          <TextInput 
            placeholder="E-mail"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            textContentType="emailAddress"
          />
          <Text>Telefone</Text>
          <TextInput
            placeholder="Telefone"
            onChangeText={(telefone) => this.setState({telefone})}
            value={this.state.telefone}
            textContentType="telephoneNumber"
          />
          <Text>Senha</Text>
          <TextInput 
            placeholder="Password"
            onChangeText={(senha) => this.setState({senha})}
            secureTextEntry={true}
            textContentType="password"
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={ this.cadastrar }>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
