import { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import MyPageScreen from './MyPageScreen';
import AnalysisScreen from './analysisScreen';
import PetInfo from './PetInfoScreen';
import RegisterHealthInformation from './registerHealthInformation';
import HomeScreen from './HomeScreen';

const Tab = createMaterialBottomTabNavigator();

const tabCount = 5;
const initTabIdx = 2;

const totalWidth = Dimensions.get('window').width;
const totalContentWidth = totalWidth * 0.75; // 전체 넓이의 70%에 탭바 아이콘을 배치
const tabWidth = totalContentWidth / tabCount; // 아이콘들이 중앙에 모이도록 탭 너비를 조정
const slidingLineWidth = tabWidth * 0.9; // 슬라이딩 바 너비를 탭 너비의 60%로 설정
const centerOffset = (tabWidth - slidingLineWidth) / 5; // 슬라이딩 바를 탭 중앙에 맞추기 위한 오프셋 값

const activeIconColor = '#000000'; // 활성화된 아이콘 색상
const inactiveIconColor = '#73A8BA'; // 비활성화된 아이콘 색상

// 스타일 상수
const styles = {
  tabHeight: 70,
  iconSize: 27,
  bottomBarColor: '#D7E8EE',
  slidingLineColor: activeIconColor, // 슬라이딩 라인의 색상
  slidingLineHeight: 4, // 슬라이딩 라인의 높이
  barRadius: 24,
};

// 탭 바 스타일
const tabBarStyle = {
  paddingHorizontal: (totalWidth - totalContentWidth) / 2, // 양쪽에서 중앙으로 패딩
  paddingVertical: 5,
  marginHorizontal : 3,
  backgroundColor: styles.bottomBarColor,
  borderTopLeftRadius: styles.barRadius,
  borderTopRightRadius: styles.barRadius,
  borderWidth: 3,
  borderColor: 'rgba(115, 168, 186, .4)'
}

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
  { name: '홈', iconName: 'home', iconType: 'fa', component: HomeScreen },
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
    animateBackground(initTabIdx); // 첫 번째 탭 위치로 설정
  }, [animateBackground]);

  return (
      <View style={{ flex: 1}}>
        {/* 탭 네비게이터 */}
        <Tab.Navigator
          initialRouteName={tabScreens[initTabIdx]['name']}
          barStyle={tabBarStyle}
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
            bottom: 10,
            left: 0,
            transform: [{ translateX }],
          }}
        />
      </View>
  );
}

export default MainTab;

// 하단은 기존의 탭 전환 애니메이션 (아이콘에 배경을 masking, 배경 쪽 요소를 슬라이딩하여 연출)

// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Dimensions, Animated, Easing } from 'react-native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaskedView from '@react-native-masked-view/masked-view';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FAIcon from 'react-native-vector-icons/FontAwesome';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// import MyPageScreen from './MyPageScreen';
// import AnalysisScreen from './analysisScreen';
// import PetInfo from './PetInfoScreen';
// import RegisterHealthInformation from './registerHealthInformation';

// const Tab = createMaterialBottomTabNavigator();

// const totalWidth = Dimensions.get('window').width;
// const tabCount = 4;
// const tabWidth = totalWidth / tabCount; // 탭 개수에 따른 탭의 너비 동적 계산

// // 스타일 상수
// const styles = {
//   tabHeight: 70,
//   activeIconColor: '#ffffff',
//   iconSize: 27,
//   bottomBarColor: '#D7E8EE',
//   slidingBoxColor: '#ffffff',
//   barRadius: 30,
// };

// const bottomNavTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     secondaryContainer: 'transparent',
//   },
// };

// // 아이콘 렌더링 컴포넌트
// const TabIcon = ({ name, type, focused, size }) => {
//   const color = focused ? styles.activeIconColor : 'black';

//   return type === 'fa' ? (
//     <FAIcon name={name} size={size} color={color} />
//   ) : (
//     <MCIcon name={name} size={size} color={color} />
//   );
// };

// // 탭 아이콘 및 화면 정보를 딕셔너리로 정의
// const tabScreens = [
//   { name: '산책', iconName: 'paw', iconType: 'mc', component: AnalysisScreen },
//   { name: '기록', iconName: 'calendar', iconType: 'mc', component: PetInfo },
//   { name: '건강', iconName: 'heartbeat', iconType: 'fa', component: RegisterHealthInformation },
//   { name: '마이페이지', iconName: 'user-circle-o', iconType: 'fa', component: MyPageScreen }
// ];

// function MainTab() {
//   const [translateX] = useState(new Animated.Value(0)); // 애니메이션 값

//   // 애니메이션 함수 useCallback으로 최적화
//   const animateBackground = useCallback((index) => {
//     Animated.timing(translateX, {
//       toValue: index * tabWidth - 20,
//       duration: 300, // 애니메이션 지속시간
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   useEffect(() => {
//     animateBackground(0); // 첫 탭 위치로 설정
//   }, [animateBackground]);

//   return (
//     <PaperProvider theme={bottomNavTheme}>
//       <View style={{ flex: 1 }} className="bg-cyan-400">
//         {/* 마스크 처리된 슬라이딩 배경 */}
//         <MaskedView
        
//           style={{ position: 'absolute', bottom: 0, width: totalWidth, height: styles.tabHeight }}
//           maskElement={
//             <View className="flex-row justify-evenly px-12" >
//               {tabScreens.map((tab, index) => (
//                 <TabIcon
//                   key={index}
//                   name={tab.iconName}
//                   type={tab.iconType}
//                   focused={true}
//                   size={styles.iconSize}
//                 />
//               ))}
//             </View>
//           }
//         >
//           {/* 하단 바 배경 */}
//             <View
//             style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 width: totalWidth,
//                 height: styles.tabHeight,
//                 backgroundColor: styles.bottomBarColor,
//                 borderTopLeftRadius: styles.barRadius,
//                 borderTopRightRadius: styles.barRadius,
//             }}
//             />
//             <View className="bg-gray-400" style={{ height: styles.tabHeight }} />
//           {/* 하얀색 슬라이딩 박스 */}
//           <Animated.View
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               backgroundColor: styles.slidingBoxColor,
//               width: tabWidth,
//               height: styles.tabHeight,
//               transform: [{ translateX }],
//             }}
//           />
//         </MaskedView>

//         <Tab.Navigator
//           initialRouteName="산책"
//           barStyle={{
//             backgroundColor: 'transparent',
//             // backgroundColor : styles.bottomBarColor,
//             // borderTopLeftRadius: styles.barRadius,
//             // borderTopRightRadius: styles.barRadius,
//             // marginHorizontal: 5,
//             paddingHorizontal: 60,
//             // paddingVertical: 10,
//           }}
//           shifting={false}
//           activeColor={styles.activeIconColor}
//           inactiveColor={styles.inactiveIconColor}
//           labeled={true}
//           screenListeners={({ route }) => ({
//             tabPress: () => {
//               const tabIndex = tabScreens.findIndex(tab => tab.name === route.name);
//               animateBackground(tabIndex);
//             },
//           })}
//         >
//           {tabScreens.map((tab, index) => (
//             <Tab.Screen key={index} name={tab.name} component={tab.component} />
//           ))}
//         </Tab.Navigator>
//       </View>
//     </PaperProvider>
//   );
// }

// export default MainTab;
