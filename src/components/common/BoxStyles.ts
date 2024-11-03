import ColorMap, { OpacityMap } from '@common/ColorMap';
import { ViewStyle } from 'react-native';

export type DesignPreset = 'A' | 'B' | 'C' | 'D' | 'modalC' | 'modalB' |
                            'greycard' | 'dashedcard' | 'squarecard' | 
                            'opaque-panel' | 'flatcard' | 'flatcard-fit'; 
// 파일 하단에 각 옵션에 따른 스타일 설명

export type OutlinePreset = 'solid' | 'dashed' | 'dotted' 
                        | 'active-solid' | 'inactive-solid' | 'inactive-dashed' | undefined;

export const getBoxOutlnes = (outline: OutlinePreset) : ViewStyle => {
    switch (outline) {
      case 'solid':
        return {};
      case 'dashed':
        return {
          borderStyle : 'dashed', 
          borderWidth : 1.2,
          borderColor: ColorMap['secondary'],
      };
      case 'dotted':
        return {
          borderStyle : 'dotted', 
          borderWidth : 1.2,
          borderColor: ColorMap['secondary'],
      };
      case 'active-solid':
        return {
          borderStyle : 'solid', 
          borderWidth : 1.5,
          borderColor: ColorMap['primary'],
      };
      case 'inactive-solid':
        return {
          borderStyle : 'solid', 
          borderWidth : 1.5,
          borderColor: ColorMap['secondary'] + OpacityMap['35'],
      };
      case 'inactive-dashed':
        return {
          borderStyle : 'dashed', 
          borderWidth : 1.5,
          borderColor: ColorMap['secondary'] + OpacityMap['60'],
      };
      default:
          return {};
    }
  }
  
  export const getBoxStyles = (preset: DesignPreset) => {
    switch (preset) {
      case 'A': // 둥근박스1 - 하얗고 둥근박스 + 그림자
        return {
          backgroundColor: 'bg-white',
          borderStyle: 'border border-gray-200 rounded-[24px]',
          containerLayout: 'py-6 px-2',
        };
      case 'B':  // 둥근박스2 - 옅은 회색, 그림자+테두리 없음
        return {
          backgroundColor: 'bg-lightgrey',
          borderStyle: 'rounded-[24px]',
          containerLayout: 'p-4 my-1',
      };
      case 'C': // 둥근박스3 - 테두리 있음. 정사각형, 가운데 정렬
        return {
          backgroundColor: 'bg-white',
          borderStyle: 'border border-3',
          containerLayout: 'py-4 px-3 flex items-center justify-center',
        };
      case 'modalC': // 센터모달 (중앙 모달) - 하얀박스, 내부요소 중앙정렬
        return {
        backgroundColor: 'bg-white',
        borderStyle: 'rounded-[16px]',
        containerLayout: 'w-80 mx-auto p-12 flex items-center justify-center',
      };
      case 'modalB': // 바닥모달 (하단 모달) - 하얀박스, 아래쪽 고정, 위쪽만 둥글게
        return {
        backgroundColor: 'bg-white',
        borderStyle: 'rounded-t-[24px]',
        containerLayout: 'w-full h-80 mx-auto px-12 py-6 flex items-center justify-bottom',
      };
      case 'greycard':  // 옅은 회색박스 - 질병정보카드1 (아이콘)
        return {
          backgroundColor: 'bg-lightgrey',
          borderStyle: 'rounded-[24px]',
          containerLayout: 'my-1 p-4',
      };
      case 'dashedcard': 
        return {
          backgroundColor: 'bg-silver/10',
          borderStyle: 'rounded-xl',
          containerLayout: 'flex flex-col justify-center items-center text-center my-1 p-4',
      };
      case 'squarecard': 
        return {
          backgroundColor: 'bg-lightgrey',
          borderStyle: 'rounded-xl',
          containerLayout: 'w-32 h-32 flex flex-col justify-center items-center text-center my-1 p-4',
      };
      case 'flatcard': 
        return {
          backgroundColor: 'bg-white',
          borderStyle: 'rounded-3xl',
          containerLayout: 'my-1 p-6 max-h-28 max-w-full',
        };
      case 'flatcard-fit': 
        return {
          backgroundColor: 'bg-white',
          borderStyle: 'rounded-3xl',
          containerLayout: 'my-1 p-6 py-3.5 max-h-28 max-w-full',
        };
      case 'opaque-panel': 
        return {
          backgroundColor: 'bg-white opacity-50',
          borderStyle: 'rounded-[16px]',
          containerLayout: 'p-6',
      };
      default:
        return {
          backgroundColor: 'bg-white',
          borderStyle: 'border border-gray-200',
          containerLayout: 'py-6 px-2',
        };
    }
  };