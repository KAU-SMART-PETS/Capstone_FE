// import React, { useEffect, useState } from 'react';
// import { View, PermissionsAndroid, Platform } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

// const MapPage: React.FC = () => {
//   const [region, setRegion] = useState({
//     latitude: 37.78825, // 기본 위치
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const [location, setLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   useEffect(() => {
//     // 위치 권한 요청
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           startWatchingLocation();
//         }
//       } else {
//         startWatchingLocation();
//       }
//     };

//     requestLocationPermission();

//     // 컴포넌트 언마운트 시 watchPosition 정리
//     return () => {
//       Geolocation.stopObserving();
//     };
//   }, []);

//   // 위치를 실시간으로 추적
//   const startWatchingLocation = () => {
//     Geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         setRegion((prevRegion) => ({
//           ...prevRegion,
//           latitude,
//           longitude,
//         }));
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 10, // 위치가 10미터 이상 이동할 때만 업데이트
//         interval: 5000, // 5초마다 위치 업데이트 요청
//         fastestInterval: 2000, // 최소 업데이트 간격 2초
//       }
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={{ flex: 1 }}
//         region={region}
//         showsUserLocation
//       >
//         {location && (
//           <Marker
//             coordinate={location}
//             title="내 위치"
//             description="현재 위치입니다."
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default MapPage;
