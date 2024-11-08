import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUserProfile, updateUserProfile } from '@src/api/userApi';
import { UserData } from '@src/utils/constants/types';
import CustomTextInput from '@src/components/common/CustomTextInput';
import StylizedText from '@src/components/common/StylizedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundedTextButton } from '@src/components/common/RoundedButton';

type EditableField = keyof UserData | 'consent' | null;
const EditProfile: React.FC = () => {
  const [editingField, setEditingField] = useState<EditableField>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserProfile();
      if (userData) setUserInfo(userData);
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    if (userInfo) {
      const success = await updateUserProfile(userInfo);
      if (success) {
        setEditingField(null);
        Alert.alert('알림', '정보가 성공적으로 업데이트되었습니다.');
      }
    }
  };

  const handleChange = (key: keyof UserData, value: string | boolean) => {
    setUserInfo(prevInfo => {
      if (prevInfo) {
        return {
          ...prevInfo,
          [key]: value,
        };
      }
      return prevInfo;
    });
  };

  const handleFieldEdit = (field: EditableField) => {
    setEditingField(field);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const renderInput = (
    label: string,
    key: keyof UserData,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default',
  ) => (
      <CustomTextInput
        label={key}
        placeholder={key}
        value={userInfo ? String(userInfo[key] ?? '') : ''}
        onChangeText={(text) => handleChange(key, text)}
        keyboardType={keyboardType}
        isEditableInitially={editingField === key}
        type={(key === 'email' || key === 'phoneNumber') ? 'editableWithButton' : 'readOnly'}
      />

  );

  const handleConsentChange = (key: 'smsOptIn' | 'emailOptIn', value: boolean) => {
    setUserInfo(prevInfo => {
      if (prevInfo) {
        return {
          ...prevInfo,
          [key]: value,
        };
      }
      return prevInfo;
    });
    setEditingField('consent');
  };

  const renderConsentButtons = (type: 'smsOptIn' | 'emailOptIn') => (
    <View className="flex-row justify-between w-[150px]">
      <View className='mr-1'>
        <RoundedTextButton
          color={`${userInfo && userInfo[type] ?  'bg-blue': 'bg-skyblue'}`}
          textColor='text-white'
          textType='body2'
          content="동의"
          borderRadius='rounded-3xl'
          shadow={false}
          widthOption='xs'
          onPress={() => handleConsentChange(type,true)}
        />
      </View>

      <RoundedTextButton
        color={`${userInfo && !userInfo[type] ?  'bg-blue': 'bg-skyblue'}`}
        textColor='text-white'
        textType='body2'
        content="비동의"
        borderRadius='rounded-3xl'
        shadow={false}
        widthOption='xs'
        onPress={() => handleConsentChange(type,false)}
      />
    </View>
  );
  if (!userInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>로딩 중...</Text>
      </View>

    );
  }

  return (
    <SafeAreaView className="flex-1 fixed bg-white">
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
    <TouchableOpacity onPress={handleBackButton} className="pb-5">
      <Text className="text-2xl text-black">{'<'}</Text>
    </TouchableOpacity>


      <StylizedText type='header1'> 회원 기본 정보</StylizedText>

      <View className="w-full bg-white flex items-center py-10">
        {renderInput('이름', 'name')}
        {renderInput('이메일', 'email', 'email-address')}
        {renderInput('소셜 사이트', 'socialSite')}
        {renderInput('휴대폰 번호', 'phoneNumber', 'phone-pad')}
        {renderInput('포인트', 'point')}
      </View>

      <StylizedText type='header2'>광고성 정보 수신</StylizedText>
      
      <View className="flex-row justify-between items-center mb-2.5">
        <StylizedText type="body1">SMS 수신</StylizedText>
        {renderConsentButtons('smsOptIn')}
      </View>

      <View className="flex-row justify-between items-center mb-2.5">
        <StylizedText type="body1">이메일 수신</StylizedText>
        {renderConsentButtons('emailOptIn')}
      </View>

      <View className='pt-10'>
        {(editingField || editingField === 'consent') && (

          <RoundedTextButton 
            color='bg-blue' 
            content="저장하기" 
            widthOption="full" 
            onPress={handleSave} />
        )}
      </View>

    </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
