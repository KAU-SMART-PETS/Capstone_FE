import { useState, useEffect } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {styled} from 'nativewind'; // nativewind 스타일 사용

// import { Text, View } from 'react-native';
// const StyledView = styled(View);
// const StyledText = styled(Text);

// COMPONENTS
import MyPageScreen from './MyPageScreen';
import AnalysisScreen from './analysisScreen';
import PetInfo from './PetInfoScreen';
import RegisterHealthInformation from './registerHealthInformation';

const Tab = createMaterialBottomTabNavigator();

function MainTab() {
  const [translateX] = useState(new Animated.Value(0)); // 애니메이션 값
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / 4; // 탭 개수에 따른 너비 조정

  // 공통 스타일 변수 관리
  const styles = {
    tabHeight: 70,
    activeTabColor: 'bg-blue-500', // Tailwind로 관리
    inactiveIconColor: '#888888',
    activeIconColor: '#ffffff',
    tabBackgroundColor: '#D7E8EE',
    iconSize: 30, // 아이콘 크기 증가
  };

  // 탭 전환 시 배경 애니메이션
  const animateBackground = (index) => {
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
  };

  // 탭이 처음 로드될 때 배경의 초기 위치 설정
  useEffect(() => {
    animateBackground(0); // 첫 탭 위치로 설정
  }, []);

  const FAIcons = (name, color, size) => (
    <FAIcon name={name} color={color} size={size} />
  );
  const MCIcons = (name, color, size) => (
    <MCIcon name={name} color={color} size={size} />
  );

  return (
    <View className="flex-1">
        {/* Animated 배경색 */}
<Animated.View
    style={[
        {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: -1, // 아이콘 뒤로 배경을 보냄
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#3b82f6', // Tailwind의 'bg-blue-500' 색상을 직접 스타일링
        width: tabWidth,
        height: styles.tabHeight,
        transform: [{ translateX }],
        },
    ]}
    />
      <Tab.Navigator
        initialRouteName="산책"
        barStyle={{ backgroundColor: 'transparent' }}
        // barStyle={`${styles.tabBackgroundColor}`}
        shifting={false}
        activeColor={styles.activeIconColor}
        inactiveColor={styles.inactiveIconColor}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === '산책') {
              iconName = 'paw';
              return MCIcons(iconName, color, styles.iconSize);
            } else if (route.name === '기록') {
              iconName = 'calendar';
              return MCIcons(iconName, color, styles.iconSize);
            } else if (route.name === '건강') {
              iconName = 'heartbeat';
              return FAIcons(iconName, color, styles.iconSize);
            } else if (route.name === '마이페이지') {
              iconName = 'user-circle-o';
              return FAIcons(iconName, color, styles.iconSize);
            }
          },
        })}
        screenListeners={({ route }) => ({
          tabPress: () => {
            const tabIndex =
              route.name === '산책'
                ? 0
                : route.name === '기록'
                ? 1
                : route.name === '건강'
                ? 2
                : 3;
            animateBackground(tabIndex);
          },
        })}
      >
        <Tab.Screen name="산책" component={AnalysisScreen} />
        <Tab.Screen name="기록" component={PetInfo} />
        <Tab.Screen name="건강" component={RegisterHealthInformation} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default MainTab;
