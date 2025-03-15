import AsyncStorage from '@react-native-async-storage/async-storage';
import { createProduct } from './api';
import NetInfo from '@react-native-community/netinfo';

export const saveProductOffline = async (product) => {
  try {
    const offlineProducts = JSON.parse(await AsyncStorage.getItem('offlineProducts') || []);
    offlineProducts.push(product);
    await AsyncStorage.setItem('offlineProducts', JSON.stringify(offlineProducts));
  } catch (error) {
    console.error('Error saving product offline:', error);
  }
};

export const syncOfflineProducts = async () => {
  const offlineProducts = JSON.parse(await AsyncStorage.getItem('offlineProducts') || []);
  if (offlineProducts.length > 0) {
    try {
      for (const product of offlineProducts) {
        await createProduct(product);
      }
      await AsyncStorage.removeItem('offlineProducts');
    } catch (error) {
      console.error('Error syncing products:', error);
    }
  }
};

export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
