import React from 'react';
import { Text } from 'react-native';
// import { TextProps, HeaderTextProps } from '@types';

type TextProps = {
  type?: string;
  children?: React.ReactNode;
  styleClass?: string;  
};

interface HeaderTextProps {
  text: string;
  highlight?: string;
}

const StylizedText: React.FC<TextProps> = ({ type = 'body1', children, styleClass }) => {
  const styles = getStyles(type);
  return (
    <Text className={styleClass} style={styles}>{children}</Text>
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
        fontSize: 22,
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
    case 'header4': // 질병정보카드의 제목
      return {
        fontFamily: 'Pretendard-Black',
        fontSize: 18,
      };
    case 'header5': // 질병정보카드의 두꺼운 퍼센트숫자
      return {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
      };
      case 'header6': 
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
      };
      case 'header7':
      return {
        fontFamily: 'Pretendard-ExtraBold',
        fontSize: 18,
      };
    case 'body1':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
      };
    case 'body2':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
      };
    case 'body3':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 10,
    };
    case 'caption-title':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    };
    case 'caption-label':
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 10.5,
    };
    case 'label':
        return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 9,
      };
    case 'label1':
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize: 9,
    };
    case 'label2':
      return {
      fontFamily: 'Pretendard-Medium',
      fontSize: 11,
    };
    case 'label3': // 질병정보카드 - 퍼센트
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize: 11,
    };
    case 'label4': // 질병정보카드 - 퍼센트라는 텍스트라벨
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize: 6,
    };
    case 'record1':
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize: 13,
    };
    case 'record2':
      return {
      fontFamily: 'Pretendard-Medium',
      fontSize: 13,
    };
    default:
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
      };
  }
};

export default StylizedText;
