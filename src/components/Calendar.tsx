// NOTE : 기록이 없는 일자( - 로 표시)에 대해 처리를 추가해도 좋을 듯
// (클릭이 불가능하게 만들거나, 클릭 시 기록이 없다는 메시지 화면을 아래에 보여주거나)
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar as BaseCalendar, LocaleConfig } from 'react-native-calendars';
import StylizedText from '@common/StylizedText';
import ColorMap from '@common/ColorMap';
import pawPrint from '@image/icon/pawprint.png';
import dayjs from 'dayjs';

// 한국어 설정
LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month()); // 현재 월 상태

  // 각 날짜의 active 여부 설정
  const activeDates = {
    '2024-09-01': true,
    '2024-09-20': true,
    '2024-09-30': true,
    // 추가적인 active 날짜들을 여기에 추가하세요.
  };

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (date: any) => {
    setCurrentMonth(dayjs(date.dateString).month()); // 월 변경 시 currentMonth 업데이트
  };

  return (
    <View className='px-6 pt-1 pb-4 rounded-3xl my-2 bg-lightgrey'> 
      <BaseCalendar
        markingType={'custom'}
        theme={{
          arrowColor: 'gray',
          todayTextColor: 'black',
          textMonthFontWeight: 'bold',
          textDayFontWeight: 'bold',
          textDayFontSize: 14, // 텍스트 크기 조정
          textMonthFontSize: 18,
          backgroundColor: ColorMap['lightgrey'],
          calendarBackground: ColorMap['lightgrey'],
          textSectionTitleColor: 'gray',
          dayTextColor: 'black',
          selectedDayBackgroundColor: ColorMap['green'],
          selectedDayTextColor: 'black',
        }}
        onMonthChange={handleMonthChange} // 월 변경 시 이벤트 핸들러 추가
        dayComponent={({ date }) => {
          const formattedDate = dayjs(date.dateString).format('YYYY-MM-DD');
          const isSelected = selectedDate === formattedDate;
          const isActive = activeDates[formattedDate] || false;
          const isCurrentMonth = dayjs(date.dateString).month() === currentMonth;

          return (
            <TouchableOpacity onPress={() => handleDatePress(formattedDate)}>
              <View
                className={`flex items-center justify-end w-6 h-8 -mb-1.5 ${isSelected ? 'bg-green' : 'bg-transparent'} rounded-md`}>
                {isActive ? (
                  <Image source={pawPrint} className='absolute w-3.5 h-3.5 bottom-4'/> 
                ) : (
                  <StylizedText type="body2" styleClass={isCurrentMonth ? "text-black" : "text-secondary"}>-</StylizedText>
                )}
                <StylizedText
                  type="body2"
                  styleClass={isCurrentMonth ? "text-black" : "text-secondary"}
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
