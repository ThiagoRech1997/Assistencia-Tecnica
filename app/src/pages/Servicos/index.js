import React, { Component } from 'react';
import api from './../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  View,
  Text, 
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export default class Servicos extends Component {
  state = {
    servicos: [],
    email: '',
  };

  getEmail = async () => {
    var uEmail = JSON.parse(await AsyncStorage.getItem('@CodeApi:email'));
    this.setState({ email: uEmail })
  };

  renderItem = ({item}) => (
    <View style={styles.listContainer}>
    {(this.state.email == item.cliente.email)?
      <View>
        <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.descricao}</Text>
        <Text style={{fontSize:16}}>Itens:</Text>
        <Text> {item.itens.descricao}</Text>
        <Text> Units: {item.itens.quantidade}  R${item.itens.valor}</Text>
        <Text>Cliente: {item.cliente.nome}</Text>
        <Text>Funcionario: {item.funcionario.nome}</Text>
        <Text>Valor: R${item.valor}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    :<Text style={{fontSize:20, fontWeight:'bold'}}>Sem Registos</Text>}
    </View>
  );

  loadServicos = async () => {
    const response = await api.get('/servicos');
    this.setState({ servicos: response.data });
  };

  componentDidMount() {
    this.getEmail();
    this.loadServicos();
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={ () => {this.props.navigation.toggleDrawer()} }>
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        {(this.state.orcamentos == null)?
          <Text style={{fontSize:20, fontWeight:'bold'}}>Sem Registros</Text>
        : <FlatList 
            style={styles.lista}
            data={this.state.servicos}
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
          />
        }
      </View>
    );
  }
}
