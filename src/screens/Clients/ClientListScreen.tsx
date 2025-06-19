import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ClientRepository from '../../data/repositories/ClientRepository';
import { Client } from '../../data/schemas/ClientSchema';
import { globalStyles, colors } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import Realm from 'realm';

const ClientListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = useCallback(async () => {
    try {
      const allClients = await ClientRepository.getAllClients();
      setClients(allClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de clientes.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadClients();
    }, [loadClients])
  );

  const handleDeleteClient = async (id: Realm.BSON.ObjectId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await ClientRepository.deleteClient(id);
              Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
              loadClients(); // Recarrega a lista
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              Alert.alert('Erro', 'Não foi possível excluir o cliente.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderClientItem = ({ item }: { item: Client }) => (
    <View style={globalStyles.card}>
      <Text style={globalStyles.title}>{item.name}</Text>
      {item.phone && <Text style={globalStyles.text}>Telefone: {item.phone}</Text>}
      {item.email && <Text style={globalStyles.text}>Email: {item.email}</Text>}
      <View style={[globalStyles.row, globalStyles.spaceBetween, { marginTop: 10 }]}>
        <CustomButton
          title="Editar"
          onPress={() => navigation.navigate('NewClient', { client: item })}
          style={{ width: '48%' }}
        />
        <CustomButton
          title="Excluir"
          onPress={() => handleDeleteClient(item._id)}
          style={[globalStyles.dangerButton, { width: '48%' }]}
          textStyle={globalStyles.dangerButtonText}
        />
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Clientes</Text>
      </View>
      <FlatList
        data={clients}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={renderClientItem}
        ListEmptyComponent={
          <Text style={[globalStyles.text, globalStyles.textCenter, { marginTop: 20 }]}>
            Nenhum cliente cadastrado.
          </Text>
        }
      />
      <CustomButton
        title="Novo Cliente"
        onPress={() => navigation.navigate('NewClient')}
        style={styles.bottomButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    margin: 16,
  },
});

export default ClientListScreen;