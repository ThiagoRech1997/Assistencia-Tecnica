import React, { Component } from 'react';
import api from "../../services/api";
import './../../routes';

import { 
  View,
  FlatList, 
  Text,
  Button, 
} from 'react-native';

import styles from './styles';

export default class Orcamentos extends Component {
  state = {
    orcamentos: [],
    descricao: '',
    itens: {
      descricao: '',
      quantidade: '',
      valor: '',
      funcionario: {
        nome: '',
        email: '',
      },
      cliente: {
        nome: '',
        email: '',
      },
    },
  };  

  autorizarOrcamento = async () => {
    const response = await api.put('/orcamentos', {});
  };

  renderItem = ({item}) => (
    <View>
      <Text>{item.descricao}</Text>
      <Text>{item.itens.descricao}</Text>
      <Text>{item.itens.quantidade}</Text>
      <Text>{item.itens.valor}</Text>
      <Text>{item.cliente.nome}</Text>
      <Text>{item.funcionario.nome}</Text>
      <Text>{item.aprovacao}</Text>
      <Button onPress={this.autorizarOrcamento} title='Autorizar' />
    </View>
  );

  loadOrcamentos = async () => {
    const response = await api.get('/orcamentos');
    this.setState({ orcamentos: response.data });   
  };

    componentDidMount() {
      this.loadOrcamentos();
    };

  render() {
    return (
    <View>
      <FlatList 
      style={styles.lista}
      data={this.state.orcamentos}
      keyExtractor={item => item._id}
      renderItem={this.renderItem}
    />
    </View>
    );
  }
}
