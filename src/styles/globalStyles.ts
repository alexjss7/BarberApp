import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2F4F4F', // Cinza Chumbo
  secondary: '#FFD700', // Dourado
  accent: '#B22222', // Vermelho Forte
  text: '#FFFFFF',
  textDark: '#333333',
  background: '#1A1A1A', // Preto quase total
  card: '#2C2C2C',
  border: '#444444',
  success: '#28a745',
  danger: '#dc3545',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 30, // Para evitar a notch em dispositivos modernos
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.textDark, // Texto escuro para o dourado
    fontWeight: 'bold',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  dangerButtonText: {
    color: colors.text,
  },
  textCenter: {
    textAlign: 'center',
  },
  // Flex styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
});