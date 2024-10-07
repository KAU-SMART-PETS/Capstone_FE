import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "../pageStyle/WalkTimerScreenStyle";
import { useNavigation } from "@react-navigation/native";

const WalkTimerScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null); // 현재 위치 상태
  const [started, setStarted] = useState(false); // 산책 시작 여부
  const [distance, setDistance] = useState(0); // 이동 거리
  const [timer, setTimer] = useState(0); // 타이머
  const [initialRegion, setInitialRegion] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null); // 타이머 setInterval id 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태

  // 위치 가져오기 함수
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync({
      android: {
        title: "위치 정보 사용 동의",
        message:
          "앱에서 위치 정보를 사용하려면 위치 정보에 대한 권한이 필요합니다.",
        buttonPositive: "동의",
        buttonNegative: "거부",
      },
      ios: {
        title: "위치 정보 사용 동의",
        message:
          "앱에서 위치 정보를 사용하려면 위치 정보에 대한 권한이 필요합니다.",
        buttonPositive: "동의",
        buttonNegative: "거부",
      },
    });
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005, // Zoom level for latitude
      longitudeDelta: 0.005, // Zoom level for longitude
    });
  };

  // 컴포넌트가 처음 렌더링될 때 위치 가져오기
  useEffect(() => {
    getLocation();
  }, []);

  // 산책 시작
  const startWalk = () => {
    setStarted(true);
    // 타이머 시작
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // 타이머 setInterval id 저장
    setTimerInterval(intervalId);
  };
  // 산책 일시정지
  const pauseWalk = () => {
    // 타이머 clearInterval
    clearInterval(timerInterval);
    // 타이머 setInterval id 저장
    setTimerInterval(null);
  };

  // 타이머 재개
  const resumeWalk = () => {
    // 타이머 재개
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // 타이머 setInterval id 저장
    setTimerInterval(intervalId);
  };

  // 산책 정지
  const stopWalk = () => {
    setStarted(false);
    // 타이머 초기화
    setTimer(0);
    // 타이머 clearInterval
    clearInterval(timerInterval);
  };

  // 시간을 형식화하는 함수
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // 모달 취소
  const cancelStop = () => {
    setModalVisible(false);
  };

  // 모달 종료
  const confirmStop = () => {
    setModalVisible(false);
    stopWalk();
    navigation.navigate("TodayWalkRecordScreen");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        {/* 지도가 화면의 세로 60%만 차지하도록 */}
        <MapView style={styles.map} initialRegion={initialRegion}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Current Location"}
              description={"I am here"}
            />
          )}
        </MapView>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 시작 버튼이 지도 아래에 오도록 */}
        {!started ? (
          <TouchableOpacity style={styles.mapstartButton} onPress={startWalk}>
            <Text style={styles.startButtonText}>Start!</Text>
          </TouchableOpacity>
        ) : (
          <>
            {timerInterval ? (
              <TouchableOpacity
                style={styles.mapPauseButton}
                onPress={pauseWalk}
              >
                <Text style={styles.mapPausebuttonText}>||</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.mapPlayButton}
                onPress={resumeWalk}
              >
                <Text style={styles.mapPausebuttonText}>▶</Text>
              </TouchableOpacity>
            )}
            {timer > 0 && (
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
            )}
            <TouchableOpacity
              style={styles.mapStopButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.mapStopbuttonText}>■</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.askWalkQuitmodalContainer}>
          <View style={styles.askWalkQuitmodalView}>
            <Text style={styles.askWalkQuitmodalText}>
              산책을 종료하시겠어요?
            </Text>
            <View style={styles.askWalkQuitmodalButtonContainer}>
              <TouchableOpacity
                style={styles.askWalkQuitmodalStopButton}
                onPress={confirmStop}
              >
                <Text style={styles.askWalkQuitmodalStopText}>종료</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.askWalkQuitmodalDeleteButton}
                onPress={cancelStop}
              >
                <Text style={styles.askWalkQuitmodalDeleteText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalkTimerScreen;
