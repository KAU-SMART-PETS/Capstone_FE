import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar as BaseCalendar, LocaleConfig } from 'react-native-calendars';
import StylizedText from '@common/StylizedText';
import ColorMap from '@common/ColorMap';
import pawPrint from '@image/icon/pawprint.png';
import dayjs from 'dayjs';
import { fetchMonthlyWalkRecord } from '@api/recordApi';

// 한국어 설정
LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

interface CalendarProps {
  onDateSelect: (date: string) => void; // 날짜 선택 콜백 함수
  petId: string; // petId 매개변수
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, petId }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [activeDates, setActiveDates] = useState<{ [key: string]: boolean }>({});

  // 월 변경 시 activeDates 업데이트
  useEffect(() => {
    const fetchActiveDatesForMonth = async () => {
      try {
        const year = dayjs().year();
        const month = currentMonth + 1; // dayjs는 0부터 시작
        const response = await fetchMonthlyWalkRecord(petId, year, month);

        if (response && response.walkDates) {
          const updatedActiveDates = response.walkDates.reduce(
            (acc: { [key: string]: boolean }, date: string) => {
              acc[date] = true;
              return acc;
            },
            {}
          );
          setActiveDates(updatedActiveDates); // 상태 업데이트
        } else {
          setActiveDates({}); // 데이터가 없으면 초기화
        }
      } catch (error) {
        console.error('Error fetching monthly walk record:', error);
        setActiveDates({}); // 오류 발생 시 상태 초기화
      }
    };

    fetchActiveDatesForMonth();
  }, [currentMonth, petId]); // currentMonth 변경 시 실행

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date); // 선택된 날짜를 부모 컴포넌트로 전달
  };

  const handleMonthChange = (date: any) => {
    setCurrentMonth(dayjs(date.dateString).month());
  };

  return (
    <View className="px-6 pt-1 pb-4 rounded-3xl my-2 bg-lightgrey">
      <BaseCalendar
        markingType={'custom'}
        theme={{
          arrowColor: 'gray',
          todayTextColor: 'black',
          textMonthFontWeight: 'bold',
          textDayFontWeight: 'bold',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          backgroundColor: ColorMap['lightgrey'],
          calendarBackground: ColorMap['lightgrey'],
          textSectionTitleColor: 'gray',
          dayTextColor: 'black',
          selectedDayBackgroundColor: ColorMap['green'],
          selectedDayTextColor: 'black',
        }}
        onMonthChange={handleMonthChange}
        dayComponent={({ date }) => {
          const formattedDate = dayjs(date.dateString).format('YYYY-MM-DD');
          const isSelected = selectedDate === formattedDate;
          const isActive = activeDates[formattedDate] || false;

          return (
            <TouchableOpacity onPress={() => handleDatePress(formattedDate)}>
              <View
                className={`flex items-center justify-end w-6 h-8 -mb-1.5 ${
                  isSelected ? 'bg-green' : 'bg-transparent'
                } rounded-md`}
              >
                {isActive ? (
                  <Image source={pawPrint} className="absolute w-3.5 h-3.5 bottom-4" />
                ) : (
                  <StylizedText type="body2" styleClass="text-secondary">-</StylizedText>
                )}
                <StylizedText
                  type="body2"
                  styleClass="text-black"
                  style={{ fontSize: 12 }}
                >
                  {date.day}
                </StylizedText>
              </View>
            </TouchableOpacity>
          );
        }}
        renderHeader={(date) => (
          <StylizedText type="header3" styleClass="text-black" style={{ fontSize: 16 }}>
            {dayjs(date).format('YYYY년 MM월')}
          </StylizedText>
        )}
      />
    </View>
  );
};

export default Calendar;
