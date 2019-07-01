import React, { Component } from 'react';
import api from "../../services/api";
import './../../routes';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  View,
  FlatList, 
  Text,
  TouchableOpacity, 
} from 'react-native';

import styles from './styles';

export default class Orcamentos extends Component {
  state = {
    orcamentos: [],
    visible: Boolean,
    email: '',
  };  

  getEmail = async () => {
    var uEmail = JSON.parse(await AsyncStorage.getItem('@CodeApi:email'));
    this.setState({ email: uEmail })
  };

  renderItem = ({item}) => (
    <View>
    {(this.state.email == item.cliente.email)?
      <View style={styles.listContainer}>
        <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.descricao}</Text>
        <Text style={{fontSize:16}}>Itens:</Text>
        <Text> {item.itens.descricao}</Text>
        <Text> Units: {item.itens.quantidade}  R${item.itens.valor}</Text>
        <Text>Cliente: {item.cliente.nome}</Text>
        <Text>Funcionario: {item.funcionario.nome}</Text>
        <Text>Aprovacao: {item.aprovacao}</Text>
        {!!(item.aprovacao == "Aguardando")?this.visible=false : this.visible = true}
        <TouchableOpacity style={styles.buttonStyle} disabled={this.visible} onPress={() => {this.props.navigation.navigate('AprovaOrcamento', { aprovar: item })}}>
          <Text style={styles.buttonText}>Autorizar</Text>
        </TouchableOpacity>
      </View>
    :<Text style={{fontSize:20, fontWeight:'bold'}}>Sem Registos</Text>}
    </View>
  );

  loadOrcamentos = async () => {
    const response = await api.get('/orcamentos');
    this.setState({ orcamentos: response.data }); 
  };

    componentDidMount() {
      this.getEmail();
      this.loadOrcamentos();
    };

  render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={ () => {this.props.navigation.toggleDrawer()} }>
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
      {(this.state.orcamentos == null)?
        <Text style={{fontSize:20, fontWeight:'bold'}}>Sem Registros</Text>
      : <FlatList 
          style={styles.lista}
          data={this.state.orcamentos}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      }
    </View>
    );
  }
}
