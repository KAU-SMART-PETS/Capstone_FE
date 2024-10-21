import React from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '@types';

// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText from '@components/common/StylizedText';
import Badge from '@components/common/Badge';

const Example2 : React.FC<RootStackParamList> = () => {
  return (
    <View className="flex-1 bg-whitegrey pt-10 px-5">
        <StylizedText type="header1">진짜 비상이다...</StylizedText>
      <Badge text="공습경보" color="bg-yellow" customStyle="px-4" />
    </View>
  );
};

export default Example2;