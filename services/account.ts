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
export const CreateUserAccounts = async (
  data: Pick<Account, 'name' | 'type'>
) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: ServiceResponse<Account> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const UpdateUserAccount = async (params: {
  id: string;
  data: Pick<Account, 'name' | 'type'>;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/account/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params.data),
    });

    const responseData: ServiceResponse<Account> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const GetAccountWithBalanceById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<{
      account: Account;
      balance: {
        total_income: number | null;
        total_expense: number | null;
      };
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
