import React from 'react';
import { Text } from 'react-native';
import { TextProps, HeaderTextProps } from '@types';

const StylizedText: React.FC<TextProps> = ({ type, children, color = 'text-black' }) => {
  const styles = getStyles(type);
  return (
    <Text className={color} style={styles}>{children}</Text>
  );
};

export const HeaderText: React.FC<HeaderTextProps> = ({
  text,
  highlight,
}) => {
  // 강조할 부분을 찾아서 분리
  const parts = text.split(highlight);

  return (
    <Text className="my-2 mb-4 ml-2 text-xl" style={getStyles('header1')}>
      {parts.map((part, index) => (
        <Text key={index} className="text-black">
          {part}
          {index < parts.length - 1 && (
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
        fontSize: 20,
        lineHeight: 30,
      };
    case 'header2':
      return {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        lineHeight: 22,
      };
    case 'body1':
      return {
        fontFamily: 'Pretendard-Regular',
        textColor: '#000',
        fontSize: 14,
        lineHeight: 20,
      };
    case 'body2':
      return {
        fontFamily: 'Pretendard-ExtraLight',
        fontSize: 12,
        lineHeight: 18,
      };
    case 'caption':
      return {
        fontFamily: 'Pretendard-Thin',
        fontSize: 10,
        lineHeight: 14,
      };
    default:
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        lineHeight: 20,
      };
  }
};

export default StylizedText;
