import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import { WalkingRecord } from '@components/Records';
import WalkRecordingPanel from '@src/components/WalkingRecordPanel';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RoundedCircleButton } from '@src/components/common/RoundedButton';
import { registerWalkRecord } from '@src/api/walkApi';
import { useRoute, useNavigation } from '@react-navigation/native';

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // 지구 반지름 (킬로미터)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params as { petId: string };
  const mapRef = useRef<MapView>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
  const [prevLocation, setPrevLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [walkResponse, setWalkResponse] = useState<any | null>(null);
  let watchId: number | null = null;

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
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
      Geolocation.clearWatch();
      clearInterval(timerRef.current!);
    };
  }, []);

  const startWatchingLocation = (): void => {
    watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        if (prevLocation) {
          const addedDistance = haversine(prevLocation.latitude, prevLocation.longitude, latitude, longitude);
          if (addedDistance > 0.001) {
            setDistance((prevDistance) => prevDistance + addedDistance);
          }
        }

        setPrevLocation({ latitude, longitude });
      },
      (error) => console.error('위치 추적 오류:', error),
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
    setStartTime(new Date().toISOString());
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handlePausePress = () => {
    if (isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    setIsPaused(!isPaused);
  };

  const handleStopPress = () => {
    setIsModalVisible(true);
  };

  const handleFinishPress = async () => {
    setIsStarted(false);
    clearInterval(timerRef.current!);
    setIsModalVisible(false);

    const endTime = new Date().toISOString();

    const walkData = {
      dataInpDt: new Date().toISOString().split('T')[0],
      step: Math.round(distance * 1300),
      tLux: 0,
      avgK: 0,
      avgLux: 0,
      startTime: startTime || '',
      endTime,
      distance: Math.round(distance * 1000) / 1000,
      walkingTime: time,
    };

    try {
      const response = await registerWalkRecord(petId, walkData);

      if (response) {
        console.log('산책 기록 저장 성공:', response);
        setWalkResponse(response);
        setIsBottomModalVisible(true);
      } else {
        Alert.alert('실패', '산책 기록 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('산책 기록 저장 중 오류 발생:', error);
    }

    setDistance(0);
    setTime(0);
    setStartTime(null);
  };

  const showThankYouModal = () => {
    setIsBottomModalVisible(false);
    setIsThankYouModalVisible(true);
  };

  const handleConfirmPress = () => {
    setIsThankYouModalVisible(false);
    navigation.navigate('WalkStartPage');
  };

  return (
    <View style={{ flex: 1 }}>
      <WalkRecordingPanel distanceInMeters={distance} timeInSeconds={time} />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
        onRegionChangeComplete={(region) => setRegion(region)}
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
              icon={<MCIcon name={isPaused ? 'play' : 'pause'} color="black" size={20} />}
              textColor="text-black"
              content={isPaused ? '다시 시작' : '일시정지'}
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
              shadow
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
                />,
              ],
              layout: 'row',
            },
          ]}
        />
      )}

      {isBottomModalVisible && walkResponse && (
        <ModalLayout
          visible={isBottomModalVisible}
          setVisible={setIsBottomModalVisible}
          position="bottom"
          transparent
          titleAlign="left"
          rows={[
            {
              content: [
                <RoundedCircleButton
                  color="bg-secondary"
                  shadow
                  size={40}
                  onPress={showThankYouModal}
                >
                  <MCIcon name="close" size={22} color="white" />
                </RoundedCircleButton>,
              ],
              layout: 'col',
            },
            {
              content: [
                <WalkingRecord
                  walkDate={
                    walkResponse?.startDate
                      ? walkResponse.startDate.split(' ')[0]
                      : '날짜 없음'
                  }
                  walkTime={
                    walkResponse?.walkingTime
                      ? `${Math.floor(walkResponse.walkingTime / 60)}분 ${walkResponse.walkingTime % 60}초`
                      : '시간 없음'
                  }
                  distance={
                    walkResponse?.distance !== undefined
                      ? walkResponse.distance < 1000
                        ? `${walkResponse.distance.toFixed(0)} m` // 1000m 미만이면 m 단위로 표시
                        : `${(walkResponse.distance / 1000).toFixed(2)} km` // 1000m 이상이면 km 단위로 표시
                      : '거리 없음'
                  }
                  calories={
                    walkResponse?.calories !== undefined
                      ? `${walkResponse.calories.toFixed(1)} kcal`
                      : '칼로리 없음'
                  }
                  steps={
                    walkResponse?.step !== undefined
                      ? `${walkResponse.step.toLocaleString()} 걸음`
                      : '걸음 수 없음'
                  }
                />,
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
                  onPress={handleConfirmPress}
                />,
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
