import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, Animated, Easing, ViewStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { ColorMap } from '@common/ColorMap';

import MyPage from '@screens/profile/MyPage';
import Analysis from '@screens/health/Analysis';
import PetProfile from '@screens/profile/PetProfile';
import RegisterHealthInfo from '@screens/health/RegisterHealthInfo';
import Home from '@screens/home/Home';

const Tab = createBottomTabNavigator();

const tabScreens: TabScreen[] = [
  // 하단 탭 페이지 구성
  { id: 'walkTab', name: '산책', iconName: 'paw', iconType: 'mc', component: Analysis },
  { id: 'infoTab', name: '기록', iconName: 'calendar', iconType: 'mc', component: PetProfile },
  { id: 'homeTab', name: '홈', iconName: 'home', iconType: 'fa', component: Home },
  { id: 'healthTab', name: '건강', iconName: 'heartbeat', iconType: 'fa', component: RegisterHealthInfo },
  { id: 'profileTab', name: '마이페이지', iconName: 'user-circle-o', iconType: 'fa', component: MyPage },
];

const MainTab: React.FC = () => {
  const [translateX] = useState(new Animated.Value(0));

  const getTranslateX = (index: number) => {
    // 각 탭의 중앙 위치를 계산한 뒤, 패딩을 더해 이동
    return marginHorizontal + paddingHorizontal + index * tabWidth + (tabWidth - slidingLineWidth) / 2;
  };

  // 하단 탭 아래 슬라이더 (현재 활성화된 탭으로 좌우이동) 
  const animatedViewStyle: Animated.AnimatedProps<ViewStyle> = {
    backgroundColor: activeIconColor,
    width: slidingLineWidth,
    borderRadius: 10,
    height: 4,
    position: 'absolute',
    bottom: 5,
    left: 0,
    transform: [{ translateX }],
  };
  // 애니메이션 함수
  const animateBackground = useCallback((index: number) => {
    const newTranslateX = getTranslateX(index); // 패딩과 오프셋을 고려한 x 좌표 계산
    Animated.timing(translateX, {
      toValue: newTranslateX,
      duration: 360,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  // Set initial tab position
  useEffect(() => {
    animateBackground(initTabIdx);
  }, [animateBackground]);

  // 탭 아이콘 렌더링
  const renderTabIcon = useCallback((route: any, focused: boolean) => {
    const currentTab = tabScreens.find((tab) => tab.name === route.name);
    const IconComponent = currentTab?.iconType === 'fa' ? FAIcon : MCIcon;
    const color = focused ? activeIconColor : inactiveIconColor;

    return <IconComponent key={currentTab?.name} name={currentTab?.iconName ?? ''} size={27} color={color} />;
  }, []);

  return (
    <View className='flex-1'>
      <Tab.Navigator
        initialRouteName={tabScreens[initTabIdx]["name"]}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => renderTabIcon(route, focused),
          tabBarActiveTintColor: activeIconColor,
          tabBarInactiveTintColor: inactiveIconColor,
          tabBarStyle: tabBarStyle, // 기존 스타일 유지
          tabBarLabelStyle : {paddingBottom : 13},
          headerShown: false, // 헤더 숨기기
        })}
        screenListeners={({ route }) => ({
          tabPress: () => {
            const tabIndex = tabScreens.findIndex((tab) => tab.name === route.name);
            animateBackground(tabIndex);
          },
        })}
      >
        {tabScreens.map((tab) => (
          <Tab.Screen key={tab.id} name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
      {/* 텝 아이콘 하단의 슬라이더 라인 */}
      <Animated.View style={animatedViewStyle} />
    </View>
  );
};

const activeIconColor = ColorMap['black'];
const inactiveIconColor = ColorMap['primary'];

// Type definition for tabs
type TabScreen = {
  id: string;
  name: string;
  iconName: string;
  iconType: 'fa' | 'mc';
  component: React.ComponentType<any>;
};


// Constants for tab animations and styles
const tabCount = 5;
const initTabIdx = 2;
const marginHorizontal = 5;
const totalWidth = Dimensions.get('window').width - marginHorizontal * 2;
const totalContentWidth = totalWidth * 0.78;
const tabWidth = totalContentWidth / tabCount;
const slidingLineWidth = tabWidth * 0.88;

const paddingHorizontal = (totalWidth - totalContentWidth) / 2;

// Styles for the tab bar
const tabBarStyle = {
  paddingHorizontal: paddingHorizontal,
  paddingTop: 20,
  marginHorizontal: marginHorizontal,
  backgroundColor: ColorMap['skyblue'],
  borderColor: ColorMap['primary'] + 'BF', // 테두리 색에 투명도 추가
  borderWidth: 3,
  borderTopWidth: 3,
  borderBottomWidth: 0,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  height: 80, 
};

export default MainTab;
