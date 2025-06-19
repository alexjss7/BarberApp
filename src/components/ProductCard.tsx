import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import CustomButton from './CustomButton';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    type: string; 
    quantity: number;
    price: number;
  };
  onEdit?: (product: any) => void;
  onDelete?: (id: string) => void;
  onDecreaseQuantity?: (id: string, currentQuantity: number) => void;
  onIncreaseQuantity?: (id: string, currentQuantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onDecreaseQuantity, onIncreaseQuantity }) => {
  return (
    <View style={globalStyles.card}>
      <View style={[globalStyles.row, globalStyles.spaceBetween, { marginBottom: 10 }]}>
        <Text style={globalStyles.title}>{product.name}</Text>
        <Text style={globalStyles.subtitle}>Tipo: {product.type}</Text>
      </View>
      <Text style={globalStyles.text}>Preço: R$ {product.price.toFixed(2)}</Text>
      <Text style={globalStyles.text}>Estoque: {product.quantity}</Text>

      <View style={[globalStyles.row, globalStyles.spaceBetween, { marginTop: 15 }]}>
        {onDecreaseQuantity && (
          <CustomButton
            title="-"
            onPress={() => onDecreaseQuantity(product.id, product.quantity)}
            style={{ backgroundColor: colors.accent, paddingVertical: 8, paddingHorizontal: 15, width: 'auto' }}
            textStyle={{ fontSize: 20 }}
          />
        )}
        <Text style={[globalStyles.text, { fontSize: 18, fontWeight: 'bold' }]}>{product.quantity}</Text>
        {onIncreaseQuantity && (
          <CustomButton
            title="+"
            onPress={() => onIncreaseQuantity(product.id, product.quantity)}
            style={{ backgroundColor: colors.success, paddingVertical: 8, paddingHorizontal: 15, width: 'auto' }}
            textStyle={{ fontSize: 20 }}
          />
        )}
      </View>

      <View style={[globalStyles.row, globalStyles.spaceBetween, { marginTop: 10 }]}>
        {onEdit && (
          <CustomButton title="Editar" onPress={() => onEdit(product)} style={{ width: '48%' }} />
        )}
        {onDelete && (
          <CustomButton
            title="Excluir"
            onPress={() => onDelete(product.id)}
            style={[globalStyles.dangerButton, { width: '48%' }]}
            textStyle={globalStyles.dangerButtonText}
          />
        )}
      </View>
    </View>
  );
};

export default ProductCard;