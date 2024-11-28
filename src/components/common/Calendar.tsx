import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import StylizedText from '@common/StylizedText';
import pawPrint from '@image/icon/pawprint.png';
import leftArrow from '@image/icon/arrow_back.png';
import rightArrow from '@image/icon/arrow_front.png';
import fetchWeeklyData from '@data/weeklyData1.json';
import dayjs from 'dayjs';

// Arrow 컴포넌트
interface ArrowProps {
  direction: 'left' | 'right';
  color?: string;
  size?: number;
  onPress: () => void;
}

// DateComponent 컴포넌트
interface DateComponentProps {
    date: number;
    walked: boolean;
}

// CalendarHeader 컴포넌트
interface CalendarHeaderProps {
    currentDate: any; // dayjs 객체
    onPrevMonth: () => void;
    onNextMonth: () => void;
}
  
  // Calendar 컴포넌트
interface CalendarFrameProps {
    currentDate: any;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}
  

const Arrow: React.FC<ArrowProps> = ({ direction, color = 'gray', size = 40, onPress }) => {
  const imageSource = direction === 'left' ? leftArrow : rightArrow;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor: color, width: size, height: size, borderRadius: size / 2, padding: 5 }}>
        <Image source={imageSource} style={{ width: size / 2, height: size / 2 }} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

const DateComponent: React.FC<DateComponentProps> = ({ date, walked }) => {
  return (
    <View className="w-[30px] h-[30px] flex items-center justify-center flex-col">
      {walked && <Image source={pawPrint} style={{ width: 12, height: 12 }} />}
      <StylizedText type="caldate2">{date}</StylizedText>
    </View>
  );
};


const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <View className="flex-row justify-between items-center mb-2">
      <Arrow direction="left" size={40} onPress={onPrevMonth} color="transparent" />
      <StylizedText type="caldate1">{currentDate.format('YYYY년 MM월')}</StylizedText>
      <Arrow direction="right" size={40} onPress={onNextMonth} color="transparent" />
    </View>
  );
};

// DaysOfWeek 컴포넌트
const DaysOfWeekComponent: React.FC = () => {
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  return (
    <View className="flex-row justify-between gap-1 mt-1">
      {daysOfWeek.map((day, index) => (
        <StylizedText key={index} type="caldate1">
          {day}
        </StylizedText>
      ))}
    </View>
  );
};



const CalendarFrame: React.FC<CalendarFrameProps> = ({ currentDate, onPrevMonth, onNextMonth }) => {
  const [walkData, setWalkData] = useState([]);

  useEffect(() => {
    const loadWeeklyData = async () => {
      const data = await fetchWeeklyData; // JSON 데이터에서 walk 정보를 가져옴
      setWalkData(data);
    };

    loadWeeklyData();
  }, [currentDate]);

  const renderDates = () => {
    const startOfMonth = currentDate.startOf('month');  // currentDate가 dayjs 객체로 전달되었으므로 메서드 사용 가능
    const endOfMonth = currentDate.endOf('month');
    const daysInMonth = endOfMonth.date();
    const firstDayOfWeek = startOfMonth.day();

    const calendarDates = [];

    // 첫 번째 주 빈칸 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDates.push(<View key={`empty-${i}`} className="w-[30px] h-[30px]" />);
    }

    // 날짜 렌더링 및 walk 정보에 따라 pawprint 표시
    for (let date = 1; date <= daysInMonth; date++) {
      const formattedDate = currentDate.date(date).format('YYYY-MM-DD');
      const walkDay = walkData.find((item) => item.date === formattedDate);
      const walked = walkDay && walkDay.metrics.walk > 0; // walk 값이 0보다 크면 pawprint 표시

      calendarDates.push(
        <DateComponent key={date} date={date} walked={walked} />
      );
    }

    return <View className="flex-row flex-wrap justify-between gap-1 mt-2">{calendarDates}</View>;
  };

  return (
    <View className="w-[300px] h-[320px] bg-lightgrey rounded-[19.2px] p-6">
      <CalendarHeader currentDate={currentDate} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />
      <DaysOfWeekComponent />
      {renderDates()}
    </View>
  );
};



const Calendar: React.FC = () => {
  // dayjs로 currentDate를 초기화
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <CalendarFrame
      currentDate={currentDate}   // dayjs로 초기화된 currentDate 전달
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}
    />
  );
};


export default Calendar;