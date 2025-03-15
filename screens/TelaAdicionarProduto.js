import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { saveProductOffline, syncOfflineProducts } from '../services/sync';
import { createProduct } from '../services/api';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('Latex');
  const [colorCode, setColorCode] = useState('#FFFFFF');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const connectionStatus = await checkInternetConnection();
      setIsOnline(connectionStatus);
    };
    
    const unsubscribe = navigation.addListener('focus', checkConnection);
    return unsubscribe;
  }, [navigation]);

  const handleAddProduct = async () => {
    if (!name || !price || !quantity) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      type,
      colorCode
    };

    try {
      if (isOnline) {
        await createProduct(newProduct);
      } else {
        await saveProductOffline(newProduct);
        Alert.alert('Sucesso', 'Produto salvo localmente e será sincronizado quando a conexão voltar');
      }
      
      if (isOnline) await syncOfflineProducts();
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Tinta*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ex: Tinta Latex Branca"
        />

        <Text style={styles.label}>Preço (R$)*</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={text => setPrice(text.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
          placeholder="Ex: 89.90"
        />

        <Text style={styles.label}>Quantidade em Estoque*</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={text => setQuantity(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          placeholder="Ex: 50"
        />

        <Text style={styles.label}>Tipo de Tinta</Text>
        <Picker
          selectedValue={type}
          onValueChange={itemValue => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Latex" value="Latex" />
          <Picker.Item label="Acrílica" value="Acrílica" />
          <Picker.Item label="Esmalte" value="Esmalte" />
        </Picker>

        <Text style={styles.label}>Código da Cor (HEX)</Text>
        <TextInput
          style={styles.input}
          value={colorCode}
          onChangeText={setColorCode}
          placeholder="#FFFFFF"
          maxLength={7}
        />

        <Button
          title={isOnline ? "Cadastrar Produto" : "Salvar Localmente"}
          onPress={handleAddProduct}
          color="#2c3e50"
        />

        {!isOnline && (
          <Text style={styles.offlineWarning}>
            Modo Offline: Os dados serão sincronizados quando a conexão voltar
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa'
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  },
  picker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5
  },
  offlineWarning: {
    marginTop: 15,
    color: '#e74c3c',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default AddProductScreen;
