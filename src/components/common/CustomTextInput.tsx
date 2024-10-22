import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import StylizedText from './StylizedText';

interface CustomTextInputProps {
  label: string;         // 라벨
  value: string;         // 불러온 저장된 값
  placeholder?: string;  // 플레이스홀더 (입력 모드일 경우)
  onChangeText?: (text: string) => void; // 텍스트 변경 핸들러
  isEditableInitially?: boolean; // 처음부터 입력 모드인지 여부
  hasEditButton?: boolean; // 변경 버튼을 표시할지 여부
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, value, placeholder, onChangeText, isEditableInitially = true, hasEditButton = true }) => {
  const [isEditable, setIsEditable] = useState(isEditableInitially); // 입력 가능 여부 상태

  const handleEditToggle = () => {
    setIsEditable(true); // 읽기 모드에서 입력 모드로 전환
  };

  return (
    <View className="w-[361px] h-[50px] border-[1.5px] inset-y-2 border-lightgrey rounded-[16px] p-3 flex-row items-center justify-between">
      <View className="flex-1">
        {/* 라벨 텍스트 */}
        <StylizedText type="header3" style={{ color: '#D9D9D9', marginBottom: -6 }}>
          {label}
        </StylizedText>

        {/* 입력 필드 또는 읽기 전용 값 표시 */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder} // 플레이스홀더를 입력 모드에서만 표시
          editable={isEditable}      // 읽기 전용/입력 모드 전환
          style={{
            fontFamily: 'Pretendard-Medium',
            fontSize: 16,      // header3 스타일
            lineHeight: 22,
            color: '#000000',  // 텍스트 색상
          }}
        />
      </View>

      {/* 읽기 모드일 때만 변경 버튼 표시 (hasEditButton이 true일 때만 표시) */}
      {!isEditable && hasEditButton && (
        <Pressable
          className="bg-lightgrey px-3 py-1 rounded-full"
          onPress={handleEditToggle} // 버튼 클릭 시 입력 모드로 전환
        >
          <StylizedText type="header3">변경</StylizedText>
        </Pressable>
      )}
    </View>
  );
};

export default CustomTextInput;