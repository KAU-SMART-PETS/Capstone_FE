import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { ColorMap } from '@common/ColorMap';

// 인터페이스 정의
interface BarChartProps {
  date: string;
  percentage: number;
  color: string;
  labels?: string[]; // 여러 레이블을 지원하기 위해 배열 추가
}

interface SBarProps {
  percentage: number;
  color: string;
  label: string;
}

// 세로 막대 그래프
export const VBarChart: React.FC<BarChartProps> = ({ date, percentage, color, labels = [date.slice(5)] }) => {
  const isHexColor = (hexcolor: string) => /^#[0-9A-F]{6}$/i.test(hexcolor);

  const backgroundColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const fillColor = isHexColor(color) ? color : ColorMap[color] || '#000';

  return (
    <View className="items-center">
      <Svg height="150" width="20" viewBox="0 0 20 150">
        <Rect x="0" y="0" width="15" height="150" fill={backgroundColor} rx="6" ry="6" />
        <Rect x="2" y={150 - percentage * 1.5} width="11" height={percentage * 1.5} fill={fillColor} rx="6" ry="6" />
      </Svg>
      {labels.map((label, index) => (
        <Text key={index} className="text-xs mt-1">{label}</Text>
      ))}
    </View>
  );
};

// 가로 막대 그래프
export const HBarChart: React.FC<BarChartProps> = ({ date, percentage, color, labels = ['0', '현재', '전체'] }) => {
  const isHexColor = (hexcolor: string) => /^#[0-9A-F]{6}$/i.test(hexcolor);

  const backgroundColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const fillColor = isHexColor(color) ? color : ColorMap[color] || '#000';

  return (
    <View className="items-center w-full mb-4">
      <Svg height="20" width="100%" viewBox="0 0 150 20">
        <Rect x="0" y="0" width="150" height="15" fill={backgroundColor} rx="6" ry="6" />
        <Rect x="0" y="2.5" width={percentage * 1.5} height="10" fill={fillColor} rx="4" ry="4" />
      </Svg>
      <View className="flex-row justify-between w-full mt-1">
        {labels.map((label, index) => (
          <Text key={index} className="text-xs">{label}</Text>
        ))}
      </View>
    </View>
  );
};

// 반원형 차트
export const SBar: React.FC<SBarProps> = ({ percentage, color, label }) => {
  const isHexColor = (hexcolor: string) => /^#[0-9A-F]{6}$/i.test(hexcolor);

  const inactiveColor = isHexColor(color)
    ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`
    : `rgba(${parseInt(ColorMap[color]?.slice(1, 3) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(3, 5) || '0', 16)}, ${parseInt(ColorMap[color]?.slice(5, 7) || '0', 16)}, 0.2)`;

  const activeColor = isHexColor(color) ? color : ColorMap[color] || '#000';

  const radius = 50;
  const circumference = Math.PI * radius;
  const activeArc = (circumference * percentage) / 100;

  return (
    <View className="items-center">
      <Svg height="100" width="100" viewBox="0 0 100 50">
        <Path
          d="M 10 50 A 40 40 0 1 1 90 50"
          stroke={inactiveColor}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 10 50 A 40 40 0 1 1 90 50"
          stroke={activeColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${activeArc}, ${circumference}`}
          fill="none"
        />
      </Svg>
      <View className="absolute inset-0 justify-center pt-12 items-center">
        <Text className="text-lg font-bold text-black">{`${percentage}%`}</Text>
        <Text className="text-sm font-bold text-black">{label}</Text>
      </View>
    </View>
  );
};
