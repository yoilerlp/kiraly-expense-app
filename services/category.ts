import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { Category } from '@/interfaces/category';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const GetAllCategories = async () => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/category`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Category[]> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
