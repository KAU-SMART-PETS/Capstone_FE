import React from 'react';
import { ScrollView } from 'react-native';
import { ProgressDots, Spinner } from '@common/Loading';

const LoadingExample: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
        <ProgressDots />
    </ScrollView>
  );
};

export default LoadingExample;
