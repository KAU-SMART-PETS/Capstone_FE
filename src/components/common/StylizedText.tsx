import React from 'react';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 기준 크기
const baseWidth = 400; // 휴대폰 너비 기준

// 비율 계산
const responsiveFontSize = (fontSize: number) => {
  return (fontSize * width) / baseWidth;
};

type TextProps = {
  type?: string;
  children?: React.ReactNode;
  styleClass?: string;  
  numberOfLines?: number; // 추가
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // 추가
};

interface HeaderTextProps {
  text: string;
  highlight?: string;
  type?: string;
}

const StylizedText: React.FC<TextProps> = ({ 
  type = 'body1', 
  children, 
  styleClass, 
  numberOfLines, 
  ellipsizeMode 
}) => {
  const styles = getStyles(type);
  return (
    <Text
      className={styleClass}
      style={styles}
      numberOfLines={numberOfLines} // 줄 수 제한
      ellipsizeMode={ellipsizeMode} // 잘림 방식
    >
      {children}
    </Text>
  );
};

export const HeaderText: React.FC<HeaderTextProps> = ({
  text,
  highlight = '',
  type='header1'
}) => {
  // 강조할 부분을 찾아서 분리
  const parts = text.split(highlight);
  return (
    <Text className="my-2 mb-4 ml-2 text-xl" style={getStyles(type)}>
      {parts.map((part, index) => (
        <Text key={index} className="text-black" style={getStyles(type)}>
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
    case 'header0':
        return {
            fontFamily: 'Pretendard-ExtraBold',
            fontSize:  responsiveFontSize(30),
            };
    case 'header1':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize:  responsiveFontSize(22),
      };
    case 'header2':
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize:  responsiveFontSize(16),
      };
    case 'header3':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize:  responsiveFontSize(12),
      };
    case 'header4': // 질병정보카드의 제목
      return {
        fontFamily: 'Pretendard-Black',
        fontSize:  responsiveFontSize(18),
      };
    case 'header5': // 질병정보카드의 두꺼운 퍼센트숫자
      return {
        fontFamily: 'Pretendard-SemiBold',
        fontSize:  responsiveFontSize(18),
      };
      case 'header6': 
      return {
        fontFamily: 'Pretendard-Bold',
        fontSize:  responsiveFontSize(18),
      };
      case 'header7':
      return {
        fontFamily: 'Pretendard-ExtraBold',
        fontSize:  responsiveFontSize(18),
      };
    case 'body1':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize:  responsiveFontSize(14),
      };
    case 'body2':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize:  responsiveFontSize(12),
      };
    case 'body3':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize:  responsiveFontSize(10),
    };
    case 'caption-title':
      return {
        fontFamily: 'Pretendard-Medium',
        fontSize:  responsiveFontSize(15),
    };
    case 'caption-label':
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize:  responsiveFontSize(10.5),
    };
    case 'caption-body':
      return {
      fontFamily: 'Pretendard-Regular',
      fontSize:  responsiveFontSize(18.5),
    };
    case 'label':
        return {
        fontFamily: 'Pretendard-Regular',
        fontSize:  responsiveFontSize(9,)
      };
    case 'label1':
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize:  responsiveFontSize(9,)
    };
    case 'label2':
      return {
      fontFamily: 'Pretendard-Medium',
      fontSize:  responsiveFontSize(11),
    };
    case 'label3': // 질병정보카드 - 퍼센트
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize:  responsiveFontSize(11),
    };
    case 'label4': // 질병정보카드 - 퍼센트라는 텍스트라벨
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize:  responsiveFontSize(6,)
    };
    case 'record1':
      return {
      fontFamily: 'Pretendard-Bold',
      fontSize:  responsiveFontSize(13),
    };
    case 'record2':
      return {
      fontFamily: 'Pretendard-Medium',
      fontSize:  responsiveFontSize(13),
    };
    default:
      return {
        fontFamily: 'Pretendard-Regular',
        fontSize:  responsiveFontSize(14),
      };
  }
};

export default StylizedText;
