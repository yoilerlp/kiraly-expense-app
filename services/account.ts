import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { Account } from '@/interfaces';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const GetUserAccounts = async () => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/account`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Account[]> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

