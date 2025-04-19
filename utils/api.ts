import { router } from 'expo-router';
import { removeStorageItem } from './storage';
import { StorageKeys } from '@/constants/storageKeys';

type Options = {
  validateUnauthorized?: boolean;
};

export const getErrorMsgFromResponse = (
  error: ServiceErrorResponse,
  options: Options = {
    validateUnauthorized: true,
  }
) => {
  if (options?.validateUnauthorized && error.statusCode === 401) {
    router.replace('/auth/login');
    removeStorageItem(StorageKeys.authToken);
  }

  let errorMsg: string;

  if (typeof error.message === 'string') {
    errorMsg = error.message;
  } else if (typeof error.message[0] === 'string') {
    errorMsg = error.message[0];
  } else {
    errorMsg = 'Ocurrio un error inesperado, intente nuevamente';
  }

  return errorMsg;
};

