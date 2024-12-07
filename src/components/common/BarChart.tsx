import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { ColorMap, OpacityMap } from '@common/ColorMap';

// 인터페이스 정의
interface BarChartProps {
  date?: string;
  percentage: number;
  color?: string;
  labels?: string[]; // 여러 레이블을 지원하기 위해 배열 추가
}

interface SBarProps {
  percentage: number;
  color: string;
  label: string;
}

// 세로 막대 그래프
export const VBarChart: React.FC<BarChartProps> = ({ date, percentage, color = ColorMap['green'], labels = [date.slice(5)] }) => {
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
export const HBarChart: React.FC<BarChartProps> = ({
  percentage,
  color = ColorMap['green'],
}) => {
  // 배경 색상
  const backgroundColor = color + OpacityMap['20']
  // 채워지는 막대 색상
  const fillColor = color;
  // 막대의 최대 너비와 패딩
  const { width: screenWidth } = Dimensions.get('window'); // 화면의 가로 크기
  const maxWidth = screenWidth * 0.7;
  const padding = 15; // 패딩 값
  const filledWidth = (percentage / 100) * (maxWidth - padding * 2.5); // 패딩을 뺀 너비
  return (
    <View className="flex-1 mb-2">
      {/* 그래프 */}
      <View className="w-full items-center">
        <Svg
          height="28"
          width={maxWidth}
          viewBox={`0 0 ${maxWidth} ${28 + padding}`}
          preserveAspectRatio="none"
        >
          {/* Background Bar */}
          <Rect
            width={maxWidth - padding * 2}
            height={28}
            fill={backgroundColor}
            rx="10"
            ry="10"
          />
          {/* Progress Bar */}
          <Rect
            x={padding / 3}
            y={padding / 3}
            width={filledWidth}
            height={18}
            fill={fillColor}
            rx="8"
            ry="8"
          />
        </Svg>
      </View>
    </View>
  );
};

// 반원형 차트
export const SBar: React.FC<SBarProps> = ({ percentage, color = ColorMap['green'], label }) => {
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
