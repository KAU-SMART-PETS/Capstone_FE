import React from 'react';
import { View, Image } from 'react-native';
import { HeaderText } from '@common/StylizedText';
import { RoundedTextButton } from '@common/RoundedButton';
import { useNavigation } from '@react-navigation/native';

const ResultNoseRegister: React.FC= ({route}) => {
  const navigation = useNavigation();
  const {imageUri, petName, onConfirm} = route?.params;
  return (
    <View className="flex-1 w-full bg-white px-4 py-20">
      <HeaderText highlight={petName} text={`${petName}의 비문이 등록되었습니다.`} />
      <View className="flex-1 justify-top items-center mt-8">
        <Image source={{ uri: imageUri }} className="w-56 h-56 rounded-2xl" />
      </View>
      <View className="absolute bottom-4 left-4 right-4 items-center">
        <RoundedTextButton content="확인" widthOption="xl" onPress={() => {navigation.navigate('MainTab' as never)}} />
      </View>
    </View>
  );
};

export default ResultNoseRegister;
