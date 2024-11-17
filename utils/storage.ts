import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export async function getStorageItem(key: string) {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem(key) || 'null');
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export async function removeStorageItem(key: string) {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

