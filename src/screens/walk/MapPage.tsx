import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import WalkingRecord from '@src/components/common/Records';
import WalkRecordingPanel from '@src/components/WalkingRecordPanel';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RoundedCircleButton } from '@src/components/common/RoundedButton';

// 두 지점 간 거리 계산을 위한 haversine 공식을 구현
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // 지구 반경 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 결과 거리 (km)
};

const MapPage: React.FC = () => {
  const mapRef = useRef<MapView>(null); 
  const [isStarted, setIsStarted] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false); 
  const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false); 
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [prevLocation, setPrevLocation] = useState<{ latitude: number; longitude: number } | null>(null); // 이전 위치
  const [distance, setDistance] = useState(0); 
  const [time, setTime] = useState(0); // 타이머 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
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
      clearInterval(timerRef.current!); // 페이지를 떠날 때 타이머를 정리
    };
  }, []);

  const startWatchingLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        if (prevLocation) {
          const addedDistance = haversine(prevLocation.latitude, prevLocation.longitude, latitude, longitude);
          setDistance(prevDistance => prevDistance + addedDistance);
        }

        setPrevLocation({ latitude, longitude }); // 현재 위치를 이전 위치로 업데이트

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        mapRef.current?.animateToRegion(newRegion, 1000);
      },
      (error) => console.log("위치 추적 오류:", error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 5000,
        fastestInterval: 2000,
      }
    );
  };

  const handleStartPress = () => {
    setIsStarted(true);
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1); // 매 초마다 시간 증가
    }, 1000); // 1초 간격으로 업데이트
  };

  const handlePausePress = () => {
    if (isPaused) {
      // 다시 시작
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // 일시정지
      clearInterval(timerRef.current!);
    }
    setIsPaused(!isPaused); // 상태 토글
  };

  const handleStopPress = () => {
    setIsModalVisible(true); // 첫 번째 모달 표시
  };

  const handleFinishPress = () => {
    setIsStarted(false);
    clearInterval(timerRef.current!); // 타이머 정지
    setTime(0); // 시간 초기화
    setDistance(0); // 거리 초기화
    setIsModalVisible(false);
    setIsBottomModalVisible(true); // 하단 모달 표시
  };

  const showThankYouModal = () => {
    setIsBottomModalVisible(false);
    setIsThankYouModalVisible(true); // 감사 모달 표시
  };

  const handleConfirmPress = () => {
    setIsThankYouModalVisible(false);
    // 화면 이동 코드
  };

  return (
    <View style={{ flex: 1 }}>
      <WalkRecordingPanel distanceInMeters={distance * 1000} timeInSeconds={time} />

      <MapView
        ref={mapRef}
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

      <View className="absolute bottom-5 left-0 right-0 items-center">
        {isStarted ? (
          <View className="flex-row justify-center space-x-4">
            <RoundedTextButton 
              color="bg-primary" 
              icon={<MCIcon name={isPaused ? "play" : "pause"} color="black" size={20} />} 
              textColor="text-black" 
              content={isPaused ? "다시 시작" : "일시정지"}
              widthOption="sm"
              onPress={handlePausePress} 
            />
            <RoundedTextButton 
              color="bg-secondary" 
              icon={<MCIcon name="stop" color="black" size={20} />} 
              textColor="text-black" 
              content="중지"
              widthOption="sm"
              onPress={handleStopPress} 
            />
          </View>
        ) : (
          <View className="items-center justify-center">
            <RoundedTextButton
              content="START!"
              onPress={handleStartPress}
              color="bg-primary"
              textColor="text-white"
              widthOption="md"
              borderRadius="rounded-full"
              shadow={true}
            />
          </View>
        )}
      </View>

      {isModalVisible && (
        <ModalLayout
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          title="산책을 종료하시겠어요?"
          rows={[
            {
              content: [
                <RoundedTextButton
                  key="cancel"
                  content="취소"
                  color="bg-secondary"
                  widthOption="sm"
                  onPress={() => setIsModalVisible(false)}
                />,
                <RoundedTextButton
                  key="finish"
                  content="종료"
                  color="bg-primary"
                  widthOption="sm"
                  onPress={handleFinishPress}
                />
              ],
              layout: 'row',
            },
          ]}
        />
      )}

      {isBottomModalVisible && (
        <ModalLayout
          visible={isBottomModalVisible}
          setVisible={setIsBottomModalVisible}
          position="bottom"
          transparent // 배경 투명화 옵션
          titleAlign="left"
          rows={[
            {
              content: [
                <RoundedCircleButton color="bg-secondary" shadow={true} size={40} onPress={showThankYouModal}>
                  <MCIcon name="close" size={22} color="white" />
                </RoundedCircleButton>
              ],
              layout: 'col',
            },
            {
              content: [
                <WalkingRecord
                  walkDate="2023-11-01"
                  walkTime="30분"
                  distance="2.5km"
                  calories="200kcal"
                  steps="4000걸음"
                />
              ],
              layout: 'col',
            },
          ]}
        />
      )}

      {isThankYouModalVisible && (
        <ModalLayout
          visible={isThankYouModalVisible}
          setVisible={setIsThankYouModalVisible}
          title="오늘도 함께 산책해줘서 고마워요!"
          rows={[
            {
              content: [
                <RoundedTextButton
                  key="close"
                  content="확인"
                  color="bg-primary"
                  widthOption="sm"
                  onPress={handleConfirmPress} // Home 화면으로 이동
                />
              ],
              layout: 'col',
            },
         
          ]}
          />
        )}
      </View>
    );
  };
  
  export default MapPage;
  