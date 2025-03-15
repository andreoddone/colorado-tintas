import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { saveSaleOffline, syncOfflineData } from '../services/sync';

const OfflineSalesScreen = () => {
  const [message, setMessage] = useState('');

  const handleSale = async () => {
    await saveSaleOffline({
      products: [{ productId: '123', quantity: 2 }],
      totalPrice: 100.00
    });
    setMessage('Venda salva localmente!');
  };

  return (
    <View>
      <Button title="Registrar Venda (Offline)" onPress={handleSale} />
      <Text>{message}</Text>
      <Button title="Sincronizar Dados" onPress={syncOfflineData} />
    </View>
  );
};
