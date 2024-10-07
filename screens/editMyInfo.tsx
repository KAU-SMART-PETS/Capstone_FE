import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface UserInfo {
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  smsConsent: 'agree' | 'disagree';
  emailConsent: 'agree' | 'disagree';
}

type EditableField = keyof UserInfo | 'consent' | null;

const UserProfileView: React.FC = () => {
  const [editingField, setEditingField] = useState<EditableField>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '김똑똑',
    email: 'smartpets@smart.com',
    username: 'kimdokkdokk',
    phone: '010-1234-5678',
    password: '123456789',
    newPassword: '',
    confirmPassword: '',
    smsConsent: 'agree',
    emailConsent: 'agree',
  });

  useEffect(() => {
    
  }, []);

  const handleSave = () => {
    
    setEditingField(null);
    Alert.alert('알림', '정보가 성공적으로 업데이트되었습니다.');
  };

  const handleChange = (key: keyof UserInfo, value: string) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleFieldEdit = (field: EditableField) => {
    setEditingField(field);
  };
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  };

  const renderInput = (label: string, key: keyof UserInfo, keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default', secureTextEntry: boolean = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            editingField === key && styles.editingInput,
            (key === 'email' || key === 'phone' || key === 'password') && styles.inputWithButton
          ]}
          value={userInfo[key]}
          onChangeText={(text) => handleChange(key, text)}
          keyboardType={keyboardType}
          editable={editingField === key || key === 'newPassword' || key === 'confirmPassword'}
          secureTextEntry={secureTextEntry}
        />
        {(key === 'email' || key === 'phone' || key === 'password') && editingField !== key && (
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

  const handleConsentChange = (key: 'smsConsent' | 'emailConsent', value: 'agree' | 'disagree') => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [key]: value,
    }));
    setEditingField('consent');
  };

  const renderConsentButtons = (type: 'smsConsent' | 'emailConsent') => (
    <View style={styles.consentButtonContainer}>
      <TouchableOpacity
        style={[
          styles.consentButton,
          userInfo[type] === 'agree' && styles.activeConsentButton
        ]}
        onPress={() => handleConsentChange(type, 'agree')}
      >
        <Text style={[
          styles.consentButtonText,
          userInfo[type] === 'agree' && styles.activeConsentButtonText
        ]}>동의</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.consentButton,
          userInfo[type] === 'disagree' && styles.activeConsentButton
        ]}
        onPress={() => handleConsentChange(type, 'disagree')}
      >
        <Text style={[
          styles.consentButtonText,
          userInfo[type] === 'disagree' && styles.activeConsentButtonText
        ]}>비동의</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      <Text style={styles.title}>회원 기본 정보</Text>
      
      {renderInput('이름', 'name')}
      {renderInput('이메일', 'email', 'email-address')}
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          value={userInfo.username}
          editable={false}
        />
      </View>
      
      {renderInput('휴대폰 번호', 'phone', 'phone-pad')}
      {renderInput('비밀번호', 'password', 'default', true)}

      {editingField === 'password' && (
        <>
          {renderInput('새 비밀번호', 'newPassword', 'default', true)}
          {renderInput('새 비밀번호 확인', 'confirmPassword', 'default', true)}
        </>
      )}

      <Text style={styles.consentTitle}>광고성 정보 수신</Text>
      
      <View style={styles.consentContainer}>
        <Text style ={{color : 'black'}}>SMS 수신</Text>
        {renderConsentButtons('smsConsent')}
      </View>
      
      <View style={styles.consentContainer}>
        <Text style ={{color : 'black'}}>이메일 수신</Text>
        {renderConsentButtons('emailConsent')}
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
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
  backButton: {
    padding: 0,
    paddingBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
});

export default UserProfileView;