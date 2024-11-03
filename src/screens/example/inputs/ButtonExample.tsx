import React from 'react';
import { View, Text } from 'react-native';
import { RoundedTextButton, RoundedCircleButton } from '@common/RoundedButton';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// TODO : 쉐도우가 있는 버튼을 눌렀을 때 눌린 타이밍에 배경색상이 이상하게 변하는 것 고쳐야함.
// TODO : 이것 외에 피그마에 있는 다른 사진인지 뭔지 배경들어간 버튼 처리하기 + 일반 레이블 라디오버튼 추가(이건 라이브러리로?)

const ButtonExamples = () => {
  return (
    <View className="flex-1 bg-silver p-5">
      <Text className="text-xl font-bold mb-4">Rounded Button Examples</Text>

      {/* RoundedTextButton Examples */}
      <Text className="text-lg font-bold mt-6 mb-2">RoundedTextButton 타입들</Text>
      <View className="space-y-4">

        {/* Primary Button with Shadow */}
        <RoundedTextButton
          color="bg-primary"
          textColor="text-white"
          content="Primary Button with Shadow"
          shadow={true}
          widthOption="md"
          onPress={() => console.log('Primary Button Pressed')}
        />

        {/* Secondary Button with No Shadow */}
        <RoundedTextButton
          color="bg-secondary"
          textColor="text-black"
          content="Secondary Button No Shadow"
          shadow={false}
          widthOption="lg"
          borderRadius="rounded-2xl"
          onPress={() => console.log('Secondary Button Pressed')}
        />

        {/* White Button with Small Width */}
        <RoundedTextButton
          color="bg-transparent"
          textColor="text-primary"
          content="small"
          shadow={false}
          widthOption="sm"
          onPress={() => console.log('Small Width Button Pressed')}
        />

        {/* Black Button with Full Width */}
        <RoundedTextButton
          color="bg-black"
          textColor="text-white"
          content="Full Width Button"
          shadow={true}
          widthOption="full"
          borderRadius="rounded-xl"
          onPress={() => console.log('Full Width Button Pressed')}
        />
      </View>

      {/* RoundedCircleButton Examples */}
      <Text className="text-lg font-bold mt-6 mb-2">RoundedCircleButton 타입들</Text>
      <View className="flex-row space-x-4">

        {/* Circle Button with Primary Color and Shadow */}
        <RoundedCircleButton
          color="bg-primary"
          shadow={true}
          size={40}
          onPress={() => console.log('Circle Button Pressed')}
        >
          <MCIcon name="thumb-up" size={20} color="white" />
        </RoundedCircleButton>

        {/* Circle Button with Secondary Color and No Shadow */}
        <RoundedCircleButton
          color="bg-secondary"
          shadow={false}
          size={50}
          onPress={() => console.log('Circle Button Pressed')}
        >
          <MCIcon name="thumb-down" size={24} color="black" />
        </RoundedCircleButton>

        {/* Circle Button with White Background and Larger Size */}
        <RoundedCircleButton
          color="bg-white"
          shadow={true}
          size={60}
          onPress={() => console.log('Circle Button Pressed')}
        >
          <MCIcon name="heart" size={28} color="red" />
        </RoundedCircleButton>

        {/* Circle Button with Black Background and Small Size */}
        <RoundedCircleButton
          color="bg-black"
          shadow={false}
          size={30}
          onPress={() => console.log('Circle Button Pressed')}
        >
          <MCIcon name="star" size={16} color="yellow" />
        </RoundedCircleButton>
      </View>
    </View>
  );
};

export default ButtonExamples;
