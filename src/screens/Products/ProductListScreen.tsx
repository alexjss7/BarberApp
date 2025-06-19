import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductRepository from '../../data/repositories/ProductRepository';
import { Product } from '../../data/schemas/ProductSchema';
import { globalStyles, colors } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import ProductCard from '../../components/ProductCard';
import Realm from 'realm';

const ProductListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const allProducts = await ProductRepository.getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de produtos.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const handleEditProduct = (product: Product) => {
    navigation.navigate('NewProduct', { product });
  };

  const handleDeleteProduct = async (id: Realm.BSON.ObjectId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await ProductRepository.deleteProduct(id);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              loadProducts();
            } catch (error) {
              console.error('Erro ao excluir produto:', error);
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDecreaseQuantity = async (id: Realm.BSON.ObjectId, currentQuantity: number) => {
    if (currentQuantity > 0) {
      try {
        await ProductRepository.updateProductQuantity(id, currentQuantity - 1);
        loadProducts();
      } catch (error) {
        console.error('Erro ao diminuir quantidade:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a quantidade.');
      }
    }
  };

  const handleIncreaseQuantity = async (id: Realm.BSON.ObjectId, currentQuantity: number) => {
    try {
      await ProductRepository.updateProductQuantity(id, currentQuantity + 1);
      loadProducts();
    } catch (error) {
      console.error('Erro ao aumentar quantidade:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a quantidade.');
    }
  };


const renderProductItem = ({ item }: { item: Product }) => {
  
  const productForCard = {
    id: item._id.toHexString(), 
    name: item.name,             
    type: item.type,             
    quantity: item.quantity,     
    price: item.price,           
  };

  return (
    <ProductCard
      product={productForCard}
      onEdit={() => handleEditProduct(item)}
      onDelete={() => handleDeleteProduct(item._id)}
      onDecreaseQuantity={() => handleDecreaseQuantity(item._id, item.quantity)}
      onIncreaseQuantity={() => handleIncreaseQuantity(item._id, item.quantity)}
    />
  );
};

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Estoque de Produtos</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={renderProductItem}
        ListEmptyComponent={
          <Text style={[globalStyles.text, globalStyles.textCenter, { marginTop: 20 }]}>
            Nenhum produto em estoque.
          </Text>
        }
      />
      <CustomButton
        title="Adicionar Produto"
        onPress={() => navigation.navigate('NewProduct')}
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

export default ProductListScreen;