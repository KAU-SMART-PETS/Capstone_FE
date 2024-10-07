// CustomTextInput.js
import React from "react";
import { TextInput } from "react-native";

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={{
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        width: 351,
        height: 59,
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomTextInput;
