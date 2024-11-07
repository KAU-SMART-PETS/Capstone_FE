// TestingPage.tsx

import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TestingPage: React.FC = () => {
  const navigation = useNavigation<RootStackParamList>();

  // 버튼 정보 배열
  const buttonGroups: { [key: string]: (keyof RootStackParamList)[] } = {
    Cards: ["BlueotoothScanner"],
  };

  return (
    <View className='flex-1 bg-white'>
      <List.Section>
        {Object.keys(buttonGroups).map((group) => (
          <React.Fragment key={`${group}_acc`}>
            <List.Accordion
              title={group}
              titleStyle={{ fontWeight: 'bold' }}
              className='bg-lightgrey'
              left={props => <List.Icon {...props} icon="dots-vertical" color="orange" />}
            >
              {buttonGroups[group].map((destination) => (
                <React.Fragment key={`${destination}_nav`}>
                  <List.Item
                    title={destination}
                    titleStyle={{ color: 'white' }}
                    className='bg-black'
                    onPress={() => navigation.navigate(destination)}
                    left={() => <List.Icon icon="chevron-right" />}
                  />
                  <Divider bold />
                </React.Fragment>
              ))}
            </List.Accordion>
            <Divider bold />
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

export default TestingPage;
