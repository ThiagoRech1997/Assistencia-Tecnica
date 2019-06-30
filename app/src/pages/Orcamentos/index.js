import React, { Component } from 'react';
import api from "../../services/api";
import './../../routes';

import { 
  View,
  FlatList, 
  Text,
  Button,
  TouchableOpacity, 
} from 'react-native';

import styles from './styles';

export default class Orcamentos extends Component {
  state = {
    orcamentos: [],
    visible: Boolean
  };  

  renderItem = ({item}) => (
    <View style={styles.listContainer}>
      <Text>{item.descricao}</Text>
      <Text>{item.itens.descricao}</Text>
      <Text>{item.itens.quantidade}</Text>
      <Text>{item.itens.valor}</Text>
      <Text>{item.cliente.nome}</Text>
      <Text>{item.funcionario.nome}</Text>
      <Text>{item.aprovacao}</Text>
      {!!(item.aprovacao == "Aguardando")?this.visible=false : this.visible = true}
      <TouchableOpacity style={styles.buttonStyle} disabled={this.visible} onPress={() => {this.props.navigation.navigate('AprovaOrcamento', { aprovar: item })}}>
        <Text style={styles.buttonText}>Autorizar</Text>
      </TouchableOpacity>
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
    <View style={styles.container}>
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
