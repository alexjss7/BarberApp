import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Barbearia Nego Bala</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.greetingText}>Olá, Barbeiro!</Text>
        <Text style={styles.subGreetingText}>Gerencie seu dia com facilidade.</Text>

        <CustomButton
          title="Ver Agendamentos"
          onPress={() => navigation.navigate('Agendamentos')}
          style={styles.menuButton}
        />
        <CustomButton
          title="Cadastrar Novo Agendamento"
          onPress={() => navigation.navigate('NewAppointment')}
          style={styles.menuButton}
        />
        <CustomButton
          title="Gerenciar Clientes"
          onPress={() => navigation.navigate('ClientsStack')}
          style={styles.menuButton}
        />
        <CustomButton
          title="Controlar Estoque"
          onPress={() => navigation.navigate('Estoque')}
          style={styles.menuButton}
        />
        {/* Você pode adicionar um botão para "Meus Serviços" ou "Perfil" */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 10,
  },
  subGreetingText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  menuButton: {
    width: '90%',
    marginBottom: 15,
  },
});

export default HomeScreen;