//회원가입 되어 있는 사람
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "../pageStyle/TodayWalkRecordScreenStyle";
import Toast from "react-native-toast-message";

const TodayWalkRecordScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  // Mock data
  const walkData = {
    petPhoto: "https://via.placeholder.com/150", // Replace with actual pet photo URL
    walkDate: "2024-06-03",
    walkTime: "01:15:30",
    distance: "3.5 km",
    calories: "250 kcal",
    steps: "5000 걸음",
  };

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

  useEffect(() => {
    getLocation();
  }, []);

  const endWalk = () => {
    // Show toast message
    Toast.show({
      type: "success",
      text1: "오늘도 함께 산책해줘서 고마워요!",
      autoHide: true,
      position: "top",
      // onHide: () => navigation.navigate("Home"), // Navigate to Home screen when toast is hidden
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
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
      <View style={styles.recordContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>오늘의 산책 기록</Text>
          <Image source={{ uri: walkData.petPhoto }} style={styles.petPhoto} />
        </View>

        <View style={styles.detailPart}>
          <View style={styles.detailLeft}>
            <Text style={styles.detailLabel}>산책 일시</Text>
            <Text style={styles.detailLabel}>산책 시간</Text>
            <Text style={styles.detailLabel}>이동 거리</Text>
            <Text style={styles.detailLabel}>소모 칼로리</Text>
            <Text style={styles.detailLabel}>걸음 수</Text>
          </View>
          <View style={styles.detailRight}>
            <Text style={styles.detailValue}>{walkData.walkDate}</Text>
            <Text style={styles.detailValue}>{walkData.walkTime}</Text>
            <Text style={styles.detailValue}>{walkData.distance}</Text>
            <Text style={styles.detailValue}>{walkData.calories}</Text>
            <Text style={styles.detailValue}>{walkData.steps}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.endWalkButton} onPress={endWalk}>
          <Text style={styles.buttonText}>산책 종료</Text>
        </TouchableOpacity>
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default TodayWalkRecordScreen;
