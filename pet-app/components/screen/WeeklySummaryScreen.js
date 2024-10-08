// WeeklySummaryScreen.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import Svg, { Rect } from "react-native-svg";
import styles from "../pageStyle/WeeklySummarySreen";
import { weeklyData } from "../dummydata";

const colors = {
  "일일 산책량": "#81C784", // 중간 톤의 초록색
  휴식량: "#FF8A80", // 중간 톤의 핑크색
  걸음수: "#FFD54F", // 중간 톤의 노란색
  "일광 노출량": "#B39DDB", // 중간 톤의 보라색
  "자외선 노출량": "#4FC3F7", // 중간 톤의 하늘색
  "비타민 D 합성량": "#FFB74D", // 중간 톤의 오렌지색
};

const WeeklySummaryScreen = () => {
  const renderWeeklyBarChart = (dataKey) => {
    return (
      <View style={styles.weeklyChartContainer}>
        <Text style={styles.weeklyChartTitle}>{dataKey}</Text>
        <View style={styles.weeklyBarContainer}>
          {Object.entries(weeklyData).map(([date, data], index) => {
            const percentage = data.find(
              (item) => item.label === dataKey
            ).value;
            const color = colors[dataKey];
            return (
              <View key={index} style={styles.barItem}>
                <Svg height="150" width="20" viewBox="0 0 20 150">
                  {/* 배경 그래프 */}
                  <Rect
                    x="0"
                    y="0"
                    width="20"
                    height="150"
                    fill={`rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
                      color.slice(3, 5),
                      16
                    )}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`} // 투명도를 높인 배경색
                    rx="10"
                    ry="10"
                  />
                  {/* 실제 데이터 그래프 */}
                  <Rect
                    x="0"
                    y={150 - percentage * 1.5}
                    width="20"
                    height={percentage * 1.5}
                    fill={color}
                    rx="10"
                    ry="10"
                  />
                </Svg>
                <Text style={styles.barDate}>{date.slice(5)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>바둑이의 일주일은 어땠을까요?</Text>
      {[
        "일일 산책량",
        "휴식량",
        "걸음수",
        "일광 노출량",
        "자외선 노출량",
        "비타민 D 합성량",
      ].map((dataKey) => (
        <View key={dataKey}>{renderWeeklyBarChart(dataKey)}</View>
      ))}
    </ScrollView>
  );
};

export default WeeklySummaryScreen;
