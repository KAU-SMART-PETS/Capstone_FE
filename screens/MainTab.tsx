import { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import MyPageScreen from './MyPageScreen';
import AnalysisScreen from './analysisScreen';
import PetInfo from './PetInfoScreen';
import RegisterHealthInformation from './registerHealthInformation';

const Tab = createMaterialBottomTabNavigator();
const bottomNavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent',
    },
};

const totalWidth = Dimensions.get('window').width;
const tabCount = 4;
const totalContentWidth = totalWidth * 0.7; // 전체 넓이의 70%에 탭바 아이콘을 배치
const tabWidth = totalContentWidth / tabCount; // 아이콘들이 중앙에 모이도록 탭 너비를 조정
const slidingLineWidth = tabWidth * 0.8; // 슬라이딩 바 너비를 탭 너비의 60%로 설정
const centerOffset = (tabWidth - slidingLineWidth) / 2; // 슬라이딩 바를 탭 중앙에 맞추기 위한 오프셋 값

const activeIconColor = '#000000'; // 활성화된 아이콘 색상
const inactiveIconColor = '#A3A3AC'; // 비활성화된 아이콘 색상

// 스타일 상수
const styles = {
  tabHeight: 70,
  iconSize: 27,
  bottomBarColor: '#D7E8EE',
  slidingLineColor: activeIconColor, // 슬라이딩 라인의 색상
  slidingLineHeight: 4, // 슬라이딩 라인의 높이
  barRadius: 24,
};

// 아이콘 렌더링 컴포넌트
const TabIcon = ({ name, type, focused, size }) => {
  const color = focused ? activeIconColor : inactiveIconColor;

  return type === 'fa' ? (
    <FAIcon name={name} size={size} color={color} />
  ) : (
    <MCIcon name={name} size={size} color={color} />
  );
};

// 탭 아이콘 및 화면 정보를 배열로 정의
const tabScreens = [
  { name: '산책', iconName: 'paw', iconType: 'mc', component: AnalysisScreen },
  { name: '기록', iconName: 'calendar', iconType: 'mc', component: PetInfo },
  { name: '건강', iconName: 'heartbeat', iconType: 'fa', component: RegisterHealthInformation },
  { name: '마이페이지', iconName: 'user-circle-o', iconType: 'fa', component: MyPageScreen }
];

function MainTab() {
  const [translateX] = useState(new Animated.Value(0)); // 애니메이션 값

  // 애니메이션 함수 useCallback으로 최적화
  const animateBackground = useCallback((index) => {
    const newTranslateX = index * tabWidth + centerOffset + (totalWidth - totalContentWidth) / 2; // 슬라이딩 바 중앙 맞춤 계산
    Animated.timing(translateX, {
      toValue: newTranslateX,
      duration: 360, // 애니메이션 지속시간
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [tabWidth]);

  useEffect(() => {
    animateBackground(0); // 첫 번째 탭 위치로 설정
  }, [animateBackground]);

  return (
    <PaperProvider theme={bottomNavTheme}>
      <View style={{ flex: 1}}>
        {/* 탭 네비게이터 */}
        <Tab.Navigator
          initialRouteName={tabScreens[0]['name']}
          barStyle={{
            paddingHorizontal: (totalWidth - totalContentWidth) / 2, // 양쪽에서 중앙으로 패딩
            paddingVertical: 6,
            backgroundColor: styles.bottomBarColor,
            borderTopLeftRadius: styles.barRadius,
            borderTopRightRadius: styles.barRadius,
          }}
          shifting={false}
          activeColor={activeIconColor}
          inactiveColor={inactiveIconColor}
          labeled={true}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const currentTab = tabScreens.find(tab => tab.name === route.name);
              return (
                <TabIcon
                  name={currentTab.iconName}
                  type={currentTab.iconType}
                  focused={focused}
                  size={styles.iconSize}
                />
              );
            },
          })}
          screenListeners={({ route }) => ({
            tabPress: () => {
              const tabIndex = tabScreens.findIndex(tab => tab.name === route.name);
              animateBackground(tabIndex);
            },
          })}
        >
          {tabScreens.map((tab, index) => (
            <Tab.Screen key={index} name={tab.name} component={tab.component} />
          ))}
        </Tab.Navigator>
        
        {/* 하단 탭 아이콘 아래의 슬라이딩 줄 */}
        <Animated.View
          style={{
            backgroundColor: styles.slidingLineColor,
            width: slidingLineWidth, // 슬라이딩 바 너비 계산 적용
            height: styles.slidingLineHeight, // 슬라이딩 바 높이
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateX }],
          }}
        />
      </View>
    </PaperProvider>
  );
}

export default MainTab;
