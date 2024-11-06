import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { RoundedTextButton, RoundedCircleButton, RoundedSquareButton } from '@common/RoundedButton';
import StylizedText from '@common/StylizedText';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import addPetImage from '@image/frame/addPetCircle.png';

// TextButtonExamples 컴포넌트
const TextButtonExamples = () => (
  <>
    <Text className="text-lg font-bold mt-6 mb-2">RoundedTextButton 타입들</Text>
    <View className="flex-row flex-wrap justify-around">
      <RoundedTextButton color="bg-skyblue" icon={<MCIcon name="chart-bar" color="black" size={20} />} textColor="text-black" content="분석" onPress={() => console.log('Primary Button Pressed')} />
      <RoundedTextButton color="bg-skyblue" icon={<MCIcon name="reload" color="black" size={20} />} textColor="text-black" content="다시 찍기" onPress={() => console.log('Primary Button Pressed')} />
      <RoundedTextButton content="Primary Button with Shadow" shadow={true} widthOption="md" onPress={() => console.log('Primary Button Pressed')} />
      <RoundedTextButton content="갤러리에서 가져오기" widthOption="lg" color="bg-primary" onPress={() => console.log('갤러리에서 가져오기')} />
      <RoundedTextButton content="촬영하기" widthOption="lg" color="bg-primary" onPress={() => console.log('촬영하기')} />
      <RoundedTextButton content="START!" textType="header2" widthOption="md" shadow={true} onPress={() => console.log('스타트 버튼')} />
      <RoundedTextButton content="종료" widthOption="sm" extraStyleClass="py-3" onPress={() => console.log('종료 버튼')} />
      <RoundedTextButton color="bg-transparent" textColor="text-primary" content="투명한 배경" widthOption="sm" onPress={() => console.log('Small Width Button Pressed')} />
      <RoundedTextButton content="분석을 원하시면 분석 버튼을 눌러주세요." color="bg-secondary" widthOption="xl" onPress={() => console.log('분석하기')} />
      <RoundedTextButton content="가입하기" widthOption="full" onPress={() => console.log('가입하기')} />
    </View>
  </>
);

// CircleButtonExamples 컴포넌트
const CircleButtonExamples = () => (
  <>
    <Text className="text-lg font-bold mt-6 mb-2">RoundedCircleButton 타입들</Text>
    <View className="flex-row space-x-4">
      <RoundedCircleButton color="bg-skyblue border border-2 border-primary" size={40} onPress={() => console.log('Circle Button Pressed')}>
        <MCIcon name="dog" size={22} color="black" />
      </RoundedCircleButton>
      <RoundedCircleButton color="bg-white" size={40} onPress={() => console.log('Circle Button Pressed')}>
        <MCIcon name="dog" size={22} color="black" />
      </RoundedCircleButton>
      <RoundedCircleButton color="bg-primary" shadow={true} size={40} onPress={() => console.log('Circle Button Pressed')}>
        <MCIcon name="thumb-up" size={22} color="white" />
      </RoundedCircleButton>
      <RoundedCircleButton color="bg-white" shadow={false} size={100} onPress={() => console.log('Circle Button Pressed')}>
        <Image source={addPetImage} style={{ width: 100, height: 100 }} />
      </RoundedCircleButton>
      <RoundedCircleButton color="bg-white" shadow={true} size={60} onPress={() => console.log('Circle Button Pressed')}>
        <MCIcon name="heart" size={28} color="red" />
      </RoundedCircleButton>
      <RoundedCircleButton color="bg-black" shadow={false} size={35} onPress={() => console.log('Circle Button Pressed')}>
        <MCIcon name="star" size={15} color="yellow" />
      </RoundedCircleButton>
    </View>
  </>
);

// SquareButtonExamples 컴포넌트
const SquareButtonExamples = () => (
  <>
    <View className="mb-8">
      <Text className="text-lg font-bold mb-2">RoundedSquareButton 타입들</Text>
      <View className="flex-row flex-wrap justify-around">
        {/* 미니 사각형 버튼 */}
        <RoundedSquareButton 
        size='xs' rounded='lg' outline='dotted' backgroundColor='bg-white'
        onPress={() => console.log('Primary Button Pressed')} >
        <MCIcon name='cat' color='black' size={30} />
        <StylizedText type='label' styleClass='text-black'>고양이</StylizedText>
      </RoundedSquareButton>
        {/* 작은 크기 사각형 버튼 */}
        <RoundedSquareButton 
          size='sm' rounded='2xl' outline='dotted'
          onPress={() => console.log('Primary Button Pressed')} >
          <MCIcon name='camera' color='black' size={20} />
          <StylizedText type='header3' styleClass='text-black'>사진 등록</StylizedText>
        </RoundedSquareButton>
        {/* 기본 크기 사각형 버튼 */}
        <RoundedSquareButton 
          size="md" shadow={true} backgroundColor='bg-white'
          onPress={() => console.log('Square Button Pressed')}>
          <MCIcon name="star" size={30} color="yellow" />
          <StylizedText type="body1" styleClass="text-black mt-1">Favorite</StylizedText>
        </RoundedSquareButton>
      </View>
    </View>
  </>
);


// ButtonExamples 메인 컴포넌트
const ButtonExamples = () => (
  <ScrollView className="flex-1 bg-white p-5">
    <TextButtonExamples />
    <CircleButtonExamples />
    <SquareButtonExamples />
  </ScrollView>
);

export default ButtonExamples;
