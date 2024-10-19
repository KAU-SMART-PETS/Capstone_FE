import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, Animated, Easing, ViewStyle } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import MyPageScreen from '@screens/profile/MyPage';
import AnalysisScreen from '@screens/health/Analysis';
import PetInfo from '@screens/profile/PetProfile';
import RegisterHealthInformation from '@screens/health/RegisterHealthInfo';
import HomeScreen from '@screens/home/Home';

// Create Tab Navigator
const Tab = createMaterialBottomTabNavigator();

// Tab screens configuration
const tabScreens: TabScreen[] = [
  { id: 'walkTab', name: '산책', iconName: 'paw', iconType: 'mc', component: AnalysisScreen },
  { id: 'infoTab', name: '기록', iconName: 'calendar', iconType: 'mc', component: PetInfo },
  { id: 'homeTab', name: '홈', iconName: 'home', iconType: 'fa', component: HomeScreen },
  { id: 'healthTab', name: '건강', iconName: 'heartbeat', iconType: 'fa', component: RegisterHealthInformation },
  { id: 'profileTab', name: '마이페이지', iconName: 'user-circle-o', iconType: 'fa', component: MyPageScreen },
];

const MainTab: React.FC = () => {
  const [translateX] = useState(new Animated.Value(0)); // Animation value

  // Calculate the animated view style
  const animatedViewStyle: Animated.AnimatedProps<ViewStyle> = {
    backgroundColor: activeIconColor,
    width: slidingLineWidth,
    height: 4,
    position: 'absolute',
    bottom: 10,
    left: 0,
    transform: [{ translateX }], // Use the animated value directly
  };

  // Animation function
  const animateBackground = useCallback((index: number) => {
    const newTranslateX = index * tabWidth + centerOffset + (totalWidth - totalContentWidth) / 2; // Center the sliding line
    Animated.timing(translateX, {
      toValue: newTranslateX,
      duration: 360, // Animation duration
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  // Set initial tab position
  useEffect(() => {
    animateBackground(initTabIdx);
  }, [animateBackground]);

  // Render tab icon
  const renderTabIcon = useCallback((route: any, focused: boolean) => {
    const currentTab = tabScreens.find((tab) => tab.name === route.name);
    const IconComponent = currentTab?.iconType === 'fa' ? FAIcon : MCIcon;
    const color = focused ? activeIconColor : inactiveIconColor;

    return <IconComponent key={currentTab?.name} name={currentTab?.iconName ?? ''} size={27} color={color} />;
  }, []);

  return (
    <View className="flex-1">
      <Tab.Navigator
        initialRouteName={tabScreens[initTabIdx]["name"]}
        barStyle={tabBarStyle}
        shifting={false}
        activeColor={activeIconColor}
        inactiveColor={inactiveIconColor}
        labeled={true}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => renderTabIcon(route, focused),
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
      {/* Sliding line below tab icons */}
      <Animated.View style={animatedViewStyle} />
    </View>
  );
};


const tabCount = 5;
const initTabIdx = 2;
const totalWidth = Dimensions.get('window').width;
const totalContentWidth = totalWidth * 0.75;
const tabWidth = totalContentWidth / tabCount;
const slidingLineWidth = tabWidth * 0.9;
const centerOffset = (tabWidth - slidingLineWidth) / 2;

const activeIconColor = '#000000';
const inactiveIconColor = '#73A8BA';

// Type definition for tabs
type TabScreen = {
  id : string;
  name: string;
  iconName: string;
  iconType: 'fa' | 'mc';
  component: React.ComponentType<any>;
};

// Styles for the tab bar
const tabBarStyle = {
  paddingHorizontal: (totalWidth - totalContentWidth) / 2,
  paddingVertical: 5,
  marginHorizontal: 3,
  backgroundColor: '#D7E8EE',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  borderWidth: 3,
  borderColor: 'rgba(115, 168, 186, .4)',
};

export default MainTab;
