import React from 'react';
import { Text } from 'react-native';
import { TextProps, HeaderTextProps } from '@types';

export type TextStyleType = 'header1' | 'header2' | 'body1' | 'body2' | 'caption';

type TextProps = {
  type?: TextStyleType;
  color?: string,
  children?: React.ReactNode;
  className?: string; // 스타일라이즈 텍스트에서도 tailwind 적용 가능
};

interface HeaderTextProps {
  text: string;
  highlight?: string;
}

const StylizedText: React.FC<TextProps> = ({ type = 'body1', children, color }) => {
  const styles = getStyles(type);
  return (
    <Text className={`${color}`} style={styles}>{children}</Text>
  );
};

export const HeaderText: React.FC<HeaderTextProps> = ({
  text,
  highlight = '',
}) => {
  // 강조할 부분을 찾아서 분리
  const parts = text.split(highlight);
  return (
    <Text className="my-2 mb-4 ml-2 text-xl" style={getStyles('header1')}>
      {parts.map((part, index) => (
        <Text key={index} className="text-black" style={getStyles('header1')}>
          {part}
          {index < parts.length - 1 && (
            <Text className="text-primary">{highlight}</Text> // primary 컬러
          )}
        </Text>
      ))}
    </Text>
  );
};

interface StyledTextStyle {
  fontFamily: string;
  fontSize: number;
}

// Function to return the styles based on the type
export const getStyles = (type: string) : StyledTextStyle => {
  switch (type) {
    case 'header1':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize: 24,
      };
    case 'header2':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize: 16,
      };
    case 'header3':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
      };
    case 'body1':
      return {
        fontFamily: 'Pretendard-Light',
        fontSize: 14,
      };
    case 'body2':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
      };
    case 'caption':
      return {
        fontFamily: 'Pretendard-Thin',
        fontSize: 10,
      };
    case 'label':
        return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 9,
      };
    case 'label2':
      return {
      fontFamily: 'Pretendard-Medium',
      fontSize: 11,
    };
    default:
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
      };
  }
};

export default StylizedText;
