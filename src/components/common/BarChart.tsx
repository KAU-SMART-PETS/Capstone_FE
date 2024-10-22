import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { ColorMap } from './ColorMap';

// Metric 인터페이스 정의
interface BarChartProps {
  date: string;
  percentage: number;
  color: string; // Color can be a hex code or a Tailwind color class
}

export const VBarChart: React.FC<BarChartProps> = ({ date, percentage, color }) => {
  const isHexColor = (hexcolor: string) => {
    return /^#[0-9A-F]{6}$/i.test(hexcolor); // Regex to check for hex color
  };

  const backgroundColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const fillColor = isHexColor(color) ? color : ColorMap[color] || '#000'; // Fallback to black if not found

  return (
    <View className="items-center">
      <Svg height="150" width="20" viewBox="0 0 20 150">
        <Rect
          x="0"
          y="0"
          width="15"
          height="150"
          fill={backgroundColor}
          rx="6"
          ry="6"
        />
        <Rect
          x="2"
          y={150 - percentage * 1.5}
          width="11"
          height={percentage * 1.5}
          fill={fillColor}
          rx="6"
          ry="6"
        />
      </Svg>
      <Text className="text-xs mt-2">{date.slice(5)}</Text>
    </View>
  );
};

// Horizontal Bar Chart Component
export const HBarChart: React.FC<BarChartProps> = ({ date, percentage, color }) => {
  const isHexColor = (hexcolor: string) => {
    return /^#[0-9A-F]{6}$/i.test(hexcolor); // Regex to check for hex color
  };

  const backgroundColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const fillColor = isHexColor(color) ? color : ColorMap[color] || '#000'; // Fallback to black if not found

  return (
    <View className="items-start">
      <Svg height="20" width="150" viewBox="0 0 150 20">
        <Rect
          x="0"
          y="0"
          width="150"
          height="15"
          fill={backgroundColor}
          rx="6"
          ry="6"
        />
        <Rect
          x="0"
          y="2.5"
          width={percentage * 1.5} // Scale the width based on percentage
          height="10"
          fill={fillColor}
          rx="4"
          ry="4"
        />
      </Svg>
      <Text className="text-xs mt-2">{date.slice(5)}</Text>
    </View>
  );
};
