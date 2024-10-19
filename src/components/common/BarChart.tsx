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

const BarChart: React.FC<BarChartProps> = ({ date, percentage, color }) => {
  // Function to determine if the color is a hex code
  const isHexColor = (hexcolor : string) => {
    return /^#[0-9A-F]{6}$/i.test(hexcolor); // Regex to check for hex color
  };

  // Set background color based on whether the color is hex or a Tailwind color
  const backgroundColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  // Set fill color directly based on hex or Tailwind color
  const fillColor = isHexColor(color) ? color : ColorMap[color] || '#000'; // Fallback to black if not found

  return (
    <View className="items-center">
      <Svg height="150" width="20" viewBox="0 0 20 150">
        {/* 배경 그래프 */}
        <Rect
          x="0"
          y="0"
          width="15"
          height="150"
          fill={backgroundColor} // Use background color with transparency
          rx="6"
          ry="6"
        />
        {/* 실제 데이터 그래프 */}
        <Rect
          x="2"
          y={150 - percentage * 1.5}
          width="12"
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

export default BarChart;
