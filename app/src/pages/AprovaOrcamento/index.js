import React, { Component } from 'react';

import api from './../../services/api';
import './../../routes';

import { 
    View, 
    Button,
    Text,
    TouchableOpacity,  
} from 'react-native';

import styles from './styles';

const AprovaOrcamento = ({navigation}) =>(
    <View style={styles.container}>
        <Text style={styles.textMessage}>Deseja autorizar o orcamento?</Text>
        <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={async () => {
                var id = navigation.state.params.aprovar._id;
                const response = await api.put(`/orcamentos/aprovacao/${id}`,{ aprovacao: 'Aprovado' });
                AprovaOrcamento.abrirServico({navigation});
                navigation.navigate('Orcamentos');
                }
            }
        >
            <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={async () => {
                var id = navigation.state.params.aprovar._id;
                const response = await api.put(`/orcamentos/aprovacao/${id}`,{ aprovacao: 'Nao Aprovado' });
                navigation.navigate('Orcamentos');
                }
            }
        >
            <Text style={styles.buttonText}>Nao</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {navigation.navigate('Orcamentos')}}>
            <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
    </View>
);

AprovaOrcamento.abrirServico = async ({navigation}) => {
    const responce = await api.post('/servicos', {
        descricao: navigation.state.params.aprovar.descricao,
        itens: {
            descricao: navigation.state.params.aprovar.itens.descricao,
            quantidade: navigation.state.params.aprovar.itens.quantidade,
            valor: navigation.state.params.aprovar.itens.valor,
        },
        cliente: {
            nome: navigation.state.params.aprovar.cliente.nome,
            email: navigation.state.params.aprovar.cliente.email,
        },
        funcionario: {
            nome: navigation.state.params.aprovar.funcionario.nome,
            email: navigation.state.params.aprovar.funcionario.email,
        },
        valor: navigation.state.params.aprovar.itens.valor,
        status: 'Aberto',
    }).catch(error => {console.log(error)});
};

export default AprovaOrcamento;