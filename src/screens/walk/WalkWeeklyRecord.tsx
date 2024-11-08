import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VBarChart } from '@common/BarChart'; 
import { HeaderText } from '@common/StylizedText';
import RoundedBox from '@common/RoundedBox'; 
import dayjs from 'dayjs';

const WalkWeeklyRecord: React.FC = () => {
  const weeklyData = [
    { label: "일일 산책량", color: "#85E0A3", percentages: [30, 40, 50, 20, 60, 70, 80] },
    { label: "휴식량", color: "#FFAFA3", percentages: [50, 60, 40, 30, 50, 60, 40] },
    { label: "걸음 수", color: "#FFD966", percentages: [70, 80, 90, 70, 60, 50, 40] },
    { label: "일광 노출량", color: "#C4A8FF", percentages: [40, 50, 60, 40, 30, 20, 70] },
    { label: "자외선 노출량", color: "#80CAFF", percentages: [20, 30, 40, 60, 70, 80, 90] },
    { label: "비타민 D 합성량", color: "#C09999", percentages: [50, 60, 70, 80, 40, 30, 20] },
  ];

  const startDate = dayjs().subtract(6, 'day'); 

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <HeaderText text="바둑이의 일주일은 어땠을까요?" highlight="바둑이" />
      
      {weeklyData.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <RoundedBox preset="A" shadow={true} >
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 , marginLeft:10}}>{item.label}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {item.percentages.map((percentage, dayIndex) => {
                const date = startDate.add(dayIndex, 'day').format('M/D');
                return (
                  <View key={dayIndex} style={{ alignItems: 'center' }}>
                    <VBarChart date={`Day ${dayIndex + 1}`} percentage={percentage} color={item.color} />
                    <Text style={{ fontSize: 13, color: '#666', fontWeight: 'bold' }}>{date}</Text>
                  </View>
                );
              })}
            </View>
          </RoundedBox>
        </View>
      ))}
    </ScrollView>
  );
};

export default WalkWeeklyRecord;