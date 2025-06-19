import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import ProductRepository from '../../data/repositories/ProductRepository';
import { globalStyles, colors } from '../../styles/globalStyles';
import { Picker } from '@react-native-picker/picker'; 
import Realm from 'realm';


const NewProductScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Gel');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState<Realm.BSON.ObjectId | null>(null);

  useEffect(() => {
    if (route.params?.product) {
      const { product } = route.params;
      setName(product.name);
      setType(product.type);
      setQuantity(String(product.quantity));
      setPrice(String(product.price));
      setProductId(product._id);
      setIsEditing(true);
      navigation.setOptions({ title: 'Editar Produto' });
    } else {
      navigation.setOptions({ title: 'Novo Produto' });
    }
  }, [route.params?.product, navigation]);

  const handleSaveProduct = async () => {
    if (!name || !quantity || !price) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const parsedQuantity = parseInt(quantity);
    const parsedPrice = parseFloat(price.replace(',', '.'));

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      Alert.alert('Erro', 'Quantidade deve ser um número inteiro positivo.');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert('Erro', 'Preço deve ser um número positivo.');
      return;
    }

    try {
      await ProductRepository.saveProduct({
        _id: productId || undefined,
        name,
        type,
        quantity: parsedQuantity,
        price: parsedPrice,
      });
      Alert.alert('Sucesso', `Produto ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Text>
      </View>
      <ScrollView style={styles.formContainer}>
        <CustomInput
          placeholder="Nome do Produto"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.pickerLabel}>Tipo de Produto:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Gel" value="Gel" />
            <Picker.Item label="Shampoo" value="Shampoo" />
            <Picker.Item label="Pomada" value="Pomada" />
            <Picker.Item label="Camisa" value="Camisa" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>

        <CustomInput
          placeholder="Quantidade"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Preço (Ex: 29.99)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <CustomButton title="Salvar Produto" onPress={handleSaveProduct} />
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
  }
});

export default NewProductScreen;