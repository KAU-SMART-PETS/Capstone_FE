import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import emptyCircleFrame from '@image/frame/addPetCircle.png';
import { PetRegistRequest } from '@src/utils/constants/types';
import { submitPetRegistration } from '@src/api/petApi';
import CustomTextInput from '@src/components/common/CustomTextInput';
import { RoundedCircleButton, RoundedTextButton } from '@src/components/common/RoundedButton';
import StylizedText from '@src/components/common/StylizedText';
import Avatar from '@src/components/common/Avatar';


const PetRegister = () => {
  const navigation = useNavigation();

  const [petType, setPetType] = useState<'강아지' | '고양이' | ''>('');
  const [gender, setGender] = useState<'암' | '수' | ''>('');
  const [petImage, setPetImage] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>(''); 
  const [weight, setWeight] = useState<string>(''); 
  const [age, setAge] = useState<string>(''); 

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setPetImage(response.assets[0]); 
      }
    });
  };

  const handleSubmit = () => {
    const petData: PetRegistRequest = {
      name,
      petType: petType === '강아지' ? 2 : 1,
      gender: gender === '암' ? 2 : 1,
      weight: parseFloat(weight),
      age: parseInt(age),
      image: petImage?.uri || '',
    };
    submitPetRegistration(petData, navigation);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
    <View className="flex items-center">
      {/* Back Button */}
      <TouchableOpacity onPress={handleBackButton} className="absolute top-5 left-5">
        <Text className="text-2xl text-gray-500">{'<'}</Text>
      </TouchableOpacity>

      {/* Pet Image */}
      <View className="mb-6 mt-20">
        <RoundedCircleButton color="bg-white" shadow={false} size={100} onPress={handleImagePick}>
          <Avatar 
            source={petImage ? { uri: petImage.uri } : emptyCircleFrame}  
            size={150}
          />
        </RoundedCircleButton>
        <View className="mt-10">
          <StylizedText type="body1">눌러서 사진 변경</StylizedText>
        </View>
      </View>

      {/* Input Fields */}
      <CustomTextInput label="이름" placeholder="이름을 입력하세요" value={name} onChangeText={setName} keyboardType="default" />
      <CustomTextInput label="견종/묘종" placeholder="견종 / 묘종을 입력하세요" value={breed} onChangeText={setBreed} keyboardType="default" />
      <CustomTextInput label="체중(kg)" placeholder="체중 (kg)을 입력하세요" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <CustomTextInput label="나이" placeholder="나이를 입력하세요" value={age} onChangeText={setAge} keyboardType="numeric" />

      {/* Pet Type Row */}
      <View className="w-full flex-row justify-around items-center mb-5 pt-5">

        <TouchableOpacity
          onPress={() => setPetType('강아지')}
          className="flex-row items-center"
        >
          <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${petType === '강아지' ? 'bg-blue' : ''}`}>
            {petType === '강아지' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>
          <View className='pl-5'>
            <StylizedText type='header2'>강아지</StylizedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPetType('고양이')}
          className="flex-row items-center"
        >
          <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${petType === '고양이' ? 'bg-blue' : ''}`}>
            {petType === '고양이' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>
          <View className='pl-5'>
            <StylizedText type='header2'>고양이</StylizedText>
          </View>
        </TouchableOpacity>
      </View>

      {/* Gender Row */}
      <View className="w-full flex-row justify-around items-center mb-5 ">
        <TouchableOpacity
          onPress={() => setGender('암')}
          className="flex-row items-center -ml-6"
        >
          <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${gender === '암' ? 'bg-blue' : ''}`}>
            {gender === '암' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>
          <View className='pl-5'>
            <StylizedText type='header2'>암</StylizedText>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender('수')}
          className="flex-row items-center mr-2"
        >
          <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${gender === '수' ? 'bg-blue' : ''}`}>
            {gender === '수' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>
          <View className='pl-5'>
            <StylizedText type='header2'>수</StylizedText>
          </View>

        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <View className='pt-5'>
        <RoundedTextButton
          content={'저장하기'}
          textType='header2'
          widthOption="full"
          color="bg-primary"
          onPress={handleSubmit}
        />
      </View>

    </View>
  </ScrollView>
</SafeAreaView>
  );
};


export default PetRegister;
