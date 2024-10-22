import React, {useState} from 'react';
import { View } from 'react-native';

import { RootStackParamList } from '@types';
import CustomTextInput from '@common/CustomTextInput';
import Calendar from '@common/Calendar';

const TextInputExample : React.FC<RootStackParamList> = () => {
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('010-1234-5678') // 테스트 값
    const storedName = '홍길동'; // 읽기 전용 테스트 값

  return (
    <>
    <View className="flex-1 items-center justify-center bg-white h-full">
          {/* 입력 필드 테스트 */}
          <CustomTextInput
            label="이메일"
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail} // 입력 필드이므로 onChangeText 사용
            isEditableInitially={true} // 처음부터 입력 가능
          />

          {/* 읽기 전용 필드 (변경 버튼 있음) */}
          <CustomTextInput
            label="휴대폰 번호"
            value={phoneNumber}      // 읽기 전용 데이터
            onChangeText={setPhoneNumber} // "변경" 버튼을 눌렀을 때 수정 가능
            isEditableInitially={false} // 처음엔 읽기 전용
            hasEditButton={true} // 변경 버튼 추가
          />

          {/* 읽기 전용 필드 (변경 버튼 없음) */}
          <CustomTextInput
            label="이름"
            value={storedName}     // 저장된 데이터를 표시
            isEditableInitially={false} // 읽기 전용
            hasEditButton={false} // 변경 버튼 없음
          />
    </View>
    <View className="flex-1 items-center justify-center bg-white">
        <Calendar />
    </View>
    </>
  );
};

export default TextInputExample;