import React from 'react';
import { Text } from 'react-native';
import { TextProps, HeaderTextProps } from '@types';

const StylizedText: React.FC<TextProps> = ({ type, children, customStyle }) => {
  const styles = getStyles(type);

  return (
    <Text style={[styles, customStyle]}>{children}</Text>
  );
};

export const HeaderText: React.FC<HeaderTextProps> = ({
  text,
  highlight,
}) => {
  // 강조할 부분을 찾아서 분리
  const parts = text.split(highlight);

  return (
    <Text className="mb-2 ml-4 font-black">
      {parts.map((part, index) => (
        <Text key={index} className="text-black">
          {part}
          {index < parts.length - 1 && ( // 마지막 부분이 아닐 때 강조
            <Text className="text-primary">{highlight}</Text> // primary 컬러
          )}
        </Text>
      ))}
    </Text>
  );
};

// Function to return the styles based on the type
const getStyles = (type: string) => {
  switch (type) {
    case 'header1':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize: 24,
        color: 'black',
        lineHeight: 30,
      };
    case 'header2':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize: 16,
        color: 'black',
        lineHeight: 22,
      };
    case 'body1':
      return {
        fontFamily: 'Pretendard-ExtraLight',
        fontSize: 14,
        color: '#A3A3AC', // Replace with actual grey
        lineHeight: 20,
      };
    case 'body2':
      return {
        fontFamily: 'Pretendard-ExtraLight',
        fontSize: 12,
        color: '#A3A3AC', // Replace with actual grey
        lineHeight: 18,
      };
    case 'caption':
      return {
        fontFamily: 'Pretendard-ExtraLight',
        fontSize: 10,
        color: '#D9D9D9', // Light Grey
        lineHeight: 14,
      };
    default:
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        color: 'black',
        lineHeight: 20,
      };
  }
};

export default StylizedText;
