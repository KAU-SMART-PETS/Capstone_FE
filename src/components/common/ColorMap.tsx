import { Metrics } from '@types';

// Define the mapping of custom Tailwind colors to hex values
export const ColorMap: { [key: string]: string } = {
    primary: '#73A8BA',
    skyblue: '#D7E8EE',
    grey : '#D9D9D9',
    darkgrey: '#A3A3AC',
    red: '#FF8A80',
    pink: '#FFAFA3',
    yellow: '#FFD966',
    orange: '#FFB74D',
    green: '#85E0A3',
    blue: '#80CAFF',
    purple: '#C4A8FF',
    brown: '#C09999',
    lightgrey: '#F7F7F7',
    whitegrey: '#F4F4F4',
    white: '#FFFFFF',
    black: '#000000',
};

// Color map definition
export const BarGroupColor: { [key in keyof Metrics]: string } = {
    walk: 'green', // Green
    rest: 'red', // Red
    steps: 'yellow', // Yellow
    sunlight: 'purple', // Purple
    uvExposure: 'blue', // Blue
    vitaminD: '#FFB74D', // Orange
};
