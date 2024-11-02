import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import CustomTextInput from '@common/CustomTextInput';

const TextInputExample: React.FC<RootStackParamList> = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678'); // 테스트 값
  const storedName = '홍길동'; // 읽기 전용 테스트 값
  const [password, setPassword] = useState(''); // 패스워드 상태
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 가시성

  // 패스워드 가시성 토글 함수
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <SafeAreaView className="flex-1 fixed">
        {/* <ScrollView> */}
        <View className='h-full flex items-center justify-center bg-white py-10'>
        <CustomTextInput // 이메일 입력 필드
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChangeText={setEmail} 
          keyboardType="email-address"  // 이메일 입력 키보드
        />

        <CustomTextInput //  휴대폰 번호 필드 (읽기 전용, 변경 버튼 있음)
          label="휴대폰 번호"
          value={phoneNumber}
          placeholder={'010-1234-5678'}
          onChangeText={setPhoneNumber}
          isEditableInitially={false} // 처음엔 읽기 전용
          type="editableWithButton" // 변경 버튼이 있는 수정 가능한 필드
          keyboardType="phone-pad" 
        />

        <CustomTextInput // 이름 필드 (완전히 읽기 전용)
          label="이름"
          value={storedName} // 저장된 데이터를 표시
          isEditableInitially={false} // 읽기 전용
          type="readOnly"
        />

          <CustomTextInput
            label="블루투스"
            value="1234"
            placeholder="블루투스 기기 목록"
            type="iconField"
            iconLibrary="Ionicons"
            iconName="bluetooth"
          />
        
        <CustomTextInput
          label="비밀번호"
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChangeText={setPassword}
          type="passwordField"  // 비밀번호 필드로 지정
        />
      </View>
      </SafeAreaView>

    </>
  );
};

export default TextInputExample;
