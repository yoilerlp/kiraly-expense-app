import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { IFilterTransferParams, Transfer } from '@/interfaces';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const CreateTransfer = async (
  data: Pick<
    Transfer,
    'amount' | 'description' | 'originAccountId' | 'destinationAccountId'
  > & {
    files: File[];
  }
) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const formData = new FormData();

    formData.append('amount', data.amount.toString());
    formData.append('description', data.description);
    formData.append('originAccountId', data.originAccountId.toString());
    formData.append(
      'destinationAccountId',
      data.destinationAccountId.toString()
    );

    data?.files?.forEach((file) => {
      formData.append('files', file, file.name);
    });

    const responseBody = await fetch(`${API_URL}/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData: ServiceResponse<Transfer> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetTransferById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/transfer/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Transfer> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
export const DeleteTransferById = async (id: string) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(`${API_URL}/transfer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<Transfer> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetAlltransfers = async (params: IFilterTransferParams) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    // if ('currentDateTab' in params) {
    //   const { currentDateTab, ...rest } = params as any;
    //   params = rest;
    // }

    const responseBody = await fetch(`${API_URL}/transfer/get-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const responseData: ServiceResponseWithPagination<Transfer> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

