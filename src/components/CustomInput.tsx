import React from 'react';
import { TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

interface CustomInputProps extends TextInputProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({ style, textStyle, ...props }) => {
  return (
    <TextInput
      style={[globalStyles.input, style]}
      placeholderTextColor={colors.text + '80'} // 50% opacity
      {...props}
    />
  );
};

export default CustomInput;