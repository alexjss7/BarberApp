import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, style, textStyle }) => {
  return (

    <TouchableOpacity
      style={[styles.defaultButton, style]} 
      onPress={onPress}
    >
      <Text style={[styles.defaultText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  defaultText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;