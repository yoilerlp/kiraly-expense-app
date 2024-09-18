import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import {
  IFilterTransactionParams,
  Transaction,
} from '@/interfaces/transaction';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

type ICreateTransactionData = Pick<
  Transaction,
  'type' | 'amount' | 'accountId' | 'description' | 'categoryId'
> & {
  files: File[];
};

export const GetAllTransactions = async (params: IFilterTransactionParams) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    if ('currentDateTab' in params) {
      const { currentDateTab, ...rest } = params as any;
      params = rest;
    }

    const responseBody = await fetch(`${API_URL}/transaction/get-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const responseData: ServiceResponseWithPagination<Transaction> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    console.log({ error });
    throw getErrorMsgFromResponse(error);
  }
};
export const GetTransactionById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/transaction/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Transaction> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const DeleteTransaction = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/transaction/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Transaction> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const CreateTransaction = async (data: ICreateTransactionData) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const formData = new FormData();

    formData.append('type', data.type);
    formData.append('amount', data.amount.toString());
    formData.append('accountId', data.accountId.toString());
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId.toString());

    data?.files?.forEach((file) => {
      formData.append('files', file);
    });

    const responseBody = await fetch(`${API_URL}/transaction`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const responseData: ServiceResponse<Transaction> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const UpdateTransaction = async (params: {
  id: string;
  data: ICreateTransactionData & { filesToDelete?: string[] };
}) => {
  try {
    const { id, data } = params;

    const token = await getStorageItem(StorageKeys.authToken);
    const formData = new FormData();
    if (data.type) formData.append('type', data.type);
    if (data.amount) formData.append('amount', data.amount.toString());
    if (data.accountId) formData.append('accountId', data.accountId.toString());
    if (data.description) formData.append('description', data.description);
    if (data.categoryId)
      formData.append('categoryId', data.categoryId.toString());

    if (data.filesToDelete)
      formData.append('filesToDelete', JSON.stringify(data.filesToDelete));

    data?.files?.forEach((file) => {
      formData.append('files', file);
    });

    const responseBody = await fetch(`${API_URL}/transaction/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const responseData: ServiceResponse<Transaction> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetMinAndMaxTransactionDate = async () => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(
      `${API_URL}/transaction/meta/get-min-and-max-date`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData: ServiceResponse<{
      min: string;
      max: string;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const GetMonthBalance = async (data: {
  year: number;
  month: number;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(
      `${API_URL}/transaction/meta/get-balance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const responseData: ServiceResponse<{
      balance: {
        expense: number;
        income: number;
      };
      transactions: Omit<
        Transaction,
        'account' | 'category' | 'transactionFiles'
      >[];
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

