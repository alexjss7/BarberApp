import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import ClientRepository from '../../data/repositories/ClientRepository';
import { globalStyles, colors } from '../../styles/globalStyles';
import Realm from 'realm';

const NewClientScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [clientId, setClientId] = useState<Realm.BSON.ObjectId | null>(null);

  useEffect(() => {
    if (route.params?.client) {
      const { client } = route.params;
      setName(client.name);
      setPhone(client.phone || '');
      setEmail(client.email || '');
      setClientId(client._id);
      setIsEditing(true);
      navigation.setOptions({ title: 'Editar Cliente' });
    } else {
      navigation.setOptions({ title: 'Novo Cliente' });
    }
  }, [route.params?.client, navigation]);

  const handleSaveClient = async () => {
    if (!name) {
      Alert.alert('Erro', 'O nome do cliente é obrigatório.');
      return;
    }

    try {
      await ClientRepository.saveClient({
        _id: clientId || undefined,
        name,
        phone: phone || undefined,
        email: email || undefined,
      });
      Alert.alert('Sucesso', `Cliente ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cliente.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder="Nome do Cliente"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder="Telefone (Opcional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <CustomInput
          placeholder="Email (Opcional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomButton title="Salvar Cliente" onPress={handleSaveClient} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});

export default NewClientScreen;