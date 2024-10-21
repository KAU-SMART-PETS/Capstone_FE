import React, {useState} from 'react';
import { View, Image } from 'react-native';
import { RootStackParamList } from '@types';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarPlaceholder from '@image/placeholder/dog.jpg';
import StylizedText from '@components/common/StylizedText';
import RoundedBox, {RoundedCircleButton, RoundedTextButton} from '@components/common/RoundedBox';

const ButtonSquare1 :React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const Avatar = (
      <View className="w-20 h-20 rounded-full overflow-hidden z-0">
          <Image source={AvatarPlaceholder} className="w-20 h-20"/>
        </View>
    );
    const handleSelect = (newState: boolean) => {
      // 선택 상태에 따라 처리
      console.log('Selected:', newState);
      // 예를 들어, 특정 옵션이 선택되었다면 해당 상태를 관리할 수 있습니다.
      setSelectedOption(newState ? 'Selected' : 'Not Selected');
    };
  
    return (
      <View className='flex-row align-center justify-between px-16'>
        <RoundedBox
          preset="B"
          onPress={() => console.log('Option 1 pressed')}
          onSelect={handleSelect}
          borderActivate={true} // Activate border styling
          isButton={true} // Indicate this is a button
          shadow={false}
          badgeColor='bg-rose-700'
          badgeText='공습경보!!!'
        >
        {Avatar}
        <StylizedText type="body1" color='text-orange'>Option1</StylizedText>
        </RoundedBox>
        <RoundedBox
          preset="A"
          onPress={() => console.log('Option 2 pressed')}
          onSelect={handleSelect}
          borderActivate={true}
          isButton={true}
          shadow={false}
        >
        {Avatar}
        <StylizedText type="body1" color='text-orange'>Option1</StylizedText>
        </RoundedBox>
      </View>
    );
};

const Example1 : React.FC<RootStackParamList> = () => {

  return (
    <View className="flex-1 bg-[#F7F7F7] pt-10 px-5">
      <ButtonSquare1 />
      <RoundedCircleButton onPress={() => console.log("button pressed!!!")} size={30}>
        <MCIcon name="paw" size={30}/>
      </RoundedCircleButton>

      <RoundedTextButton onPress={() => console.log("button pressed!!!")}
          color="bg-white" shadow={false} textColor="text-white"
          content={'예시 텍스트'}
        />
      
      <View className="flex-row bg-[#F7F7F7] pt-10 px-5">
        <RoundedTextButton onPress={() => console.log("button pressed!!!")} color="bg-grey" widthOption="md"
          content={'취소'}
        />
        <RoundedTextButton onPress={() => console.log("button pressed!!!")} widthOption="md"
          content={'확인'}
        />
      </View>

      
    </View>
  );
};

export default Example1;
