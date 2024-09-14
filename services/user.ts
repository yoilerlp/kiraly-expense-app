import { API_URL } from '@/constants/api';
import { StorageKeys } from '@/constants/storageKeys';
import { User } from '@/interfaces';
import { getErrorMsgFromResponse, getStorageItem } from '@/utils';

export const createUser = async (
  user: Pick<User, 'name' | 'lastName' | 'email'> & { password: string }
) => {
  try {
    const responseBody = await fetch(`${API_URL}/user/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      method: 'POST',
    });

    const responseData: ServiceResponse<User> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const VerifyOTPCode = async (data: { email: string; otp: string }) => {
  try {
    const responseBody = await fetch(`${API_URL}/user/verify-otp`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });

    const responseData: ServiceResponse<{
      message: string;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const ResendOTPCode = async (data: { email: string }) => {
  try {
    const responseBody = await fetch(`${API_URL}/user/send-otp`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });

    const responseData: ServiceResponse<{
      message: string;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const LoginUser = async (data: { email: string; password: string }) => {
  try {
    const responseBody = await fetch(`${API_URL}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });

    const responseData: ServiceResponse<{
      access_token: string;
      user: User;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const GetTokenInfo = async (token: string) => {
  try {
    const responseBody = await fetch(`${API_URL}/auth/token-info`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: ServiceResponse<User> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const SendRecoveryPasswordCode = async (data: { email: string }) => {
  try {
    const responseBody = await fetch(`${API_URL}/user/reset-password`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });

    const responseData: ServiceResponse<{
      message: string;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const UpdatePassword = async (data: {
  email: string;
  password: string;
  otp: string;
}) => {
  try {
    const responseBody = await fetch(`${API_URL}/user/update-password`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'PATCH',
    });

    const responseData: ServiceResponse<{
      message: string;
    }> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};

export const UpdateUser = async (data: {
  name?: string;
  lastName?: string;
  file?: File;
}) => {
  try {
    const token = await getStorageItem(StorageKeys.authToken);

    const formData = new FormData();


    formData.append('name', data.name || '');
    formData.append('lastName', data.lastName || '');

    if (data.file) {
      formData.append('file', data.file, data.file.name);
    }

    const responseBody = await fetch(`${API_URL}/user/update-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
      method: 'PATCH',
    });


    const responseData: ServiceResponse<User> = await responseBody.json();

    if (!responseBody.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error: any) {
    throw getErrorMsgFromResponse(error);
  }
};
