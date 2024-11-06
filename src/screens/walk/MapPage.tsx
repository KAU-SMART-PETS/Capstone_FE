import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapPage: React.FC = () => {
  const mapRef = useRef<MapView>(null); // MapView에 대한 참조 생성

  const [region, setRegion] = useState<Region>({
    latitude: 37.78825, // 기본 위치
    longitude: -122.4324,
    latitudeDelta: 0.005, // 줌인 배율 설정 (주변 5블록 정도 보기)
    longitudeDelta: 0.005,
  });

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    // 위치 권한 요청 함수
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

    // 컴포넌트 언마운트 시 위치 추적 중지
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  // 위치 추적을 시작하는 함수
  const startWatchingLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("위치 추적:", latitude, longitude); // 위치 로그 추가
        setLocation({ latitude, longitude });

        // 사용자의 위치를 지도의 중심으로 이동
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005, // 주변 5블록 정도 범위를 유지
          longitudeDelta: 0.005,
        };

        // 지도 위치를 애니메이션으로 이동
        mapRef.current?.animateToRegion(newRegion, 1000); // 1초 동안 애니메이션

        // 기존에 설정된 초기 위치 관련 코드를 주석 처리
        /*
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
        */
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
        ref={mapRef} // MapView에 대한 참조 연결
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region} // 초기 지역 설정 (필요시 주석 처리 가능)
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
