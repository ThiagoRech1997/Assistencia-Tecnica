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
      <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.descricao}</Text>
        <Text style={{fontSize:16}}>Itens:</Text>
      <Text>{item.itens.descricao}</Text>
      <Text>Units: {item.itens.quantidade}  R${item.itens.valor}</Text>
      <Text>Cliente: {item.cliente.nome}</Text>
      <Text>Funcionario: {item.funcionario.nome}</Text>
      <Text>Valor: R${item.valor}</Text>
      <Text>Status: {item.status}</Text>
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
