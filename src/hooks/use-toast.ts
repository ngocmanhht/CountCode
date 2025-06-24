import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import Toast from 'react-native-toast-message';
import {AppColor} from '../const/app-color';

export const useToast = () => {
  const showSuccess = (message: string) => {
    Toast.show({
      type: 'success',
      text2: message,
      text2Style: text2Style,
      visibilityTime: 2000,
    });
  };

  const showInfo = (message: string) => {
    Toast.show({
      type: 'info',
      text2: message,
      text2Style: text2Style,
      visibilityTime: 2000,
    });
  };

  const showError = (message: string) => {
    Toast.show({
      type: 'error',
      text2: message,
      text2Style: text2Style,
      visibilityTime: 2000,
    });
  };

  return {showSuccess, showInfo, showError};
};

const text2Style: StyleProp<TextStyle> = {
  fontSize: 14,
  color: AppColor.black,
};
