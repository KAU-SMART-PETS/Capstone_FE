import React from 'react';
import { View } from 'react-native';
import Calendar from '@components/Calendar';

const CalendarExample: React.FC<RootStackParamList> = () => {
    return (
        <View className="flex items-center justify-center bg-white mb-10">
            <Calendar />
        </View>
    );
};

export default CalendarExample