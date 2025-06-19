import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { globalStyles, colors } from '../styles/globalStyles';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/nego_bala_logo.png')} // Certifique-se de ter uma imagem aqui
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Bem-vindo à Barbearia Nego Bala</Text>
      <CustomButton
        title="Entrar"
        onPress={() => navigation.navigate('HomeTabs')}
        style={styles.button}
      />
      {/* Opcional: Adicionar um botão de "Cadastro" se tiver autenticação */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.container.backgroundColor,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
  },
});

export default WelcomeScreen;