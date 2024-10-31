// src/components/RadioButtonGroup.tsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View } from 'react-native';

interface RadioButtonGroupProps {
  maxChoice?: number;
  onSubmit?: (selectedIds: number[]) => void;
  children: React.ReactNode[];
  containerStyle?: string;
}

interface RadioButtonProps {
  isSelected?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const RadioButtonGroup = forwardRef<any, RadioButtonGroupProps>(({
  maxChoice = 1,
  onSubmit,
  children,
  containerStyle = '',
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
      return updatedSelectedIds.sort((a, b) => a - b); // 오름차순 정렬
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
          });
        }
        return child;
      })}
    </View>
  );
});

export default RadioButtonGroup;
