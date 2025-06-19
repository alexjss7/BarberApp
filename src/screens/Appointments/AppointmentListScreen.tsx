import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AppointmentRepository from '../../data/repositories/AppointmentRepository';
import { Appointment } from '../../data/schemas/AppointmentSchema';
import { globalStyles, colors } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { format } from 'date-fns';

const AppointmentListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = useCallback(async () => {
    try {
      const allAppointments = await AppointmentRepository.getAllAppointments();
      setAppointments(allAppointments);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de agendamentos.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );

  const handleDeleteAppointment = async (id: Realm.BSON.ObjectId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await AppointmentRepository.deleteAppointment(id);
              Alert.alert('Sucesso', 'Agendamento excluído com sucesso!');
              loadAppointments();
            } catch (error) {
              console.error('Erro ao excluir agendamento:', error);
              Alert.alert('Erro', 'Não foi possível excluir o agendamento.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={globalStyles.card}>
      <Text style={globalStyles.title}>Cliente: {item.client.name}</Text>
      <Text style={globalStyles.subtitle}>Serviço: {item.service.name}</Text>
      <Text style={globalStyles.text}>Barbeiro: {item.barberName}</Text>
      <Text style={globalStyles.text}>Data/Hora: {format(new Date(item.date), 'dd/MM/yyyy HH:mm')}</Text>
      <Text style={globalStyles.text}>Status: {item.status}</Text>
      <View style={[globalStyles.row, globalStyles.spaceBetween, { marginTop: 10 }]}>
        <CustomButton
          title="Editar"
          onPress={() => navigation.navigate('NewAppointment', { appointment: item })}
          style={{ width: '48%' }}
        />
        <CustomButton
          title="Excluir"
          onPress={() => handleDeleteAppointment(item._id)}
          style={[globalStyles.dangerButton, { width: '48%' }]}
          textStyle={globalStyles.dangerButtonText}
        />
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Agendamentos</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={renderAppointmentItem}
        ListEmptyComponent={
          <Text style={[globalStyles.text, globalStyles.textCenter, { marginTop: 20 }]}>
            Nenhum agendamento futuro.
          </Text>
        }
      />
      <CustomButton
        title="Novo Agendamento"
        onPress={() => navigation.navigate('NewAppointment')}
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

export default AppointmentListScreen;