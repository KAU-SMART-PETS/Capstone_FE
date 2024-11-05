import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUserProfile, updateUserProfile } from '@src/api/userApi';
import { UserData } from '@src/utils/constants/types';

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
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            editingField === key && styles.editingInput,
            (key === 'email' || key === 'phoneNumber') && styles.inputWithButton,
          ]}
          value={userInfo ? String(userInfo[key] ?? '') : ''}
          onChangeText={(text) => handleChange(key, text)}
          keyboardType={keyboardType}
          editable={editingField === key}
        />
        {(key === 'email' || key === 'phoneNumber') && editingField !== key && (
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => handleFieldEdit(key)}
          >
            <Text style={styles.changeButtonText}>변경</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    <View style={styles.consentButtonContainer}>
      <TouchableOpacity
        style={[
          styles.consentButton,
          userInfo && userInfo[type] && styles.activeConsentButton,
        ]}
        onPress={() => handleConsentChange(type, true)}
      >
        <Text style={[
          styles.consentButtonText,
          userInfo && userInfo[type] && styles.activeConsentButtonText,
        ]}
        >
          동의
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.consentButton,
          userInfo && !userInfo[type] && styles.activeConsentButton,
        ]}
        onPress={() => handleConsentChange(type, false)}
      >
        <Text style={[
          styles.consentButtonText,
          userInfo && !userInfo[type] && styles.activeConsentButtonText,
        ]}
        >
          비동의
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>회원 기본 정보</Text>

      {renderInput('이름', 'name')}
      {renderInput('이메일', 'email', 'email-address')}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>소셜 사이트</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f0f0f0' }]}
          value={userInfo.socialSite}
          editable={false}
        />
      </View>

      {renderInput('휴대폰 번호', 'phoneNumber', 'phone-pad')}
      {renderInput('포인트', 'point')}

      <Text style={styles.consentTitle}>광고성 정보 수신</Text>

      <View style={styles.consentContainer}>
        <Text style={{ color: 'black' }}>SMS 수신</Text>
        {renderConsentButtons('smsOptIn')}
      </View>

      <View style={styles.consentContainer}>
        <Text style={{ color: 'black' }}>이메일 수신</Text>
        {renderConsentButtons('emailOptIn')}
      </View>

      {(editingField || editingField === 'consent') && (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  inputWithButton: {
    paddingRight: 50,
  },
  editingInput: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
  },
  changeButton: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{ translateY: -12 }],
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#87CEEB',
    borderRadius: 15,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  consentTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  consentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  consentButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  consentButton: {
    borderWidth: 1,
    borderColor: '#87CEEB',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeConsentButton: {
    backgroundColor: '#87CEEB',
  },
  consentButtonText: {
    color: '#87CEEB',
  },
  activeConsentButtonText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#87CEEB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 0,
    paddingBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
});

export default EditProfile;
