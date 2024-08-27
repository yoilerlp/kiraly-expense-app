import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { BasicReport } from '@/interfaces/statistics';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const GetUserBasicExpensesReport = async ({
  minDate,
  maxDate,
}: {
  minDate: string;
  maxDate: string;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const responseBody = await fetch(
      `${API_URL}/statistics/basic-report?minDate=${minDate}&maxDate=${maxDate}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData: ServiceResponse<BasicReport> =
      await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
