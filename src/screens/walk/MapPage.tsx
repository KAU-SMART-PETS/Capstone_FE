import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Platform, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import WalkingRecord from '@src/components/common/Records';


const MapPage: React.FC = () => {
  const mapRef = useRef<MapView>(null); // MapView에 대한 참조 생성
  const [isStarted, setIsStarted] = useState(false); // 시작 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false); // 첫 번째 모달 상태
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false); // 하단 모달 상태
  const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false); // 감사 모달 상태 추가
  const navigation = useNavigation(); // navigation 훅 사용

  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log("위치 권한 부여:", granted);
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

  const startWatchingLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("위치 추적:", latitude, longitude);
        setLocation({ latitude, longitude });

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
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      }
    );
  };

  const handleStartPress = () => {
    setIsStarted(true);
  };

  const handlePausePress = () => {
    console.log("일시정지 버튼이 눌렸습니다.");
  };

  const handleStopPress = () => {
    setIsModalVisible(true); // 첫 번째 모달 표시
  };

  const handleFinishPress = () => {
    setIsStarted(false); // 상태 초기화
    setIsModalVisible(false); // 첫 번째 모달 닫기
    setIsBottomModalVisible(true); // 하단 모달 표시
  };

  const showThankYouModal = () => {
    setIsBottomModalVisible(false);
    setIsThankYouModalVisible(true); // 감사 모달 표시
  };

  const handleConfirmPress = () => {
    setIsThankYouModalVisible(false);
    //화면 이동 코드
  };

  return (
    <View style={{ flex: 1 }}>
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

      <View style={{ position: 'absolute', bottom: 20, left: '50%', transform: [{ translateX: -50 }] }}>
        {isStarted ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <RoundedTextButton
              content="일시정지"
              onPress={handlePausePress}
              color="bg-primary"
              textColor="text-white"
              widthOption="sm"
              borderRadius="rounded-full"
              shadow={true}
              extraStyleClass="mx-2"
            />
            <RoundedTextButton
              content="정지"
              onPress={handleStopPress}
              color="bg-primary"
              textColor="text-white"
              widthOption="sm"
              borderRadius="rounded-full"
              shadow={true}
              extraStyleClass="mx-2"
            />
          </View>
        ) : (
          <RoundedTextButton
            content="START!"
            onPress={handleStartPress}
            color="bg-primary"
            textColor="text-white"
            widthOption="md"
            borderRadius="rounded-full"
            shadow={true}
          />
        )}
      </View>

      {/* 첫 번째 모달 */}
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

      {/* 하단 모달 */}
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
            {
              content: [
                <RoundedTextButton
                  key="close"
                  content="종료"
                  color="bg-primary"
                  textColor="text-white"
                  widthOption="md"
                  onPress={showThankYouModal} // 감사 모달 표시
                  extraStyleClass="mt-0 pt-5"
                />,
              ],
              layout: 'col',
            }
          ]}
        />
      )}

      {/* 감사 모달 */}
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
