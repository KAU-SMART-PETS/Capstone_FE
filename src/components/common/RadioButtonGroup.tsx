import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View } from 'react-native';

interface RadioButtonGroupProps {
  maxChoice?: number;
  onSubmit?: (selectedIds: number[]) => void;
  children: React.ReactNode[];
  containerStyle?: string;
  inactiveOutlineStyle?: 'dashed' | 'solid'; // 새로운 속성 추가
}

interface RadioButtonProps {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  inactiveOutlineStyle?: 'dashed' | 'solid';
}

const RadioButtonGroup = forwardRef<any, RadioButtonGroupProps>(({
  maxChoice = 1,
  onSubmit,
  children,
  containerStyle = '',
  inactiveOutlineStyle = 'dashed', // 기본값 설정
}, ref) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handlePress = (index: number) => {
    setSelectedIds((prevSelectedIds) => {
      let updatedSelectedIds;
      if (prevSelectedIds.includes(index)) {
        updatedSelectedIds = prevSelectedIds.filter(id => id !== index);
      } else if (prevSelectedIds.length < maxChoice) {
        updatedSelectedIds = [...prevSelectedIds, index];
      } else {
        updatedSelectedIds = [...prevSelectedIds.slice(1), index];
      }
      return updatedSelectedIds.sort((a, b) => a - b);
    });
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (onSubmit) {
        onSubmit(selectedIds);
      }
    },
  }));

  return (
    <View className={containerStyle}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<RadioButtonProps>(child)) {
          return React.cloneElement(child, {
            isSelected: selectedIds.includes(index),
            onPress: () => handlePress(index),
            inactiveOutlineStyle, // 비활성화 버튼을 회색 대쉬선으로 할 것인지, 회색 실선으로 할 것인지.
          });
        }
        return child;
      })}
    </View>
  );
});

export default RadioButtonGroup;
