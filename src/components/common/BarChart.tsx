import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { ColorMap } from '@common/ColorMap';

// Metric 인터페이스 정의
interface BarChartProps {
  date: string;
  percentage: number;
  color: string; // Color can be a hex code or a Tailwind color class
}

interface SBarProps {
  percentage: number; // 0에서 100 사이의 값
  color: string;      // 활성화된 색상 (hex 코드 또는 Tailwind 색상 클래스)
  label: string;      // 텍스트의 두 번째 줄
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

//반원형 차트
export const SBar: React.FC<SBarProps> = ({ percentage, color, label }) => {
  const isHexColor = (hexcolor: string) => {
    return /^#[0-9A-F]{6}$/i.test(hexcolor); // Hex 색상 여부 확인
  };

  // 비활성화된 바 색상(불투명도 20% 적용)
  const inactiveColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const activeColor = isHexColor(color) ? color : ColorMap[color] || '#000';

  // 반원형 Path 계산
  const radius = 50;
  const center = 50;
  const circumference = Math.PI * radius;
  const activeArc = (circumference * percentage) / 100;

  return (
    <View className="items-center">
      {/* 반원형 SVG */}
      <Svg height="100" width="100" viewBox="0 0 100 50">
        {/* 비활성 반원 */}
        <Path
          d={`M 10 50 A 40 40 0 1 1 90 50`}
          stroke={inactiveColor}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
        {/* 활성 반원 */}
        <Path
          d={`M 10 50 A 40 40 0 1 1 90 50`}
          stroke={activeColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${activeArc}, ${circumference}`}
          fill="none"
        />
      </Svg>

      {/* 중앙 텍스트 */}
      <View className="absolute inset-0 justify-center pt-12 items-center">
        <Text className="text-lg font-bold text-black">
          {`${percentage}%`}
        </Text>
        <Text className="text-sm font-bold text-black">{label}</Text>
      </View>
    </View>
  );
};