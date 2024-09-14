import Toast, {
  ToastConfig,
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

import { TypographyList as Typography } from '@/theme/Typography';
import { Colors } from '@/theme/Colors';

const config: ToastConfig = {
  success: (props) => {
    return (
      <SuccessToast
        {...props}
        style={{ borderLeftColor: Colors.green_100 }}
        text1Style={{
          ...Typography.Body3,
        }}
        text2Style={{
          ...Typography.Body3,
          fontSize: 14,
        }}
      />
    );
  },
  info: (props) => {
    return (
      <InfoToast
        {...props}
        style={{ borderLeftColor: Colors.yellow_100 }}
        text1Style={{
          ...Typography.Body3,
        }}
        text2Style={{
          ...Typography.Body3,
          fontSize: 14,
        }}
      />
    );
  },
  error: (props) => {
    return (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: Colors.red_100 }}
        text1Style={{
          ...Typography.Body3,
        }}
        text2Style={{
          ...Typography.Body3,
          fontSize: 14,
        }}
      />
    );
  },
};

export default function CustomToast() {
  return <Toast config={config} topOffset={60} visibilityTime={1000} />;
}

