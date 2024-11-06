import { Metrics } from '@types';

const customColors = require('@root/tailwind.config.js');

// tailwind.config에서 정의한 커스텀색상명에 대해, 실제 컬러코드를 받아올 수 있도록 함 
// 예 : const color1 = ColorMap['primary']
export const ColorMap = customColors.colors;


// ColorMap의 색상에 더했을 때, 주어진 불투명도를 적용함.
// 예 : ColorMap['secondary'] + OpacityMap[65]; -- secondary 색상을 65%로 보여줌.
export const OpacityMap = {
    100: 'FF',
    95: 'F2',
    90: 'E6',
    85: 'D9',
    80: 'CC',
    75: 'BF',
    70: 'B3',
    65: 'A6',
    60: '99',
    55: '8C',
    50: '80',
    45: '73',
    40: '66',
    35: '59',
    30: '4D',
    25: '40',
    20: '33',
    15: '26',
    10: '1A',
    5: '0D',
    0: '00'
};


export const BarGroupColor: { [key in keyof Metrics]: string } = {
    walk: 'green',
    rest: 'red',
    steps: 'yellow',
    sunlight: 'purple',
    uvExposure: 'blue',
    vitaminD: 'orange',
};

export default ColorMap;