import React, { Component } from 'react';
import api from './../../services/api';

import { 
  View,
  Text, 
  FlatList,
} from 'react-native';

import styles from './styles';

export default class Servicos extends Component {
  state = {
    servicos: [],
  };

  renderItem = ({item}) => (
    <View style={styles.listContainer}>
      <Text>{item.descricao}</Text>
      <Text>{item.itens.descricao}</Text>
      <Text>{item.itens.quantidade}</Text>
      <Text>{item.itens.valor}</Text>
      <Text>{item.cliente.nome}</Text>
      <Text>{item.funcionario.nome}</Text>
      <Text>{item.valor}</Text>
      <Text>{item.status}</Text>
    </View>
  );

  loadServicos = async () => {
    const response = await api.get('/servicos');
    this.setState({ servicos: response.data });
  };

  componentDidMount() {
    this.loadServicos();
  };

  render() {
    return (
      <View>
        <FlatList 
          style={styles.lista}
          data={this.state.servicos}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
