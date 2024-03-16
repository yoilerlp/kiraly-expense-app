import { View } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Input from '@/components/input';
import Button from '@/components/button';

export default function SetPasswordScreen() {
  const { styles } = useStyles(setPasswordStyle);
  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Input isPassword placeholder='New Password' />
        <Input placeholder='Retype new password' isPassword />
        <Button style={{ marginTop: 16 }} size='full' text='Continue' />
      </View>
    </View>
  );
}

const setPasswordStyle = createStyleSheet((theme) => ({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  formContainer: {
    gap: 24,
    marginBottom: 34,
  },
}));

