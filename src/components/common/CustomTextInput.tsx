import React, { useState, ReactNode } from 'react';
import { View, TextInput, Pressable, Keyboard } from 'react-native';
import StylizedText, { getStyles } from './StylizedText';
import { ColorMap, OpacityMap } from '@common/ColorMap';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

interface PickerItem {
  label: string;
  value: string;
}

interface CustomTextInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  isEditableInitially?: boolean;
  rightComponent?: ReactNode;
  type?: 'readOnly' | 'editableWithButton' | 'freeText' | 'iconField' | 'passwordField' | 'picker';
  iconLibrary?: 'Ionicons' | 'Feather';
  iconName?: string;
  iconSize?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'number-pad' | 'url' | 'web-search' | 'visible-password';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'none' | 'previous';
  maxLength?: number;
  pickerItems?: PickerItem[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  isEditableInitially = true,
  rightComponent,
  type = 'freeText',
  iconLibrary,
  iconName,
  iconSize = 20,
  keyboardType = 'default',
  returnKeyType = 'done',
  maxLength,
  pickerItems = [],
}) => {
  const IconColor = ColorMap['secondary'] + OpacityMap[60]; // Semi-transparent icon color
  const [isEditable, setIsEditable] = useState(
    type === 'editableWithButton' && !!onChangeText && isEditableInitially
  );
  const [isFocused, setIsFocused] = useState(false);  // Focus state
  const [hasError, setHasError] = useState(false);   // Error state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // Password visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const InputBoxStyle = getStyles('header3') || {};

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    if (onChangeText && type === 'editableWithButton') {
      setIsEditable(false);
    }
    validateInput(value);
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Toggle editable mode for 'editableWithButton' type
  const handleEditToggle = () => {
    if (onChangeText && type === 'editableWithButton') {
      setIsEditable(true);
    }
  };

  // Handle submitting text input
  const handleSubmitEditing = () => {
    if (onChangeText && type === 'editableWithButton') {
      setIsEditable(false);
      Keyboard.dismiss();
    }
    validateInput(value);
  };

  // Validate input based on keyboardType
  const validateInput = (text: string) => {
    if (!text.trim()) {
      setHasError(false);
      setErrorMessage('');
      return true;
    }

    const regexMap: { [key: string]: RegExp | null } = {
      'default': null,
      'email-address': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'phone-pad': /^\d{3}-\d{3,4}-\d{4}$/,
      'numeric': /^\d+$/,
    };

    const regex = regexMap[keyboardType];
    if (regex && !regex.test(text)) {
      setHasError(true);
      setErrorMessage(
        keyboardType === 'email-address'
          ? '유효한 이메일 주소를 입력하세요.'
          : keyboardType === 'phone-pad'
          ? '유효한 전화번호를 입력하세요.'
          : keyboardType === 'numeric'
          ? '숫자만 입력하세요.'
          : '유효한 값을 입력하세요.'
      );
      return false;
    }
    setHasError(false);
    setErrorMessage(null);
    return true;
  };

  // picker
  const renderPicker = () => (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => onChangeText?.(itemValue.toString())}
      style={{ flex: 1 }}
    >
      <Picker.Item label={placeholder} value="" />
      {pickerItems.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );

  // Format phone number (specific for phone-pad)
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  // Determine if the field is editable
  const isFieldEditable = () => {
    if (type === 'readOnly') return false;
    if (!onChangeText) return false;
    if (type === 'editableWithButton') return isEditable;
    return true;
  };

  // Render the icon dynamically based on iconLibrary
  const renderIcon = () => {
    if (!iconLibrary || !iconName) return null;

    const iconProps = {
      name: iconName as string,
      size: iconSize,
      color: IconColor,
    };

    switch (iconLibrary) {
      case 'Ionicons':
        return <Ionicons {...iconProps} />;
      case 'Feather':
        return <Feather {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <View className="w-[90%] my-2">
      {errorMessage && (
        <StylizedText type='label' styleClass='text-red ml-2 mb-1'>{errorMessage}</StylizedText>
      )}
      <View
        className={`
          h-[54px] border-[1.5px] rounded-[16px] px-3 flex-row items-center justify-between
          ${hasError ? 'border-2 border-red' : isFocused ? 'border-2 border-primary border-opacity-30' : 'border-secondary'} 
        `}
      >
        <View className="flex-1">
          {label && (
            <View className="pl-1 mt-1.5 absolute"> 
              <StylizedText type="label" styleClass="text-secondary">
                {label}
              </StylizedText>
            </View>
          )}
          {type === 'picker' && pickerItems.length > 0
          ? renderPicker()
          : (
          <TextInput
            className="px-1 mt-[14px] text-secondary"
            value={value}
            onChangeText={(text) => {
              if (keyboardType === 'phone-pad') {
                text = formatPhoneNumber(text);
              }
              onChangeText?.(text);
              validateInput(text);
            }}
            placeholder={placeholder}
            editable={isFieldEditable()}
            secureTextEntry={type === 'passwordField' && !isPasswordVisible}
            style={InputBoxStyle}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onSubmitEditing={handleSubmitEditing}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
          />
            )}
        </View>
        {errorMessage && (
          <Feather name='alert-circle' size={18} color={ColorMap['red'] + OpacityMap[70]} className="mr-4" />
        )}

        {type === 'passwordField' ? (
          <Pressable onPress={togglePasswordVisibility} className="mr-1">
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={iconSize}
              color={IconColor}
            />
          </Pressable>
        ) : type === 'iconField' && (rightComponent || (iconLibrary && iconName)) ? (
          <View className="mr-2">
            {rightComponent || renderIcon()}
          </View>
        ) : (
          type === 'editableWithButton' && !isEditable && onChangeText && (
            <Pressable
              className="bg-gray-200 px-3 py-1 rounded-full ml-2"
              onPress={handleEditToggle}
            >
              <StylizedText type="header3">변경</StylizedText>
            </Pressable>
          )
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
