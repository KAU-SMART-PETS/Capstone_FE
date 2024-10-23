import React from 'react';
import { View, Text } from 'react-native';
import RoundedBox, {RoundedCircleButton, RoundedTextButton} from '@components/common/RoundedBox';

const ExampleBadge = () => {
  return (
    <View className="flex-1 bg-[#F7F7F7] p-5">
      {/* Example of using RoundedBox with a badge */}
      <RoundedBox
        preset="A"
        shadow={true}
        borderActivate={true}
        isButton={true}
      >
        <View className="p-4">
          
        </View>
      </RoundedBox>
    </View>
  );
};

export default ExampleBadge;
