import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => (
  <View className="flex-1 justify-center w-full bg-primary">
    <ActivityIndicator size={80} animating={true} color="white"/>
  </View>
);

export default Loading;
