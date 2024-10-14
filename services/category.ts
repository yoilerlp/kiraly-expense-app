import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { Category } from '@/interfaces/category';
import {
  getErrorMsgFromResponse,
  getStorageItem,
  sortCategories,
} from '@/utils';

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

    const sortedCategories = sortCategories(responseData.data);
    return sortedCategories;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetOneById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/category/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Category> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const CreateCategory = async (
  data: Omit<Category, 'id' | 'userId' | 'isActive' | 'type'>
) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<Category> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const UpdateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Omit<Category, 'id' | 'userId' | 'type'>>;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<Category> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

