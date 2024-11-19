export const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === 'development';
export const IS_PREVIEW = process.env.EXPO_PUBLIC_APP_VARIANT === 'preview';

export const DEV_USERNAME = process.env.EXPO_PUBLIC_DEV_USER! || '';
export const DEV_PASSWORD = process.env.EXPO_PUBLIC_DEV_PASSWORD! || '';

