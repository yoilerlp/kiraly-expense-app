import { AppVarianEnum } from '@/interfaces/app';

export const APP_VARIAN: AppVarianEnum = process.env
  .EXPO_PUBLIC_APP_VARIANT! as AppVarianEnum;

export const BASE_API = process.env.EXPO_PUBLIC_API_URL;

export const NINJA_API_KEY = process.env.EXPO_PUBLIC_NINJA_API_KEY!;

// const localApiURl = 'http://192.168.1.7:3000/api';
const localApiURl = 'https://apis.yoyler.dev/kiraly/api';
// const localApiURl = 'http://localhost:3000/api/v1';

const getApiURL = () => {
  const isDev = APP_VARIAN === AppVarianEnum.development;
  return isDev ? localApiURl : BASE_API!;
};

export const API_URL = `${getApiURL()}/v1`;

