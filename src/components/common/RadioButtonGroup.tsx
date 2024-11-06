import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View } from 'react-native';

interface RadioButtonGroupProps {
  maxChoice?: number;
  onSubmit?: (selectedIds: number[]) => void; // Submit 시 선택된 ID 배열
  onSelect?: (selectedIds: number[]) => void; // 선택 상태 변경 시 호출
  children: React.ReactNode[];
  containerStyle?: string;
  inactiveOutlineStyle?: 'dashed' | 'solid';
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
  onSelect, // 새로운 콜백 추가
  children,
  containerStyle = '',
  inactiveOutlineStyle = 'dashed',
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
  
      // 상태 업데이트 이후 콜백 실행
      setTimeout(() => {
        if (onSelect) {
          onSelect(updatedSelectedIds);
        }
      }, 0);
  
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
            inactiveOutlineStyle,
          });
        }
        return child;
      })}
    </View>
  );
});

export default RadioButtonGroup;
