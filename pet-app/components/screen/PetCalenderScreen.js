import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import Svg, { Rect } from "react-native-svg";
//import styles from "../pageStyle/PetCalenderScreenStyle";

const TodayWalkRecordScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    // 임의로 산책 완료한 날과 완료하지 않은 날을 설정
    const dates = {
      "2024-06-01": { marked: true, dotColor: "green" },
      "2024-06-03": { marked: true, dotColor: "red" },
      "2024-06-05": { marked: true, dotColor: "green" },
      "2024-06-06": { marked: true, dotColor: "red" },
    };
    setMarkedDates(dates);
  }, []);

  const chartData = {
    labels: [
      "산책량",
      "걸음수",
      "휴식량",
      "일광노출",
      "자외선 노출",
      "비타민D 합성",
    ],
    datasets: [
      {
        data: [67, 20, 41, 50, 50, 70],
      },
    ],
  };

  const colors = [
    { bg: "rgba(173, 216, 230, 0.2)", fg: "rgba(173, 216, 230, 1)" },
    { bg: "rgba(238, 130, 238, 0.2)", fg: "rgba(238, 130, 238, 1)" },
    { bg: "rgba(255, 228, 181, 0.2)", fg: "rgba(255, 228, 181, 1)" },
    { bg: "rgba(144, 238, 144, 0.2)", fg: "rgba(144, 238, 144, 1)" },
    { bg: "rgba(255, 160, 122, 0.2)", fg: "rgba(255, 160, 122, 1)" },
    { bg: "rgba(135, 206, 250, 0.2)", fg: "rgba(135, 206, 250, 1)" },
  ];

  const walkStatusText = (isCompleted) => {
    return isCompleted ? "산책 완료" : "산책 미완료";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>오늘 바둑이의 하루는 어땠을까요?</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "#333333",
          todayButtonFontWeight: "bold",
          arrowColor: "orange",
        }}
      />
      <View style={styles.walkStatusContainer}>
        <View style={styles.walkStatusText}>
          <Text style={styles.walkComplete}>산책 완료</Text>
          <Text style={styles.walkIncomplete}>산책 미완료</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>오늘 (2024/06/05)</Text>
      <View style={styles.chartContainer}>
        {chartData.labels.map((label, index) => (
          <View key={index} style={styles.chartItem}>
            <Text style={styles.chartLabel}>{label}</Text>
            <Svg height="100" width={screenWidth / 4}>
              <Rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill={colors[index].bg}
              />
              <Rect
                x="0"
                y={`${100 - chartData.datasets[0].data[index]}%`}
                width="100%"
                height={`${chartData.datasets[0].data[index]}%`}
                fill={colors[index].fg}
              />
            </Svg>
            <Text style={styles.chartValue}>
              {chartData.datasets[0].data[index]}%
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TodayWalkRecordScreen;
