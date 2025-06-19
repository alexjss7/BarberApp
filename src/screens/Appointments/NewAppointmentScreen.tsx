import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { globalStyles, colors } from '../../styles/globalStyles';
import ClientRepository from '../../data/repositories/ClientRepository';
import ServiceRepository from '../../data/repositories/ServiceRespository';
import AppointmentRepository from '../../data/repositories/AppointmentRepository';
import { Client } from '../../data/schemas/ClientSchema';
import { Service } from '../../data/schemas/ServiceSchema';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { format } from 'date-fns';
import Realm from 'realm';

const NewAppointmentScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [barberName, setBarberName] = useState('');
  const [status, setStatus] = useState('Agendado');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [appointmentId, setAppointmentId] = useState<Realm.BSON.ObjectId | null>(null);


  useEffect(() => {
    const loadData = async () => {
      const loadedClients = await ClientRepository.getAllClients();
      const loadedServices = await ServiceRepository.getAllServices();
      setClients(loadedClients);
      setServices(loadedServices);

      if (loadedClients.length > 0 && !selectedClient) {
        setSelectedClient(loadedClients[0]._id.toHexString());
      }
      if (loadedServices.length > 0 && !selectedService) {
        setSelectedService(loadedServices[0]._id.toHexString());
      }

      if (route.params?.appointment) {
        const { appointment } = route.params;
        setSelectedClient(appointment.client._id.toHexString());
        setSelectedService(appointment.service._id.toHexString());
        setAppointmentDate(new Date(appointment.date));
        setBarberName(appointment.barberName);
        setStatus(appointment.status);
        setAppointmentId(appointment._id);
        setIsEditing(true);
        navigation.setOptions({ title: 'Editar Agendamento' });
      } else {
        navigation.setOptions({ title: 'Novo Agendamento' });
      }
    };
    loadData();
  }, [route.params?.appointment, selectedClient, selectedService, navigation]);


  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(false);
    setAppointmentDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || appointmentDate;
    setShowTimePicker(false);
    const newDate = new Date(appointmentDate);
    newDate.setHours(currentTime.getHours());
    newDate.setMinutes(currentTime.getMinutes());
    setAppointmentDate(newDate);
  };

  const handleSaveAppointment = async () => {
    if (!selectedClient || !selectedService || !barberName) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await AppointmentRepository.saveAppointment({
        _id: appointmentId || undefined,
        clientId: new Realm.BSON.ObjectId(selectedClient),
        serviceId: new Realm.BSON.ObjectId(selectedService),
        date: appointmentDate,
        barberName,
        status,
      });
      Alert.alert('Sucesso', `Agendamento ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}</Text>
      </View>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.pickerLabel}>Cliente:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClient}
            onValueChange={(itemValue) => setSelectedClient(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {clients.map(client => (
              <Picker.Item key={client._id.toHexString()} label={client.name} value={client._id.toHexString()} />
            ))}
          </Picker>
        </View>

        <Text style={styles.pickerLabel}>Serviço:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedService}
            onValueChange={(itemValue) => setSelectedService(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {services.map(service => (
              <Picker.Item key={service._id.toHexString()} label={`${service.name} (R$ ${service.price.toFixed(2)})`} value={service._id.toHexString()} />
            ))}
          </Picker>
        </View>

        <CustomInput
          placeholder="Nome do Barbeiro"
          value={barberName}
          onChangeText={setBarberName}
          autoCapitalize="words"
        />

        <Text style={styles.pickerLabel}>Data do Agendamento:</Text>
        <CustomButton title={format(appointmentDate, 'dd/MM/yyyy')} onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.pickerLabel}>Hora do Agendamento:</Text>
        <CustomButton title={format(appointmentDate, 'HH:mm')} onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        <Text style={styles.pickerLabel}>Status:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Agendado" value="Agendado" />
            <Picker.Item label="Confirmado" value="Confirmado" />
            <Picker.Item label="Concluído" value="Concluído" />
            <Picker.Item label="Cancelado" value="Cancelado" />
          </Picker>
        </View>

        <CustomButton title="Salvar Agendamento" onPress={handleSaveAppointment} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  pickerContainer: {
    backgroundColor: colors.card,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  picker: {
    height: 50,
    color: colors.text,
  },
  pickerItem: {
    color: colors.text,
  },
  pickerLabel: {
    fontSize: 14,
    color: colors.text + 'CC',
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 10,
  },
});

export default NewAppointmentScreen;