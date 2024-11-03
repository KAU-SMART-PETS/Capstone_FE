import React, { useRef } from 'react';
import { Alert, View } from 'react-native';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';

// 비활성화 된 버튼에는 dashed, solid의 두 가지 종류 외곽선 스타일 존재.

// Dashed 스타일
const RadioButtonExampleDashed: React.FC = () => {
  const radioButtonGroupRef = useRef<any>(null);

  const handleExternalSubmit = () => { // 외부에서 Ref를 통해, 라디오버튼 내부를 참조함 (라디오버튼그룹에 외부의 제출버튼이 눌린 걸 전달)
    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }
  };

  return (
    <View className='px-12 mt-6'>
      <RadioButtonGroup
        ref={radioButtonGroupRef}
        maxChoice={1}
        onSubmit={(selectedIds) => Alert.alert('Selected options:', JSON.stringify(selectedIds))}
        inactiveOutlineStyle='dashed' // 회색 선 - 대쉬선 스타일로.
        containerStyle='flex-row flex-wrap justify-around'
      >
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 1</StylizedText>
        </RadioButton>
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 2</StylizedText>
        </RadioButton>
      </RadioButtonGroup>
      <RoundedTextButton content="Submit (Dashed)" color='bg-secondary' widthOption='xl' onPress={handleExternalSubmit} />
    </View>
  );
};

// Solid 스타일
const RadioButtonExampleSolid: React.FC = () => {
  const radioButtonGroupRef = useRef<any>(null);

  const handleExternalSubmit = () => { // 외부에서 Ref를 통해, 라디오버튼 내부를 참조함 (라디오버튼그룹에 외부의 제출버튼이 눌린 걸 전달)
    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }
  };

  return (
    <View className='px-12 mt-6'>
      <RadioButtonGroup
        ref={radioButtonGroupRef}
        maxChoice={1}
        onSubmit={(selectedIds) => Alert.alert('Selected options:', JSON.stringify(selectedIds))}
        inactiveOutlineStyle='solid' // 회색 선 - 대쉬선 스타일로.
        containerStyle='flex-row flex-wrap justify-around'
      >
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 1</StylizedText>
        </RadioButton>
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 2</StylizedText>
        </RadioButton>
      </RadioButtonGroup>
      
      <RoundedTextButton content="Submit (Solid)" color='bg-primary' widthOption='xl' onPress={handleExternalSubmit} />
    </View>
  );
};

const RadioButtonExamplesScreen: React.FC = () => {
  return (
    <View className="flex-1">
      <RadioButtonExampleDashed />
      <RadioButtonExampleSolid />
    </View>
  );
};

export default RadioButtonExamplesScreen;
