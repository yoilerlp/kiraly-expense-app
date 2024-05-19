import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { FileItemDb } from '@/interfaces';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const UploadFile = async (file: any) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const formData = new FormData();

    formData.append('file', file);

    const responseBody = await fetch(`${API_URL}/file/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData: ServiceResponse<FileItemDb> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

