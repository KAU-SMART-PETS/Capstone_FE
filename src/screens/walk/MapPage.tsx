import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapPage: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // 기본 위치
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  
    // 위치 권한 요청에 대한 로그 추가
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log("위치 권한 부여:", granted); // 권한 확인
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startWatchingLocation();
        }
      } else {
        startWatchingLocation();
      }
    };

    requestLocationPermission();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  // 위치 추적에 대한 로그 추가
  const startWatchingLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("위치 추적:", latitude, longitude); // 위치 로그 추가
        setLocation({ latitude, longitude });
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
      },
      (error) => console.log("위치 추적 오류:", error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
      >
        {location && (
          <Marker
            coordinate={location}
            title="내 위치"
            description="현재 위치입니다."
          />
        )}
      </MapView>
    </View>
  );
};

export default MapPage;
