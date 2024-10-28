// Example Usage in a Screen or Component
import React, { useRef } from 'react';
import { Alert, Button, View } from 'react-native';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';

const RadioButtonExample: React.FC = () => {
  const radioButtonGroupRef = useRef<any>(null);

  const handleExternalSubmit = () => {
    // 외부 버튼에서 RadioButtonGroup의 submit 호출
    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }
  };

  return (
    <View className='px-12 mt-6'>
      <RadioButtonGroup
        ref={radioButtonGroupRef}
        maxChoice={2}
        onSubmit={(selectedIds) => Alert.alert('Selected options:', JSON.stringify(selectedIds))}
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
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 3</StylizedText>
        </RadioButton>
        <RadioButton>
          <Avatar size={60} />
          <StylizedText type="body1" styleClass="mt-3">Label 4</StylizedText>
        </RadioButton>
      </RadioButtonGroup>
      
      <RoundedTextButton content="Submit" widthOption='xl' onPress={handleExternalSubmit} />
    </View>
  );
};

export default RadioButtonExample;
