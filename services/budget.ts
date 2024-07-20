import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { Budget, Transaction } from '@/interfaces';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const GetBudgetsByYearAndMonth = async (data: {
  year: number;
  month: number;
}) => {
  try {
    const queryParams = new URLSearchParams({
      year: data.year.toString(),
      month: data.month.toString(),
    }).toString();

    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(
      `${API_URL}/budget/filter?${queryParams}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
    );

    const responseData: ServiceResponse<
      (Budget & {
        transactions: Transaction[];
      })[]
    > = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const CreateBudget = async (
  data: Omit<Budget, 'id' | 'createdAt' | 'userId' | 'category'>
) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/budget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<Budget> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const UpdateBudget = async (params: {
  id: string;
  data: Omit<Budget, 'id' | 'createdAt' | 'userId' | 'category'>;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/budget/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params.data),
    });

    const responseData: ServiceResponse<Budget> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetBudgeById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/budget/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });

    const responseData: ServiceResponse<
      Budget & {
        transactions: Transaction[];
      }
    > = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const DeleteBudget = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/budget/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<any> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetBudgetHistoryByUser = async () => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/budget/history`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });

    const responseData: ServiceResponse<Budget[]> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

