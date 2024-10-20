// CustomTextInput.tsx
import React from "react";
import { TextInput, TextInputProps } from "react-native";

// Props 인터페이스 정의
interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      className="mb-2 p-2 border border-gray-300 rounded-lg w-[351px] h-[59px]"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomTextInput;
