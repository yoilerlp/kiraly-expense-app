import { Redirect } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

function MainIndexRoute() {
  return <Redirect href={'/main/home'} />;
}

export default MainIndexRoute;

