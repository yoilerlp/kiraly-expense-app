const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === 'development';
const IS_PREVIEW = process.env.EXPO_PUBLIC_APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.yoiler595.expenseapp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.yoiler595.expenseapp';
  }

  return 'com.yoiler595.expenseapp.dev';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Kiraly(Dev)';
  }

  if (IS_PREVIEW) {
    return 'Kiraly Expense';
  }

  return 'Kiraly(Dev)';
};

const config = {
  expo: {
    name: getAppName(),
    slug: 'expense-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'kiraly-expense',
    userInterfaceStyle: 'automatic',
    // splash: {
    //   image: './assets/images/splash.png',
    //   resizeMode: 'contain',
    //   backgroundColor: '#7F3DFF',
    // },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: getUniqueIdentifier(),
      usesCleartextTraffic: true,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-secure-store',
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you save invoice images',
        },
      ],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#7F3DFF',
          image: './assets/images/splash.png',
          imageWidth: 500,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '1426febd-755c-44aa-a74f-94061487dcc3',
      },
    },
  },
};

export default config;

