import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { PushToken } from '@/interfaces/pushToken';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const SavePushToken = async (
  data: Pick<PushToken, 'token' | 'deviceInfo'> & {
    userId: string;
  }
) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/notifications/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<PushToken> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const DeleteToken = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(
      `${API_URL}/notifications/token/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData: ServiceResponse<any> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

