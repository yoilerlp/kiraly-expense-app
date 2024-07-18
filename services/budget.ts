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

