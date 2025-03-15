import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncSales } from './api';

export const saveSaleOffline = async (saleData) => {
  const offlineSales = await AsyncStorage.getItem('offlineSales');
  const sales = offlineSales ? JSON.parse(offlineSales) : [];
  sales.push({ ...saleData, isSynced: false });
  await AsyncStorage.setItem('offlineSales', JSON.stringify(sales));
};

export const syncOfflineData = async () => {
  const offlineSales = JSON.parse(await AsyncStorage.getItem('offlineSales') || []);
  if (offlineSales.length > 0) {
    try {
      await syncSales(offlineSales);
      await AsyncStorage.setItem('offlineSales', JSON.stringify([]));
    } catch (error) {
      console.error("Falha na sincronização:", error);
    }
  }
};
