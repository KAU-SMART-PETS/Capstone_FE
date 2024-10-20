import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import styles from "../pageStyle/PetCalenderScreenStlye";
import { weeklyData } from "../dummydata";

const colors = {
  "일일 산책량": "#81C784",
  휴식량: "#FF8A80",
  걸음수: "#FFD54F",
  "일광 노출량": "#B39DDB",
  "자외선 노출량": "#4FC3F7",
  "비타민 D 합성량": "#FFB74D",
};

const TodayWalkRecordScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("2024-09-07"); // 초기 선택된 날짜
  const today = "2024-09-07"; // 예시 오늘 날짜

  useEffect(() => {
    const dates = Object.keys(weeklyData).reduce((acc, date) => {
      acc[date] = {
        marked: true,
        customStyles: {
          container: {
            backgroundColor: date === today ? "#A0FF7F" : "transparent",
          },
          text: {
            color: "#000",
          },
        },
      };
      return acc;
    }, {});
    setMarkedDates(dates);
  }, []);

  const renderChartCircle = (percentage, color, label) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg height="100" width="100" viewBox="0 0 100 100">
        {/* 배경 원 - 투명도 적용 */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={`rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
            color.slice(3, 5),
            16
          )}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`}
          strokeWidth="10"
          fill="none"
        />
        {/* 실제 원형 그래프 */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
        <SvgText
          x="45"
          y="50"
          fontSize="13"
          fontWeight="bold"
          textAnchor="middle"
          fill="#333"
          dy="-5"
          style={styles.chartValue}
        >
          {percentage}%
        </SvgText>
        <SvgText
          x="50"
          y="50"
          fontSize="10"
          textAnchor="middle"
          fill="#666"
          dy="10"
          style={styles.chartLabel}
        >
          {label}
        </SvgText>
      </Svg>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>이번 주 바둑이의 산책 기록이에요!</Text>
      <Calendar
        markedDates={markedDates}
        markingType={"custom"}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        style={styles.calendar}
      />
      {/* 헤더 부분 */}
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>{selectedDate}의 기록</Text>
        <TouchableOpacity onPress={() => navigation.navigate("WeeklySummary")}>
          <Text style={styles.weeklyViewButton}>이번 주 한눈에 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        {weeklyData[selectedDate] ? (
          weeklyData[selectedDate].map((data, index) => (
            <View key={index} style={styles.chartItem}>
              {renderChartCircle(data.value, colors[data.label], data.label)}
            </View>
          ))
        ) : (
          <Text style={styles.subtitle}>데이터가 없습니다</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TodayWalkRecordScreen;